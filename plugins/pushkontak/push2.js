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

import fs from 'fs';
import path from 'path';
import { getDatabase } from '../../src/lib/rimuru-database.js';
import { getGroupMode } from '../group/botmode.js';

const pluginConfig = {
    name: 'push2',
    category: 'pushkontak',
    description: 'Push pesan dengan nama kontak ke semua member grup',
    usage: '.pushkontak2 <pesan>|<namakontak>',
    example: '.pushkontak2 Halo!|TokoBaru',
    isOwner: true,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const groupMode = getGroupMode(m.chat, db)
    
    if (groupMode !== 'pushkontak') {
        return m.reply(`❌ *ᴍᴏᴅᴇ ᴛɪᴅᴀᴋ sᴇsᴜᴀɪ*\n\n> Aktifkan mode pushkontak terlebih dahulu\n\n\`${m.prefix}botmode pushkontak\``)
    }
    
    const input = m.text?.trim()
    if (!input || !input.includes('|')) {
        return m.reply(`📢 *ᴘᴜsʜ ᴋᴏɴᴛᴀᴋ 2*\n\n> Format: pesan|namakontak\n\n\`Contoh: ${m.prefix}pushkontak2 Halo semuanya!|TokoBaru\``)
    }
    
    const [text, namaKontak] = input.split('|').map(s => s.trim())
    
    if (!text || !namaKontak) {
        return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Format salah. Gunakan: pesan|namakontak`)
    }
    
    if (global.statuspush) {
        return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Pushkontak sedang berjalan. Ketik \`${m.prefix}stoppush\` untuk menghentikan.`)
    }
    
    m.react('📢')
    
    try {
        const metadata = await sock.groupMetadata(m.chat)
        const participants = metadata.participants
            .map(p => p.jid || p.id)
            .filter(id => id !== sock.user.id.split(':')[0] + '@s.whatsapp.net')
            .filter(id => !id.includes(m.sender))
        
        if (participants.length === 0) {
            m.react('❌')
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Tidak ada member yang bisa dikirim`)
        }
        
        const jedaPush = db.setting('jedaPush') || 5000
        
        await m.reply(
            `📢 *ᴘᴜsʜ ᴋᴏɴᴛᴀᴋ 2*\n\n` +
            `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
            `┃ 📝 ᴘᴇsᴀɴ: \`${text.substring(0, 50)}${text.length > 50 ? '...' : ''}\`\n` +
            `┃ 👤 ɴᴀᴍᴀ: \`${namaKontak}\`\n` +
            `┃ 👥 ᴛᴀʀɢᴇᴛ: \`${participants.length}\` member\n` +
            `┃ ⏱️ ᴊᴇᴅᴀ: \`${jedaPush}ms\`\n` +
            `╰┈┈⬡\n\n` +
            `> Memulai push dengan kontak...`
        )
        
        global.statuspush = true
        let successCount = 0
        let failedCount = 0
        
        function randomKode(length) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let result = ''
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return result
        }
        
        for (const member of participants) {
            if (global.stoppush) {
                delete global.stoppush
                delete global.statuspush
                
                await m.reply(
                    `⏹️ *ᴘᴜsʜ ᴅɪʜᴇɴᴛɪᴋᴀɴ*\n\n` +
                    `> ✅ Berhasil: \`${successCount}\`\n` +
                    `> ❌ Gagal: \`${failedCount}\``
                )
                return
            }
            
            try {
                const memberNumber = member.split('@')[0]
                const kodeUnik = randomKode(6)
                const pesan = `${text}\n\n#${kodeUnik}`
                
                const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${namaKontak} - ${memberNumber}
TEL;type=CELL;type=VOICE;waid=${memberNumber}:+${memberNumber}
END:VCARD`
                
                await sock.sendMessage(member, { text: pesan })
                
                await sock.sendMessage(member, {
                    contacts: {
                        displayName: namaKontak,
                        contacts: [{
                            displayName: namaKontak,
                            vcard: vcard
                        }]
                    }
                })
                
                successCount++
            } catch (err) {
                failedCount++
            }
            
            await new Promise(resolve => setTimeout(resolve, jedaPush))
        }
        
        delete global.statuspush
        
        m.react('✅')
        await m.reply(
            `✅ *ᴘᴜsʜ sᴇʟᴇsᴀɪ*\n\n` +
            `╭┈┈⬡「 📊 *ʜᴀsɪʟ* 」\n` +
            `┃ ✅ ʙᴇʀʜᴀsɪʟ: \`${successCount}\`\n` +
            `┃ ❌ ɢᴀɢᴀʟ: \`${failedCount}\`\n` +
            `┃ 📊 ᴛᴏᴛᴀʟ: \`${participants.length}\`\n` +
            `╰┈┈⬡`
        )
        
    } catch (error) {
        delete global.statuspush
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}
export { pluginConfig as config, handler };