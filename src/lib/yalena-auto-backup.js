//

import fs from "fs";
import path from "path";
import { Transform } from "stream";
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
const EXCLUDED_BACKUP_DIRECTORIES = new Set([
  ".git",
  ".npm",
  ".cache",
  "backups",
  "node_modules",
  "temp",
]);
let activeCronJob = null;
const MAX_TELEGRAM_FILE_SIZE = 45 * 1024 * 1024;
const MAX_BACKUP_FILE_SIZE = 44 * 1024 * 1024;
const MAX_BACKUP_TOTAL_SIZE = 200 * 1024 * 1024;
const BACKUP_GROUP_SIZE = 35 * 1024 * 1024;

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
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  const rootDir = process.cwd();
  const sessionPath = path.resolve(
    rootDir,
    "storage",
    config.session?.folderName || "session",
  );
  const sessionRelativePath = path.relative(rootDir, sessionPath);
  const sessionIsInsideRoot =
    sessionRelativePath !== ".." &&
    !sessionRelativePath.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(sessionRelativePath);
  const files = [];

  async function isExcludedEntry(fullPath, entry) {
    const relativePath = path.relative(rootDir, fullPath);
    if (
      relativePath
        .split(path.sep)
        .some((part) => EXCLUDED_BACKUP_DIRECTORIES.has(part))
    ) {
      return true;
    }
    if (!entry.isSymbolicLink()) return false;

    const realPath = await fs.promises.realpath(fullPath);
    return path
      .relative(rootDir, realPath)
      .split(path.sep)
      .some((part) => EXCLUDED_BACKUP_DIRECTORIES.has(part));
  }

  async function collectDirectory(dirPath) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (path.resolve(fullPath) === sessionPath) continue;
      if (await isExcludedEntry(fullPath, entry)) continue;
      if (entry.isDirectory()) {
        await collectDirectory(fullPath);
      } else if (entry.isFile() || entry.isSymbolicLink()) {
        const stats = await fs.promises.stat(fullPath);
        files.push({
          path: fullPath,
          name: path.relative(rootDir, fullPath),
          size: stats.size,
        });
      }
    }
  }

  await collectDirectory(rootDir);
  if (
    sessionIsInsideRoot &&
    fs.existsSync(sessionPath) &&
    fs.statSync(sessionPath).isDirectory()
  ) {
    await collectDirectory(sessionPath);
  }

  const oversizedFile = files.find((file) => file.size > MAX_BACKUP_FILE_SIZE);
  if (oversizedFile) {
    const sizeInMB = (oversizedFile.size / (1024 * 1024)).toFixed(2);
    throw new Error(
      `Backup dibatalkan sebelum upload: ${oversizedFile.name} berukuran ${sizeInMB} MB dan terlalu besar untuk satu arsip Telegram.`,
    );
  }
  const totalSize = files.reduce((size, file) => size + file.size, 0);
  if (totalSize > MAX_BACKUP_TOTAL_SIZE) {
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    throw new Error(
      `Backup dibatalkan sebelum upload: total ukuran file ${sizeInMB} MB melebihi batas 200 MB.`,
    );
  }

  const groups = [];
  let currentGroup = { files: [], size: 0 };
  for (const file of files) {
    if (
      currentGroup.files.length > 0 &&
      currentGroup.size + file.size > BACKUP_GROUP_SIZE
    ) {
      groups.push(currentGroup);
      currentGroup = { files: [], size: 0 };
    }
    currentGroup.files.push(file);
    currentGroup.size += file.size;
  }
  if (currentGroup.files.length > 0 || groups.length === 0) {
    groups.push(currentGroup);
  }

  return {
    groups,
    filename: `backup_${process.pid}_${timestamp}`,
    fileCount: files.length,
    timestamp,
  };
}

function createArchiveStream(files) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  let size = 0;
  let streamError = null;
  const output = new Transform({
    transform(chunk, encoding, callback) {
      size += chunk.length;
      if (size > MAX_TELEGRAM_FILE_SIZE) {
        streamError = new Error("Ukuran arsip melebihi batas Telegram 50 MB.");
        callback(streamError);
        return;
      }
      callback(null, chunk);
    },
  });
  const fail = (error) => {
    archive.abort();
    if (!output.destroyed) output.destroy(error);
  };

  archive.on("error", fail);
  archive.on("warning", fail);
  output.on("error", () => archive.abort());
  archive.pipe(output);
  for (const file of files) {
    archive.file(file.path, { name: file.name });
  }
  archive.finalize();

  return {
    stream: output,
    get size() {
      return size;
    },
    get streamError() {
      return streamError;
    },
  };
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
  const state = loadBackupState();
  const timestamp = timeHelper.formatDateTime("DD MMMM YYYY HH:mm:ss");
  const files = backupInfo.groups.flatMap((group) => group.files);
  const archiveInfo = createArchiveStream(files);
  const uploadArchive = async () => {
    const caption =
      `Auto Backup ${config.bot?.name || "Yalena-AI"}\n` +
      `Waktu: ${timestamp}\n` +
      `File: ${backupInfo.fileCount}\n` +
      `Backup ke-${state.backupCount + 1}`;
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("caption", caption);
    form.append("document", archiveInfo.stream, {
      filename: `${backupInfo.filename}.zip`,
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
        archiveInfo.streamError?.message ||
        error.response?.data?.description ||
        error.message ||
        "Kesalahan tidak diketahui",
      );
      archiveInfo.stream.destroy();
      const safeDetail = botToken ? detail.replaceAll(botToken, "[redacted]") : detail;
      logger.error("AutoBackup", `Telegram upload failed: ${safeDetail}`);
      throw new Error(`Pengiriman satu file backup gagal: ${safeDetail}`);
    }
  };

  await uploadArchive();

  state.lastBackup = new Date().toISOString();
  state.backupCount++;
  saveBackupState(state);
  logger.success(
    "AutoBackup",
    "Backup sent to Telegram as one ZIP archive",
  );
}

async function doBackup() {
  logger.info("AutoBackup", "Starting backup...");
  const backupInfo = await createBackup();
  await sendBackupToTelegram(backupInfo);
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
