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

import { getDatabase } from '../../src/lib/rimuru-database.js'
import { hasAccessToServer, VALID_SERVERS } from '../../src/lib/rimuru-roles-cpanel.js'
import * as timeHelper from '../../src/lib/rimuru-time.js'
const DEFAULT_JEDA = 5 * 60 * 1000;

const pluginConfig = {
  name: "jedastatus",
  category: "panel",
  description: "Cek status jeda panel create",
  usage: ".cekjeda",
  example: ".cekjeda",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

function formatTime(ms) {
  if (ms <= 0) return "0 detik";

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0)
    return `${hours} jam ${minutes % 60} menit ${seconds % 60} detik`;
  if (minutes > 0) return `${minutes} menit ${seconds % 60} detik`;
  return `${seconds} detik`;
}

function handler(m, { sock }) {
  const hasAccess = VALID_SERVERS.some((server) =>
    hasAccessToServer(m.sender, server, m.isOwner),
  );

  if (!hasAccess && !m.isOwner) {
    return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Kamu tidak memiliki akses ke CPanel!`);
  }

  const db = getDatabase();
  const jedaMs = db.setting("panelCreateJeda") ?? DEFAULT_JEDA;
  const lastUsed = db.setting("panelCreateLastUsed") || 0;
  const now = Date.now();
  const elapsed = now - lastUsed;
  const remaining = Math.max(0, jedaMs - elapsed);

  let status = "✅ *READY*";
  let statusDesc = "Bisa create panel sekarang!";

  if (jedaMs === 0) {
    status = "⚡ *NO JEDA*";
    statusDesc = "Jeda dinonaktifkan, bebas create!";
  } else if (remaining > 0) {
    status = "🕕 *COOLDOWN*";
    statusDesc = `Tunggu ${formatTime(remaining)} lagi`;
  }

  let text = `⏱️ *sᴛᴀᴛᴜs ᴊᴇᴅᴀ ᴘᴀɴᴇʟ*\n\n`;
  text += `╭┈┈⬡「 📊 *sᴛᴀᴛᴜs* 」\n`;
  text += `┃ ${status}\n`;
  text += `┃ ${statusDesc}\n`;
  text += `╰┈┈⬡\n\n`;

  text += `╭┈┈⬡「 ⚙️ *ᴋᴏɴꜰɪɢ* 」\n`;
  text += `┃ ◦ Jeda: *${jedaMs === 0 ? "OFF" : formatTime(jedaMs)}*\n`;
  text += `┃ ◦ Default: *5 menit*\n`;

  if (lastUsed > 0) {
    const lastUsedTime = timeHelper.fromTimestamp(lastUsed, "HH:mm:ss");
    text += `┃ ◦ Last create: *${lastUsedTime}*\n`;
  }

  if (remaining > 0) {
    text += `┃ ◦ Sisa: *${formatTime(remaining)}*\n`;
  }

  text += `╰┈┈⬡\n\n`;

  if (m.isOwner) {
    text += `> _Owner: gunakan \`${m.prefix}jedacreate\` untuk setting_`;
  }

  return m.reply(text);
}

export { pluginConfig as config, handler }