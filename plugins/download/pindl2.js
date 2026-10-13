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

import axios from 'axios'
import * as cheerio from 'cheerio'

let handler = async (m, { conn, args }) => {
  try {
    if (!args[0]) return m.reply('Mana link Pinnya?')
    let pinterestUrl = args[0]
    
    let { csrfToken, cookies } = await getSnappinToken()
    let { data } = await axios.post('https://snappin.app/', { url: pinterestUrl }, {
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        Cookie: cookies,
        Referer: 'https://snappin.app',
        Origin: 'https://snappin.app',
        'User-Agent': 'Mozilla/5.0'
      }
    })

    let $ = cheerio.load(data)
    let downloadLinks = $('a.button.is-success').map((_, el) => $(el).attr('href')).get()

    let mediaUrl = null
    for (let link of downloadLinks) {
      let fullLink = link.startsWith('http') ? link : 'https://snappin.app' + link
      let head = await axios.head(fullLink).catch(() => null)
      let contentType = head?.headers?.['content-type'] || ''
      
      if (contentType.includes('video')) {
        mediaUrl = { url: fullLink, type: 'video' }
        break
      } else if (contentType.includes('image')) {
        mediaUrl = { url: fullLink, type: 'image' }
      }
    }

    if (mediaUrl.type === 'video') {
      await conn.sendMessage(m.chat, { video: { url: mediaUrl.url } }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, { image: { url: mediaUrl.url } }, { quoted: m })
    }
  } catch (e) {
    m.reply(e.message)
  }
}

async function getSnappinToken() {
  let { headers, data } = await axios.get('https://snappin.app/')
  let cookies = headers['set-cookie'].map(c => c.split(';')[0]).join('; ')
  let $ = cheerio.load(data)
  let csrfToken = $('meta[name="csrf-token"]').attr('content')
  return { csrfToken, cookies }
}

handler.help = ['pindl2']
handler.command = ['pindl2']
handler.tags = ['downloader']
handler.limit = true;

export default handler
