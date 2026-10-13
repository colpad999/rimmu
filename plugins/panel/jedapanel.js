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
const pluginConfig = {
    name: 'jedapanel',
    category: 'panel',
    description: 'Set jeda waktu untuk semua panel create command',
    usage: '.jedacreate <waktu>',
    example: '.jedacreate 5m',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 0,
    energi: 0,
    isEnabled: true
}

function parseTime(input) {
    if (!input || input === '0') return 0
    
    const match = input.match(/^(\d+)(s|m|h)?$/i)
    if (!match) return null
    
    const value = parseInt(match[1])
    const unit = (match[2] || 's').toLowerCase()
    
    switch (unit) {
        case 's': return value * 1000
        case 'm': return value * 60 * 1000
        case 'h': return value * 60 * 60 * 1000
        default: return value * 1000
    }
}

function formatTime(ms) {
    if (ms <= 0) return 'Tanpa jeda'
    
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours} jam ${minutes % 60} menit`
    if (minutes > 0) return `${minutes} menit ${seconds % 60} detik`
    return `${seconds} detik`
}

function handler(m, { sock }) {
    const db = getDatabase()
    const input = m.text?.trim()
    
    const DEFAULT_JEDA = 5 * 60 * 1000
    
    if (!input) {
        const currentJeda = db.setting('panelCreateJeda') ?? DEFAULT_JEDA
        return m.reply(
            `⏱️ *ᴊᴇᴅᴀ ᴘᴀɴᴇʟ ᴄʀᴇᴀᴛᴇ*\n\n` +
            `╭┈┈⬡「 📋 *ɪɴꜰᴏ* 」\n` +
            `┃ ◦ Jeda saat ini: *${formatTime(currentJeda)}*\n` +
            `┃ ◦ Default: *5 menit*\n` +
            `╰┈┈⬡\n\n` +
            `> Gunakan: \`${m.prefix}jedacreate <waktu>\`\n` +
            `> Contoh: \`${m.prefix}jedacreate 5m\` (5 menit)\n` +
            `> Untuk nonaktifkan: \`${m.prefix}jedacreate 0\`\n\n` +
            `*Format waktu:*\n` +
            `• \`30s\` = 30 detik\n` +
            `• \`5m\` = 5 menit\n` +
            `• \`1h\` = 1 jam`
        )
    }
    
    const jedaMs = parseTime(input)
    
    if (jedaMs === null) {
        return m.reply(`❌ Format waktu tidak valid!\n\n> Contoh: 30s, 5m, 1h`)
    }
    
    db.setting('panelCreateJeda', jedaMs)
    db.setting('panelCreateLastUsed', 0)
    
    m.react('✅')
    
    if (jedaMs === 0) {
        return m.reply(
            `✅ *ᴊᴇᴅᴀ ᴅɪɴᴏɴᴀᴋᴛɪꜰᴋᴀɴ*\n\n` +
            `> Panel create sekarang tanpa jeda`
        )
    }
    
    return m.reply(
        `✅ *ᴊᴇᴅᴀ ᴅɪsᴇᴛ*\n\n` +
        `╭┈┈⬡「 ⏱️ *ᴋᴏɴꜰɪɢ* 」\n` +
        `┃ ◦ Jeda: *${formatTime(jedaMs)}*\n` +
        `╰┈┈⬡\n\n` +
        `> Setelah panel dibuat, SEMUA user harus menunggu ${formatTime(jedaMs)} sebelum bisa create lagi.`
    )
}

export { pluginConfig as config, handler }