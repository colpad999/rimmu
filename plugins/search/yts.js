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

import yts from "yt-search";
import { generateWAMessageFromContent, proto } from "rimuru";
import axios from "axios";
import sharp from "sharp";
import config from "../../config.js";

const pluginConfig = {
  name: "yts",
  category: "search",
  description: "Mencari video di YouTube berdasarkan kata kunci dan menampilkan detail lengkap beserta thumbnail.",
  usage: ".yts <query>",
  example: ".yts lagu pop terbaru",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock, text }) {
  if (!text) {
    return m.reply("❌ *Waduh, kata kuncinya kosong!*\n\nKamu harus memasukkan kata kunci judul video yang ingin dicari ya. \n\nContoh penggunaan: `.yts lagu galau indonesia`");
  }

  await m.react("🕕");

  try {
    const searchResults = await yts(text);
    const videos = searchResults.videos;

    if (!videos || videos.length === 0) {
      await m.react("❌");
      return m.reply("⚠️ *Maaf banget, pencarian tidak menemukan hasil apa pun.* \n\nMungkin kata kuncinya terlalu spesifik. Coba gunakan kata kunci lain yang lebih umum ya!");
    }

    const firstVideo = videos[0];

    const imageResponse = await axios.get(firstVideo.thumbnail, { responseType: "arraybuffer" });
    const thumbnailBuffer = await sharp(imageResponse.data).resize(300, 170).jpeg().toBuffer();

    const contentText = `✨ *HASIL PENCARIAN YOUTUBE* ✨

Halo! Ini dia hasil pencarian teratas yang aku temukan berdasarkan kata kunci yang kamu berikan. 

🔎 *Kata Kunci Pencarian*: ${text}
🎬 *Judul Video*: ${firstVideo.title}
📺 *Nama Channel*: ${firstVideo.author.name}
⏱️ *Durasi Video*: ${firstVideo.timestamp}
👁️ *Jumlah Penonton*: ${firstVideo.views} views
📅 *Waktu Diunggah*: ${firstVideo.ago}
🔗 *Tautan Video*: ${firstVideo.url}

*Catatan Tambahan*: Thumbnail dari video ini sudah aku sematkan di bagian atas pesan (peta lokasi) sesuai permintaanmu. Keren kan? 😎

Pilih salah satu tombol di bawah ini untuk langsung mengunduh hasil video atau audio-nya!`;

    const content = {
      buttonsMessage: {
        buttons: [
          {
            buttonId: `.ytmp4 ${firstVideo.url}`,
            buttonText: { displayText: '🎥 Unduh Video' },
            type: 1,
          },
          {
            buttonId: `.ytmp3 ${firstVideo.url}`,
            buttonText: { displayText: '🎵 Unduh Audio' },
            type: 1,
          },
        ],
        locationMessage: {
          jpegThumbnail: thumbnailBuffer,
          name: firstVideo.title,
          address: `📺 Channel: ${firstVideo.author.name} | ⏱️ Durasi: ${firstVideo.timestamp}`
        },
        contentText: contentText,
        footerText: config.bot.name,
        headerType: 6,
      },
    };

    const msg = generateWAMessageFromContent(m.chat, content, {
      quoted: m,
    });

    await sock.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react("✅");

  } catch (error) {
    console.error(error);
    await m.react("❌");
    m.reply("😔 *Aduh, sepertinya ada masalah di sistemku.* \n\nTerjadi kesalahan saat mencoba mencari video tersebut di YouTube. Mohon tunggu beberapa saat dan coba lagi nanti ya!");
  }
}

export { pluginConfig as config, handler };