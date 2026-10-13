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

import crypto from "crypto";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "videotranscribe",
  category: "tools",
  description: "Transkrip video dari URL menjadi teks (YouTube, mp4, dll)",
  usage: ".video-transcribe <url> [lang]",
  example: ".video-transcribe https://youtu.be/dQw4w9WgXcQ\n.video-transcribe https://youtu.be/dQw4w9WgXcQ id",
  cooldown: 30,
  energi: 2,
  isEnabled: true,
};

const ENDPOINT = "https://api.proactor.ai:7788/v1/tourists/files/transcription";
const DEFAULT_LANG = "en";

const HEADERS = {
  accept: "application/json, text/plain, */*",
  "content-type": "application/json",
  origin: "https://videotranscriber.ai",
  referer: "https://videotranscriber.ai/",
  "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36",
};

function makeTrackId() {
  return `${crypto.randomUUID()}_${Date.now()}`;
}

function msToTime(ms = 0) {
  const total = Math.floor(Number(ms) / 1000);
  const minute = Math.floor(total / 60);
  const second = total % 60;
  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

function joinTranscript(items = []) {
  return items
    .map((item) => item?.text || "")
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanResult(input, json) {
  const data = Array.isArray(json?.data) ? json.data : [];
  if (json?.code !== 200 || data.length === 0) {
    return {
      status: false,
      code: json?.code || 500,
      message: json?.msg || json?.message || "Transcript tidak ditemukan",
    };
  }
  const title = data.find((item) => item?.videoTitle)?.videoTitle || "No title";
  const segments = data.map((item, index) => ({
    index: index + 1,
    startMs: item?.duration ?? null,
    start: msToTime(item?.duration || 0),
    text: item?.text || "",
  }));
  return {
    status: true,
    title,
    total: segments.length,
    transcript: joinTranscript(data),
    segments,
  };
}

async function transcriber(url, language = DEFAULT_LANG) {
  if (!url || !/^https?:\/\//i.test(String(url))) {
    throw new Error("URL kosong / tidak valid");
  }
  const body = {
    track_id: makeTrackId(),
    fileUrl: url,
    language: language,
  };
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Response bukan JSON: " + text.slice(0, 200));
  }
  const result = cleanResult(url, json);
  if (!result.status) throw new Error(result.message);
  return result;
}

async function handler(m, { args }) {
  const url = args[0];
  const lang = args[1] || DEFAULT_LANG;

  if (!url) {
    return m.reply(
      `*📝 VIDEO TRANSCRIBE*\n\n\`\`\`${m.prefix}video-transcribe <url_video> [bahasa]\`\`\`\n\nContoh:\n\`${m.prefix}video-transcribe https://youtu.be/... id\``
    );
  }

  m.react("🕕");

  try {
    const result = await transcriber(url, lang);
    
    let info = `📝 *VIDEO TRANSCRIBE*\n\n`;
    info += `*🎬 Title:* ${result.title}\n`;
    info += `*🗣️ Language:* ${lang.toUpperCase()}\n`;
    info += `*🔢 Segments:* ${result.total}\n\n`;
    info += `*📜 Transcript:*\n${result.transcript.substring(0, 2500)}`;
    
    if (result.transcript.length > 2500) {
      info += `... (teks terlalu panjang)`;
    }

    m.react("✅");
    await m.reply(info);
  } catch (err) {
    console.error("[VideoTranscribe]", err.message);
    m.react("☢");
    m.reply(`❌ *Gagal:* ${err.message || "Gagal memproses video"}`);
  }
}

export { pluginConfig as config, handler };
