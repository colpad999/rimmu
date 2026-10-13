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
import { sendRpgPreview } from "../../src/lib/rimuru-context.js";

const pluginConfig = {
  name: "dadu",
  category: "rpg",
  description: "Lempar dadu untuk gambling",
  usage: ".dice <1-6> <bet>",
  example: ".dice 6 5000",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 15,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  const args = m.args || [];
  const guess = parseInt(args[0]);
  const bet = parseInt(args[1]);

  if (!guess || guess < 1 || guess > 6) {
    return m.reply(
      `🎲 *Bandar Dadu Jalanan* 🎲\n\n` +
        `Tebak angka yang bakal keluar! (1-6)\n\n` +
        `*Cara Main:*\n` +
        `👉 \`.dice <angka> <taruhan>\`\n\n` +
        `*Contoh:*\n` +
        `👉 \`.dice 6 5000\``
    );
  }

  if (!bet || bet < 1000) {
    return m.reply(`Mana ada bandar nerima taruhan segitu! Minimal bawa *Rp 1.000* sini! 🎲`);
  }

  if ((user.koin || 0) < bet) {
    return m.reply(`Duit lu kurang bos! Di saku cuma ada *Rp ${(user.koin || 0).toLocaleString("id-ID")}*. Jangan ngutang di mari! 😤`);
  }

  user.koin -= bet;

  await sendRpgPreview(sock, m.chat, `🎲 Bandar mengocok dadu di dalam mangkok kayu... *krok krok krok*...`, "🎲 DADU JALANAN", "Rolling!", { quoted: m });
  await new Promise((r) => setTimeout(r, 2500));

  const result = Math.floor(Math.random() * 6) + 1;
  const diceEmoji = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][result - 1];

  const isWin = guess === result;

  let txt = `*MANGKOK DIBUKA!* 🎲💥\n\n`;
  txt += `Tebakan Lu: *${guess}*\n`;
  txt += `Mata Dadu: *${result}* ${diceEmoji}\n\n`;

  if (isWin) {
    const winnings = bet * 5;
    user.koin = (user.koin || 0) + winnings;
    txt += `🎉 *GILA LU HOKI BANGET!*\n`;
    txt += `💰 Uang Berlipat 5x: *+Rp ${winnings.toLocaleString("id-ID")}*`;
  } else {
    txt += `🤣 *HAHAHA MAMPUS LU SALAH!*\n`;
    txt += `💸 Duit Lu Ditarik Bandar: *-Rp ${bet.toLocaleString("id-ID")}*`;
  }

  db.save();
  await sendRpgPreview(sock, m.chat, txt, "🎲 HASIL DADU", "Result!", { quoted: m });
}

export { pluginConfig as config, handler };
