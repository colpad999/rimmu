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
  name: "dagang",
  category: "rpg",
  description: "Dagang asongan keliling",
  usage: ".jualan",
  example: ".jualan",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 180,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  
  const staminaCost = 18;
  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`Kaki lemes kebanyakan keliling! 🥵\n\nJualan butuh *${staminaCost} Stamina*, sisa stamina kamu *${user.rpg.stamina}*. Ngiyup bentar! 🏖️`);
  }

  user.rpg.stamina -= staminaCost;
  await m.react("🛒");
  await m.reply(`Cangcimen cangcimen! Kacang kuaci permen! 🍬\nNawarin dagangan ke orang lewat... 🗣️`);
  await new Promise(r => setTimeout(r, 3000));

  const gacha = Math.random();

  if (gacha < 0.2) {
    const rugi = Math.floor(Math.random() * 10000) + 5000;
    user.koin = Math.max(0, (user.koin || 0) - rugi);
    await m.react("🌧️");
    return m.reply(`HUJAN DERAS! DAGANGAN SEPI! 🌧️🥶\n\nNggak ada yang beli dan dagangan kerupukmu melempem semua.\nKerugian Modal: *Rp ${rugi.toLocaleString("id-ID")}*\n⚡ Stamina: -${staminaCost}\n\nBesok harus liat prakiraan cuaca nih! ☂️`);
  } else if (gacha > 0.85) {
    const lakuKeras = Math.floor(Math.random() * 80000) + 40000;
    user.koin = (user.koin || 0) + lakuKeras;
    const expGain = Math.floor(lakuKeras / 20);
    await addExpWithLevelCheck(sock, m, db, user, expGain);
    await m.react("🤑");
    return m.reply(`ADA BROMTON LEWAT DIBORONG SEMUA! 🚴‍♂️✨\n\nRombongan sepeda elit mampir dan ngeborong semua isotonik sama cangcimen!\n💵 Omzet Mendadak: *+Rp ${lakuKeras.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nBisa langsung pulang gasik ini mah! 🎉`);
  }

  const earning = Math.floor(Math.random() * 25000) + 10000;
  user.koin = (user.koin || 0) + earning;
  const expGain = Math.floor(earning / 20);
  await addExpWithLevelCheck(sock, m, db, user, expGain);

  await m.react("✅");
  m.reply(`DAGANGAN LAKU STANDAR! 🛒✨\n\n💵 Omzet: *+Rp ${earning.toLocaleString("id-ID")}*\n📈 EXP: *+${expGain}*\n⚡ Stamina: -${staminaCost}\n\nBesok kulakan lagi ah! 🛍️`);
}

export { pluginConfig as config, handler };
