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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "genshin",
  category: "stalker",
  description: "Melihat informasi akun Genshin Impact berdasarkan UID.",
  usage: ".genshinstalk <uid>",
  example: ".genshinstalk 856012067",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const uid = m.text?.trim() || m.args[0];

  if (!uid) {
    return m.reply("❌ *UID Genshin-nya mana nih?*\n\nKamu harus memasukkan UID pemain Genshin Impact yang ingin di-stalk. \n\nContoh: `.genshinstalk 856012067`");
  }

  await m.react("🕕");

  try {
    const res = await axios.get(`https://api.nexray.eu.cc/stalker/genshin?id=${uid}`, {
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    
    const data = res.data;

    if (!data.status || !data.result) {
      await m.react("❌");
      return m.reply(`⚠️ *Pencarian Gagal!*\n\nUID *${uid}* tidak ditemukan atau profilnya diprivat. Pastikan UID yang kamu masukkan sudah benar ya.`);
    }

    const r = data.result.player_info;
    const imageUrl = data.result.image_url;
    
    let caption = `🌟 *GENSHIN IMPACT STALK* 🌟\n\n`;
    caption += `Halo Traveler! Ini dia informasi akun untuk UID *${data.result.id}*:\n\n`;
    
    caption += `👤 *INFO PEMAIN*\n`;
    caption += `  - Nickname: *${r.nickname || "-"}*\n`;
    caption += `  - Adventure Rank (AR): ${r.level || "-"}\n`;
    caption += `  - World Level (WL): ${r.world_level || "-"}\n`;
    caption += `  - Signature: ${r.signature || "-"}\n\n`;
    
    caption += `🏆 *PENCAPAIAN*\n`;
    caption += `  - Total Achievement: ${r.achievements || "-"}\n`;
    caption += `  - Spiral Abyss: ${r.spiral_abyss || "Belum ada data"}\n`;
    if (r.theater) caption += `  - Imaginarium Theater: ${r.theater}\n`;
    if (r.stygian_onslaught) caption += `  - Stygian Onslaught: ${r.stygian_onslaught}\n`;
    caption += `\n`;
    
    caption += `Gimana, statnya bagus nggak? Pamerin ke teman-temanmu yuk! 🚀`;

    if (imageUrl) {
      await sock.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: caption
      }, { quoted: m });
    } else {
      await m.reply(caption);
    }

    await m.react("✅");

  } catch (error) {
    console.error("[Genshin Stalk]", error.message);
    await m.react("☢");
    m.reply("😔 *Terjadi masalah di sistem kami.* \n\nSistem gagal menarik data dari server Genshin Impact. Silakan coba beberapa saat lagi ya.");
  }
}

export { pluginConfig as config, handler };
