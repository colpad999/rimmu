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

import os from "os";
import fs from "fs";

const pluginConfig = {
  name: "serverinfo",
  category: "tools",
  description: "Menampilkan statistik performa server bot",
  usage: ".speedbot",
  example: ".speedbot",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = Number(bytes) || 0;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index++;
  }
  return `${value.toFixed(index ? 2 : 0)} ${units[index]}`;
}

function runtime(seconds) {
  seconds = Math.floor(seconds);
  const d = Math.floor(seconds / 86400);
  seconds %= 86400;
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}

async function handler(m) {
  const start = performance.now();
  const cpus = os.cpus();
  const memory = process.memoryUsage();
  let disk = null;

  try {
    if (typeof fs.statfsSync === "function") {
      const stat = fs.statfsSync(process.cwd());
      const total = stat.blocks * stat.bsize;
      const free = stat.bavail * stat.bsize;
      disk = { total, free, used: Math.max(0, total - free) };
    }
  } catch {}

  const ping = performance.now() - start;
  const load = os.loadavg?.() || [0, 0, 0];

  let text =
    `⚡ *RIMURU SERVER STATUS*\n\n` +
    `🏓 Ping: *${ping.toFixed(2)} ms*\n` +
    `⏱️ Uptime: *${runtime(process.uptime())}*\n` +
    `🖥️ OS: *${os.type()} ${os.release()}*\n` +
    `🧠 CPU: *${cpus.length} core — ${cpus[0]?.model?.trim() || "Unknown"}*\n` +
    `📊 Load: *${load.map((n) => n.toFixed(2)).join(" / ")}*\n\n` +
    `💾 *RAM*\n` +
    `• Total: ${formatBytes(os.totalmem())}\n` +
    `• Free: ${formatBytes(os.freemem())}\n` +
    `• Bot RSS: ${formatBytes(memory.rss)}\n`;

  if (disk) {
    text +=
      `\n💿 *DISK*\n` +
      `• Total: ${formatBytes(disk.total)}\n` +
      `• Used: ${formatBytes(disk.used)}\n` +
      `• Free: ${formatBytes(disk.free)}\n`;
  }

  return m.reply(text.trim());
}

export { pluginConfig as config, handler };
