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
    name: 'clanraidjoin',
    category: 'clan',
    description: 'Join raid clan dan kill monster',
    usage: '.clanraidjoin',
    example: '.clanraidjoin',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 2,
    isEnabled: true
}

async function handler(m) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    
    if (!user.clanId) {
        return m.reply(`❌ Kamu belum punya clan!`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan || !clan.raid || !clan.raid.active) {
        return m.reply(`❌ Tidak ada raid yang aktif!\n> Leader bisa mulai raid dengan *.clanraid*`)
    }
    
    const raid = clan.raid
    
    if (Date.now() > raid.endTime) {
        raid.active = false
        await db.save()
        return m.reply(`⏰ Raid sudah berakhir!\n> Mulai raid baru dengan *.clanraid*`)
    }
    
    if (raid.kills >= raid.targetKills) {
        raid.active = false
        await db.save()
        return m.reply(`✅ Raid sudah selesai!\n> Semua target sudah terpenuhi.`)
    }
    
    const userPower = 50 + (user.level || 1) * 5
    const kills = Math.floor(Math.random() * (Math.floor(userPower / 20))) + 1
    const finalKills = Math.min(kills, raid.targetKills - raid.kills)
    
    raid.kills += finalKills
    if (!raid.participants.includes(m.sender)) {
        raid.participants.push(m.sender)
    }
    raid.contributions[m.sender] = (raid.contributions[m.sender] || 0) + finalKills
    
    let timeLeft = Math.max(0, Math.floor((raid.endTime - Date.now()) / 1000))
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    
    let replyText = `⚔️ *ʀᴀɪᴅ ᴘʀᴏɢʀᴇꜱꜱ*\n\n`
    replyText += `╭┈┈⬡「 🎯 *ᴋɪʟʟꜱ* 」\n`
    replyText += `┃ 👤 @${m.sender.split('@')[0]}\n`
    replyText += `┃ 💀 Kills: *+${finalKills}*\n`
    replyText += `┃ 📊 Total kills: *${raid.kills} / ${raid.targetKills}*\n`
    replyText += `┃ ⏰ Time left: ${minutes}m ${seconds}s\n`
    replyText += `╰┈┈┈┈┈┈┈┈⬡`
    
    if (raid.kills >= raid.targetKills) {
        raid.active = false
        
        const totalReward = raid.reward + (raid.kills * 100)
        const totalXp = raid.xp
        
        if (!clan.bank) clan.bank = 0
        clan.bank += totalReward
        clan.exp = (clan.exp || 0) + totalXp
        
        const sortedContributors = Object.entries(raid.contributions)
            .sort((a, b) => b[1] - a[1])
        
        replyText += `\n\n🎉 *ʀᴀɪᴅ ᴄᴏᴍᴘʟᴇᴛᴇᴅ!*\n\n`
        replyText += `╭┈┈⬡「 🎁 *ʀᴇᴡᴀʀᴅꜱ* 」\n`
        replyText += `┃ 💰 Reward clan: *Rp ${totalReward.toLocaleString('id-ID')}*\n`
        replyText += `┃ 📈 XP clan: *+${totalXp}*\n`
        replyText += `┃ 👥 Participants: ${raid.participants.length}\n`
        replyText += `╰┈┈┈┈┈┈┈┈⬡\n\n`
        replyText += `╭┈┈⬡「 🏆 *ᴛᴏᴘ ᴋɪʟʟᴇʀꜱ* 」\n`
        
        for (let i = 0; i < Math.min(3, sortedContributors.length); i++) {
            const [participant, killCount] = sortedContributors[i]
            const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'
            replyText += `┃ ${medal} @${participant.split('@')[0]}: ${killCount} kills\n`
        }
        replyText += `╰┈┈┈┈┈┈┈┈⬡`
        
        for (const participant of raid.participants) {
            const bonus = Math.floor(totalReward / raid.participants.length)
            db.updateKoin(participant, bonus)
            if (!clan.memberXP) clan.memberXP = {}
            clan.memberXP[participant] = (clan.memberXP[participant] || 0) + Math.floor(totalXp / raid.participants.length)
        }
    }
    
    await db.save()
    await m.reply(replyText, { mentions: [m.sender] })
}

export { pluginConfig as config, handler };
