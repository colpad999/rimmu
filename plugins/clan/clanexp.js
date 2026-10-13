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
    name: 'clanexp',
    category: 'clan',
    description: 'Lihat XP clan dan kontribusi member',
    usage: '.clanxp',
    example: '.clanxp',
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
        return m.reply(`❌ Kamu belum punya clan!\n> Buat clan dengan *.clancreate*`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan) {
        return m.reply(`❌ Clan tidak ditemukan!`)
    }
    
    const memberContributions = {}
    if (clan.memberXP) {
        for (const member of clan.members) {
            memberContributions[member] = clan.memberXP[member] || 0
        }
    }
    
    const sortedMembers = Object.entries(memberContributions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    
    let txt = `📊 *ᴄʟᴀɴ ᴇxᴘ & ᴄᴏɴᴛʀɪʙᴜᴛɪᴏɴ*\n\n`
    txt += `╭┈┈⬡「 🏰 *ɪɴꜰᴏ ᴄʟᴀɴ* 」\n`
    txt += `┃ 📛 Nama: *${clan.name}*\n`
    txt += `┃ 📈 Total XP: *${(clan.exp || 0).toLocaleString('id-ID')}*\n`
    txt += `┃ 👥 Total Member: *${clan.members.length}*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    if (sortedMembers.length > 0) {
        txt += `╭┈┈⬡「 🎖️ *ᴛᴏᴘ ᴄᴏɴᴛʀɪʙᴜᴛᴏʀ* 」\n`
        for (let i = 0; i < sortedMembers.length; i++) {
            const [memberId, xp] = sortedMembers[i]
            const userData = db.getUser(memberId)
            const name = userData?.name || memberId.split('@')[0]
            const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : '📌'
            txt += `┃ ${medal} ${i+1}. *${name}*\n`
            txt += `┃    └ XP: ${xp.toLocaleString('id-ID')}\n`
        }
        txt += `╰┈┈┈┈┈┈┈┈⬡`
    } else {
        txt += `> Belum ada kontribusi XP dari member`
    }
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
