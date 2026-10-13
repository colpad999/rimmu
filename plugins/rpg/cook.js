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
  name: "cook",
  category: "rpg",
  description: "Memasak makanan untuk menambah health",
  usage: ".cook",
  example: ".cook",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 60,
  energi: 0,
  isEnabled: true,
};

const RECIPES = {
  fish_soup: { name: "🍲 Sup Ikan", materials: { fish: 2 }, heal: 30 },
  grilled_meat: { name: "🍖 Daging Panggang", materials: { rabbit: 1, wood: 1 }, heal: 40 },
  apple_pie: { name: "🥧 Pie Apel", materials: { apple: 3 }, heal: 25 },
  steak: { name: "🥩 Steak", materials: { boar: 1, coal: 1 }, heal: 60 },
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  if (!user.inventory) user.inventory = {};

  user.rpg.health = user.rpg.health || 100;
  user.rpg.maxHealth = user.rpg.maxHealth || 100;

  if (user.rpg.health >= user.rpg.maxHealth) {
    return m.reply(`Perut kamu masih kenyang kak! 🤢\nNggak usah masak dulu, nanti kekenyangan malah susah jalan! 🏃💨`);
  }

  let cooked = null;
  for (const [key, recipe] of Object.entries(RECIPES)) {
    let canCook = true;
    for (const [mat, qty] of Object.entries(recipe.materials)) {
      if ((user.inventory[mat] || 0) < qty) {
        canCook = false;
        break;
      }
    }
    if (canCook) {
      cooked = { key, ...recipe };
      break;
    }
  }

  if (!cooked) {
    let txt = `Halo Chef! Mau masak apa hari ini? 🍳👨‍🍳\n\n`;
    txt += `Ini daftar resep yang bisa kamu bikin:\n\n`;
    for (const [key, recipe] of Object.entries(RECIPES)) {
      txt += `*${recipe.name}*\n`;
      txt += `❤️ Heal: +${recipe.heal} HP\n`;
      txt += `📦 Bahan yang dibutuhin:\n`;
      for (const [mat, qty] of Object.entries(recipe.materials)) {
        const has = user.inventory[mat] || 0;
        txt += `• ${has >= qty ? "✅" : "❌"} ${mat}: ${has}/${qty}\n`;
      }
      txt += `\n`;
    }
    txt += `(Bot bakal otomatis masak resep pertama yang bahannya cukup!)`;
    return m.reply(txt);
  }

  for (const [mat, qty] of Object.entries(cooked.materials)) {
    user.inventory[mat] -= qty;
  }

  await m.react("🍳");
  await m.reply(`Srengg... Srenggg... 🔥🍳\nLagi masak *${cooked.name}* nih, wanginya enak banget! 🤤`);
  await new Promise((r) => setTimeout(r, 3000));

  const oldHealth = user.rpg.health;
  user.rpg.health = Math.min(user.rpg.health + cooked.heal, user.rpg.maxHealth);

  db.save();

  await m.react("✅");

  let txt = `NYAM NYAM! Masakan Matang! 🍽️✨\n\n`;
  txt += `Kamu langsung makan *${cooked.name}* dan ngerasa baikan!\n`;
  txt += `❤️ HP Pulih: ${oldHealth} 📈 *${user.rpg.health}*\n\n`;
  txt += `Lanjut petualang lagi gass! 🚀🔥`;

  await m.reply(txt);
}

export { pluginConfig as config, handler };
