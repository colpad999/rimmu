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
  name: "pull",
  category: "rpg",
  description: "Gacha untuk dapat hadiah random",
  usage: ".gacha",
  example: ".gacha",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 300,
  energi: 1,
  isEnabled: true,
};

const rewards = [
  {
    type: "balance",
    min: 100,
    max: 500,
    rarity: "common",
    emoji: "⚪",
    chance: 35,
  },
  {
    type: "balance",
    min: 500,
    max: 1500,
    rarity: "uncommon",
    emoji: "🟢",
    chance: 25,
  },
  {
    type: "balance",
    min: 1500,
    max: 5000,
    rarity: "rare",
    emoji: "🔵",
    chance: 15,
  },
  {
    type: "balance",
    min: 5000,
    max: 15000,
    rarity: "epic",
    emoji: "🟣",
    chance: 5,
  },
  {
    type: "balance",
    min: 15000,
    max: 50000,
    rarity: "legendary",
    emoji: "🟡",
    chance: 1,
  },
  { type: "exp", min: 50, max: 200, rarity: "common", emoji: "⚪", chance: 30 },
  {
    type: "exp",
    min: 200,
    max: 800,
    rarity: "uncommon",
    emoji: "🟢",
    chance: 20,
  },
  { type: "exp", min: 800, max: 2000, rarity: "rare", emoji: "🔵", chance: 10 },
  { type: "exp", min: 2000, max: 5000, rarity: "epic", emoji: "🟣", chance: 3 },
  {
    type: "exp",
    min: 5000,
    max: 10000,
    rarity: "legendary",
    emoji: "🟡",
    chance: 0.5,
  },
  { type: "limit", min: 1, max: 3, rarity: "common", emoji: "⚪", chance: 25 },
  {
    type: "limit",
    min: 3,
    max: 7,
    rarity: "uncommon",
    emoji: "🟢",
    chance: 15,
  },
  { type: "limit", min: 7, max: 15, rarity: "rare", emoji: "🔵", chance: 8 },
  { type: "limit", min: 15, max: 30, rarity: "epic", emoji: "🟣", chance: 2 },
  {
    type: "limit",
    min: 30,
    max: 50,
    rarity: "legendary",
    emoji: "🟡",
    chance: 0.5,
  },
  {
    type: "jackpot",
    min: 100000,
    max: 500000,
    rarity: "mythic",
    emoji: "🌟",
    chance: 0.1,
  },
];

const rarityColors = {
  common: "⚪ Common",
  uncommon: "🟢 Uncommon",
  rare: "🔵 Rare",
  epic: "🟣 Epic",
  legendary: "🟡 Legendary",
  mythic: "🌟 MYTHIC",
};

function getRandomReward() {
  const totalChance = rewards.reduce((sum, r) => sum + r.chance, 0);
  let random = Math.random() * totalChance;

  for (const reward of rewards) {
    random -= reward.chance;
    if (random <= 0) {
      const amount =
        Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
      return { ...reward, amount };
    }
  }

  return { ...rewards[0], amount: rewards[0].min };
}

function createGachaAnimation() {
  const frames = ["🎰", "💫", "✨", "🌟", "💥"];
  return frames[Math.floor(Math.random() * frames.length)];
}

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  const reward = getRandomReward();

  let rewardText = "";
  let typeEmoji = "";

  switch (reward.type) {
    case "balance":
      db.updateKoin(m.sender, reward.amount);
      typeEmoji = "💰";
      rewardText = `+${reward.amount.toLocaleString()} Koin`;
      break;
    case "exp":
      if (!user.rpg) user.rpg = {};
      db.updateExp(m.sender, reward.amount);
      typeEmoji = "⭐";
      rewardText = `+${reward.amount.toLocaleString()} EXP`;
      break;
    case "energi":
      db.updateEnergi(m.sender, reward.amount);
      typeEmoji = "⚡";
      rewardText = `+${reward.amount} Energi`;
      break;
    case "jackpot":
      db.updateKoin(m.sender, reward.amount);
      typeEmoji = "💎";
      rewardText = `+${reward.amount.toLocaleString()} Koin`;
      break;
  }

  db.save();

  let text = `${createGachaAnimation()} *ɢᴀᴄʜᴀ ʀᴇsᴜʟᴛ*\n\n`;
  text += `╭─────────────╮\n`;
  text += `│  ${reward.emoji} ${reward.emoji} ${reward.emoji}  │\n`;
  text += `╰─────────────╯\n\n`;

  if (reward.rarity === "mythic") {
    text += `🎊🎊🎊 *JACKPOT!* 🎊🎊🎊\n\n`;
  } else if (reward.rarity === "legendary") {
    text += `✨ *LEGENDARY PULL!* ✨\n\n`;
  } else if (reward.rarity === "epic") {
    text += `💜 *EPIC PULL!* 💜\n\n`;
  }

  text += `*Rarity:* ${rarityColors[reward.rarity]}\n`;
  text += `*Hadiah:* ${typeEmoji} ${rewardText}\n\n`;
  text += `_Cooldown: 5 menit_`;

  await m.reply(text);
}

export { pluginConfig as config, handler };
