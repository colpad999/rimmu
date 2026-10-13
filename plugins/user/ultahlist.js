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
import config from '../../config.js'
const pluginConfig = {
    name: 'ultahlist',
    category: 'user',
    description: 'Lihat daftar ulang tahun member',
    usage: '.birthdaylist',
    example: '.birthdaylist',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const groupMeta = m.groupMetadata
    const participants = groupMeta.participants.map(p => p.id)
    
    const birthdays = []
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()
    
    for (const jid of participants) {
        const user = db.getUser(jid)
        if (user?.birthday) {
            const [day, month] = user.birthday.split('-').map(Number)
            birthdays.push({
                jid,
                day,
                month,
                name: user.name || jid.split('@')[0]
            })
        }
    }
    
    if (birthdays.length === 0) {
        return m.reply(
            `❌ *ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴅᴀᴛᴀ*\n\n` +
            `> Belum ada member yang set birthday\n\n` +
            `> Gunakan: .setbirthday DD-MM`
        )
    }
    
    birthdays.sort((a, b) => {
        const aNext = a.month > currentMonth || (a.month === currentMonth && a.day >= currentDay)
        const bNext = b.month > currentMonth || (b.month === currentMonth && b.day >= currentDay)
        
        if (aNext && !bNext) return -1
        if (!aNext && bNext) return 1
        
        if (a.month !== b.month) return a.month - b.month
        return a.day - b.day
    })
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    
    let text = `╭━━━━━━━━━━━━━━━━━╮\n`
    text += `┃  🎂 *ᴅᴀғᴛᴀʀ ᴜʟᴛᴀʜ*\n`
    text += `╰━━━━━━━━━━━━━━━━━╯\n\n`
    text += `╭┈┈⬡「 📋 *${birthdays.length} ᴍᴇᴍʙᴇʀ* 」\n`
    
    const mentions = []
    
    for (const b of birthdays.slice(0, 15)) {
        const isToday = b.day === currentDay && b.month === currentMonth
        const emoji = isToday ? '🎉' : '🎂'
        text += `┃ ${emoji} ${b.day} ${months[b.month - 1]} - @${b.jid.split('@')[0]}${isToday ? ' *HARI INI!*' : ''}\n`
        mentions.push(b.jid)
    }
    
    if (birthdays.length > 15) {
        text += `┃ ... dan ${birthdays.length - 15} lainnya\n`
    }
    
    text += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    text += `> Set birthday: .setbirthday DD-MM`
    
    await m.reply(text, { mentions })
}

export { pluginConfig as config, handler }