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
    name: 'laporanclan',
    category: 'clan',
    description: 'Lihat laporan aktivitas clan',
    usage: '.clanreport',
    example: '.clanreport',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

function getLevelFromExp(exp) {
    return Math.floor(Math.sqrt(exp / 100)) + 1
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
    
    const level = clan.level || getLevelFromExp(clan.exp || 0)
    const totalDonations = clan.bank || 0
    const donors = Object.keys(clan.donations || {}).length
    const totalXP = clan.exp || 0
    
    const memberCount = clan.members?.length || 0
    const onlineMembers = clan.members?.filter(member => {
        const userData = db.getUser(member)
        return userData?.online || false
    }).length || 0
    
    const activity = clan.chatHistory || []
    const last24h = activity.filter(msg => msg.time > Date.now() - (24 * 60 * 60 * 1000)).length
    const last7d = activity.filter(msg => msg.time > Date.now() - (7 * 24 * 60 * 60 * 1000)).length
    
    const topDonorsList = Object.entries(clan.donations || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
    
    const warHistory = db.db.data.warHistory?.filter(war => 
        war.attacker === clan.id || war.defender === clan.id
    ) || []
    
    const wins = warHistory.filter(war => {
        const isAttacker = war.attacker === clan.id
        return (isAttacker && war.attackerScore > war.defenderScore) || 
               (!isAttacker && war.defenderScore > war.attackerScore)
    }).length
    
    const totalWars = warHistory.length
    const winRate = totalWars > 0 ? Math.floor((wins / totalWars) * 100) : 0
    
    let txt = `📊 *ʟᴀᴘᴏʀᴀɴ ᴀᴋᴛɪᴠɪᴛᴀꜱ ᴄʟᴀɴ*\n\n`
    txt += `╭┈┈⬡「 🏰 *ɪɴꜰᴏ ᴜᴍᴜᴍ* 」\n`
    txt += `┃ 📛 Nama: *${clan.name}*\n`
    txt += `┃ 🏆 Level: *${level}*\n`
    txt += `┃ 📈 Total XP: *${totalXP.toLocaleString('id-ID')}*\n`
    txt += `┃ 👥 Member: *${memberCount}* (${onlineMembers} online)\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    txt += `╭┈┈⬡「 💰 *ᴇᴋᴏɴᴏᴍɪ* 」\n`
    txt += `┃ 💵 Total kas: *Rp ${totalDonations.toLocaleString('id-ID')}*\n`
    txt += `┃ 👤 Total donatur: *${donors} orang*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    if (topDonorsList.length > 0) {
        txt += `╭┈┈⬡「 🎖️ *ᴛᴏᴘ ᴅᴏɴᴀᴛᴏʀ* 」\n`
        for (let i = 0; i < topDonorsList.length; i++) {
            const [donorId, amount] = topDonorsList[i]
            const donorData = db.getUser(donorId)
            const name = donorData?.name || donorId.split('@')[0]
            const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'
            txt += `┃ ${medal} ${name}: Rp ${amount.toLocaleString('id-ID')}\n`
        }
        txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    }
    
    txt += `╭┈┈⬡「 💬 *ᴀᴋᴛɪᴠɪᴛᴀꜱ* 」\n`
    txt += `┃ 📱 Chat 24 jam: *${last24h} pesan*\n`
    txt += `┃ 📱 Chat 7 hari: *${last7d} pesan*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    txt += `╭┈┈⬡「 ⚔️ *ᴡᴀʀ ꜱᴛᴀᴛꜱ* 」\n`
    txt += `┃ 🏆 Menang: *${wins}*\n`
    txt += `┃ 📉 Kalah: *${totalWars - wins}*\n`
    txt += `┃ 📈 Win rate: *${winRate}%*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
