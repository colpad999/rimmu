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

import { getDatabase } from '../../src/lib/rimuru-database.js';
import { getGroupMode } from '../group/botmode.js';

const pluginConfig = {
    name: 'jaser2',
    category: 'jpm',
    description: 'JPM basic tanpa externalAdReply, support reply pesan',
    usage: '.jpmbasic <pesan> atau reply pesan',
    example: '.jpmbasic Halo semuanya! atau reply gambar lalu .jpmbasic',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 30,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    
    if (m.isGroup) {
        const groupMode = getGroupMode(m.chat, db)
        if (groupMode !== 'md') {
            return m.reply(`❌ *ᴍᴏᴅᴇ ᴛɪᴅᴀᴋ sᴇsᴜᴀɪ*\n\n> JPM hanya tersedia di mode MD\n\n\`${m.prefix}botmode md\``)
        }
    }
    
    const quoted = m.quoted
    let text = m.fullArgs?.trim() || m.text?.trim() || ''
    let mediaBuffer = null
    let mediaType = null
    let caption = ''
    
    if (quoted) {
        const quotedType = Object.keys(quoted.message || {})[0]
        const isImage = quoted.isImage || quotedType === 'imageMessage'
        const isVideo = quoted.isVideo || quotedType === 'videoMessage'
        
        if (isImage) {
            try {
                mediaBuffer = await quoted.download()
                mediaType = 'image'
                caption = quoted.message?.imageMessage?.caption || text || ''
            } catch (e) {}
        } else if (isVideo) {
            try {
                mediaBuffer = await quoted.download()
                mediaType = 'video'
                caption = quoted.message?.videoMessage?.caption || text || ''
            } catch (e) {}
        } else {
            const quotedText = quoted.text || quoted.message?.conversation || 
                               quoted.message?.extendedTextMessage?.text || ''
            text = text || quotedText
        }
    }
    
    if (!text && !mediaBuffer) {
        return m.reply(
            `📢 *ᴊᴘᴍ ʙᴀsɪᴄ*\n\n` +
            `> Cara pakai:\n` +
            `> 1. \`${m.prefix}jpmbasic <pesan>\`\n` +
            `> 2. Reply gambar/video lalu \`${m.prefix}jpmbasic\`\n` +
            `> 3. Reply gambar/video dengan caption\n\n` +
            `> Tanpa externalAdReply, simple dan clean`
        )
    }
    
    if (global.statusjpmbasic) {
        return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> JPM Basic sedang berjalan. Ketik \`${m.prefix}stopjpmbasic\` untuk menghentikan.`)
    }
    
    m.react('📢')
    
    try {
        global.isFetchingGroups = true
        const allGroups = await sock.groupFetchAllParticipating()
        global.isFetchingGroups = false
        let groupIds = Object.keys(allGroups)
        
        const blacklist = db.setting('jpmBlacklist') || []
        const blacklistedCount = groupIds.filter(id => blacklist.includes(id)).length
        groupIds = groupIds.filter(id => !blacklist.includes(id))
        
        if (groupIds.length === 0) {
            m.react('❌')
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Tidak ada grup yang ditemukan${blacklistedCount > 0 ? ` (${blacklistedCount} grup di-blacklist)` : ''}`)
        }
        
        const jedaJpm = db.setting('jedaJpmBasic') || 5000
        const displayText = text || caption
        
        await m.reply(
            `📢 *ᴊᴘᴍ ʙᴀsɪᴄ*\n\n` +
            `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
            `┃ 📝 ᴘᴇsᴀɴ: \`${displayText.substring(0, 50)}${displayText.length > 50 ? '...' : ''}\`\n` +
            `┃ 📷 ᴍᴇᴅɪᴀ: \`${mediaBuffer ? mediaType : 'Tidak'}\`\n` +
            `┃ 👥 ᴛᴀʀɢᴇᴛ: \`${groupIds.length}\` grup\n` +
            `┃ ⏱️ ᴊᴇᴅᴀ: \`${jedaJpm}ms\`\n` +
            `┃ 📊 ᴇsᴛɪᴍᴀsɪ: \`${Math.ceil((groupIds.length * jedaJpm) / 60000)} menit\`\n` +
            `╰┈┈⬡\n\n` +
            `> Memulai JPM Basic ke semua grup...`
        )
        
        global.statusjpmbasic = true
        let successCount = 0
        let failedCount = 0
        
        for (const groupId of groupIds) {
            if (global.stopjpmbasic) {
                delete global.stopjpmbasic
                delete global.statusjpmbasic
                
                await m.reply(
                    `⏹️ *ᴊᴘᴍ ʙᴀsɪᴄ ᴅɪʜᴇɴᴛɪᴋᴀɴ*\n\n` +
                    `> ✅ Berhasil: \`${successCount}\`\n` +
                    `> ❌ Gagal: \`${failedCount}\`\n` +
                    `> ⏸️ Sisa: \`${groupIds.length - successCount - failedCount}\``
                )
                return
            }
            
            try {
                if (mediaBuffer && mediaType === 'image') {
                    await sock.sendMessage(groupId, {
                        image: mediaBuffer,
                        caption: caption || text
                    })
                } else if (mediaBuffer && mediaType === 'video') {
                    await sock.sendMessage(groupId, {
                        video: mediaBuffer,
                        caption: caption || text
                    })
                } else {
                    await sock.sendMessage(groupId, { text: text })
                }
                successCount++
            } catch (err) {
                failedCount++
            }
            
            await new Promise(resolve => setTimeout(resolve, jedaJpm))
        }
        
        delete global.statusjpmbasic
        
        m.react('✅')
        await m.reply(
            `✅ *ᴊᴘᴍ ʙᴀsɪᴄ sᴇʟᴇsᴀɪ*\n\n` +
            `╭┈┈⬡「 📊 *ʜᴀsɪʟ* 」\n` +
            `┃ ✅ ʙᴇʀʜᴀsɪʟ: \`${successCount}\`\n` +
            `┃ ❌ ɢᴀɢᴀʟ: \`${failedCount}\`\n` +
            `┃ 📊 ᴛᴏᴛᴀʟ: \`${groupIds.length}\`\n` +
            `╰┈┈⬡`
        )
        
    } catch (error) {
        delete global.statusjpmbasic
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}
export { pluginConfig as config, handler };