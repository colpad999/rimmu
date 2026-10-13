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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "botstats",
  category: "main",
  description: "Menampilkan statistik bot",
  usage: ".stats",
  example: ".stats",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

async function handler(m, { sock, db, uptime, config: botConfig }) {
  try {
    const users = db.db?.data?.users || {};
    const groups = db.db?.data?.groups || {};
    const memUsed = process.memoryUsage();
    const cpuUsage = os.loadavg()[0].toFixed(2);
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const totalUsers = Object.keys(users).length;
    const totalGroups = Object.keys(groups).length;
    const premiumUsers = Object.values(users).filter((u) => u.premium).length;

    const statsObj = {
      bot: botConfig?.bot?.name || "Rimuru-AI",
      version: `v${botConfig?.bot?.version || "1.0.0"}`,
      uptime: formatUptime(uptime),
      database: {
        users: totalUsers,
        premium: premiumUsers,
        groups: totalGroups,
      },
      system: {
        platform: `${os.platform()} ${os.arch()}`,
        node: process.version,
        cpuLoad: `${cpuUsage}%`,
        ram: `${formatBytes(usedMem)} / ${formatBytes(totalMem)}`,
        heap: `${formatBytes(memUsed.heapUsed)} / ${formatBytes(memUsed.heapTotal)}`,
      },
      updated: new Date().toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
      }),
    };

    const table = [
      "📊 Bot Statistics",
      "Key | Value",
      `Bot | ${statsObj.bot};;Version | ${statsObj.version};;Uptime | ${statsObj.uptime}`,
      `Users | ${statsObj.database.users};;Premium | ${statsObj.database.premium};;Groups | ${statsObj.database.groups}`,
      `Platform | ${statsObj.system.platform};;Node | ${statsObj.system.node};;CPU Load | ${statsObj.system.cpuLoad}`,
      `RAM | ${statsObj.system.ram};;Heap | ${statsObj.system.heap};;Updated | ${statsObj.updated}`,
    ];

    await sock.sendTableV2(m.chat, table, m, {
      title: "📊 Berikut ini adalah statistik dari bot kami",
      footer: botConfig?.bot?.name,
    });
  } catch (error) {
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
