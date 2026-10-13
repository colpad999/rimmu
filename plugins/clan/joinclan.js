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

import { getDatabase } from '../../src/lib/rimuru-database.js'
const pluginConfig = {
    name: 'joinclan',
    category: 'clan',
    description: 'Gabung ke clan',
    usage: '.clanjoin <clan_id>',
    example: '.clanjoin clan_123456',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

const MAX_MEMBERS = 50

async function handler(m) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    const clanId = m.text?.trim()

    if (!clanId) {
        return m.reply(
            `🏰 *JOIN CLAN*\n\n` +
            `Masukkan ID clan!\n\n` +
            `Contoh: *.clanjoin clan_123456*\n` +
            `Cek ID: *.clanleaderboard*`
        )
    }

    if (user.clanId) {
        return m.reply(`❌ Kamu sudah punya clan\nKeluar dulu: *.clanleave*`)
    }

    if (!db.db.data.clans) db.db.data.clans = {}

    const clan = db.db.data.clans[clanId]
        || Object.values(db.db.data.clans).find(c => c.name.toLowerCase() === clanId.toLowerCase())
        || Object.values(db.db.data.clans).find(c => c.id.toLowerCase() === clanId.toLowerCase())
    if (!clan) return m.reply(`❌ Clan tidak ditemukan`)
    if (!clan.isOpen) return m.reply(`❌ *${clan.name}* sedang tertutup`)
    if (clan.members.length >= MAX_MEMBERS) return m.reply(`❌ *${clan.name}* sudah penuh (${MAX_MEMBERS}/${MAX_MEMBERS})`)

    clan.members.push(m.sender)
    db.setUser(m.sender, { clanId })
    db.save()

    const emblem = clan.emblem || '🏰'

    await m.reply(
        `${emblem} *WELCOME!*\n\n` +
        `@${m.sender.split('@')[0]} bergabung ke *${clan.name}*\n\n` +
        `Leader: @${clan.leader.split('@')[0]}\n` +
        `Members: ${clan.members.length}/${MAX_MEMBERS}\n\n` +
        `Lihat info: *.claninfo*`,
        { mentions: [m.sender, clan.leader] }
    )
}

export { pluginConfig as config, handler }