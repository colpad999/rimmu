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
    name: 'cleardata',
    category: 'owner',
    description: 'Reset semua data database ke default',
    usage: '.hapusdata',
    example: '.hapusdata',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 30,
    energi: 0,
    isEnabled: true
}

const pendingReset = new Map()

async function handler(m, { sock }) {
    const args = m.text

    if (args === 'ya' || args === 'yes' || args === 'confirm') {
        const pending = pendingReset.get(m.sender)
        if (!pending || Date.now() - pending > 60000) {
            pendingReset.delete(m.sender)
            return m.reply(`❌ Tidak ada permintaan reset yang aktif.\n\n> Ketik \`${m.prefix}hapusdata\` terlebih dahulu`)
        }

        pendingReset.delete(m.sender)
        await m.react('🕕')

        const db = getDatabase()
        const result = db.resetToDefaults()

        await m.react('✅')

        await sock.sendMessage(m.chat, {
            text:
                `🗑️ *ᴅᴀᴛᴀ ᴅɪʀᴇsᴇᴛ*\n\n` +
                `> 📁 File direset: *${result.resetCount}/${result.total}*\n` +
                `> 💾 Backup: \`${result.backupFolder}/\`\n\n` +
                `Semua data telah dikembalikan ke default.\n\n` +
                `> ⚠️ Restart bot untuk memastikan data tersinkronisasi`
        }, { quoted: m })
        return
    }

    const db = getDatabase()
    const dbPath = db.dbPath
    const fileMap = [
        { key: 'users', label: '👥 Users' },
        { key: 'groups', label: '👥 Groups' },
        { key: 'settings', label: '⚙️ Settings' },
        { key: 'stats', label: '📊 Stats' },
        { key: 'sewa', label: '🏪 Sewa' },
        { key: 'premium', label: '⭐ Premium' },
        { key: 'owner', label: '👑 Owner' },
        { key: 'partner', label: '🤝 Partner' },
    ]

    const existing = []
    let totalSize = 0

    for (const { key, label } of fileMap) {
        const data = db.db.data[key]
        if (!data) continue
        const entries = Array.isArray(data) ? data.length : Object.keys(data).length
        const size = Buffer.byteLength(JSON.stringify(data))
        totalSize += size
        existing.push({ label, key, entries, size: `${(size / 1024).toFixed(1)} KB` })
    }

    if (existing.length === 0) {
        return m.reply(`❌ Tidak ada data database yang ditemukan`)
    }

    pendingReset.set(m.sender, Date.now())

    let txt = `⚠️ *ᴘᴇʀɪɴɢᴀᴛᴀɴ — ʜᴀᴘᴜs ᴅᴀᴛᴀ*\n\n`
    txt += `Aksi ini akan menghapus *SEMUA* data berikut:\n\n`

    for (const { label, entries, size } of existing) {
        txt += `> ${label}: *${entries}* data (${size})\n`
    }

    txt += `\n> 📦 Total: *${(totalSize / 1024).toFixed(1)} KB*\n`
    txt += `> 💾 Backup otomatis dibuat sebelum reset\n\n`
    txt += `Ketik \`${m.prefix}hapusdata ya\` dalam 60 detik untuk melanjutkan.`

    await sock.sendMessage(m.chat, {
        text: txt,
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: '✅ Ya, Hapus Semua',
                    id: `${m.prefix}hapusdata ya`
                })
            },
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: '❌ Batalkan',
                    id: `${m.prefix}menu`
                })
            }
        ]
    }, { quoted: m })

    setTimeout(() => { pendingReset.delete(m.sender) }, 60000)
}

export { pluginConfig as config, handler }
