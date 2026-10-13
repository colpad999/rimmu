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


import fetch from 'node-fetch';

const pluginConfig = {
  name: "lupakan",
  category: "fun",
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

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const quotes = [
    'Masa lalu adalah pelajaran, bukan penjara. Biarkan dirimu terbang lebih tinggi.',
    'Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dari dirimu.',
    'Jangan biarkan kemarin mengambil terlalu banyak dari hari ini.',
    'Lupakan apa yang tidak bisa diubah, fokus pada apa yang bisa kamu lakukan sekarang.',
    'Kehidupan terlalu singkat untuk menyimpan dendam dan penyesalan.',
    'Masa depan menunggu mereka yang berani meninggalkan masa lalu.',
    'Kesalahan adalah guru terbaik, bukan musuh. Belajar dan lanjutkan.',
    'Kamu tidak bisa mengubah masa lalu, tapi kamu bisa membentuk masa depan.',
    'Setiap detik adalah kesempatan untuk memulai ulang.',
    'Lepaskan beban masa lalu dan rasakan kebebasan sejati.',
    'Hidup dimulai ketika kamu berhenti memikirkan apa yang seharusnya terjadi.',
    'Masa lalu tidak mendefinisikan siapa kamu, pilihan hari ini yang melakukannya.',
    'Jangan terjebak dalam cerita lama, tulis cerita baru yang lebih indah.',
    'Keberanian bukan tidak takut, tapi melangkah maju meski takut.',
    'Setiap orang berhak mendapatkan kesempatan kedua, termasuk dirimu sendiri.'
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  const message = `— lupakan masa lalu —

❀ motivasi :
${randomQuote}

Ingat, kamu lebih kuat dari yang kamu pikirkan. Masa depan penuh dengan kemungkinan tak terbatas! 💪✨`;

  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.register = true;

export { pluginConfig as config, handler };
