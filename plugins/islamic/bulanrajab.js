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

import axios from 'axios';

const pluginConfig = {
  name: 'bulanrajab',
  category: 'religi',
  description: 'Informasi lengkap tentang Bulan Rajab (doa, amalan, keutamaan, dan peristiwa penting)',
  usage: '.rajab',
  example: '.rajab',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const now = new Date();
  const year = now.getFullYear();

  // Perkiraan 1 Rajab 1448 H (berdasarkan kalender Hijriah)
  // 1 Rajab 1448 H jatuh sekitar 10 Desember 2026
  const targetDate = new Date('2026-12-10T00:00:00+07:00');
  const diffMs = targetDate - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let countdownText = '';
  let statusEmoji = '';
  let statusMessage = '';

  if (diffDays <= 0) {
    statusEmoji = '🌙';
    statusMessage = '✨ Bulan Rajab telah tiba! ✨';
    countdownText = '🌙 Bulan Allah yang penuh berkah!';
  } else {
    statusEmoji = '⏳';
    statusMessage = 'Menuju Bulan Rajab';
    countdownText = `${diffDays} hari lagi`;
  }

  const caption = `🕌 *BULAN RAJAB*
${statusEmoji} ${statusMessage}

📅 Tanggal: 1 Rajab 1448 H
🌙 Waktu: Awal bulan Rajab
📆 Perkiraan: ${targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
⏳ Countdown: ${countdownText}

✨ Keutamaan Bulan Rajab:
1. Bulan Allah (Syahrullah) yang dimuliakan
2. Salah satu dari 4 bulan haram (suci)
3. Pintu menuju Ramadhan (bulan persiapan)
4. Malam Isra Miraj terjadi di bulan ini
5. Doa-doa lebih mudah dikabulkan

📋 Amalan yang Dianjurkan:
• Puasa Sunnah (1 Rajab, 27 Rajab, atau senin-kamis)
• Perbanyak Istighfar (Sayyidul Istighfar)
• Membaca Doa Rajab
• Shalat Sunnah Rajab (12 rakaat)
• Bersedekah dan berbuat baik

🤲 Doa Rajab:
اَللَّهُمَّ بَارِكْ لَنَا فِيْ رَجَبٍ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ
Allahumma barik lana fi Rajaba wa Sya'bana wa ballighna Ramadhan.
Ya Allah, berkahilah kami di bulan Rajab dan Sya'ban, dan sampaikan kami ke bulan Ramadhan.

🌙 Peristiwa Penting di Bulan Rajab:
• 1 Rajab: Awal bulan Rajab
• 13 Rajab: Hari ulang tahun Ali bin Abi Thalib
• 27 Rajab: Isra Miraj Nabi Muhammad SAW

📚 Sumber: HR. Bukhari, Muslim, dan kitab-kitab fiqih

💗 ZERO TWO AI • ${year}`;

  await m.reply(caption);
  await m.react('🕌');
}


export { pluginConfig as config, handler };