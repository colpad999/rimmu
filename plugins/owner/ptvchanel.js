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

import config from '../../config.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'ptvchanel',
    category: 'owner',
    description: 'Kirim video sebagai PTV ke channel',
    usage: '.ptvch (reply video)',
    example: '.ptvch',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    let video = null
    
    if (m.quoted && m.quoted.isVideo) {
        try {
            video = await m.quoted.download()
        } catch (e) {
            return m.reply(`❌ Gagal download video dari quoted.`)
        }
    } else if (m.isVideo) {
        try {
            video = await m.download()
        } catch (e) {
            return m.reply(`❌ Gagal download video.`)
        }
    }
    
    if (!video) {
        return m.reply(
            `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
            `> Kirim *video* atau *balas video* lalu ketik:\n` +
            `> \`${m.prefix}ptvch\``
        )
    }
    
    const channelId = config.saluran?.id || '120363380765405182@newsletter'
    
    await m.reply(`🕕 *ᴍᴇɴɢɪʀɪᴍ ᴘᴛᴠ ᴋᴇ ᴄʜᴀɴɴᴇʟ...*`)
    
    try {
        await sock.sendMessage(channelId, {
            video: video,
            mimetype: 'video/mp4',
            gifPlayback: true,
            ptv: true
        })
        
        await m.react('✅')
        return m.reply(`✅ *sᴜᴋsᴇs*\n\n> Video berhasil dikirim ke channel sebagai PTV.`)
        
    } catch (err) {
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }