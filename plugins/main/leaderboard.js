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
    name: 'leaderboard',
    category: 'main',
    description: 'Lihat leaderboard global (koin, exp, energi)',
    usage: '.leaderboard',
    example: '.topkoin',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

function formatNumber(num) {
    if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + 'T'
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B'
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const MEDALS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

async function handler(m, { sock }) {
    const db = getDatabase()
    const cmd = m.command.toLowerCase()
    const args = m.args || []
    
    let type = 'overview'
    
    if (cmd.includes('koin') || cmd.includes('coin') || cmd.includes('bal') || cmd.includes('money')) {
        type = 'koin'
    } else if (cmd.includes('exp') || cmd.includes('xp') || cmd.includes('level')) {
        type = 'exp'
    } else if (cmd.includes('energi') || cmd.includes('energy')) {
        type = 'energi'
    } else if (args[0]) {
        const argType = args[0].toLowerCase()
        if (['koin', 'coin', 'bal', 'balance', 'money'].includes(argType)) type = 'koin'
        else if (['exp', 'xp', 'level'].includes(argType)) type = 'exp'
        else if (['energi', 'energy'].includes(argType)) type = 'energi'
    }
    
    const dbData = db.data?.users || db.getAllUsers?.() || {}
    const users = []
    
    for (const [jid, userData] of Object.entries(dbData)) {
        if (!jid || jid === 'undefined') continue
        if (jid.length > 15 || jid.startsWith('120')) continue
        
        users.push({
            jid,
            koin: userData.koin || 0,
            exp: userData.rpg?.exp || userData.exp || 0,
            energi: userData.energi || 0,
            level: userData.rpg?.level || userData.level || 1,
            name: userData.name || jid.split('@')[0]
        })
    }
    
    if (users.length === 0) {
        return m.reply(`📊 *ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ*\n\n> Belum ada data user terdaftar di database.`)
    }
    
    const senderJid = m.sender.replace('@s.whatsapp.net', '')
    
    if (type === 'overview') {
        const totalUsers = users.length
        const maxBalUser = users.reduce((a, b) => a.koin > b.koin ? a : b, users[0])
        const maxExpUser = users.reduce((a, b) => a.exp > b.exp ? a : b, users[0])
        const maxEnergiUser = users.reduce((a, b) => a.energi > b.energi ? a : b, users[0])
        
        const mentions = [
            maxBalUser.jid.includes('@') ? maxBalUser.jid : maxBalUser.jid + "@s.whatsapp.net",
            maxExpUser.jid.includes('@') ? maxExpUser.jid : maxExpUser.jid + "@s.whatsapp.net",
            maxEnergiUser.jid.includes('@') ? maxEnergiUser.jid : maxEnergiUser.jid + "@s.whatsapp.net"
        ]
        
        const overviewText = `🏆 *LEADERBOARD OVERVIEW* 🏆\n\n` +
            `_Pilih tombol di bawah untuk melihat ranking!_`
            try {
                await sock.sendButton(m.chat, config.assets?.["rimuru"], overviewText, m, {
                    buttons: [
                    {
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: '💰 Top Koin',
                            id: `${m.prefix}topkoin`
                        })
                    },
                    {
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: '✨ Top EXP',
                            id: `${m.prefix}topexp`
                        })
                    },
                    {
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: '⚡ Top Energi',
                            id: `${m.prefix}topenergi`
                        })
                    }
                ],
            })
            return
        } catch (e) {
            return m.reply(overviewText, { mentions })
        }
    }
    
    let title, emoji, field, formatValue
    
    if (type === 'koin') {
        title = 'TOP GLOBAL KOIN'
        emoji = '💰'
        field = 'koin'
        formatValue = (u) => `Rp ${formatNumber(u.koin)}`
    } else if (type === 'exp') {
        title = 'TOP GLOBAL LEVEL'
        emoji = '✨'
        field = 'exp'
        formatValue = (u) => `Lv. ${u.level} (${formatNumber(u.exp)} XP)`
    } else if (type === 'energi') {
        title = 'TOP GLOBAL ENERGI'
        emoji = '⚡'
        field = 'energi'
        formatValue = (u) => `${formatNumber(u.energi)} Energi`
    }
    
    users.sort((a, b) => b[field] - a[field])
    
    const top10 = users.slice(0, 10)
    const totalField = users.reduce((sum, u) => sum + (u[field] || 0), 0)
    
    let text = `🏆 *${title}* 🏆\n\n`
    text += `Peringkat para penguasa tertinggi saat ini!\n\n`
    text += `╭┈┈⬡「 ${emoji} *RANKING* 」\n`
    
    const mentions = []
    
    top10.forEach((u, i) => {
        const medal = MEDALS[i] || `${i + 1}.`
        const pct = totalField > 0 ? ((u[field] / totalField) * 100).toFixed(1) : 0
        const isMe = u.jid === senderJid ? " *(You)*" : ""
        
        text += `┃ ${medal} @${u.jid.split('@')[0]}${isMe}\n`
        text += `┃    └ ${formatValue(u)} (${pct}%)\n`
        
        if (i < top10.length - 1) text += `┃\n`
        mentions.push(u.jid.includes('@') ? u.jid : u.jid + "@s.whatsapp.net")
    })
    
    text += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    const myRankIndex = users.findIndex(u => u.jid === senderJid)
    if (myRankIndex !== -1) {
        text += `> Posisi kamu: *#${myRankIndex + 1}* dari *${formatNumber(users.length)}* user.`
    } else {
        text += `> Kamu belum terdaftar di database.`
    }
    
    await m.reply(text, { mentions })
}

export { pluginConfig as config, handler }