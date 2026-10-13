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
    name: 'dailyclan',
    category: 'clan',
    description: 'Checkin harian untuk dapet XP clan',
    usage: '.clancheckin',
    example: '.clancheckin',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 86400,
    energi: 0,
    isEnabled: true
}

const BASE_XP = 100
const STREAK_BONUS = 25

async function handler(m) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    
    if (!user.clanId) {
        return m.reply(`❌ Kamu belum punya clan!\n> Buat clan dengan *.clancreate*`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan) {
        return m.reply(`❌ Clan tidak ditemukan!`)
    }
    
    const today = new Date().toDateString()
    if (!clan.checkins) clan.checkins = {}
    if (!clan.memberXP) clan.memberXP = {}
    
    if (clan.checkins[m.sender] === today) {
        return m.reply(`✅ Kamu sudah checkin hari ini!\n> Kembali besok untuk dapat XP lagi!`)
    }
    
    let streak = clan.checkinStreak?.[m.sender] || 0
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const lastCheckin = clan.lastCheckin?.[m.sender]
    
    if (lastCheckin === yesterday.toDateString()) {
        streak++
    } else {
        streak = 1
    }
    
    const bonusXP = streak * STREAK_BONUS
    const totalXP = BASE_XP + bonusXP
    
    if (!clan.checkinStreak) clan.checkinStreak = {}
    if (!clan.lastCheckin) clan.lastCheckin = {}
    
    clan.checkins[m.sender] = today
    clan.checkinStreak[m.sender] = streak
    clan.lastCheckin[m.sender] = today
    clan.exp = (clan.exp || 0) + totalXP
    clan.memberXP[m.sender] = (clan.memberXP[m.sender] || 0) + totalXP
    
    await db.save()
    
    let txt = `✅ *ᴄʟᴀɴ ᴄʜᴇᴄᴋɪɴ!*\n\n`
    txt += `╭┈┈⬡「 📋 *ʜᴀꜱɪʟ* 」\n`
    txt += `┃ 📛 Clan: *${clan.name}*\n`
    txt += `┃ 👤 Member: @${m.sender.split('@')[0]}\n`
    txt += `┃ 🔥 Streak: *${streak} hari*\n`
    txt += `┃ 🎁 XP didapat: *+${totalXP}*\n`
    txt += `┃   └ Base: ${BASE_XP} + Bonus: ${bonusXP}\n`
    txt += `┃ 📈 Total XP clan: *${(clan.exp || 0).toLocaleString('id-ID')}*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt, { mentions: [m.sender] })
}

export { pluginConfig as config, handler };
