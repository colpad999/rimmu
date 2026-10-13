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
  name: "kangparkir",
  category: "rpg",
  description: "Jadi tukang parkir minimarket, waspada satpol PP!",
  usage: ".parkir",
  example: ".parkir",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 120,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  
  const staminaCost = 12;
  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`Kaki pegel kebanyakan berdiri! 😫\n\nMarkir butuh *${staminaCost} Stamina*, sisa stamina kamu *${user.rpg.stamina}*. Istirahat dulu di pos! 🏚️`);
  }

  user.rpg.stamina -= staminaCost;
  await m.react("🅿️");
  await m.reply(`Priiiit! Terus, terus, bales kiri dikit! 🏁\nMulai narik duit parkir di minimarket... 💰`);
  await new Promise(r => setTimeout(r, 3000));

  const gacha = Math.random();

  if (gacha < 0.1) {
    const denda = Math.floor(Math.random() * 5000) + 1000;
    user.koin = Math.max(0, (user.koin || 0) - denda);
    await m.react("🚨");
    return m.reply(`WADUH ADA RAZIA SATPOL PP! 🚓💨\n\nKamu lari terbirit-birit dan duit recehanmu jatuh senilai *Rp ${denda.toLocaleString("id-ID")}*!\n⚡ Stamina: -${staminaCost}\n\nApes banget hari ini! 😭`);
  } else if (gacha > 0.9) {
    const jackpot = Math.floor(Math.random() * 50000) + 20000;
    user.koin = (user.koin || 0) + jackpot;
    const expGain = Math.floor(jackpot / 20);
    await addExpWithLevelCheck(sock, m, db, user, expGain);
    await m.react("🤑");
    return m.reply(`JACKPOT! ADA MOBIL SPORT SULTAN! 🏎️✨\n\nPas mau keluar, kaca mobil turun dan sultan ngasih pecahan 100k!\n💵 Pendapatan: *+Rp ${jackpot.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nAlhamdulillah rejeki anak soleh! 🙏`);
  }

  const earning = Math.floor(Math.random() * 8000) + 2000;
  user.koin = (user.koin || 0) + earning;
  const expGain = Math.floor(earning / 20);
  await addExpWithLevelCheck(sock, m, db, user, expGain);

  await m.react("✅");
  m.reply(`HASIL MARKIR HARI INI! 🅿️✨\n\n💵 Pendapatan: *+Rp ${earning.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nReceh demi receh lama-lama jadi bukit! 💪`);
}

export { pluginConfig as config, handler };
