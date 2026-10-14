//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "mulai",
  category: "rpg",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
  let user = global.db.data.users[m.sender]
  if (!user) return

  if (user.rpg) return m.reply('🧙 Kamu sudah memulai petualangan!')

  user.rpg = {
    level: 1,
    exp: 0,
    hp: 100,
    atk: 10,
    gold: 50,
    inventory: [],
    lastHunt: 0
  }

  m.reply(`🎮 Petualangan dimulai!\n\n📊 Level: 1\n❤️ HP: 100\n🪙 Gold: 50\n🔪 ATK: 10\n\nGunakan *.berburu* untuk mulai bertarung!`)
}

export { pluginConfig as config, handler };
