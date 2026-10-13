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

const pluginConfig = {
  name: "katakata",
  category: "quotes",
  description: "Mengambil kata-kata / quotes random dari API Xemoz",
  usage: ".katakata",
  cooldown: 3,
  isEnabled: true,
}

async function handler(m, extra) {
  try {
    const targetUrl = `https://api-xemoz-official.my.id/api/random/kata-kata.php`

    const res = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 10000
    })

    const data = res?.data

    if (!data) {
      return m.reply("❌ *Gagal mendapatkan respons dari API Xemoz!*")
    }

    if (data.status === false) {
      return m.reply(`❌ *Gagal:* ${data.message || data.error || 'Server Xemoz sedang bermasalah'}`)
    }

    // Ekstrak kata-kata dari berbagai variasi respons JSON Xemoz
    const quoteData = data.result || data.quotes || data.data || data.kata || data

    let caption = `✨ *KATA-KATA RANDOM* ✨\n\n`

    if (typeof quoteData === 'object' && quoteData !== null) {
      const teks = quoteData.kata || quoteData.quote || quoteData.text || quoteData.result || JSON.stringify(quoteData)
      const author = quoteData.author || quoteData.penulis || quoteData.by || "Anonim"

      caption += `_"${teks}"_\n\n`
      caption += `✍️ *Author:* ${author}`
    } else {
      caption += `_"${quoteData}"_`
    }

    return m.reply(caption)

  } catch (error) {
    console.error("[Kata-Kata Error]:", error?.message)
    const errDetail = error?.response?.data?.message || error?.message || "Server Error"
    return m.reply(`❌ *Terjadi Kesalahan:* ${errDetail}`)
  }
}

async function before(m) {
  return true
}

export { pluginConfig as config, handler, before }
