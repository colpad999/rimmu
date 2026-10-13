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

const pluginConfig = {
  name: 'attp2',
  category: 'sticker',
  description: 'Buat sticker animasi teks',
  usage: '.attp2 <teks>',
  example: '.attp2 Halo dunia',
  cooldown: 5,
  energi: 2,
};

async function handler(m, { sock }) {
  const text = m.text?.trim() || m.quoted?.text?.trim();

  if (!text) {
    return m.reply(`⚠️ Harap masukkan teks!\nContoh: \`${m.prefix}${m.command} Halo semua\``);
  }

  await m.react('🕕');

  try {
    const colors = encodeURIComponent(JSON.stringify(["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]));
    const apiUrl = `https://api.neoxr.eu/api/attp2?text=${encodeURIComponent(text)}&color=${colors}&apikey=${config.APIkey.neoxr}`;

    const response = await axios.get(apiUrl);
    if (!response.data.status || !response.data.data?.url) {
      return m.reply('❌ Gagal membuat sticker, kemungkinan limit API habis.');
    }

    const stickerUrl = response.data.data.url;
    const stickerBuffer = await axios.get(stickerUrl, { responseType: 'arraybuffer' }).then(res => res.data);

    await sock.sendVideoAsSticker(m.chat, stickerBuffer, m, {
      packname: config.sticker.packname,
      author: config.sticker.author
    });

    await m.react('✅');
  } catch (error) {
    console.log(error)
    await m.react('☢');
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
