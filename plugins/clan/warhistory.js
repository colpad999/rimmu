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
    name: 'warhistory',
    category: 'clan',
    description: 'Lihat riwayat clan war',
    usage: '.clanwarhistory',
    example: '.clanwarhistory',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    
    if (!user.clanId) {
        return m.reply(`❌ Kamu belum punya clan!`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan) {
        return m.reply(`❌ Clan tidak ditemukan!`)
    }
    
    if (!db.db.data.warHistory) db.db.data.warHistory = []
    
    const warHistory = db.db.data.warHistory
        .filter(war => war.attacker === clan.id || war.defender === clan.id)
        .slice(-10)
        .reverse()
    
    if (warHistory.length === 0) {
        return m.reply(`📜 *ʀɪᴡᴀʏᴀᴛ ᴡᴀʀ*\n\n> Clan *${clan.name}* belum memiliki riwayat perang!`)
    }
    
    let txt = `📜 *ʀɪᴡᴀʏᴀᴛ ᴡᴀʀ* [${clan.name}]\n\n`
    
    for (let i = 0; i < warHistory.length; i++) {
        const war = warHistory[i]
        const isAttacker = war.attacker === clan.id
        const opponentId = isAttacker ? war.defender : war.attacker
        const opponent = db.db.data.clans[opponentId]
        const opponentName = opponent?.name || 'Unknown Clan'
        
        const isWin = (isAttacker && war.attackerScore > war.defenderScore) || 
                      (!isAttacker && war.defenderScore > war.attackerScore)
        
        const result = isWin ? '✅ WIN' : '❌ LOSE'
        const date = new Date(war.endTime).toLocaleDateString('id-ID')
        
        txt += `╭┈┈⬡「 ${i+1} 」\n`
        txt += `┃ 📅 ${date}\n`
        txt += `┃ 🆚 Vs *${opponentName}*\n`
        txt += `┃ 📊 ${war.attackerScore} - ${war.defenderScore}\n`
        txt += `┃ 🎯 *${result}*\n`
        txt += `╰┈┈┈┈┈┈┈┈⬡\n`
        if (i < warHistory.length - 1) txt += `\n`
    }
    
    const wins = warHistory.filter(war => {
        const isAttacker = war.attacker === clan.id
        return (isAttacker && war.attackerScore > war.defenderScore) || 
               (!isAttacker && war.defenderScore > war.attackerScore)
    }).length
    
    const totalWars = warHistory.length
    const winRate = Math.floor((wins / totalWars) * 100)
    
    txt += `\n╭┈┈⬡「 📊 *ᴛᴏᴛᴀʟ* 」\n`
    txt += `┃ 🏆 Menang: *${wins}*\n`
    txt += `┃ 📉 Kalah: *${totalWars - wins}*\n`
    txt += `┃ 📈 Win rate: *${winRate}%*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
