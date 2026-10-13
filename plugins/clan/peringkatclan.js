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
    name: 'peringkatclan',
    category: 'clan',
    description: 'Lihat peringkat clan kamu',
    usage: '.clanrank',
    example: '.clanrank',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
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
    
    const allClans = Object.values(db.db.data.clans)
        .sort((a, b) => {
            if (b.level !== a.level) return (b.level || 1) - (a.level || 1)
            if (b.exp !== a.exp) return (b.exp || 0) - (a.exp || 0)
            return (b.wins || 0) - (a.wins || 0)
        })
    
    const rank = allClans.findIndex(c => c.id === clan.id) + 1
    const totalClans = allClans.length
    const level = clan.level || getLevelFromExp(clan.exp || 0)
    
    let rankIcon = ''
    if (rank === 1) rankIcon = '👑'
    else if (rank === 2) rankIcon = '🥈'
    else if (rank === 3) rankIcon = '🥉'
    else rankIcon = '📊'
    
    const higherClans = allClans.filter((c, i) => i < rank - 1 && i < 3)
    const lowerClans = allClans.filter((c, i) => i > rank - 1 && i < rank + 3)
    
    let txt = `${rankIcon} *ᴘᴇʀɪɴɢᴋᴀᴛ ᴄʟᴀɴ*\n\n`
    txt += `╭┈┈⬡「 🏰 *${clan.name}* 」\n`
    txt += `┃ 🎯 Peringkat: *${rank} / ${totalClans}*\n`
    txt += `┃ 📊 Persentase: *${Math.floor((rank / totalClans) * 100)}%* teratas\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    if (higherClans.length > 0) {
        txt += `╭┈┈⬡「 ⬆️ *ᴄʟᴀɴ ᴅɪ ᴀᴛᴀꜱ* 」\n`
        for (let i = 0; i < higherClans.length; i++) {
            const c = higherClans[i]
            const pos = i + 1
            txt += `┃ ${pos}. *${c.name}* (Level ${c.level || getLevelFromExp(c.exp || 0)})\n`
        }
        txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    }
    
    txt += `╭┈┈⬡「 🎯 *ᴄʟᴀɴ ᴋᴀᴍᴜ* 」\n`
    txt += `┃ 📛 *${clan.name}*\n`
    txt += `┃ 🏆 Level: *${level}*\n`
    txt += `┃ 👥 Member: *${clan.members?.length || 0}*\n`
    txt += `┃ 💰 Kas: *Rp ${(clan.bank || 0).toLocaleString('id-ID')}*\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    
    if (lowerClans.length > 0) {
        txt += `╭┈┈⬡「 ⬇️ *ᴄʟᴀɴ ᴅɪ ʙᴀᴡᴀʜ* 」\n`
        for (let i = 0; i < lowerClans.length; i++) {
            const c = lowerClans[i]
            const pos = rank + i + 1
            if (pos <= totalClans) {
                txt += `┃ ${pos}. *${c.name}* (Level ${c.level || getLevelFromExp(c.exp || 0)})\n`
            }
        }
        txt += `╰┈┈┈┈┈┈┈┈⬡`
    }
    
    await m.reply(txt)
}

export { pluginConfig as config, handler };
