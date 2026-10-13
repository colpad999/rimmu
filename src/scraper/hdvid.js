/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

🪽 𝑵𝒐𝒕𝒆 :
Rimuru MD adalah SC hasil rename dari SC Ourin MD.

╭─────────────「 🜲 𝑰𝑵𝑭𝑶 𝑶𝑼𝑹𝑰𝑵 」─────────────╮
│ 👤 Developer : 𝑯𝒚𝒖𝒖 / 𝒁𝒂𝒏𝒏
│ 🎵 TikTok    : https://tiktok.com/@ourinmd
│ 📢 WhatsApp  : https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t
╰─────────────────────────────────────────────╯

╭────────────「 ✦ 𝑰𝑵𝑭𝑶 𝑹𝑰𝑴𝑼𝑹𝑼 ✦ 」────────────╮
│ 👤 Developer Pihak Ketiga : 𝑨𝒏𝒊𝒕𝒂 𝑷𝒖𝒕𝒓𝒊 𝑨𝒛𝒛𝒂𝒉𝒓𝒂
│ 🎵 TikTok                 : https://tiktok.com/@anita.putri.azzah1
│ 📸 Instagram              : anit_aputriazzahrah
│ 📢 Saluran                : https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P
│ ▶️ YouTube                : https://youtube.com/@rimurumd
╰─────────────────────────────────────────────╯

        ⚠️ 𝑫𝑶 𝑵𝑶𝑻 𝑹𝑬𝑴𝑶𝑽𝑬 𝑪𝑹𝑬𝑫𝑰𝑻 ⚠️
              ❖ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐡𝐚𝐩𝐮𝐬 𝐜𝐫𝐞𝐝𝐢𝐭 ❖

                 「 👑 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 👑 」
*/

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";

const API_URL = "https://fgsi.dpdns.org/api/tools/enchantVideo";
const DEFAULT_API_KEY = "fgsiapi-20c1605c-6d";
const PENDING_STATUSES = new Set([
  "pending",
  "processing",
  "queued",
  "running",
]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createEnhanceTask(filePath, apiKey = DEFAULT_API_KEY) {
  if (!fs.existsSync(filePath)) throw new Error("file not found");

  const form = new FormData();
  form.append("file", fs.createReadStream(filePath), path.basename(filePath));

  const response = await axios.post(API_URL, form, {
    headers: {
      ...form.getHeaders(),
      "Content-Type": "multipart/form-data",
      apikey: apiKey,
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    timeout: 120000,
  });

  const payload = response.data;

  if (!payload?.status || !payload?.data?.pollUrl) {
    throw new Error(payload?.message || "Gagal membuat task HD video");
  }

  return {
    taskId: payload.data.taskId,
    createdAt: payload.data.createdAt,
    pollUrl: payload.data.pollUrl,
  };
}

async function pollEnhanceTask(
  pollUrl,
  {
    apiKey = DEFAULT_API_KEY,
    pollIntervalMs = 3000,
    timeoutMs = 10 * 60 * 1000,
    maxTransientErrors = 5,
  } = {},
) {
  const startedAt = Date.now();
  let transientErrors = 0;
  let lastPayload = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await axios.get(pollUrl, {
        headers: { apikey: apiKey },
        timeout: 30000,
      });

      const payload = response.data;
      const status = String(payload?.data?.status || "").trim();
      const normalizedStatus = status.toLowerCase();
      lastPayload = payload;
      transientErrors = 0;

      if (normalizedStatus === "success") {
        const result = payload?.data?.result;
        if (!result?.res_url) {
          throw new Error("HD video selesai tetapi url hasil tidak ditemukan");
        }

        return {
          taskId: payload?.data?.taskId,
          createdAt: payload?.data?.createdAt,
          ...result,
        };
      }

      if (
        ["failed", "error", "cancelled", "canceled"].includes(normalizedStatus)
      ) {
        const terminalError = new Error(
          payload?.message ||
            payload?.data?.message ||
            `HD video gagal dengan status ${status}`,
        );
        terminalError.isTerminal = true;
        throw terminalError;
      }

      if (!payload?.status && !PENDING_STATUSES.has(normalizedStatus)) {
        const terminalError = new Error(
          payload?.message || "Polling HD video gagal",
        );
        terminalError.isTerminal = true;
        throw terminalError;
      }
    } catch (error) {
      if (error?.isTerminal) {
        throw error;
      }
      transientErrors += 1;
      if (transientErrors >= maxTransientErrors) {
        throw new Error(
          error?.response?.data?.message ||
            error?.message ||
            "Polling HD video gagal",
        );
      }
    }

    await delay(pollIntervalMs);
  }

  throw new Error(lastPayload?.message || "Timeout menunggu hasil HD video");
}

async function videoenhancer(
  video,
  {
    filename,
    apiKey = DEFAULT_API_KEY,
    pollIntervalMs = 3000,
    timeoutMs = 10 * 60 * 1000,
  } = {},
) {
  if (!video) throw new Error("video is required");

  const safeName =
    filename ||
    `hdvid-${crypto.randomUUID?.() || crypto.randomBytes(16).toString("hex")}.mp4`;
  const filePath = Buffer.isBuffer(video)
    ? path.join(os.tmpdir(), safeName)
    : video;
  const shouldCleanup = Buffer.isBuffer(video);

  if (shouldCleanup) {
    await fs.promises.writeFile(filePath, video);
  }

  try {
    const task = await createEnhanceTask(filePath, apiKey);
    const result = await pollEnhanceTask(task.pollUrl, {
      apiKey,
      pollIntervalMs,
      timeoutMs,
    });

    return {
      taskId: task.taskId,
      pollUrl: task.pollUrl,
      createdAt: task.createdAt,
      ...result,
      resultUrl: result.res_url,
    };
  } finally {
    if (shouldCleanup) {
      try {
        await fs.promises.unlink(filePath);
      } catch {}
    }
  }
}

export default videoenhancer;
export { createEnhanceTask, pollEnhanceTask };
