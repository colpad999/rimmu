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
    name: 'demoteclan',
    category: 'clan',
    description: 'Turunkan jabatan member',
    usage: '.clandemote @user',
    example: '.clandemote @user',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

async function handler(m, { mention }) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    const args = m.text?.trim().split(/\s+/)
    
    let target = mention?.[0] || (args[0] ? (args[0].includes('@') ? args[0] : null) : null)
    
    if (!target) {
        return m.reply(`📉 *ᴄʟᴀɴ ᴅᴇᴍᴏᴛᴇ*\n\n> Turunkan jabatan member ke member biasa\n\n> Contoh: .clandemote @user`)
    }
    
    target = target.replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    
    if (!user.clanId) {
        return m.reply(`❌ Kamu belum punya clan!`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan) {
        return m.reply(`❌ Clan tidak ditemukan!`)
    }
    
    if (clan.leader !== m.sender) {
        return m.reply(`❌ Hanya *leader* clan yang bisa demote member!`)
    }
    
    if (!clan.members.includes(target)) {
        return m.reply(`❌ Target bukan member clan kamu!`)
    }
    
    if (target === m.sender) {
        return m.reply(`❌ Tidak bisa demote diri sendiri!`)
    }
    
    if (!clan.roles?.[target]) {
        return m.reply(`❌ Target tidak memiliki jabatan khusus!`)
    }
    
    const oldRole = clan.roles[target]
    delete clan.roles[target]
    await db.save()
    
    let txt = `📉 *ᴄʟᴀɴ ᴅᴇᴍᴏᴛᴇ!*\n\n`
    txt += `╭┈┈⬡「 📋 *ʜᴀꜱɪʟ* 」\n`
    txt += `┃ 📛 Clan: *${clan.name}*\n`
    txt += `┃ 👤 Member: @${target.split('@')[0]}\n`
    txt += `┃ 🔻 Jabatan lama: *${oldRole === 'coleader' ? 'Co-Leader' : 'Elder'}*\n`
    txt += `┃ 📌 Jabatan baru: *Member*\n`
    txt += `┃ 👑 Didemote oleh: @${m.sender.split('@')[0]}\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt, { mentions: [target, m.sender] })
}

export { pluginConfig as config, handler };
