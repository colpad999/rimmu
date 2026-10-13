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

import { UnlimitedAI } from '../../src/scraper/unlimitedai.js';
import te from '../../src/lib/rimuru-error.js';

const pluginConfig = {
  name: "monkeydluffy",
  category: "ai",
  description: "Chat dengan Monkey D. Luffy — Calon Raja Bajak Laut dari Topi Jerami! 🏴‍☠️",
  usage: ".luffyai <pertanyaan>",
  example: ".luffyai Halo Luffy!",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");
  if (!text) {
    return m.reply(
      `🏴‍☠️ *ᴍᴏɴᴋᴇʏ ᴅ. ʟᴜꜰꜰʏ* 🏴‍☠️\n\n` +
      `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
      `┃ 👒 *Monkey D. Luffy*\n` +
      `┃\n` +
      `┃ > Kapten Bajak Laut Topi Jerami\n` +
      `┃ > Manusia Karet pemakan buah Gomu Gomu\n` +
      `┃ > Suka bilang "Shishishi!" kalau tertawa\n` +
      `┃ > Suka banget makan daging! 🍖\n` +
      `┃ > Impian: jadi Raja Bajak Laut 👑\n` +
      `┃\n` +
      `┃ ✦ *Cara Pakai*\n` +
      `┃\n` +
      `┃   ${m.prefix}luffyai <pertanyaan>\n` +
      `┃\n` +
      `┃ ✦ *Contoh*\n` +
      `┃\n` +
      `┃   ${m.prefix}luffyai Halo Luffy!\n` +
      `┃   ${m.prefix}luffyai Mau makan daging?\n` +
      `┃\n` +
      `┃ 💗 *Rimuru:* Mau ngobrol sama Luffy darling~?\n` +
      `╰━━━━━━━━━━━━━━━━━━━━━⬣`
    );
  }

  await m.react("🍖");

  try {
    const result = await UnlimitedAI(text, "luffy-ai");

    if (!result.status) {
      await m.react("💔");
      return m.reply(
        `💔 *ʟᴜꜰꜰʏ ᴀɪ ᴇʀʀᴏʀ*\n\n` +
        `> ${result.error || "Gagal mendapatkan respons darling~"}\n\n` +
        `> Coba lagi ya 🥺`
      );
    }

    await m.react("✅");
    const reply = result.answer;
    await m.reply(reply.length > 4096 ? reply.slice(0, 4096) + "..." : reply);
  } catch (e) {
    console.error(e);
    await m.react("💔");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}
export { pluginConfig as config, handler };