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
    name: 'waifurandom',
    category: 'anime',
    description: 'Random gambar waifu dari berbagai sumber',
    usage: '.waifu',
    example: '.waifu',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

// Multiple sources untuk random waifu (biar gak monoton)
const WAIFU_SOURCES = [
    'https://api.waifu.pics/sfw/waifu',
    'https://api.waifu.pics/sfw/neko',
    'https://api.waifu.pics/sfw/shinobu',
    'https://api.waifu.pics/sfw/megumin',
    'https://nekos.life/api/v2/img/waifu',
    'https://nekos.life/api/v2/img/neko'
]

async function getRandomWaifu() {
    try {
        // Coba dari sumber pertama
        const randomSource = WAIFU_SOURCES[Math.floor(Math.random() * WAIFU_SOURCES.length)]
        
        if (randomSource.includes('waifu.pics')) {
            const response = await axios.get(randomSource)
            return { url: response.data.url, source: 'waifu.pics' }
        } else if (randomSource.includes('nekos.life')) {
            const response = await axios.get(randomSource)
            return { url: response.data.url, source: 'nekos.life' }
        }
        
        // Fallback ke api tambahan
        const fallback = await axios.get('https://api.waifu.im/search?included_tags=waifu&height=>=800')
        if (fallback.data?.images?.[0]?.url) {
            return { url: fallback.data.images[0].url, source: 'waifu.im' }
        }
        
        return null
    } catch (err) {
        console.error('[Waifu] Error:', err.message)
        
        // Fallback terakhir: gambar waifu dari GitHub
        const backupImages = [
            'https://i.pinimg.com/originals/e3/30/66/e33066f3cdbddd7ba3e37d2d576e8b66.jpg',
            'https://i.pinimg.com/originals/9b/2d/65/9b2d652e8f9742d6e6767a5eb3424df6.png',
            'https://i.pinimg.com/originals/ee/c1/d8/eec1d883e44ef0a61d11fc6fe3c6d827.jpg',
            'https://i.pinimg.com/originals/7d/cd/4e/7dcd4eedebe7da3d4e9567ede11439e8.jpg',
            'https://i.pinimg.com/originals/42/ca/20/42ca20ce567b97ac89eec4e7ed79f1e1.png'
        ]
        return { url: backupImages[Math.floor(Math.random() * backupImages.length)], source: 'fallback' }
    }
}

async function handler(m, { sock }) {
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Rimuru:* Lagi nyari gambar waifu darling~ tunggu sebentar yaa 🦋`)
    
    try {
        const result = await getRandomWaifu()
        
        if (!result || !result.url) {
            throw new Error('Gagal mengambil gambar waifu')
        }
        
        await sock.sendMessage(m.chat, {
            image: { url: result.url },
            caption: `💕 *ᴡᴀɪꜰᴜ ʀᴀɴᴅᴏᴍ* 💕\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ 🖼️ *ꜱᴏᴜʀᴄᴇ*: ${result.source}\n` +
                    `┃ 💗 *ᴡᴀɪꜰᴜ*: Untuk Darling tercinta~\n` +
                    `┃\n` +
                    `┃ 💗 *Rimuru:* Ini waifu nya darling~ jangan liat yang lain ya! 😘\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[Waifu] Error:', err)
        m.react('💔')
        return m.reply(
            `💔 *ᴇʀʀᴏʀ*\n\n` +
            `> ${err.message}\n\n` +
            `> Coba lagi ya darling~ 🥺`
        )
    }
}

export { pluginConfig as config, handler };
