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
  name: "stalkpinterest",
  category: "stalker",
  description: "Melihat informasi lengkap akun Pinterest berdasarkan username.",
  usage: ".pintereststalk <username>",
  example: ".pintereststalk dims",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const username = m.text?.trim() || m.args[0];

  if (!username) {
    return m.reply("❌ *Waduh, username Pinterest-nya belum dimasukkan!*\n\nKamu harus mengetikkan username Pinterest yang ingin di-stalk. \n\nContoh: `.pintereststalk dims`");
  }

  await m.react("🕕");

  try {
    const res = await axios.get(`https://api.nexray.eu.cc/stalker/pinterest?username=${encodeURIComponent(username)}`, {
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    
    const data = res.data;

    if (!data.status || !data.result) {
      await m.react("❌");
      return m.reply(`⚠️ *Pencarian Gagal!*\n\nUsername *${username}* tidak ditemukan di Pinterest. Pastikan penulisannya sudah benar ya.`);
    }

    const r = data.result;
    
    let caption = `📌 *PINTEREST STALK - PROFILE INFO* 📌\n\n`;
    caption += `Halo! Ini dia hasil pencarian profil untuk username *@${r.username}*:\n\n`;
    
    caption += `👤 *INFO PROFIL*\n`;
    caption += `  - Nama Lengkap: *${r.full_name || "-"}*\n`;
    caption += `  - Username: @${r.username}\n`;
    caption += `  - Bio: ${r.bio || "-"}\n`;
    caption += `  - Tipe Akun: ${r.account_type || "-"}\n`;
    caption += `  - Akun Dibuat: ${r.created_at || "-"}\n\n`;
    
    caption += `📊 *STATISTIK*\n`;
    caption += `  - Pengikut (Followers): ${r.stats?.followers || 0}\n`;
    caption += `  - Diikuti (Following): ${r.stats?.following || 0}\n`;
    caption += `  - Total Pin: ${r.stats?.pins || 0}\n`;
    caption += `  - Total Board: ${r.stats?.boards || 0}\n\n`;
    
    caption += `🔗 *LINK PROFIL*\n`;
    caption += `  - ${r.profile_url}\n\n`;

    caption += `Suka mengumpulkan inspirasi dari Pinterest ya? Pamerin ke temanmu yuk! 🚀`;

    const imageUrl = r.image?.original || r.image?.large || r.image?.medium || r.image?.small;

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
    console.error("[Pinterest Stalk]", error.message);
    await m.react("☢");
    m.reply("😔 *Terjadi masalah di sistem kami.* \n\nSistem gagal menarik data dari server Pinterest. Silakan coba beberapa saat lagi ya.");
  }
}

export { pluginConfig as config, handler };
