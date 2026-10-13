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

import axios from "axios";

const pluginConfig = {
  name: "top-anime",
  category: "anime",
  description: "Melihat daftar karakter anime / waifu terpopuler",
  usage: ".topanime",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  await m.react("🕕");
  
  try {
    const response = await axios.get("https://my.izuka-api.xyz/api/anime/top-anime");
    const data = response.data;
    
    if (!data.status || !data.result || !data.result.result) {
      await m.react("❌");
      return m.reply(`Maaf, sistem gagal mengambil daftar Top Anime.`);
    }

    const list = data.result.result;
    
    let txt = `🏆 *TOP ANIME CHARACTERS (WAIFU LIST)* 🏆\n\n`;
    txt += `Berikut adalah daftar karakter terpopuler dan paling dicintai saat ini:\n\n`;
    
    const maxItems = Math.min(list.length, 10);
    
    for (let i = 0; i < maxItems; i++) {
      const char = list[i];
      txt += `*${char.rank} - ${char.name}*\n`;
      txt += `- *Jepang:* ${char.japanese}\n`;
      txt += `- *Anime:* ${char.anime}\n`;
      txt += `- *Favorit:* ${char.favorites} | *Votes:* ${char.votes}\n\n`;
    }
    
    txt += `_Menampilkan ${maxItems} karakter teratas._`;
    
    await m.react("✅");
    
    if (list.length > 0 && list[0].image) {
      await sock.sendMessage(m.chat, { image: { url: list[0].image }, caption: txt }, { quoted: m });
    } else {
      await m.reply(txt);
    }
    
  } catch (error) {
    console.error("[TOPANIME Plugin Error]", error);
    await m.react("❌");
    m.reply(`Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.`);
  }
}

export { pluginConfig as config, handler };
