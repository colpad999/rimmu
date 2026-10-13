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
const pluginConfig = {
  name: "exptocoin",
  category: "rpg",
  description: "Tukar EXP menjadi Koin",
  usage: ".buykoin <jumlah>",
  example: ".buykoin 10000",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

const EXP_PER_KOIN = 2;

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};

  const args = m.args || [];
  const amountStr = args[0];

  if (!amountStr) {
    let txt = `💱 *Buy Koin*\n\n`;
    txt += `> Tukar EXP menjadi Koin!\n\n`;
    txt += `*📊 Kurs:*\n`;
    txt += `> 💎 ${EXP_PER_KOIN} EXP = 1 Koin\n\n`;
    txt += `*📋 Saldo:*\n`;
    txt += `> 🚄 EXP: *${(user.exp || 0).toLocaleString("id-ID")}*\n`;
    txt += `> 💰 Koin: *${(user.koin || 0).toLocaleString("id-ID")}*\n\n`;
    txt += `> Contoh: \`.buykoin 10000\`\n`;
    txt += `> Akan menggunakan ${10000 * EXP_PER_KOIN} EXP untuk 10.000 Koin`;

    return m.reply(txt);
  }

  let koinAmount = 0;
  if (amountStr === "all" || amountStr === "max") {
    koinAmount = Math.floor((user.exp || 0) / EXP_PER_KOIN);
  } else {
    koinAmount = parseInt(amountStr);
  }

  if (!koinAmount || koinAmount <= 0) {
    return m.reply(`❌ Masukkan jumlah koin yang valid!`);
  }

  const expNeeded = koinAmount * EXP_PER_KOIN;

  if ((user.exp || 0) < expNeeded) {
    const maxPossible = Math.floor((user.exp || 0) / EXP_PER_KOIN);
    return m.reply(
      `❌ *EXP tidak cukup!*\n\n` +
        `> Dibutuhkan: *${expNeeded.toLocaleString("id-ID")} EXP*\n` +
        `> EXP kamu: *${(user.exp || 0).toLocaleString("id-ID")} EXP*\n\n` +
        `> Maksimal: *${maxPossible.toLocaleString("id-ID")} Koin*`,
    );
  }

  // Use manual user update instead of updateKoin/updateExp to do batch update
  // But since logic was db.setUser, let's stick to update logic here
  const newExp = (user.exp || 0) - expNeeded;
  const newKoin = (user.koin || 0) + koinAmount;

  db.setUser(m.sender, {
    exp: newExp,
    koin: newKoin,
  });

  await m.react("💱");

  let txt = `💱 *Tukar Berhasil!*\n\n`;
  txt += `*📋 Detail:*\n`;
  txt += `> 🚄 EXP: *-${expNeeded.toLocaleString("id-ID")}*\n`;
  txt += `> 💰 Koin: *+${koinAmount.toLocaleString("id-ID")}*\n\n`;
  txt += `*📊 Saldo Sekarang:*\n`;
  txt += `> 🚄 EXP: *${newExp.toLocaleString("id-ID")}*\n`;
  txt += `> 💰 Koin: *${newKoin.toLocaleString("id-ID")}*`;

  m.reply(txt);
}

export { pluginConfig as config, handler };
