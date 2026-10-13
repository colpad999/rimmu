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


import config from '../../config.js';
import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'antivirtexgc',
    category: 'group',
    description: 'Hapus otomatis pesan yang mengandung karakter aneh/virtex di grup',
    usage: '.antivirtex on/off',
    example: '.antivirtex on',
    isAdmin: true,
    isGroup: true,
    cooldown: 3,
    isEnabled: true
}

function isVirtex(text) {
    if (!text || typeof text !== 'string') return false
    
    const virtexPatterns = [
        /[\x00-\x1F\x7F]/g,
        /[\u200B-\u200D\uFEFF]/g,
        /[\uD800-\uDFFF]{2,}/g,
        /[^\x20-\x7E\x0A\x0D\u0600-\u06FF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g,
        /(.)\1{20,}/g,
        /.{500,}/g,
        /[\u2000-\u200F\uFEFF\u00AD-\uFFFF]/g,
        /[\u0300-\u036F]{5,}/g
    ]    
    for (const pattern of virtexPatterns) {
        if (pattern.test(text)) return true
    }
    
    let unicodeCount = 0
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i)
        if (code > 0x7F && code < 0x0600) unicodeCount++
        if (code > 0x06FF && code < 0x4E00) unicodeCount++
        if (code > 0x9FFF && code < 0x3040) unicodeCount++
        if (code > 0x30FF && code < 0x1100) unicodeCount++
    }
    if (unicodeCount > text.length * 0.7) return true
    
    return false
}

async function handler(m, { sock, db }) {
    const args = m.args || []
    const mode = args[0]?.toLowerCase()
    
    const groupData = db.getGroup(m.chat) || {}
    const currentStatus = groupData.antivirtex === true
    
    if (mode === 'on') {
        if (currentStatus) {
            return m.reply(
                `⚠️ *ᴀɴᴛɪᴠɪʀᴛᴇx ᴀʟʀᴇᴀᴅʏ ᴀᴄᴛɪᴠᴇ*\n\n` +
                `> Status: *✅ ON*\n` +
                `> Anti virtex sudah aktif di grup ini.`
            )
        }
        db.setGroup(m.chat, { antivirtex: true })
        m.react('✅')
        return m.reply(
            `✅ *ᴀɴᴛɪᴠɪʀᴛᴇx ᴀᴋᴛɪꜰ*\n\n` +
            `> Pesan yang mengandung karakter aneh/virtex akan otomatis dihapus.\n` +
            `> Gunakan \`.antivirtex off\` untuk menonaktifkan.`
        )
    }
    
    if (mode === 'off') {
        if (!currentStatus) {
            return m.reply(
                `⚠️ *ᴀɴᴛɪᴠɪʀᴛᴇx ᴀʟʀᴇᴀᴅʏ ɪɴᴀᴄᴛɪᴠᴇ*\n\n` +
                `> Status: *❌ OFF*\n` +
                `> Anti virtex sudah nonaktif di grup ini.`
            )
        }
        db.setGroup(m.chat, { antivirtex: false })
        m.react('❌')
        return m.reply(
            `❌ *ᴀɴᴛɪᴠɪʀᴛᴇx ɴᴏɴᴀᴋᴛɪꜰ*\n\n` +
            `> Pesan virtex tidak akan dihapus lagi.`
        )
    }
    
    const status = currentStatus ? '✅ AKTIF' : '❌ NONAKTIF'
    
    m.reply(
        `🛡️ *ᴀɴᴛɪᴠɪʀᴛᴇx*\n\n` +
        `╭┈┈⬡「 📋 *sᴛᴀᴛᴜs* 」\n` +
        `┃ 🔔 sᴛᴀᴛᴜs: ${status}\n` +
        `╰┈┈⬡\n\n` +
        `> *Penggunaan:*\n` +
        `> \`${m.prefix}antivirtex on\` - Aktifkan\n` +
        `> \`${m.prefix}antivirtex off\` - Nonaktifkan`
    )
}

async function antivirtexListener(sock) {
    const db = getDatabase()
    
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return
        
        for (const msg of messages) {
            try {
                const jid = msg.key?.remoteJid
                if (!jid || !jid.endsWith('@g.us')) continue
                
                const groupData = db.getGroup(jid) || {}
                if (!groupData.antivirtex) continue
                
                let text = ''
                const message = msg.message
                
                if (message?.conversation) text = message.conversation
                else if (message?.extendedTextMessage?.text) text = message.extendedTextMessage.text
                else if (message?.imageMessage?.caption) text = message.imageMessage.caption
                else if (message?.videoMessage?.caption) text = message.videoMessage.caption
                else if (message?.documentMessage?.caption) text = message.documentMessage.caption
                
                if (text && isVirtex(text)) {
                    await sock.sendMessage(jid, { delete: msg.key })
                    
                    const sender = msg.key.participant || msg.participant || msg.key.remoteJid
                    await sock.sendMessage(jid, {
                        text: `🚫 *ᴠɪʀᴛᴇx ᴅᴇᴛᴇᴄᴛᴇᴅ*\n\n> Pesan dari @${sender?.split('@')[0]} telah dihapus karena mengandung karakter aneh/virtex!`,
                        mentions: [sender]
                    })
                    
                    console.log(`[AntiVirtex] Pesan virtex dihapus di ${jid} dari ${sender}`)
                }
            } catch (err) {
                console.error('[AntiVirtex] Error:', err.message)
            }
        }
    })
    
    console.log('✅ AntiVirtex Listener siap!')
}

export { pluginConfig as config, handler, antivirtexListener };
