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
import { calculateLevel, getRole } from "../user/level.js";

const EXP_PER_LEVEL = 10000;

const pluginConfig = {
  name: "dellvl",
  category: "owner",
  description: "Kurangi level user (via exp)",
  usage: ".dellevel <jumlah> @user",
  example: ".dellevel 5 @user",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

function extractTarget(m) {
  if (m.quoted) return m.quoted.sender;
  if (m.mentionedJid?.length) return m.mentionedJid[0];
  return null;
}

async function handler(m, { sock }) {
  const db = getDatabase();
  const args = m.args;

  const numArg = args.find((a) => !isNaN(a) && !a.startsWith("@"));
  let levels = parseInt(numArg) || 0;

  let targetJid = await extractTarget(m);

  if (!targetJid && levels > 0) {
    targetJid = m.sender;
  }

  if (!targetJid || levels <= 0) {
    return m.reply(
      `📊 *ᴅᴇʟ ʟᴇᴠᴇʟ*\n\n` +
        `╭┈┈⬡「 📋 *ᴜsᴀɢᴇ* 」\n` +
        `┃ > \`.dellevel <jumlah>\` - ke diri sendiri\n` +
        `┃ > \`.dellevel <jumlah> @user\` - ke orang lain\n` +
        `╰┈┈┈┈┈┈┈┈⬡\n\n` +
        `> Contoh: \`${m.prefix}dellevel 5\``,
    );
  }

  const user = db.getUser(targetJid) || db.setUser(targetJid);

  const oldLevel = calculateLevel(user.exp || 0);
  const expToRemove = levels * EXP_PER_LEVEL;
  user.exp = Math.max(0, (user.exp || 0) - expToRemove);
  const newLevel = calculateLevel(user.exp);

  db.save();
  await m.react("✅");

  await m.reply(
    `✅ *ʟᴇᴠᴇʟ ᴅɪᴋᴜʀᴀɴɢɪ*\n\n` +
      `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
      `┃ 👤 User: @${targetJid.split("@")[0]}\n` +
      `┃ ➖ Kurang: *-${levels} Level*\n` +
      `┃ 🚄 Exp Removed: *-${expToRemove.toLocaleString("id-ID")}*\n` +
      `┃ 📊 Level: *${oldLevel} → ${newLevel}*\n` +
      `┃ ${getRole(newLevel)}\n` +
      `╰┈┈┈┈┈┈┈┈⬡`,
    { mentions: [targetJid] },
  );
}

export { pluginConfig as config, handler };
