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
    name: 'upgradeclan',
    category: 'clan',
    description: 'Upgrade level clan menggunakan kas clan',
    usage: '.clanupgrade',
    example: '.clanupgrade',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 60,
    energi: 0,
    isEnabled: true
}

function getUpgradeCost(currentLevel) {
    return 50000 * Math.pow(currentLevel, 1.5)
}

function getLevelBenefits(level) {
    const benefits = {
        maxMembers: Math.min(10 + Math.floor(level / 2), 50),
        dailyBonus: 50 + (level * 10),
        warBonus: 5 + Math.floor(level / 2)
    }
    return benefits
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
    
    if (clan.leader !== m.sender && clan.roles?.[m.sender] !== 'coleader') {
        return m.reply(`❌ Hanya *Leader* atau *Co-Leader* yang bisa upgrade clan!`)
    }
    
    const currentLevel = clan.level || 1
    const cost = getUpgradeCost(currentLevel)
    const currentBenefits = getLevelBenefits(currentLevel)
    const nextBenefits = getLevelBenefits(currentLevel + 1)
    
    if ((clan.bank || 0) < cost) {
        return m.reply(`❌ Kas clan tidak cukup!\n\n> Dibutuhkan: *Rp ${cost.toLocaleString('id-ID')}*\n> Kas clan: *Rp ${(clan.bank || 0).toLocaleString('id-ID')}*\n> Kekurangan: *Rp ${(cost - (clan.bank || 0)).toLocaleString('id-ID')}*`)
    }
    
    clan.bank -= cost
    clan.level = currentLevel + 1
    await db.save()
    
    let txt = `⬆️ *ᴄʟᴀɴ ᴜᴘɢʀᴀᴅᴇᴅ!*\n\n`
    txt += `╭┈┈⬡「 📊 *ʜᴀꜱɪʟ ᴜᴘɢʀᴀᴅᴇ* 」\n`
    txt += `┃ 📛 Clan: *${clan.name}*\n`
    txt += `┃ 🏆 Level: *${currentLevel}* → *${clan.level}*\n`
    txt += `┃ 💰 Biaya: *-Rp ${cost.toLocaleString('id-ID')}*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    txt += `╭┈┈⬡「 ✨ *ʙᴇɴᴇꜰɪᴛ ʙᴀʀᴜ* 」\n`
    txt += `┃ 👥 Max member: ${currentBenefits.maxMembers} → ${nextBenefits.maxMembers}\n`
    txt += `┃ 🎁 Daily bonus: +${currentBenefits.dailyBonus} → +${nextBenefits.dailyBonus} XP\n`
    txt += `┃ ⚔️ War bonus: ${currentBenefits.warBonus}% → ${nextBenefits.warBonus}%\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
