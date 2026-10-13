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
const pluginConfig = {
    name: 'levelclan',
    category: 'clan',
    description: 'Lihat level clan',
    usage: '.clanlevel',
    example: '.clanlevel',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

function getLevelInfo(exp) {
    const level = Math.floor(Math.sqrt(exp / 100)) + 1
    const currentLevelExp = 100 * Math.pow(level - 1, 2)
    const nextLevelExp = 100 * Math.pow(level, 2)
    const expToNext = nextLevelExp - exp
    
    return { level, currentLevelExp, nextLevelExp, expToNext }
}

function getLevelBadge(level) {
    if (level >= 50) return '👑'
    if (level >= 40) return '💎'
    if (level >= 30) return '⭐'
    if (level >= 20) return '🌟'
    if (level >= 10) return '✨'
    if (level >= 5) return '💫'
    return '🌱'
}

async function handler(m) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    const args = m.text?.trim().split(/\s+/)
    
    let targetClan = null
    let targetId = null
    
    if (args[0]) {
        const clanName = args.join(' ')
        targetClan = Object.values(db.db.data.clans).find(c => c.name.toLowerCase() === clanName.toLowerCase())
        if (targetClan) targetId = targetClan.id
    }
    
    if (!targetId && user.clanId) {
        targetId = user.clanId
        targetClan = db.db.data.clans[targetId]
    }
    
    if (!targetClan) {
        return m.reply(`❌ Kamu belum punya clan atau clan tidak ditemukan!\n> Buat clan dengan *.clancreate*`)
    }
    
    const exp = targetClan.exp || 0
    const { level, expToNext, nextLevelExp } = getLevelInfo(exp)
    const badge = getLevelBadge(level)
    const progressPercent = (exp / nextLevelExp) * 100
    const progressBar = '█'.repeat(Math.floor(progressPercent / 10)) + '░'.repeat(10 - Math.floor(progressPercent / 10))
    
    let txt = `${badge} *ᴄʟᴀɴ ʟᴇᴠᴇʟ*\n\n`
    txt += `╭┈┈⬡「 📊 *ꜱᴛᴀᴛꜱ* 」\n`
    txt += `┃ 📛 Nama: *${targetClan.name}*\n`
    txt += `┃ 🏆 Level: *${level}* ${badge}\n`
    txt += `┃ 📈 XP: *${exp.toLocaleString('id-ID')}* / ${nextLevelExp.toLocaleString('id-ID')}\n`
    txt += `┃ 📊 Progress: [${progressBar}] ${progressPercent.toFixed(1)}%\n`
    txt += `┃ 🎯 Sisa XP ke level ${level + 1}: *${expToNext.toLocaleString('id-ID')}*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
