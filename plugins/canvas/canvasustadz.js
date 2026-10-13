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

const pluginConfig = {
    name: 'canvasustadz',
    category: 'canvas',
    description: 'Buat quote gaya ustadz',
    usage: '.ustadz <text>',
    example: '.ustadz Jangan lupa sholat',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 2,
    isEnabled: true
}

async function handler(m, { sock }) {
    const text = m.text?.trim()
    
    if (!text) {
        return m.reply(
            `👲 *ᴄᴀɴᴠᴀs ᴜsᴛᴀᴅᴢ*\n\n` +
            `> Masukkan teks untuk dijadikan quote.\n\n` +
            `> Contoh: \`${m.prefix}ustadz Jangan lupa bersyukur\``
        )
    }
    
    m.react('🎨')
    
    try {
        const baseUrl = 'https://api.cuki.biz.id/api/canvas/ustadz'
        const apikey = 'cuki-x'
        
        const response = await axios.get(baseUrl, {
            params: {
                apikey: apikey,
                text: text
            },
            headers: {
                'x-api-key': apikey,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        })

        const data = response.data
        
        if (data.statusCode !== 200 || !data.results?.url) {
            throw new Error(data.message || 'Gagal membuat gambar')
        }
        
        const imageUrl = data.results.url
        
        await sock.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `👲 *ᴜsᴛᴀᴅᴢ sᴀʏs:*\n\n"${text}"`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[Canvas Ustadz]', err)
        m.react('❌')
        m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Maaf, sedang ada gangguan pada server canvas.\n> ${err.message}`)
    }
}
export { pluginConfig as config, handler };