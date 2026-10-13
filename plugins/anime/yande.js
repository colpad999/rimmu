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


/*
 * Fitur  : Yande Wallpaper
 * Base   : yande.re
 * Author : Hilman
 */

import axios from 'axios'

const API = 'https://yande.re/post.json'

async function randomYande() {
  const { data } = await axios.get(API, {
    params: {
      tags: 'order:random',
      limit: 1
    }
  })
  return data[0]
}

async function searchYande(tags) {
  const { data } = await axios.get(API, {
    params: { tags, limit: 5 }
  })
  return data
}

async function getById(id) {
  const { data } = await axios.get(API, {
    params: { tags: `id:${id}` }
  })
  return data[0]
}

async function sendImage(conn, m, img) {
  await conn.sendMessage(m.chat, {
    image: { url: img.file_url },
    caption:
`Size : ${img.width}x${img.height}
Rating : ${img.rating}
ID : ${img.id}`,
    footer: 'ʀʏᴏ ʏᴀᴍᴀᴅᴀ - ᴍᴅ',

    nativeFlow: [
      {
        text: 'Lagi',
        id: '.yande random'
      }
    ]

  }, { quoted: m })
}

const pluginConfig = {
  name: "yande",
  category: "anime",
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

async function handler(m, { sock, args }) {
    const conn = sock;
  try {

    if (!args[0]) {
      const img = await randomYande()
      return sendImage(conn, m, img)
    }

    if (args[0] === 'random') {
      const img = await randomYande()
      return sendImage(conn, m, img)
    }

    if (args[0] === 'id') {
      if (!args[1]) return m.reply('Masukkan ID')
      const img = await getById(args[1])
      return sendImage(conn, m, img)
    }

    const query = args.join('_')
    m.reply('Mencari wallpaper...')

    const results = await searchYande(query)
    if (!results.length) return m.reply('Tidak ditemukan')

    for (let img of results) {
      await sendImage(conn, m, img)
    }

  } catch (e) {
    console.log(e)
    m.reply('Gagal mengambil wallpaper')
  }
}

export { pluginConfig as config, handler };
