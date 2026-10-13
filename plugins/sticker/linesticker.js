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
import config from '../../config.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'linesticker',
    category: 'sticker',
    description: 'Download sticker pack LINE',
    usage: '.linesticker <url>',
    example: '.linesticker https://store.line.me/stickershop/product/9801/en',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 25,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const url = m.args?.[0]?.trim()
    
    if (!url || !url.includes('store.line.me')) {
        return m.reply(
            `🎨 *ʟɪɴᴇ sᴛɪᴄᴋᴇʀ ᴘᴀᴄᴋ*\n\n` +
            `> Download LINE sticker pack\n\n` +
            `╭┈┈⬡「 📋 *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ* 」\n` +
            `┃ ${m.prefix}linesticker <url>\n` +
            `╰┈┈┈┈┈┈┈┈⬡\n\n` +
            `*ᴄᴀʀᴀ ᴅᴀᴘᴀᴛ ᴜʀʟ:*\n` +
            `> 1. Buka https://store.line.me\n` +
            `> 2. Pilih sticker pack\n` +
            `> 3. Copy URL dari browser\n\n` +
            `*ᴄᴏɴᴛᴏʜ:*\n` +
            `> ${m.prefix}linesticker https://store.line.me/stickershop/product/9801/en`
        )
    }
    
    await m.react('🕕')
    
    try {
        const apikey = config.APIkey?.neoxr
        if (!apikey) {
            await m.react('❌')
            return m.reply(`❌ API Key Neoxr tidak ditemukan di config!`)
        }
        
        const apiUrl = `https://api.neoxr.eu/api/linesticker?url=${encodeURIComponent(url)}&apikey=${apikey}`
        const res = await axios.get(apiUrl, { timeout: 60000 })
        
        if (!res.data?.status || !res.data?.data) {
            await m.react('❌')
            return m.reply(`❌ Gagal mengambil sticker dari URL tersebut!`)
        }
        
        const data = res.data.data
        const title = data.title || 'LINE Sticker'
        const author = data.author || 'Unknown'
        const isAnimated = data.animated || false
        
        const stickerUrls = isAnimated && data.sticker_animation_url?.length
            ? data.sticker_animation_url
            : data.sticker_url || []
        
        if (!stickerUrls.length) {
            await m.react('❌')
            return m.reply(`❌ Tidak ada sticker ditemukan!`)
        }
        
        await m.reply(
            `🎨 *ʟɪɴᴇ sᴛɪᴄᴋᴇʀ ᴘᴀᴄᴋ*\n\n` +
            `╭┈┈⬡「 📦 *ɪɴꜰᴏ* 」\n` +
            `┃ 📝 *Title:* ${title}\n` +
            `┃ 👤 *Author:* ${author}\n` +
            `┃ 🎬 *Animated:* ${isAnimated ? 'Ya' : 'Tidak'}\n` +
            `┃ 📊 *Total:* ${stickerUrls.length}\n` +
            `╰┈┈┈┈┈┈┈┈⬡\n\n` +
            `> 🕕 Mengirim sticker...`
        )
        
        const maxStickers = Math.min(stickerUrls.length, 10)
        const packname = title
        const packAuthor = author
        
        let sent = 0
        for (let i = 0; i < maxStickers; i++) {
            try {
                const response = await axios.get(stickerUrls[i], {
                    responseType: 'arraybuffer',
                    timeout: 30000,
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                })
                const buffer = Buffer.from(response.data)
                
                if (isAnimated) {
                    await sock.sendVideoAsSticker(m.chat, buffer, m, { packname, author: packAuthor })
                } else {
                    await sock.sendImageAsSticker(m.chat, buffer, m, { packname, author: packAuthor })
                }
                sent++
                await new Promise(r => setTimeout(r, 600))
            } catch (e) {
                console.error('[LineSticker] Sticker error:', e.message)
            }
        }
        
        if (sent > 0) {
            await m.react('✅')
            await m.reply(`✅ Berhasil kirim ${sent}/${stickerUrls.length} sticker`)
        } else {
            await m.react('☢')
            await m.reply(`❌ Gagal mengirim sticker`)
        }
        
    } catch (error) {
        console.error('[LineSticker] Error:', error.message)
        await m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }