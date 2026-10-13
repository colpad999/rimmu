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

import fs from 'fs';
import path from 'path';
// plugins/owner/liat-gacha.js

const pluginConfig = {
    name: 'daftargacha',
    category: 'owner',
    description: 'Melihat semua karakter yang tersedia di database gacha',
    usage: '.liat-gacha',
    example: '.liat-gacha',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const DARLING_JSON_PATH = path.join(
    process.cwd(),
    'database',
    'darling.json'
)

function getDarlingList() {
    try {
        if (!fs.existsSync(DARLING_JSON_PATH)) {
            return []
        }

        const data = fs.readFileSync(DARLING_JSON_PATH, 'utf-8')

        if (!data || data.trim() === '') {
            return []
        }

        const json = JSON.parse(data)

        if (!json || !Array.isArray(json.characters)) {
            return []
        }

        return json.characters

    } catch (err) {
        console.error('[LiatGacha] Error baca JSON:', err)
        return []
    }
}

function formatDate(dateString) {
    try {
        if (!dateString) return '-'

        const date = new Date(dateString)

        if (isNaN(date.getTime())) return '-'

        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

    } catch {
        return '-'
    }
}

async function handler(m, { args = [], prefix = '.' }) {

    const characters = getDarlingList()

    if (!characters.length) {
        return m.reply(
`╭━━〔 🎀 *LIST GACHA DARLING* 〕━━⬣
│
│ ❌ *Belum ada karakter!*
│
│ 💡 *Cara tambah:*
│    \`${prefix}add-gacha Nama | https://url.mp4\`
│
╰━━━━━━━━━━━━━━━━━⬣`
        )
    }

    let totalVideos = 0

    for (const char of characters) {

        let urls = []

        if (Array.isArray(char.urls)) {
            urls = char.urls
        } else if (char.url) {
            urls = [char.url]
        }

        totalVideos += urls.length
    }

    let text = `╭━━〔 🎀 *LIST GACHA DARLING* 〕━━⬣
│
│ 📊 *STATISTIK*
│ ├ 👥 Total Karakter: *${characters.length}*
│ └ 🎬 Total Video: *${totalVideos}*
│
╰━━━━━━━━━━━━━━━━━⬣

`

    const isDetail =
        args.includes('--detail') ||
        args.includes('-d')

    if (isDetail) {

        for (let i = 0; i < characters.length; i++) {

            const char = characters[i]

            let urls = []

            if (Array.isArray(char.urls)) {
                urls = char.urls
            } else if (char.url) {
                urls = [char.url]
            }

            const totalVideoChar = urls.length

            const name = char.name || 'Tanpa Nama'

            const addedBy =
                char.added_by ||
                char.updated_by ||
                'System'

            const addedAt =
                char.added_at ||
                char.updated_at ||
                null

            const status =
                char.updated_at
                    ? '🔄 Updated'
                    : '✨ Added'

            text += `╭━━〔 ${i + 1}. 💗 *${name}* 〕━━⬣
│
│ 📹 *Jumlah Video:* ${totalVideoChar}
│ 👤 *By:* ${addedBy}
│ 📅 *${status}:* ${formatDate(addedAt)}
│
`

            if (urls.length) {

                text += `│ 🎬 *Preview URL:*
`

                const maxPreview = Math.min(urls.length, 3)

                for (let j = 0; j < maxPreview; j++) {

                    let urlPreview = String(urls[j])

                    if (urlPreview.length > 45) {
                        urlPreview =
                            urlPreview.slice(0, 42) + '...'
                    }

                    text += `│    ${j + 1}. ${urlPreview}
`
                }

                if (urls.length > 3) {
                    text += `│    ... dan ${urls.length - 3} video lainnya
`
                }
            }

            text += `│
╰━━━━━━━━━━━━━━━━━⬣

`
        }

    } else {

        text += `╭━━〔 📋 *DAFTAR KARAKTER* 〕━━⬣
│
`

        const emojis = [
            '💗',
            '💕',
            '🌸',
            '🎀',
            '✨',
            '💖',
            '💓',
            '💞',
            '🌟',
            '⭐'
        ]

        for (let i = 0; i < characters.length; i++) {

            const char = characters[i]

            let urls = []

            if (Array.isArray(char.urls)) {
                urls = char.urls
            } else if (char.url) {
                urls = [char.url]
            }

            const totalVideoChar = urls.length

            const addedBy =
                char.added_by ||
                char.updated_by ||
                'System'

            const name = char.name || 'Tanpa Nama'

            const emoji =
                emojis[i % emojis.length]

            text += `│ ${emoji} *${name}*
│    ├ 🎬 ${totalVideoChar} video
│    └ 👤 ${addedBy}
│
`
        }

        text += `╰━━━━━━━━━━━━━━━━━⬣

💡 *Ketik* \`${prefix}liat-gacha --detail\` *untuk lihat detail lengkap*
💡 *Hapus karakter:* \`${prefix}del-gacha Nama\``
    }

    return m.reply(text)
}

export { pluginConfig as config, handler };
