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
import config from '../../config.js';
import te from '../../src/lib/rimuru-error.js';
import { uploadImage } from '../../src/lib/rimuru-uploader.js';
import { downloadMediaMessage, getContentType } from 'rimuru';

const pluginConfig = {
  name: 'smeme-animated',
  category: 'sticker',
  description: 'Buat stiker meme animasi',
  usage: '.smeme-animated <teks_atas>|<teks_bawah>',
  example: '.smeme-animated mas|anies (sambil balas gambar)',
  cooldown: 5,
  energi: 2,
};

async function handler(m, { sock }) {
  const text = m.text?.trim();
  
  if (!text) {
    return m.reply(`⚠️ Harap masukkan teks atas dan bawah!\nContoh: \`${m.prefix}${m.command} atas|bawah\``);
  }

  const parts = text.split('|');
  const top = parts[0]?.trim() || '';
  const bottom = parts[1]?.trim() || '';

  const msg = m.message;
  const isQuotedImage = m.quoted && (getContentType(m.quoted.message) === 'imageMessage' || m.quoted.mtype === 'imageMessage');
  const isImage = getContentType(msg) === 'imageMessage' || m.mtype === 'imageMessage';

  if (!isImage && !isQuotedImage) {
    return m.reply(`⚠️ Harap kirim atau balas gambar dengan caption \`${m.prefix}${m.command} teks_atas|teks_bawah\``);
  }

  await m.react('🕕');

  try {
    const targetMsg = isQuotedImage ? m.quoted : m;
    const buffer = await downloadMediaMessage(
      targetMsg,
      'buffer',
      {},
      { logger: console }
    );

    const imageUrl = await uploadImage(buffer);
    
    const apiUrl = `https://api.neoxr.eu/api/memegenvid?image=${encodeURIComponent(imageUrl)}&top=${encodeURIComponent(top)}&bottom=${encodeURIComponent(bottom)}&apikey=${config.APIkey.neoxr}`;
    
    const response = await axios.get(apiUrl);
    if (!response.data.status || !response.data.data?.url) {
      return m.reply('❌ Gagal membuat meme, kemungkinan API sedang gangguan.');
    }

    const stickerUrl = response.data.data.url;
    const stickerBuffer = await axios.get(stickerUrl, { responseType: 'arraybuffer' }).then(res => res.data);

    await sock.sendImageAsSticker(m.chat, stickerBuffer, m, {
        packname: config.sticker.packname,
        author: config.sticker.author
    });

    await m.react('✅');
  } catch (error) {
    await m.react('☢');
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
