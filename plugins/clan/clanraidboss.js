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
    name: 'clanraidboss',
    category: 'clan',
    description: 'Fight boss clan untuk dapet XP dan reward',
    usage: '.clanboss',
    example: '.clanboss',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 300,
    energi: 5,
    isEnabled: true
}

const BOSSES = {
    1: { name: '🐗 Goblin Chief', hp: 5000, reward: 500, xp: 200, minLevel: 1 },
    2: { name: '🐉 Dragon Whelp', hp: 15000, reward: 1500, xp: 500, minLevel: 3 },
    3: { name: '👹 Ogre Warlord', hp: 30000, reward: 3000, xp: 1000, minLevel: 5 },
    4: { name: '🧙 Lich King', hp: 75000, reward: 7500, xp: 2500, minLevel: 8 },
    5: { name: '🐲 Ancient Dragon', hp: 150000, reward: 15000, xp: 5000, minLevel: 10 }
}

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
    
    const clanLevel = clan.level || 1
    let availableBosses = Object.values(BOSSES).filter(b => b.minLevel <= clanLevel)
    if (availableBosses.length === 0) availableBosses = [BOSSES[1]]
    
    if (!clan.boss) {
        const randomBoss = availableBosses[Math.floor(Math.random() * availableBosses.length)]
        clan.boss = {
            id: randomBoss.name,
            hp: randomBoss.hp,
            maxHp: randomBoss.hp,
            reward: randomBoss.reward,
            xp: randomBoss.xp,
            damage: 0,
            participants: []
        }
        await db.save()
    }
    
    const boss = clan.boss
    const bossData = Object.values(BOSSES).find(b => b.name === boss.id) || BOSSES[1]
    
    if (boss.hp <= 0) {
        delete clan.boss
        await db.save()
        return m.reply(`✅ Boss sudah dikalahkan!\n> Tunggu cooldown untuk spawn boss baru.`)
    }
    
    const userPower = 100 + (user.level || 1) * 10
    const damage = Math.floor(Math.random() * (userPower - 50)) + 50
    const isCrit = Math.random() < 0.15
    const finalDamage = isCrit ? damage * 2 : damage
    
    boss.hp -= finalDamage
    boss.damage += finalDamage
    
    if (!boss.participants.includes(m.sender)) {
        boss.participants.push(m.sender)
    }
    
    let replyText = `⚔️ *ꜰɪɢʜᴛɪɴɢ ʙᴏꜱꜱ!*\n\n`
    replyText += `╭┈┈⬡「 🐉 *ʙᴏꜱꜱ ɪɴꜰᴏ* 」\n`
    replyText += `┃ 👾 Boss: *${boss.id}*\n`
    replyText += `┃ ❤️ HP: ${boss.hp.toLocaleString('id-ID')} / ${boss.maxHp.toLocaleString('id-ID')}\n`
    replyText += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    replyText += `╭┈┈⬡「 💥 *ᴅᴀᴍᴀɢᴇ* 」\n`
    replyText += `┃ 👤 @${m.sender.split('@')[0]}\n`
    replyText += `┃ ⚡ Damage: *${finalDamage.toLocaleString('id-ID')}* ${isCrit ? '(🔥 CRITICAL!)' : ''}\n`
    replyText += `┃ 📊 Total damage clan: *${boss.damage.toLocaleString('id-ID')}*\n`
    replyText += `╰┈┈┈┈┈┈┈┈⬡`
    
    if (boss.hp <= 0) {
        const totalReward = boss.reward + (boss.damage / 100)
        const totalXp = boss.xp
        
        if (!clan.bank) clan.bank = 0
        clan.bank += totalReward
        clan.exp = (clan.exp || 0) + totalXp
        
        const participantBonus = Math.floor(totalReward / boss.participants.length)
        
        replyText += `\n\n🎉 *ʙᴏꜱꜱ ᴅᴇꜰᴇᴀᴛᴇᴅ!*\n\n`
        replyText += `╭┈┈⬡「 🎁 *ʀᴇᴡᴀʀᴅ* 」\n`
        replyText += `┃ 💰 Reward clan: *Rp ${totalReward.toLocaleString('id-ID')}*\n`
        replyText += `┃ 📈 XP clan: *+${totalXp.toLocaleString('id-ID')}*\n`
        replyText += `┃ 👥 Peserta: ${boss.participants.length} orang\n`
        replyText += `┃ 🎁 Bonus peserta: *Rp ${participantBonus.toLocaleString('id-ID')}*/org\n`
        replyText += `╰┈┈┈┈┈┈┈┈⬡`
        
        for (const participant of boss.participants) {
            db.updateKoin(participant, participantBonus)
            if (!clan.memberXP) clan.memberXP = {}
            clan.memberXP[participant] = (clan.memberXP[participant] || 0) + Math.floor(totalXp / boss.participants.length)
        }
        
        delete clan.boss
    }
    
    await db.save()
    await m.reply(replyText, { mentions: [m.sender] })
}

export { pluginConfig as config, handler };
