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
    name: 'delalluser',
    category: 'owner',
    description: 'Hapus SEMUA user dari database (LANGSUNG HAPUS)',
    usage: '.deluserall',
    example: '.deluserall',
    isOwner: true,
    cooldown: 10,
    isEnabled: true
}

async function handler(m) {
    const db = getDatabase()
    
    const users = Object.entries(db.data.users || {})
    
    if (users.length === 0) {
        return m.reply(`❌ *Tidak ada user di database*\n\n> Database user sudah kosong, Darling~`)
    }

    const totalUsers = users.length
    let totalKoin = 0
    let totalEnergi = 0
    let totalExp = 0

    for (const [jid, user] of users) {
        totalKoin += user.koin || 0
        totalEnergi += user.energi || 0
        totalExp += user.exp || 0
    }

    // LANGSUNG HAPUS SEMUA
    db.data.users = {}
    db.save()

    let txt = `╭━━━〔 💀 *ᴢᴇʀᴏ ᴛᴡᴏ ᴍᴀꜱꜱ ᴅᴇʟᴇᴛᴇ* 💀 〕━━━⬣
│
│  ✅ *SEMUA USER BERHASIL DIHAPUS!*
│
│  📊 *ꜱᴛᴀᴛɪꜱᴛɪᴋ*
│  ├ 👥 User terhapus : *${totalUsers}*
│  ├ 💰 Total Koin   : *${totalKoin.toLocaleString('id-ID')}*
│  ├ ⚡ Total Energi  : *${totalEnergi.toLocaleString('id-ID')}*
│  └ 📈 Total Exp     : *${totalExp.toLocaleString('id-ID')}*
│
│  🩸 *Darling, database user kini kosong.*
│  🩸 *Semua data telah lenyap...*
│
│  💀 *Ketik .daftar untuk registrasi ulang*
│
╰━━━━━━━━━━━━━━━━━━━━━━━⬣`

    await m.reply(txt)
}
export { pluginConfig as config, handler };