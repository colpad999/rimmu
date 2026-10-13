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
  name: "tantangan",
  category: "rpg",
  description: "Daily challenge untuk hadiah spesial",
  usage: ".challenge",
  example: ".challenge",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

const CHALLENGES = [
  { name: "⚔️ Kalahkan 5 Monster", type: "kill", target: 5, reward: { gold: 500, exp: 200 } },
  { name: "🎣 Tangkap 3 Ikan", type: "fish", target: 3, reward: { gold: 300, exp: 150 } },
  { name: "⛏️ Tambang 10 Ore", type: "mine", target: 10, reward: { gold: 400, exp: 180 } },
  { name: "🌱 Panen 5 Hasil Kebun", type: "harvest", target: 5, reward: { gold: 350, exp: 160 } },
  { name: "🧪 Racik 3 Potion", type: "craft", target: 3, reward: { gold: 450, exp: 190 } },
  { name: "💰 Kumpulkan 1000 Koin", type: "earn", target: 1000, reward: { gold: 500, exp: 250 } },
  { name: "🗺️ Selesaikan 2 Ekspedisi", type: "expedition", target: 2, reward: { gold: 600, exp: 300 } },
];

function getNewDailyChallenge() {
  return {
    ...CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)],
    progress: 0,
    date: new Date().toDateString(),
    claimed: false,
  };
}

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};

  const today = new Date().toDateString();

  if (!user.rpg.dailyChallenge || user.rpg.dailyChallenge.date !== today) {
    user.rpg.dailyChallenge = getNewDailyChallenge();
    db.save();
  }

  const challenge = user.rpg.dailyChallenge;
  const isComplete = challenge.progress >= challenge.target;

  const args = m.args || [];
  const action = args[0]?.toLowerCase();

  if (action === "claim") {
    if (!isComplete) {
      return m.reply(`❌ Tantangannya belum selesai nih kak!\nProgress kamu baru: *${challenge.progress}/${challenge.target}*`);
    }

    if (challenge.claimed) {
      return m.reply(`Wah kak, hadiah untuk hari ini udah diambil! Tunggu tantangan baru besok ya! 😉`);
    }

    user.koin = (user.koin || 0) + challenge.reward.gold;
    await addExpWithLevelCheck(sock, m, db, user, challenge.reward.exp);

    challenge.claimed = true;
    db.save();

    await m.react("🎉");
    return m.reply(
      `🎉 *TANTANGAN HARIAN SELESAI!!* 🎉\n\n` +
        `Kerja bagus kak! Ini hadiah dari Guild buat kamu:\n` +
        `💰 Koin: *+Rp ${challenge.reward.gold.toLocaleString()}*\n` +
        `✨ EXP: *+${challenge.reward.exp}*\n` +
        `\n\n` +
        `> _Tantangan baru akan diberikan besok pagi!_`
    );
  }

  let txt = `📋 *TANTANGAN HARIAN GUILD* 📋\n\n`;
  txt += `Selesaikan tugas khusus hari ini untuk dapet uang jajan tambahan kak!\n\n`;
  
  txt += `*Tugas Kamu Hari Ini:*\n`;
  txt += `🎯 *${challenge.name}*\n`;
  txt += `📊 Progress: *${challenge.progress}/${challenge.target}*\n`;
  txt += `Status: ${isComplete ? "✅ *BISA DICLAIM!*" : "⏳ _Sedang dikerjakan..._"}\n\n`;

  txt += `*🎁 Hadiah Tambahan:*\n`;
  txt += `💰 Koin: *Rp ${challenge.reward.gold.toLocaleString()}*\n`;
  txt += `✨ EXP: *${challenge.reward.exp}*\n\n`;

  if (isComplete && !challenge.claimed) {
    txt += `> 💡 Yuk buruan ketik \`${m.prefix}challenge claim\` untuk klaim hadiahnya kak!`;
  } else if (challenge.claimed) {
    txt += `> ✅ Kamu hebat! Hadiah sudah diambil. Besok ada misi baru lagi ya!`;
  } else {
    txt += `> Semangat kerjainnya kak! Kalau udah selesai nanti ambil hadiahnya.`;
  }

  return m.reply(txt);
}

export { pluginConfig as config, handler };
