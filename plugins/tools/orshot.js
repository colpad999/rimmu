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

/*
Base : https://orshot.com
Author : ZennzXD
*/

import axios from 'axios';

const pluginConfig = {
    name: 'orshot',
    category: 'tools',
    description: 'Membuat gambar screenshot aesthetic dari link postingan X (Twitter)',
    usage: '.tweetss <url tweet>',
    example: '.tweetss https://x.com/i/status/2026539641311199692',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
};

async function tweetss(tweetUrl) {
  const match = tweetUrl.match(/status\/(\d+)/);
  if (!match) throw new Error('masukin link yg benar');
  const tweetId = match[1];

  const payload = {
    templateSlug: 'tweet-image',
    modifications: {
      tweetUrl,
      tweetId
    },
    renderType: 'images',
    responseFormat: 'png',
    responseType: 'base64',
    userAPIKey: false
  };

  const { data } = await axios.post(
    'https://orshot.com/api/templates/make-playground-request',
    JSON.stringify(payload),
    {
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Origin': 'https://orshot.com',
        'Referer': 'https://orshot.com/templates/tweet-image/generate',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/107.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }
  );

  if (!data?.data?.content) {
    throw new Error('ga ada respon dari server orshot');
  }

  const base64Data = data.data.content.replace(/^data:image\/png;base64,/, '');
  return Buffer.from(base64Data, 'base64');
}

async function handler(m, { usedPrefix, prefix, command, text, sock, conn }) {
  const clientBot = sock || conn;

  if (!text || !text.trim().startsWith('http')) {
    if (typeof m.react === 'function') await m.react('❌');
    let warning = `❌ *Format Perintah Salah!*\n\n`;
    warning += `Silakan masukkan link postingan X (Twitter) yang ingin dijadikan gambar.\n\n`;
    warning += `📌 *Contoh Penggunaan:*\n`;
    warning += `> \`${prefix}${command} https://x.com/i/status/2026539641311199692\``;
    return await m.reply(warning);
  }

  if (typeof m.react === 'function') await m.react('⏳');

  try {
    const imgBuffer = await tweetss(text.trim());

    let caption = `🐦 *TWEET SHOT GENERATOR*\n────────────────────────────\n`;
    caption += `🔗 *Source:* ${text.trim()}\n`;
    caption += `👤 *Script by:* ZennzXD\n`;
    caption += `────────────────────────────`;

    await clientBot.sendMessage(
      m.chat,
      {
        image: imgBuffer,
        caption: caption
      },
      { quoted: m }
    );

    if (typeof m.react === 'function') await m.react('✅');

  } catch (error) {
    console.error('TweetSS Error:', error);
    if (typeof m.react === 'function') await m.react('❌');
    await m.reply('❌ *GAGAL MEMBUAT GAMBAR TWEET*\n\n> ' + (error.message || String(error)));
  }
}

export { pluginConfig as config, handler };
