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

const pluginConfig = {
  name: "applemap",
  category: "search",
  description: "Cari lokasi dan detail tempat menggunakan Apple Maps",
  usage: ".applemaps <nama_tempat/lokasi>",
  example: ".applemaps Indonesia",
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
    return m.reply(`⚠️ *Format Salah*\n\nPenggunaan:\n\`.applemaps <nama_tempat/lokasi>\`\n\nContoh:\n\`.applemaps Monas Jakarta\``);
  }

  const query = text.trim();
  const apiKey = "4ZtwE"; // API Key dari docs
  const apiUrl = `https://api.theresav.biz.id/search/applemaps?apikey=${apiKey}&q=${encodeURIComponent(query)}`;

  await m.react('⏳');

  try {
    const response = await fetch(apiUrl);
    const res = await response.json();

    if (!res.status || !res.result || !res.result.places || res.result.places.length === 0) {
      await m.react('❌');
      return m.reply(`❌ *Gagal:* Lokasi \`${query}\` tidak ditemukan.`);
    }

    // Mengambil data tempat pertama
    const place = res.result.places[0];

    // Format Kategori
    const categories = Array.isArray(place.categories) && place.categories.length > 0 
      ? place.categories.join(', ') 
      : '-';

    // Format Link Apple Maps & Google Maps berdasarkan Koordinat
    const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(place.name)}&ll=${place.latitude},${place.longitude}`;
    const googleMapsUrl = `https://www.google.com/maps?q=${place.latitude},${place.longitude}`;

    const captionText = 
      `🗺️ *APPLE MAPS SEARCH RESULT* 🗺️\n\n` +
      `📍 *Nama Tempat:* ${place.name || query}\n` +
      `🏢 *Kategori:* ${categories}\n` +
      `🏠 *Alamat:* ${place.address || '-'}\n` +
      `🏙️ *Kota:* ${place.city || '-'}\n` +
      `🇮🇩 *Negara:* ${place.country || '-'}\n\n` +
      `🌐 *Koordinat:* \`${place.latitude}, ${place.longitude}\`\n\n` +
      `🔗 *Apple Maps:* ${appleMapsUrl}\n` +
      `🔗 *Google Maps:* ${googleMapsUrl}`;

    // Cek apakah ada foto lokasi
    const firstPhoto = Array.isArray(place.photos) && place.photos.length > 0 ? place.photos[0].url : null;

    if (firstPhoto) {
      await sock.sendMessage(m.chat, {
        image: { url: firstPhoto },
        caption: captionText
      }, { quoted: m });
    } else {
      await sock.sendMessage(m.chat, { text: captionText }, { quoted: m });
    }

    await m.react('✅');

  } catch (err) {
    console.error('[APPLE MAPS ERROR]', err);
    await m.react('❌');
    await m.reply(`❌ *Terjadi Kesalahan:* ${err.message}`);
  }
}

export { pluginConfig as config, handler };
