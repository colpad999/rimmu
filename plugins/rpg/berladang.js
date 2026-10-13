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
  name: "berladang",
  category: "rpg",
  description: "Berladang untuk mendapat hasil panen",
  usage: ".berladang",
  example: ".berladang",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 180,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  if (!user.inventory) user.inventory = {};

  const staminaCost = 20;
  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`Aduh kak, encok nih badan! 🥵\n\nBuat nyangkul butuh *${staminaCost} Stamina*, sisa stamina kamu *${user.rpg.stamina}*.\nMakan atau istirahat dulu gih! 🛌💤`);
  }

  user.rpg.stamina -= staminaCost;

  await m.react("🌾");
  await m.reply(`Menyiapkan cangkul dan menyiram tanah... 🌱💧\nSemoga hari ini panen berlimpah!`);
  await new Promise((r) => setTimeout(r, 3000));

  const crops = [
    { item: "padi", name: "🌾 Padi", chance: 90, min: 2, max: 8, price: 100 },
    { item: "jagung", name: "🌽 Jagung", chance: 70, min: 1, max: 5, price: 150 },
    { item: "tomat", name: "🍅 Tomat", chance: 50, min: 1, max: 4, price: 200 },
    { item: "wortel", name: "🥕 Wortel", chance: 40, min: 1, max: 3, price: 250 },
    { item: "strawberry", name: "🍓 Strawberry", chance: 20, min: 1, max: 2, price: 500 },
    { item: "melon", name: "🍈 Melon", chance: 10, min: 1, max: 1, price: 1000 },
  ];

  let results = [];
  let totalValue = 0;

  for (const crop of crops) {
    if (Math.random() * 100 <= crop.chance) {
      const qty = Math.floor(Math.random() * (crop.max - crop.min + 1)) + crop.min;
      user.inventory[crop.item] = (user.inventory[crop.item] || 0) + qty;
      const value = qty * crop.price;
      totalValue += value;
      results.push({ name: crop.name, qty, value });
    }
  }

  if (results.length === 0) {
    user.inventory["padi"] = (user.inventory["padi"] || 0) + 1;
    results.push({ name: "🌾 Padi", qty: 1, value: 100 });
    totalValue = 100;
  }

  const expGain = Math.floor(totalValue / 10) + Math.floor(Math.random() * 100);
  const levelResult = await addExpWithLevelCheck(sock, m, db, user, expGain);

  db.save();

  await m.react("✅");

  let txt = `PANEN RAYA KAK! 🚜🌾\n\n`;
  txt += `Gila, kebun kamu hari ini ngasilin banyak banget:\n`;
  for (const r of results) {
    txt += `• ${r.name}: *+${r.qty}* (Est. Rp ${r.value.toLocaleString("id-ID")})\n`;
  }
  txt += `\n💰 Total Estimasi Nilai: *Rp ${totalValue.toLocaleString("id-ID")}*\n`;
  txt += `📈 EXP Petani: *+${expGain}*\n`;
  txt += `⚡ Stamina: *-${staminaCost}*\n\n`;
  txt += `Kamu bisa jual hasil panen ini ke pasar pakai \`${m.prefix}sellall\` ya! 🧺✨`;

  m.reply(txt);
}

export { pluginConfig as config, handler };
