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


import axios from 'axios'
import { generateWAMessageContent } from "@itsliaaa/baileys"

const pluginConfig = {
  name: "clip",
  category: "search",
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

async function handler(m, { sock, text, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
    // Validasi jika user tidak memasukkan kata kunci
    if (!text) return m.reply(`Gunakan format: *${usedPrefix + command} <pencarian>* \n\nContoh: \n.clip genshin edit \n.clip anime  \n.clip luffy gear 5`)

    try {
        // Reaksi loading
        await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } })

        // Query dinamis berdasarkan input user + tambahan keyword agar hasilnya bagus (HD/Edit)
        const query = `${text} edit trend high quality`
        
        const params = new URLSearchParams()
        params.append('keywords', query)
        params.append('count', '20')
        params.append('cursor', '0')
        params.append('web', '1')
        params.append('hd', '1')

        const response = await axios({
            url: "https://tikwm.com/api/feed/search",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            },
            data: params
        })

        const res = response.data
        
        if (!res.data || !res.data.videos || res.data.videos.length === 0) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply(`❌ Klip untuk "${text}" tidak ditemukan.`)
        }

        // Pilih video acak dari hasil pencarian
        let selected = res.data.videos[Math.floor(Math.random() * res.data.videos.length)]
        let videoUrl = 'https://tikwm.com' + selected.play

        // 1. Kirim pesan info pencarian
        await conn.sendMessage(m.chat, { 
            text: `🎬 *CLIP SEARCH*\n\n🔎 *Query:* ${text}\n📌 *Title:* ${selected.title || 'Result'}\n✨ *Punya Yusha*` 
        }, { quoted: m })

        // 2. Generate PTV (Video Bulat)
        let msg = await generateWAMessageContent({
            video: { url: videoUrl }
        }, {
            upload: conn.waUploadToServer
        })

        // 3. Kirim via relayMessage sebagai ptvMessage
        await conn.relayMessage(m.chat, {
            ptvMessage: msg.videoMessage
        }, {
            quoted: m
        })
        
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error(err)
        await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } })
        m.reply("Error: Terjadi kesalahan saat mencari klip.")
    }
}

handler.register = true

export { pluginConfig as config, handler };
