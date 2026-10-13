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
  name: "koding",
  category: "rpg",
  description: "Mengerjakan project online klien bule",
  usage: ".freelance",
  example: ".freelance",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 200,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  
  const staminaCost = 25;
  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`Otak ngebul mikirin error! 🤯\n\nFreelance butuh *${staminaCost} Stamina*, sisa stamina kamu *${user.rpg.stamina}*. Refreshing dulu woi! 🌿`);
  }

  user.rpg.stamina -= staminaCost;
  await m.react("💻");
  await m.reply(`Ngetik kode / nggambar di laptop... ⌨️\nSemoga klien nggak minta revisi! 🙏`);
  await new Promise(r => setTimeout(r, 4000));

  const gacha = Math.random();

  if (gacha < 0.2) {
    await m.react("📉");
    return m.reply(`KLIEN KABUR GAK MAU BAYAR! 📉😡\n\nUdah dikerjain begadang 3 hari 3 malem, eh malah di-ghosting!\n💵 Bayaran: 0\n⚡ Stamina melayang: -${staminaCost}\n\nApes banget, lain kali harus pake DP! 😭`);
  } else if (gacha > 0.85) {
    const dollarRate = 16000;
    const payment = Math.floor(Math.random() * 10) + 5;
    const totalRupiah = payment * dollarRate;
    
    user.koin = (user.koin || 0) + totalRupiah;
    const expGain = Math.floor(totalRupiah / 30);
    await addExpWithLevelCheck(sock, m, db, user, expGain);
    
    await m.react("💸");
    return m.reply(`DIBAYAR PAKE DOLLAR OLEH BULE! 💸✨\n\nKlien luar negeri puas banget dan ngasih $${payment}!\n💵 Bayaran: *+Rp ${totalRupiah.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nUang jajan sultan menanti! 🤑`);
  }

  const earning = Math.floor(Math.random() * 40000) + 15000;
  user.koin = (user.koin || 0) + earning;
  const expGain = Math.floor(earning / 20);
  await addExpWithLevelCheck(sock, m, db, user, expGain);

  await m.react("✅");
  m.reply(`PROJECT SELESAI DAN ACC! 💻✨\n\n💵 Bayaran Lokal: *+Rp ${earning.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nLumayan buat beli kopi kapal api! ☕`);
}

export { pluginConfig as config, handler };
