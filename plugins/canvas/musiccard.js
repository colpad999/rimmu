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

import { downloadMediaMessage, getContentType } from "rimuru";
import { ImageUploadService } from "node-upload-images";
import axios from "axios";

const pluginConfig = {
  name: "musiccard",
  category: "maker",
  description: "Membuat kartu musik (music card) keren dari gambar yang dikirim.",
  usage: ".musiccard <judul>|<nama artis>",
  example: ".musiccard Rewrite The Stars|James Arthur",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.text?.trim();

  let mediaBuffer = null;
  let mimetype = null;

  if (m.quoted?.message) {
    const type = getContentType(m.quoted.message);
    if (type !== "imageMessage") {
      return m.reply("❌ *Waduh, itu bukan gambar!*\n\nKamu harus me-reply (membalas) pesan berupa *gambar* dengan format `.musiccard <judul>|<nama>`.\n\nContoh: \nBalas gambar temanmu, lalu ketik: `.musiccard Perfect|Ed Sheeran`");
    }
    try {
      mediaBuffer = await downloadMediaMessage(
        { key: m.quoted.key, message: m.quoted.message },
        "buffer",
        {}
      );
      mimetype = m.quoted.message[type]?.mimetype;
    } catch (e) {
      return m.reply("😔 *Gagal mendownload gambar.* Coba kirim ulang gambarnya ya.");
    }
  } else if (m.message) {
    const type = getContentType(m.message);
    if (type !== "imageMessage") {
      return m.reply("❌ *Waduh, gambarnya mana nih?*\n\nKamu harus mengirim sebuah gambar dengan caption (teks pelengkap) `.musiccard <judul>|<nama>` atau reply gambar yang sudah ada.\n\nContoh: \nKirim gambar dengan caption: `.musiccard Perfect|Ed Sheeran`");
    }
    try {
      mediaBuffer = await downloadMediaMessage(
        { key: m.key, message: m.message },
        "buffer",
        {}
      );
      mimetype = m.message[type]?.mimetype;
    } catch (e) {
      return m.reply("😔 *Gagal mendownload gambar.* Coba kirim ulang gambarnya ya.");
    }
  }

  if (!mediaBuffer) {
    return m.reply("❌ *Gambar tidak terdeteksi!* Pastikan kamu mengirim gambar dengan benar.");
  }

  if (!text) {
    return m.reply("❌ *Judul lagu dan artis belum diisi!*\n\nFormat penulisan yang benar adalah: `.musiccard <judul>|<nama>`\nPisahkan judul dan nama artis dengan simbol pita ( | ).");
  }

  let judul = text;
  let nama = "Unknown Artist";

  if (text.includes("|")) {
    const parts = text.split("|");
    judul = parts[0].trim();
    nama = parts[1].trim() || m.pushName;
  }

  await m.react("🕕");

  try {

    const service = new ImageUploadService("pixhost.to");
    const uploadResult = await service.uploadFromBinary(mediaBuffer, "img.jpg");

    if (!uploadResult || !uploadResult.directLink) {
      await m.react("❌");
      return m.reply("⚠️ *Gagal mengunggah gambar!* Pastikan ukuran gambarnya tidak terlalu besar dan coba lagi ya.");
    }

    const apiUrl = `https://api.nexray.eu.cc/canvas/musiccard?judul=${encodeURIComponent(judul)}&nama=${encodeURIComponent(nama)}&image_url=${encodeURIComponent(uploadResult.directLink)}`;

    const res = await axios.get(apiUrl, {
      responseType: "arraybuffer",
      timeout: 30000
    });

    if (res.headers["content-type"] && !res.headers["content-type"].includes("image")) {
      await m.react("❌");
      return m.reply("⚠️ *Gagal membuat Music Card.* Server merespon dengan format yang salah.");
    }

    const cardBuffer = Buffer.from(res.data);

    await sock.sendMessage(m.chat, {
      image: cardBuffer,
      caption: `✨ *MUSIC CARD BERHASIL DIBUAT!* ✨\n\n🎧 *Judul*: ${judul}\n🎤 *Artis*: ${nama}\n\nKeren banget kan hasilnya? Pamerin ke teman-temanmu yuk! 🚀`
    }, { quoted: m });

    await m.react("✅");

  } catch (err) {
    console.error("[Music Card]", err.message);
    await m.react("☢");
    m.reply("😔 *Terjadi masalah di sistem kami.* \n\nSistem gagal menghubungi server pembuat kartu. Silakan coba beberapa saat lagi ya.");
  }
}

export { pluginConfig as config, handler };
