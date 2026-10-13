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
  name: "chest",
  category: "rpg",
  description: "Buka treasure chest untuk hadiah random",
  usage: ".treasure",
  example: ".treasure",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 1,
  isEnabled: true,
};

const CHEST_TYPES = {
  woodenchest: { name: "📦 Wooden Chest", minGold: 50, maxGold: 200, expRange: [30, 80], rarity: "common" },
  ironchest: { name: "🗃️ Iron Chest", minGold: 150, maxGold: 500, expRange: [80, 150], rarity: "uncommon" },
  goldchest: { name: "🎁 Gold Chest", minGold: 400, maxGold: 1200, expRange: [150, 300], rarity: "rare" },
  diamondchest: { name: "💎 Diamond Chest", minGold: 1000, maxGold: 3000, expRange: [300, 600], rarity: "epic" },
  mysterybox: { name: "🎲 Mystery Box", minGold: 500, maxGold: 5000, expRange: [200, 800], rarity: "legendary" },
};

const LOOT_TABLE = {
  common: [
    { item: "wood", qty: [3, 8], chance: 40 },
    { item: "iron", qty: [1, 4], chance: 30 },
    { item: "herb", qty: [2, 5], chance: 25 },
    { item: "potion", qty: [1, 2], chance: 20 },
  ],
  uncommon: [
    { item: "iron", qty: [3, 7], chance: 40 },
    { item: "gold", qty: [1, 3], chance: 25 },
    { item: "leather", qty: [2, 5], chance: 30 },
    { item: "potion", qty: [2, 4], chance: 35 },
  ],
  rare: [
    { item: "gold", qty: [2, 5], chance: 45 },
    { item: "diamond", qty: [1, 2], chance: 20 },
    { item: "manapotion", qty: [1, 3], chance: 30 },
    { item: "strengthpotion", qty: [1, 1], chance: 15 },
  ],
  epic: [
    { item: "diamond", qty: [2, 4], chance: 40 },
    { item: "gold", qty: [5, 10], chance: 50 },
    { item: "elixir", qty: [1, 1], chance: 15 },
    { item: "dragonscale", qty: [1, 2], chance: 10 },
  ],
  legendary: [
    { item: "diamond", qty: [3, 8], chance: 50 },
    { item: "titancore", qty: [1, 2], chance: 20 },
    { item: "divinecore", qty: [1, 1], chance: 10 },
    { item: "elixir", qty: [1, 3], chance: 25 },
    { item: "goldsword", qty: [1, 1], chance: 5 },
  ],
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.inventory) user.inventory = {};
  if (!user.rpg) user.rpg = {};

  const args = m.args || [];
  const chestType = args[0]?.toLowerCase();

  const availableChests = Object.entries(CHEST_TYPES).filter(([key]) => (user.inventory[key] || 0) > 0);

  if (!chestType) {
    let txt = `🎁 *GUDANG HARTA KARUN* 🎁\n\n`;

    if (availableChests.length === 0) {
      txt += `Yah kak, kamu belum punya peti harta satupun nih... 😭\n\n`;
      txt += `💡 *Tips dapet peti:*\n`;
      txt += `> ⚔️ Eksplorasi \`.adventure\` / Dungeon\n`;
      txt += `> 👹 Bunuh Boss\n`;
      txt += `> 🗓️ Selesaikan \`.daily\` / \`.weekly\`\n`;
      txt += `> 🛒 Beli di \`.shop\``;
    } else {
      txt += `Wah peti kamu ada banyak nih! Mau buka yang mana kak?\n\n`;
      for (const [key, chest] of availableChests) {
        txt += `📦 ${chest.name}: *${user.inventory[key]} pcs*\n`;
        txt += `   └ Buka: \`${m.prefix}treasure ${key}\`\n\n`;
      }
    }
    return m.reply(txt);
  }

  const chest = CHEST_TYPES[chestType];
  if (!chest) {
    return m.reply(`Peti *${chestType}* nggak ada di database kak!`);
  }

  if ((user.inventory[chestType] || 0) < 1) {
    return m.reply(`Peti *${chest.name}* kamu lagi kosong kak! 😅`);
  }

  user.inventory[chestType]--;
  if (user.inventory[chestType] <= 0) delete user.inventory[chestType];

  await m.react("🎁");
  await m.reply(`🔓 Mengutak-atik kunci... \nMembuka *${chest.name.toUpperCase()}* secara perlahan... ✨`);
  await new Promise((r) => setTimeout(r, 2500));

  const goldReward = Math.floor(Math.random() * (chest.maxGold - chest.minGold)) + chest.minGold;
  const expReward = Math.floor(Math.random() * (chest.expRange[1] - chest.expRange[0])) + chest.expRange[0];

  user.koin = (user.koin || 0) + goldReward;

  const droppedItems = [];
  const lootPool = LOOT_TABLE[chest.rarity] || LOOT_TABLE.common;

  for (const loot of lootPool) {
    if (Math.random() * 100 < loot.chance) {
      const qty = Math.floor(Math.random() * (loot.qty[1] - loot.qty[0] + 1)) + loot.qty[0];
      user.inventory[loot.item] = (user.inventory[loot.item] || 0) + qty;
      droppedItems.push(`${loot.item} (x${qty})`);
    }
  }

  await addExpWithLevelCheck(sock, m, db, user, expReward);
  db.save();

  await m.react("✅");

  let txt = `💥 *CRAAASH!! PETI TERBUKA!!* 💥\n\n`;
  txt += `Wah hebat kak! Kamu dapet harta dari *${chest.name}*:\n\n`;
  txt += `💰 Emas: *+Rp ${goldReward.toLocaleString()}*\n`;
  txt += `✨ EXP: *+${expReward}*\n`;
  if (droppedItems.length > 0) {
    txt += `🎒 *Loot Tambahan:*\n`;
    for (const item of droppedItems) {
      txt += `  • ${item}\n`;
    }
  } else {
    txt += `🎒 *Loot Tambahan:* _Aduh sayang banget nggak dapet item tambahan..._\n`;
  }

  if (chest.rarity === "legendary" || chest.rarity === "epic") {
    txt += `\n> _"HOKI BANGET KAK!"_ 🌟🔥`;
  }

  return m.reply(txt);
}

export { pluginConfig as config, handler };
