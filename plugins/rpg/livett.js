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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


const pluginConfig = {
  name: "livett",
  category: "rpg",
  description: "Imported from Rimuru MD V4.6",
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

async function handler(m, { text }) {
    let who = m.sender;
    const user = global.db.data.users[who];

    if (!user.tiktok || !user.tiktok.username) {
        return m.reply('❌ Anda belum memiliki akun TikTok. Buat akun terlebih dahulu dengan perintah *.creatett <username>*');
    }

    const cooldown = 2 * 60 * 1000; 
    if (user.tiktok.cooldown && Date.now() - user.tiktok.cooldown < cooldown) {
        const remaining = Math.ceil((cooldown - (Date.now() - user.tiktok.cooldown)) / 1000);
        return m.reply(`⏳ Anda baru saja melakukan live. Tunggu ${remaining} detik lagi untuk live berikutnya.`);
    }

    const liveTitle = text || 'Live TikTok Seru!';
    const randomViews = Math.floor(Math.random() * 500) + 100; 
    const randomLikes = Math.floor(Math.random() * 300) + 50;  
    const randomFollowers = Math.floor(Math.random() * 50) + 10; 

    user.tiktok.views += randomViews;
    user.tiktok.likes += randomLikes;
    user.tiktok.followers += randomFollowers;
    user.tiktok.cooldown = Date.now(); 

    m.reply(`
🎥 **Live TikTok Selesai!**
📢 **Judul Live**: ${liveTitle}
👁️ **Views**: ${randomViews}
❤️ **Likes**: ${randomLikes}
⭐ **Followers Baru**: ${randomFollowers}

📌 Gunakan perintah *.akuntt* untuk melihat profil Anda. Live berikutnya bisa dilakukan dalam 2 menit.
    `.trim());

    setTimeout(() => {
        m.reply(`✅ Anda sudah bisa melakukan live TikTok lagi! Gunakan perintah *.livett <judul>* untuk memulai.`);
    }, cooldown);
};

export { pluginConfig as config, handler };
