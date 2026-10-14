//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "creatett",
  category: "rpg",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
    let who = m.sender;
    const user = global.db.data.users[who];

    if (user.tiktok && user.tiktok.username) {
        return m.reply('❌ Anda sudah memiliki akun TikTok! Gunakan perintah *.akuntt* untuk melihat profil Anda.');
    }

    if (!text) {
        return m.reply(`❗ Nama pengguna tidak boleh kosong.\nGunakan contoh: *${usedPrefix + command} NamaTikTok*`);
    }

    user.tiktok = {
        username: text.trim(),
        followers: 0,
        following: 0,
        likes: 0,
        posts: 0,
        views: 0,
        live: false,
        lastLive: 0,
    };

    m.reply(`
🎉 **Akun TikTok Berhasil Dibuat!**

👤 Username: ${user.tiktok.username}
👥 Followers: 0
❤️ Likes: 0
🎥 Views: 0
📁 Posts: 0
`);
};

export { pluginConfig as config, handler };
