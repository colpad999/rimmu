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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import { getDatabase } from '../../src/lib/rimuru-database.js';
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
`╭━━━〔 💔 RIMURU DELETE 💔 〕━━━⬣
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

    // 💗 UI RIMURU
    await sock.sendMessage(m.chat, {
        text:
`╭━━━〔 💗 RIMURU SYSTEM 💗 〕━━━⬣
┃
┃ Hai ${m.pushName || 'Darling'} 😋
┃ Mau hapus siapa nih?
┃
┃ Pilih user di bawah ya~
┃ Jangan salah pilih 😈
┃
╰━━━━━━━━━━━━━━━━━━⬣`,
        footer: 'Rimuru AI 💗',
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
