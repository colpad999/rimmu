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
    name: 'clanlb',
    category: 'clan',
    description: 'Lihat ranking clan',
    usage: '.clanleaderboard',
    example: '.clanleaderboard',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

function getRankTitle(level) {
    if (level >= 50) return '👑'
    if (level >= 30) return '💎'
    if (level >= 20) return '🏆'
    if (level >= 10) return '🥇'
    if (level >= 5) return '🥈'
    return '🥉'
}

async function handler(m) {
    const db = getDatabase()

    if (!db.db.data.clans) db.db.data.clans = {}

    const clans = Object.values(db.db.data.clans)
    if (clans.length === 0) {
        return m.reply(`🏰 Belum ada clan terdaftar\n\nBuat: *.clancreate <nama>*`)
    }

    clans.sort((a, b) => {
        const scoreA = ((a.wins || 0) * 100) + (a.exp || 0) + ((a.level || 1) * 500)
        const scoreB = ((b.wins || 0) * 100) + (b.exp || 0) + ((b.level || 1) * 500)
        return scoreB - scoreA
    })

    const medals = ['🥇', '🥈', '🥉']

    let txt = `🏰 *CLAN LEADERBOARD*\n\n`

    clans.slice(0, 10).forEach((clan, i) => {
        const medal = medals[i] || `${i + 1}.`
        const totalGames = (clan.wins || 0) + (clan.losses || 0)
        const winRate = totalGames > 0
            ? ((clan.wins / totalGames) * 100).toFixed(0)
            : '—'
        const emblem = clan.emblem || '🏰'
        const rank = getRankTitle(clan.level || 1)

        txt += `${medal} ${emblem} *${clan.name}*\n`
        txt += `   ${rank} Lv.${clan.level || 1} · ${clan.wins || 0}W/${clan.losses || 0}L (${winRate}%) · 👥 ${clan.members.length}\n\n`
    })

    txt += `Total *${clans.length}* clan terdaftar`

    await m.reply(txt)
}

export { pluginConfig as config, handler }