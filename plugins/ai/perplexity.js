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

import https from 'https'

async function eaiquery(prompt, model = "perplexity-ai") {

  return new Promise((resolve, reject) => {

    let postData = JSON.stringify({

      message: prompt,

      model: model,

      history: []

    })

    let options = {

      hostname: 'whatsthebigdata.com',

      port: 443,

      path: '/api/ask-ai/',

      method: 'POST',

      headers: {

        'content-type': 'application/json',

        'origin': 'https://whatsthebigdata.com',

        'referer': 'https://whatsthebigdata.com/ai-chat/',

        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'

      }

    }

    let req = https.request(options, res => {

      let data = ''

      res.on('data', chunk => data += chunk)

      res.on('end', () => {

        try {

          let result = JSON.parse(data)

          resolve(result.text)

        } catch (e) {

          reject(e.message)

        }

      })

    })

    req.on('error', e => reject(e.message))

    req.write(postData)

    req.end()

  })

}

let handler = async (m, { args }) => {

  let query = args.join(' ')

  if (!query) return m.reply('Mau Tanya Apa')

  try {

    m.reply(await eaiquery(query))

  } catch (e) {

    m.reply(e.message)

  }

}

handler.help = ['perplexity']

handler.command = ['perplexity', 'plx']

handler.tags = ['ai']

export default handler
