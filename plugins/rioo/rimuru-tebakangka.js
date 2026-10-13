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

import { getDatabase, randomInt } from "../../src/lib/rimuru-rioo-bridge.js";

const pluginConfig = {
  name: "rimuru-tebakangka",
  category: "game",
  description: "Tebak angka 1-100 dari Rimuru",
  usage: ".tebakangka <angka>",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m) {
  const guess = Number(m.args[0]);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    return m.reply(`Masukkan angka 1-100.\nContoh: ${m.prefix}tebakangka 50`);
  }

  const db = getDatabase();
  const number = randomInt(1, 100);
  const bonusExp = randomInt(0, 99);
  const bonusMoney = randomInt(0, 999);
  const user = db.getUser(m.sender) || db.setUser(m.sender, {});

  if (guess === number) {
    if (user) {
      user.exp = Number(user.exp || 0) + bonusExp;
      user.money = Number(user.money || 0) + bonusMoney;
      user.riooTebakAngkaWin = Number(user.riooTebakAngkaWin || 0) + 1;
    }
    return m.reply(`🎉 *Selamat, tebakanmu benar!*\n\n+${bonusExp} XP\n+Rp${bonusMoney}`);
  }

  if (user) user.riooTebakAngkaLose = Number(user.riooTebakAngkaLose || 0) + 1;
  return m.reply(`❌ *Kamu kalah.*\nAngka yang benar adalah *${number}*.`);
}

export { pluginConfig as config, handler };
