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
  name: "hunt",
  category: "rpg",
  description: "Berburu hewan untuk mendapatkan daging dan kulit",
  usage: ".hunt",
  example: ".hunt",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 90,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  if (!user.inventory) user.inventory = {};

  const staminaCost = 25;
  user.rpg.stamina = user.rpg.stamina || 100;

  if (user.rpg.stamina < staminaCost) {
    return m.reply(`⚡ Aduh kak, stamina kamu habis!\n\nButuh *${staminaCost} Stamina* buat pergi berburu.\nStamina kamu sisa: *${user.rpg.stamina}*`);
  }

  user.rpg.stamina -= staminaCost;

  await m.reply("🏹 _Mengendap-endap di balik semak belukar... Menyiapkan anak panah..._ 🌿🤫");
  await new Promise((r) => setTimeout(r, 2500));

  const animals = [
    { name: "🐰 Kelinci Hutan", item: "rabbit", chance: 50, exp: 100 },
    { name: "🦌 Rusa Jantan", item: "deer", chance: 30, exp: 200 },
    { name: "🐗 Babi Hutan Liar", item: "boar", chance: 20, exp: 300 },
    { name: "🐻 Beruang Madu", item: "bear", chance: 10, exp: 500 },
    { name: "🦁 Singa Padang Rumput", item: "lion", chance: 5, exp: 800 },
    { name: "🐉 Anak Naga Kuno", item: "dragon", chance: 1, exp: 2000 },
  ];

  const rand = Math.random() * 100;
  let caught = null;

  for (const animal of animals.sort((a, b) => a.chance - b.chance)) {
    if (rand <= animal.chance) {
      caught = animal;
      break;
    }
  }

  if (!caught) {
    caught = animals.find((a) => a.item === "rabbit");
  }

  user.inventory[caught.item] = (user.inventory[caught.item] || 0) + 1;
  const levelResult = await addExpWithLevelCheck(sock, m, db, user, caught.exp);

  db.save();

  let txt = `🏹 *TANGKAPAN BERHASIL!* 🏹\n\n`;
  txt += `Wah jago banget bidikannya kak! Kamu berhasil menembak:\n`;
  txt += `🎯 *${caught.name}* (+1)\n\n`;
  txt += `*Hasil Perburuan:*\n`;
  txt += `✨ EXP Bertambah: *+${caught.exp}*\n`;
  txt += `⚡ Stamina Terpakai: *-${staminaCost}*`;

  await m.reply(txt);
}

export { pluginConfig as config, handler };
