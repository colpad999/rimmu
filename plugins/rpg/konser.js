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
  name: "konser",
  category: "rpg",
  description: "Ngamen di jalanan untuk mencari koin",
  usage: ".ngamen",
  example: ".ngamen",
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
  
  const staminaCost = 10;
  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`Suara serak, tenggorokan kering! 🥵\n\nNgamen butuh *${staminaCost} Stamina*, sisa stamina kamu *${user.rpg.stamina}*. Minum es teh dulu gih! ☕`);
  }

  user.rpg.stamina -= staminaCost;

  await m.react("🎸");

  const locations = [
    { name: "Perempatan Lampu Merah", min: 3000, max: 10000 },
    { name: "Warung Kopi", min: 5000, max: 15000 },
    { name: "Depan Minimarket", min: 4000, max: 12000 },
    { name: "Kafe Gaul", min: 8000, max: 25000 },
    { name: "Angkringan", min: 2000, max: 8000 }
  ];

  const loc = locations[Math.floor(Math.random() * locations.length)];
  const earning = Math.floor(Math.random() * (loc.max - loc.min + 1)) + loc.min;

  await m.reply(`Mulai jreng-jreng gitar di *${loc.name}*... 🎶\nSemoga hari ini banyak yang ngasih receh! 💸`);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  user.koin = (user.koin || 0) + earning;

  const expGain = Math.floor(earning / 20);
  await addExpWithLevelCheck(sock, m, db, user, expGain);

  await m.react("✅");

  let txt = `ALHAMDULILLAH HASIL NGAMEN! 🎸✨\n\n`;
  txt += `Lokasi: *${loc.name}*\n`;
  txt += `💵 Pendapatan: *+Rp ${earning.toLocaleString("id-ID")}*\n`;
  txt += `📈 EXP: *+${expGain}*\n`;
  txt += `⚡ Stamina: *-${staminaCost}*\n\n`;
  txt += `Lumayan buat beli nasi bungkus hari ini! 🤤`;

  m.reply(txt);
}

export { pluginConfig as config, handler };
