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
* Nama Fitur : Tools image
* Type : Plugin Esm
* Sumber : https://whatsapp.com/channel/RIMURU_CHANNEL
* Sumber Skrep : https://whatsapp.com/channel/RIMURU_CHANNEL
* Author : ZenzzXD
*/

import axios from 'axios'
import * as cheerio from 'cheerio'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const _type = ['removebg', 'enhance', 'upscale', 'restore', 'colorize']

    if (!text) {
        throw `List Tools Image :\n\n> removebg\n> enhance\n> upscale\n> restore\n> colorize\n\ncontoh penggunaan :\n.imgtools removebg`
    }
    if (!_type.includes(text)) {
        throw `lu masukin tipe apa sih bree?\n\nList tools image :\n> ${_type.join('\n> ')}`
    }

    let buffer
    if (m.quoted && m.quoted.mimetype?.includes('image')) {
        buffer = await m.quoted.download()
    } else if (m.mimetype?.includes('image')) {
        buffer = await m.download()
    } else {
        throw `replay gambar dengan caption : .imgtools ${text}`
    }

    m.reply('wettt')
    try {
        const form = new FormData()
        form.append('file', buffer, `${Date.now()}.jpg`)
        form.append('type', text)

        const res = await axios.post('https://imagetools.rapikzyeah.biz.id/upload', form, {
            headers: form.getHeaders()
        })

        const $ = cheerio.load(res.data)
        const resultUrl = $('img#memeImage').attr('src')

        if (!resultUrl) throw 'gaada hasil yg ditemukan'

        await conn.sendFile(m.chat, resultUrl, 'hasil.jpg', '', m)
    } catch (e) {
        throw `Eror kak : ${e.message}`
    }
}

handler.help = ['imgtools <type>']
handler.tags = ['tools']
handler.command = ['imgtools']
handler.limit = true 
handler.register = true 

export default handler
