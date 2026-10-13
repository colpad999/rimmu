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

import { getDatabase } from "../../src/lib/rimuru-database.js";
import config from "../../config.js";

function getRegistrationContextInfo() {
  const saluranId = config.saluran?.id || "120363412350560864@newsletter";
  const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

  return {
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: saluranId,
      newsletterName: saluranName,
      serverMessageId: 127,
    },
  };
}

function toDateKey(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRegistrationStats(db) {
  const users = Object.values(db.getAllUsers() || {});
  const todayKey = toDateKey(new Date());

  return {
    totalRegistered: users.filter((user) => user?.isRegistered).length,
    registeredToday: users.filter(
      (user) =>
        toDateKey(user?.lastRegisteredAt || user?.registeredAt) === todayKey,
    ).length,
    unregisteredToday: users.filter(
      (user) => toDateKey(user?.unregisteredAt) === todayKey,
    ).length,
    activeSessions: Object.keys(global.registrationSessions || {}).length,
  };
}

const pluginConfig = {
  name: "togglereg",
  category: "owner",
  description: "Kelola sistem wajib daftar dan statistik pendaftaran",
  usage: ".sistemdaftar <on/off/stats>",
  example: ".sistemdaftar stats",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,

  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const args = m.text?.trim() || "";
  const normalizedArgs = args.toLowerCase();

  const currentStatus =
    db.setting("registrationRequired") ?? config.registration?.enabled ?? false;
  const stats = getRegistrationStats(db);

  if (!normalizedArgs) {
    return m.reply(
      `⚙️ *sɪsᴛᴇᴍ ᴅᴀꜰᴛᴀʀ*\n\n` +
        `Status: ${currentStatus ? "✅ ON (Wajib Daftar)" : "❌ OFF"}\n\n` +
        `*Statistik:*\n` +
        `> Total registered: *${stats.totalRegistered}*\n` +
        `> Register hari ini: *${stats.registeredToday}*\n` +
        `> Unreg hari ini: *${stats.unregisteredToday}*\n` +
        `> Sesi aktif: *${stats.activeSessions}*\n\n` +
        `*Usage:*\n` +
        `> \`${m.prefix}sistemdaftar on\` - Wajibkan daftar\n` +
        `> \`${m.prefix}sistemdaftar off\` - Matikan wajib daftar\n` +
        `> \`${m.prefix}sistemdaftar stats\` - Lihat statistik\n\n` +
        `> Jika ON, user harus \`${m.prefix}daftar\` sebelum pakai command`,
    );
  }

  if (normalizedArgs === "stats") {
    await sock.sendMessage(
      m.chat,
      {
        text:
          `📊 *sᴛᴀᴛɪsᴛɪᴋ ᴅᴀꜰᴛᴀʀ*\n\n` +
          `Status sistem: ${currentStatus ? "✅ ON (Wajib Daftar)" : "❌ OFF"}\n\n` +
          `╭┈┈⬡「 📈 *sᴛᴀᴛs* 」\n` +
          `┃ Total registered: *${stats.totalRegistered}*\n` +
          `┃ Register hari ini: *${stats.registeredToday}*\n` +
          `┃ Unreg hari ini: *${stats.unregisteredToday}*\n` +
          `┃ Sesi aktif: *${stats.activeSessions}*\n` +
          `╰┈┈┈┈┈┈┈┈⬡`,
        contextInfo: getRegistrationContextInfo(),
      },
      { quoted: m },
    );

    await m.react("📊");
    return;
  }

  if (
    normalizedArgs === "on" ||
    normalizedArgs === "1" ||
    normalizedArgs === "true"
  ) {
    db.setting("registrationRequired", true);
    await db.save();

    await sock.sendMessage(
      m.chat,
      {
        text:
          `✅ *sɪsᴛᴇᴍ ᴅᴀꜰᴛᴀʀ ᴅɪᴀᴋᴛɪꜰᴋᴀɴ!*\n\n` +
          `User sekarang wajib daftar sebelum menggunakan command!\n\n` +
          `> Command: \`${m.prefix}daftar\``,
        contextInfo: getRegistrationContextInfo(),
      },
      { quoted: m },
    );

    await m.react("✅");
    return;
  }

  if (
    normalizedArgs === "off" ||
    normalizedArgs === "0" ||
    normalizedArgs === "false"
  ) {
    db.setting("registrationRequired", false);
    await db.save();

    await sock.sendMessage(
      m.chat,
      {
        text:
          `❌ *sɪsᴛᴇᴍ ᴅᴀꜰᴛᴀʀ ᴅɪɴᴏɴᴀᴋᴛɪꜰᴋᴀɴ!*\n\n` +
          `User tidak perlu daftar untuk menggunakan command.`,
        contextInfo: getRegistrationContextInfo(),
      },
      { quoted: m },
    );

    await m.react("❌");
    return;
  }

  return m.reply(
    `❌ Option tidak valid!\n\n> Gunakan: \`on\`, \`off\`, atau \`stats\``,
  );
}

export { pluginConfig as config, handler };
