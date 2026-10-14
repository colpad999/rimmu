//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "resetbansos",
  category: "rpg",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, args, isOwner, command }) {
    const conn = sock;
    if (!isOwner) return m.reply('❌ Hanya owner yang bisa mereset bansos!');

    if (!args[0]) return m.reply(`Gunakan: *.${command} 628xxx*`);

    let jid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let user = global.db.data.users[jid];

    if (!user) return m.reply(`⚠️ User dengan nomor ${args[0]} belum pernah menggunakan bot.`);

    user.lastBansos = 0;
    m.reply(`✅ Bansos untuk ${args[0]} telah di-reset. Mereka bisa klaim ulang sekarang.`);
};

export { pluginConfig as config, handler };
