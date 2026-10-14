//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fetch from 'node-fetch'

const pluginConfig = {
  name: "ryo",
  category: "sticker",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
  let stickerList = [
    'https://files.catbox.moe/3udphi.webp',
    'https://files.catbox.moe/2ul4l6.webp',
    'https://files.catbox.moe/qvevks.webp',
    'https://files.catbox.moe/4oauqp.webp',
    'https://files.catbox.moe/86s1m1.webp',
    'https://files.catbox.moe/0qargw.webp',
    'https://files.catbox.moe/qw2dac.webp',
    'https://files.catbox.moe/v0yv1f.webp',
    'https://files.catbox.moe/b2dx8u.webp',
    'https://files.catbox.moe/omnw8w.webp'
  ]

  // Pilih 1 random dari list
  let url = stickerList[Math.floor(Math.random() * stickerList.length)]

  try {
    let buffer = await fetch(url).then(res => res.buffer())
    await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m, { asSticker: true })
  } catch (e) {
    console.error('Gagal kirim stiker:', e)
  }
}

export { pluginConfig as config, handler };
