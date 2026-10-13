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
    name: 'stkrwa',
    category: 'search',
    description: 'Cari sticker WhatsApp',
    usage: '.stikerwa <query>',
    example: '.stikerwa anime',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const query = m.text?.trim()
    
    if (!query) {
        return m.reply(
            `🖼️ *sᴛɪᴋᴇʀ ᴡᴀ sᴇᴀʀᴄʜ*\n\n` +
            `> Masukkan kata kunci pencarian\n\n` +
            `> Contoh: \`${m.prefix}stikerwa anime\``
        )
    }
    
    m.react('🔍')
    
    try {
        const apiKey = config.APIkey?.lolhuman
        
        if (!apiKey) {
            throw new Error('API Key tidak ditemukan di config')
        }
        
        const res = await axios.get(`https://api.lolhuman.xyz/api/stickerwa?apikey=${apiKey}&query=${encodeURIComponent(query)}`, {
            timeout: 30000
        })
        
        if (res.data?.status !== 200 || !res.data?.result?.length) {
            throw new Error('Stiker tidak ditemukan')
        }
        
        const packs = res.data.result.slice(0, 3)
        
        let txt = `🖼️ *sᴛɪᴋᴇʀ ᴡᴀ sᴇᴀʀᴄʜ*\n\n`
        txt += `> Query: *${query}*\n`
        txt += `> Ditemukan: *${res.data.result.length}* pack\n`
        txt += `━━━━━━━━━━━━━━━\n\n`
        
        for (const pack of packs) {
            txt += `╭─「 📦 *${pack.title}* 」\n`
            txt += `┃ 👤 Author: *${pack.author || '-'}*\n`
            txt += `┃ 🔗 ${pack.url}\n`
            txt += `╰━━━━━━━━━━━━━━\n\n`
        }
        
        await m.reply(txt.trim())
        
        const selectedPack = packs[0]
        if (selectedPack.stickers && selectedPack.stickers.length > 0) {
            await m.reply(`⏳ Mengirim ${Math.min(5, selectedPack.stickers.length)} sticker dari pack pertama...`)
            
            const stickersToSend = selectedPack.stickers.slice(0, 2)
            
            for (const stickerUrl of stickersToSend) {
                try {
                    const stickerRes = await axios.get(stickerUrl, {
                        responseType: 'arraybuffer',
                        timeout: 30000
                    })
                    
                    await sock.sendImageAsSticker(m.chat, Buffer.from(stickerRes.data), m, {
                        packname: selectedPack.title || 'rimuru-AI',
                        author: selectedPack.author || 'Bot'
                    })
                    
                    await new Promise(r => setTimeout(r, 500))
                } catch {
                    continue
                }
            }
        }
        
        m.react('✅')
        
    } catch (error) {
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}

export { pluginConfig as config, handler };
