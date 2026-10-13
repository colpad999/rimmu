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

import { getDatabase } from '../../src/lib/rimuru-database.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'bangroup',
    category: 'group',
    description: 'Ban grup dari penggunaan bot (hanya owner yang bisa akses)',
    usage: '.banchat',
    example: '.banchat',
    isOwner: true,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const cmd = m.command.toLowerCase()
    const isUnban = ['unbanchat', 'unbangroup'].includes(cmd)
    
    try {
        const groupMeta = m.groupMetadata
        const groupName = groupMeta.subject || 'Unknown'
        const groupData = db.getGroup(m.chat) || {}
        
        if (isUnban) {
            if (!groupData.isBanned) {
                return m.reply(
                    `⚠️ *ɢʀᴜᴘ ᴛɪᴅᴀᴋ ᴅɪʙᴀɴ*\n\n` +
                    `> Grup ini tidak dalam status banned.\n` +
                    `> Semua user bisa menggunakan bot.`
                )
            }
            
            db.setGroup(m.chat, { ...groupData, isBanned: false })
            
            return sock.sendMessage(m.chat, {
                text: `✅ *ɢʀᴜᴘ ᴅɪ-ᴜɴʙᴀɴ*\n\n` +
                    `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
                    `┃ 📛 ɢʀᴜᴘ: *${groupName}*\n` +
                    `┃ 📊 sᴛᴀᴛᴜs: *✅ AKTIF*\n` +
                    `┃ 👤 ᴜɴʙᴀɴ ᴏʟᴇʜ: @${m.sender.split('@')[0]}\n` +
                    `╰┈┈⬡\n\n` +
                    `> Semua member sekarang bisa menggunakan bot kembali.`,
                mentions: [m.sender]
            }, { quoted: m })
        }
        
        if (groupData.isBanned) {
            return m.reply(
                `⚠️ *ɢʀᴜᴘ sᴜᴅᴀʜ ᴅɪʙᴀɴ*\n\n` +
                `> Grup ini sudah dalam status banned.\n` +
                `> Gunakan \`.unbanchat\` untuk membuka akses.`
            )
        }
        
        db.setGroup(m.chat, { ...groupData, isBanned: true })
        
        await m.reply(`🚫 *ɢʀᴜᴘ ᴅɪʙᴀɴ*\n\n` +
                `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
                `┃ 📛 ɢʀᴜᴘ: *${groupName}*\n` +
                `┃ 📊 sᴛᴀᴛᴜs: *🔴 BANNED*\n` +
                `┃ 👤 ʙᴀɴ ᴏʟᴇʜ: @${m.sender.split('@')[0]}\n` +
                `╰┈┈⬡\n\n` +
                `> Member biasa tidak bisa menggunakan bot di grup ini.\n` +
                `> Hanya owner yang bisa menggunakan bot.`, {  mentions: [m.sender] })
        
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }