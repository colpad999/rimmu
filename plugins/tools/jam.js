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
import * as cheerio from 'cheerio';

const pluginConfig = {
  name: 'timeis',
  category: 'tools',
  description: 'Cek waktu Jakarta dari time.is',
  usage: '.timeis',
  example: '.timeis',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m) {
  await m.react('⏳');
  try {
    const { data } = await axios.get('https://time.is/id/Jakarta', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000,
    });
    const $ = cheerio.load(data);
    const lokasi = $('#msgdiv b').text().trim() || 'Jakarta';
    const tanggal = $('#dd').text().trim() || 'Tidak ditemukan';
    const jam = $('#clock0_bg').text().trim() || new Date().toLocaleTimeString('id-ID', {
      hour12: false,
      timeZone: 'Asia/Jakarta',
    });

    await m.reply(`*Waktu di Jakarta Sekarang*\n\n*Lokasi:* ${lokasi}\n*Tanggal:* ${tanggal}\n*Jam:* ${jam}`);
    await m.react('✅');
  } catch (error) {
    console.error('[JAM]', error?.message || error);
    await m.react('❌');
    await m.reply('❌ Gagal mengambil data waktu dari time.is.');
  }
}

export { pluginConfig as config, handler };
