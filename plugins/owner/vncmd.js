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
    name: 'vncmd',
    category: 'owner',
    description: 'Aktifkan command via voice note',
    usage: '.cmdvn <on/off>',
    example: '.cmdvn on',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

function handler(m) {
    const db = getDatabase()
    const args = m.args || []
    const subCmd = args[0]?.toLowerCase()

    const current = db.setting('cmdVn') || false

    if (!subCmd || subCmd === 'status') {
        const status = current ? '✅ ON' : '❌ OFF'
        return m.reply(
            `🎤 *ᴄᴍᴅ ᴠᴏɪᴄᴇ ɴᴏᴛᴇ*\n\n` +
            `> Status: *${status}*\n\n` +
            `> \`${m.prefix}cmdvn on\` — Command via VN\n` +
            `> \`${m.prefix}cmdvn off\` — Command via text (default)\n\n` +
            `> Saat ON, kirim VN berisi nama command\n` +
            `> Contoh: VN "menu" → trigger .menu`
        )
    }

    if (subCmd === 'on') {
        db.setting('cmdVn', true)
        return m.reply(
            `✅ *ᴄᴍᴅ ᴠɴ ᴀᴋᴛɪꜰ*\n\n` +
            `> Kirim voice note berisi nama command\n` +
            `> Bot akan transkrip dan jalankan otomatis\n` +
            `> Contoh: VN "menu" → trigger .menu`
        )
    }

    if (subCmd === 'off') {
        db.setting('cmdVn', false)
        return m.reply(`❌ CMD VN *dinonaktifkan*. Command via text normal.`)
    }

    return m.reply(`❌ Gunakan \`${m.prefix}cmdvn on\` atau \`${m.prefix}cmdvn off\``)
}

export { pluginConfig as config, handler }