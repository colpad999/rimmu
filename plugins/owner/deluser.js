//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import { getDatabase } from '../../src/lib/yalena-database.js';
const pluginConfig = {
    name: 'deluser',
    category: 'owner',
    description: 'Hapus user dari database',
    usage: '.hapususer',
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    const db = getDatabase()
    const args = m.args || []

    // ✅ CONFIRM HAPUS
    if (args[0] === '--confirm' && args[1]) {

        const target = args[1]
        const user = db.data.users[target]

        if (!user) {
            return m.reply(`❌ User tidak ditemukan.`)
        }

        delete db.data.users[target]
        db.save()

        return m.reply(
`╭━━━〔 💔 YALENA DELETE 💔 〕━━━⬣
┃
┃ Ara ara~ user berhasil dihapus 😈
┃
┃ 👤 Target : ${target}
┃ 💣 Status : *Terhapus*
┃
┃ Jangan nakal lagi ya darling...
┃ atau kamu berikutnya 😏
┃
╰━━━━━━━━━━━━━━━━━━⬣`
        )
    }

    // 📋 AMBIL USER LIST
    const users = Object.entries(db.data.users || {})

    if (users.length === 0) {
        return m.reply(`❌ Tidak ada user di database.`)
    }

    // 🔽 FORMAT LIST
    const rows = users.slice(0, 50).map(([jid, user]) => ({
        title: user.name || 'No Name',
        description: `💰 Koin: ${user.koin || 0}`,
        id: `${m.prefix}hapususer --confirm ${jid}`
    }))

    // 💗 UI YALENA
    await sock.sendMessage(m.chat, {
        text:
`╭━━━〔 💗 YALENA SYSTEM 💗 〕━━━⬣
┃
┃ Hai ${m.pushName || 'Darling'} 😋
┃ Mau hapus siapa nih?
┃
┃ Pilih user di bawah ya~
┃ Jangan salah pilih 😈
┃
╰━━━━━━━━━━━━━━━━━━⬣`,
        footer: 'Yalena AI 💗',
        interactiveButtons: [
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: '💀 Pilih Target',
                    sections: [
                        {
                            title: 'Daftar User',
                            rows
                        }
                    ]
                })
            }
        ]
    }, { quoted: m })
}

export { pluginConfig as config, handler };
