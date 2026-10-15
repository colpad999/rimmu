//

import fs from "fs";
import os from "os";
import path from "path";
import archiver from "archiver";
import axios from "axios";
import FormData from "form-data";
import { CronJob } from "cron";
import config from "../../config.js";
import * as timeHelper from "./yalena-time.js";
import { logger } from "./yalena-logger.js";

const BACKUP_STATE_FILE = path.join(
  process.cwd(),
  "database",
  "autobackup.json",
);
let activeCronJob = null;
const MAX_TELEGRAM_FILE_SIZE = 50 * 1024 * 1024;

function loadBackupState() {
  try {
    if (fs.existsSync(BACKUP_STATE_FILE)) {
      return JSON.parse(fs.readFileSync(BACKUP_STATE_FILE, "utf8"));
    }
  } catch {}
  return {
    enabled: false,
    intervalMs: 3600000,
    intervalStr: "1h",
    lastBackup: null,
    backupCount: 0,
  };
}

function saveBackupState(state) {
  try {
    const dir = path.dirname(BACKUP_STATE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BACKUP_STATE_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch (e) {
    logger.error("AutoBackup", `Save state failed: ${e.message}`);
  }
}

function parseInterval(str) {
  const match = str.match(/^(\d+)(m|h|d)$/i);
  if (!match) return null;
  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  let ms = 0;
  switch (unit) {
    case "m":
      ms = value * 60 * 1000;
      break;
    case "h":
      ms = value * 60 * 60 * 1000;
      break;
    case "d":
      ms = value * 24 * 60 * 60 * 1000;
      break;
    default:
      return null;
  }
  if (ms < 60000 || ms > 7 * 24 * 60 * 60 * 1000) return null;
  return { ms, str: `${value}${unit}` };
}

function formatInterval(ms) {
  if (ms >= 24 * 60 * 60 * 1000)
    return `${Math.floor(ms / (24 * 60 * 60 * 1000))} hari`;
  if (ms >= 60 * 60 * 1000) return `${Math.floor(ms / (60 * 60 * 1000))} jam`;
  return `${Math.floor(ms / (60 * 1000))} menit`;
}

function intervalToCron(ms) {
  if (ms >= 24 * 60 * 60 * 1000) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    return `0 0 */${days} * *`;
  }
  if (ms >= 60 * 60 * 1000) {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    return `0 */${hours} * * *`;
  }
  const minutes = Math.floor(ms / (60 * 1000));
  return `*/${minutes} * * * *`;
}

async function createBackup() {
  return new Promise((resolve, reject) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    const backupPath = path.join(
      os.tmpdir(),
      `backup_${process.pid}_${timestamp}.zip`,
    );

    const output = fs.createWriteStream(backupPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    let fileCount = 0;
    let settled = false;

    const fail = (error) => {
      if (settled) return;
      settled = true;
      archive.abort();
      output.destroy();
      fs.promises.unlink(backupPath).catch((cleanupError) => {
        if (cleanupError.code !== "ENOENT") {
          logger.warn(
            "AutoBackup",
            `Backup cleanup failed: ${cleanupError.message}`,
          );
        }
      });
      reject(error);
    };

    output.on("close", () => {
      if (settled) return;
      settled = true;
      resolve({
        path: backupPath,
        size: archive.pointer(),
        fileCount,
        timestamp,
      });
    });
    output.on("error", fail);
    archive.on("error", fail);
    archive.on("warning", fail);
    archive.pipe(output);

    const rootDir = process.cwd();

    async function addDirectory(dirPath) {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === "node_modules") continue;
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          await addDirectory(fullPath);
        } else if (entry.isFile() || entry.isSymbolicLink()) {
          const relativePath = path.relative(rootDir, fullPath);
          archive.file(fullPath, { name: relativePath });
          fileCount++;
        }
      }
    }

    addDirectory(rootDir)
      .then(() => archive.finalize())
      .catch(fail);
  });
}

function getTelegramBackupConfig() {
  return {
    botToken: config.telegram?.botToken?.trim() || "",
    chatId: config.telegram?.chatId?.trim() || "",
  };
}

function isTelegramBackupConfigured() {
  const { botToken, chatId } = getTelegramBackupConfig();
  return Boolean(botToken && chatId);
}

async function sendBackupToTelegram(backupInfo) {
  const { botToken, chatId } = getTelegramBackupConfig();
  if (!botToken || !chatId) {
    throw new Error(
      "Telegram belum dikonfigurasi. Atur TELEGRAM_BOT_TOKEN dan TELEGRAM_CHAT_ID.",
    );
  }
  if (backupInfo.size > MAX_TELEGRAM_FILE_SIZE) {
    throw new Error("Ukuran backup melebihi batas upload Telegram 50 MB.");
  }

  const sizeInMB = (backupInfo.size / (1024 * 1024)).toFixed(2);
  const state = loadBackupState();
  const caption =
    `Auto Backup ${config.bot?.name || "Yalena-AI"}\n` +
    `Waktu: ${timeHelper.formatDateTime("DD MMMM YYYY HH:mm:ss")} WIB\n` +
    `Ukuran: ${sizeInMB} MB\n` +
    `File: ${backupInfo.fileCount}\n` +
    `Backup ke-${state.backupCount + 1}`;
  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("caption", caption);
  form.append("document", fs.createReadStream(backupInfo.path), {
    filename: path.basename(backupInfo.path),
    contentType: "application/zip",
  });

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendDocument`,
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 120_000,
      },
    );
    if (!response.data?.ok) {
      throw new Error(response.data?.description || "Telegram menolak file backup.");
    }
  } catch (error) {
    const detail = String(
      error.response?.data?.description ||
      error.message ||
      "Kesalahan tidak diketahui",
    );
    const safeDetail = botToken ? detail.replaceAll(botToken, "[redacted]") : detail;
    logger.error("AutoBackup", `Telegram upload failed: ${safeDetail}`);
    throw new Error(`Pengiriman backup ke Telegram gagal: ${safeDetail}`);
  }

  state.lastBackup = new Date().toISOString();
  state.backupCount++;
  saveBackupState(state);
  try {
    await fs.promises.unlink(backupInfo.path);
  } catch (error) {
    logger.warn("AutoBackup", `Backup cleanup failed: ${error.message}`);
  }
  logger.success("AutoBackup", `Backup sent to Telegram (${sizeInMB} MB)`);
}

async function doBackup() {
  logger.info("AutoBackup", "Starting backup...");
  const backupInfo = await createBackup();
  try {
    await sendBackupToTelegram(backupInfo);
  } catch (error) {
    try {
      await fs.promises.unlink(backupInfo.path);
    } catch (cleanupError) {
      if (cleanupError.code !== "ENOENT") {
        logger.warn("AutoBackup", `Backup cleanup failed: ${cleanupError.message}`);
      }
    }
    throw error;
  }
}

function startAutoBackup() {
  const state = loadBackupState();

  if (!state.enabled) {
    logger.info("AutoBackup", "Auto backup is disabled");
    return;
  }
  if (!isTelegramBackupConfigured()) {
    logger.error(
      "AutoBackup",
      "Telegram backup is enabled but TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing",
    );
    return;
  }

  stopAutoBackup();

  const cronExp = intervalToCron(state.intervalMs);
  activeCronJob = new CronJob(
    cronExp,
    async () => {
      try {
        await doBackup();
      } catch (error) {
        logger.error("AutoBackup", `Backup failed: ${error.message}`);
      }
    },
    null,
    true,
    "Asia/Jakarta",
  );
  logger.info(
    "AutoBackup",
    `Started with interval: ${formatInterval(state.intervalMs)} (cron: ${cronExp})`,
  );
}

function stopAutoBackup() {
  if (activeCronJob) {
    activeCronJob.stop();
    activeCronJob = null;
    logger.info("AutoBackup", "Stopped");
  }
}

function enableAutoBackup(intervalStr) {
  const parsed = parseInterval(intervalStr);
  if (!parsed) {
    return {
      success: false,
      error: "Format interval tidak valid. Contoh: 5m, 1h, 2d",
    };
  }

  const state = loadBackupState();
  state.enabled = true;
  state.intervalMs = parsed.ms;
  state.intervalStr = parsed.str;
  saveBackupState(state);

  stopAutoBackup();
  startAutoBackup();

  return {
    success: true,
    interval: formatInterval(parsed.ms),
    intervalStr: parsed.str,
  };
}

function disableAutoBackup() {
  const state = loadBackupState();
  state.enabled = false;
  saveBackupState(state);
  stopAutoBackup();
  return { success: true };
}

function getBackupStatus() {
  const state = loadBackupState();
  return {
    enabled: state.enabled,
    interval: formatInterval(state.intervalMs),
    intervalStr: state.intervalStr,
    lastBackup: state.lastBackup,
    backupCount: state.backupCount,
    isRunning: activeCronJob !== null,
  };
}

async function triggerManualBackup() {
  await doBackup();
}

function initAutoBackup() {
  startAutoBackup();
}

export {
  initAutoBackup,
  startAutoBackup,
  stopAutoBackup,
  enableAutoBackup,
  disableAutoBackup,
  getBackupStatus,
  triggerManualBackup,
  createBackup,
  parseInterval,
  formatInterval,
  isTelegramBackupConfigured,
};
