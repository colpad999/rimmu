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
import { addExpWithLevelCheck } from "../../src/lib/rimuru-level.js";
const pluginConfig = {
  name: "beg",
  category: "rpg",
  description: "Mengemis untuk mendapatkan uang receh",
  usage: ".beg",
  example: ".beg",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 60,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};

  await m.reply("🙏 *sᴇᴅᴀɴɢ ᴍᴇɴɢᴇᴍɪs...*");
  await new Promise((r) => setTimeout(r, 2000));

  const responses = [
    { success: true, money: 500, exp: 10, msg: "Seorang dermawan memberikanmu uang!" },
    { success: true, money: 1000, exp: 20, msg: "Kamu dapat tips dari orang baik!" },
    { success: true, money: 2000, exp: 50, msg: "WOW! Ada sultan yang kasihan!" },
    { success: false, money: 0, exp: 0, msg: "Tidak ada yang peduli..." },
    { success: false, money: 0, exp: 0, msg: "Orang-orang mengabaikanmu..." },
    { success: true, money: 100, exp: 5, msg: "Dapat receh dari kantong orang!" },
    { success: false, money: -500, exp: 0, msg: "Kamu malah dirampok pengemis lain!" },
  ];

  const result = responses[Math.floor(Math.random() * responses.length)];

  if (result.money > 0) {
    user.koin = (user.koin || 0) + result.money;
    if (result.exp > 0) {
      await addExpWithLevelCheck(sock, m, db, user, result.exp);
    }
  } else if (result.money < 0) {
    user.koin = Math.max(0, (user.koin || 0) + result.money);
  }

  db.save();

  let txt = "";
  if (result.success && result.money > 0) {
    txt = `🙏 *ɴɢᴇᴍɪs sᴜᴋsᴇs*\n\n> ${result.msg}\n> 💰 Dapat: *+Rp ${result.money.toLocaleString("id-ID")}*`;
    if (result.exp > 0) txt += `\n> 🚄 Exp: *+${result.exp}*`;
  } else if (result.money < 0) {
    txt = `😭 *ɴɢᴇᴍɪs ɢᴀɢᴀʟ*\n\n> ${result.msg}\n> 💸 Lost: *Rp ${Math.abs(result.money).toLocaleString("id-ID")}*`;
  } else {
    txt = `😢 *ɴɢᴇᴍɪs ɢᴀɢᴀʟ*\n\n> ${result.msg}`;
  }

  await m.reply(txt);
}

export { pluginConfig as config, handler };
