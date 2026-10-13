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

const config = {
    name: 'rankcurrency',
    category: 'economy',
    description: 'Lihat leaderboard per mata uang',
    usage: '.topcurrency <matauang>',
    example: '.topcurrency idr',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const CURRENCIES = {
    usd: { name: 'Dollar', symbol: '$' }, idr: { name: 'Rupiah', symbol: 'Rp' },
    yen: { name: 'Yen', symbol: '¥' }, yuan: { name: 'Yuan', symbol: '¥' },
    riyal: { name: 'Riyal', symbol: '﷼' }, won: { name: 'Won', symbol: '₩' },
    rupee: { name: 'Rupee', symbol: '₹' }, ringgit: { name: 'Ringgit', symbol: 'RM' },
    baht: { name: 'Baht', symbol: '฿' }
}

async function handler(m) {
    const db = getDatabase()
    const args = m.text?.trim().split(/\s+/)
    const currency = args[0]?.toLowerCase()
    
    if (!currency || !CURRENCIES[currency]) {
        return m.reply(`🏆 *ᴛᴏᴘ ᴄᴜʀʀᴇɴᴄʏ*\n\n> Lihat leaderboard per mata uang\n\n> Contoh: .topcurrency idr\n> Contoh: .topcurrency usd\n\n> Mata uang: ${Object.keys(CURRENCIES).join(', ')}`)
    }
    
    const users = db.db.data.users || {}
    
    const userValues = []
    for (const [userId, userData] of Object.entries(users)) {
        const amount = userData.wallet?.[currency] || 0
        if (amount > 0) {
            userValues.push({
                id: userId,
                name: userData.name || userId.split('@')[0],
                amount: amount
            })
        }
    }
    
    userValues.sort((a, b) => b.amount - a.amount)
    const top10 = userValues.slice(0, 10)
    
    let txt = `🏆 *ᴛᴏᴘ ${currency.toUpperCase()}*\n\n`
    txt += `╭┈┈⬡「 💰 *${CURRENCIES[currency].symbol} ${currency.toUpperCase()}* 」\n`
    
    for (let i = 0; i < top10.length; i++) {
        const user = top10[i]
        const medal = i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : '📌'
        txt += `┃ ${medal} ${i+1}. *${user.name}*\n`
        txt += `┃    └ ${CURRENCIES[currency].symbol} ${user.amount.toLocaleString('id-ID')}\n`
    }
    
    if (top10.length === 0) {
        txt += `┃ ❌ Belum ada yang punya ${currency.toUpperCase()}\n`
    }
    
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt)
}
export { config, handler };