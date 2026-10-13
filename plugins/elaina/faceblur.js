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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: ["blurface", "faceblur"],
  category: "elaina",
  description: "Memburamkan wajah pada gambar",
  usage: ".blurface (reply gambar)",
  example: ".blurface",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 20,
  energi: 2,
  isEnabled: true,
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36";

function getQuotedImage(m) {
  const q = m.quoted;
  const mime = q?.mimetype || q?.msg?.mimetype || "";
  return q && /^image\//i.test(mime) ? q : null;
}

async function getTask() {
  const { data: html } = await axios.get("https://www.iloveimg.com/blur-face", {
    timeout: 15000,
    headers: { "User-Agent": UA },
  });

  const token = html.match(/['"]token['"]\s*:\s*['"]([^'"]+)['"]/i)?.[1];
  const cfg = html.match(/var ilovepdfConfig\s*=\s*({.*?});/s)?.[1];
  if (!token || !cfg) throw new Error("Token iLoveIMG tidak ditemukan.");

  const parsed = JSON.parse(cfg);
  const servers = Array.isArray(parsed.servers) && parsed.servers.length ? parsed.servers : ["api1"];
  const server = servers[Math.floor(Math.random() * servers.length)];

  return {
    api: axios.create({
      baseURL: `https://${server}.iloveimg.com`,
      timeout: 60000,
      headers: { Authorization: `Bearer ${token}`, "User-Agent": UA },
    }),
    taskId: html.match(/taskId\s*=\s*['"]([^'"]+)['"]/i)?.[1] || `task_${Date.now()}`,
  };
}

async function blurFace(buffer) {
  const type = await fileTypeFromBuffer(buffer);
  if (!type?.mime?.startsWith("image/")) throw new Error("Format gambar tidak didukung.");

  const meta = await sharp(buffer).metadata();
  const fileName = `rimuru_${Date.now()}.${type.ext}`;

  const { api, taskId } = await getTask();

  const upload = new FormData();
  upload.append("name", fileName);
  upload.append("chunk", "0");
  upload.append("chunks", "1");
  upload.append("task", taskId);
  upload.append("preview", "1");
  upload.append("pdfinfo", "0");
  upload.append("pdfforms", "0");
  upload.append("pdfresetforms", "0");
  upload.append("v", "web.0");
  upload.append("file", buffer, { filename: fileName, contentType: type.mime });

  const uploaded = await api.post("/v1/upload", upload, {
    headers: upload.getHeaders(),
  });

  if (!uploaded.data?.server_filename) throw new Error("Upload gambar ke iLoveIMG gagal.");

  const process = new FormData();
  process.append("packaged_filename", "iloveimg-blurred");
  process.append("width", String(meta.width || 0));
  process.append("height", String(meta.height || 0));
  process.append("level", "recommended");
  process.append("mode", "include");
  process.append("task", taskId);
  process.append("tool", "blurfaceimage");
  process.append("files[0][server_filename]", uploaded.data.server_filename);
  process.append("files[0][filename]", fileName);

  await api.post("/v1/process", process, {
    headers: process.getHeaders(),
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const result = await api.get(`/v1/download/${taskId}`, {
    responseType: "arraybuffer",
    timeout: 120000,
  });

  return Buffer.from(result.data);
}

async function handler(m, { sock }) {
  const q = getQuotedImage(m);
  if (!q) return m.reply(`😶 Reply gambar terlebih dahulu.\n\nContoh: ${m.prefix}${m.command}`);

  await m.react("⏳");
  try {
    const buffer = await q.download();
    const output = await blurFace(buffer);
    await m.react("✅");
    return sock.sendMedia(m.chat, output, "✅ *BLUR FACE*\n\nWajah pada gambar berhasil diburamkan.", m, { type: "image" });
  } catch (error) {
    await m.react("❌");
    return m.reply(`❌ *Blur Face Error*\n\n${te(m.prefix, m.command, error?.message || "Gagal memproses gambar.")}`);
  }
}

export { pluginConfig as config, handler };
