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

import fetch from 'node-fetch';
import { withNetworkRetry, formatNetworkError } from '../../src/lib/rimuru-network.js';

const pluginConfig = {
  name: "fakenote",
  category: "maker",
  description: "Generate gambar Note speech bubble meme",
  usage: ".fakenote name|pesan|avatar_url",
  example: ".fakenote @kyynhz|jadilah manusia berkualitas, tidak menindas untuk menjadi teratas",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, text }) {
  if (!text) {
    return m.reply(
      `⚠️ *Format Salah*\n\n` +
      `Penggunaan:\n\`.fakenote name|pesan|avatar_url\`\n\n` +
      `Contoh:\n\`.fakenote @kyynhz|jadilah manusia berkualitas, tidak menindas untuk menjadi teratas\``
    );
  }

  // Parse parameter: name | message | avatar
  let [inputName, inputMessage, inputAvatar] = text.split('|').map(v => v ? v.trim() : '');

  // Jika user hanya memasukkan pesan tanpa "|", nama otomatis dari pushName
  if (!inputMessage && inputName) {
    inputMessage = inputName;
    inputName = m.pushName ? `@${m.pushName.replace(/\s+/g, '').toLowerCase()}` : '@user';
  }

  if (!inputMessage) {
    return m.reply(`⚠️ Masukkan pesan yang ingin ditampilkan pada note!`);
  }

  await m.react('⏳');

  try {
    let avatarUrl = inputAvatar || '';

    // Jika avatar tidak diisi via URL, coba ambil PP pengirim dari WhatsApp
    if (!avatarUrl) {
      try {
        avatarUrl = await sock.profilePictureUrl(m.sender, 'image');
      } catch {
        avatarUrl = 'https://telegra.ph/file/24167123924712411.jpg'; // Fallback default avatar
      }
    }

    const apiUrl = `https://api.nexray.web.id/maker/fakenote?name=${encodeURIComponent(inputName)}&message=${encodeURIComponent(inputMessage)}&avatar=${encodeURIComponent(avatarUrl)}`;

    const response = await withNetworkRetry(() => fetch(apiUrl, { timeout: 30000 }));
    const contentType = response.headers.get('content-type') || '';

    // Jika API mengembalikan gambar langsung (Buffer)
    if (contentType.includes('image')) {
      const imageBuffer = await response.buffer();
      await sock.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `✨ *Fake Note Generated!*`
      }, { quoted: m });
      await m.react('✅');
      return;
    }

    // Jika API mengembalikan JSON
    const resJson = await response.json();
    if ((resJson.status || resJson.success) && resJson.result) {
      const imageUrl = typeof resJson.result === 'string' ? resJson.result : resJson.result.url;
      await sock.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `✨ *Fake Note Generated!*`
      }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('❌');
      m.reply(`❌ *Gagal generate:* ${resJson.message || 'Terjadi kesalahan pada server API.'}`);
    }

  } catch (err) {
    console.error('[FAKENOTE ERROR]', err);
    await m.react('❌');
    await m.reply(`❌ *Gagal:* ${formatNetworkError(err, 'AlwaysCodex Fake Note')}`);
  }
}

export { pluginConfig as config, handler };
