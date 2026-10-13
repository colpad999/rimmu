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
import axios from 'axios'
import FormData from 'form-data'

const pluginConfig = {
    name: 'addlist',
    category: 'store',
    description: '➕ Tambah informasi toko baru (hanya di private chat)',
    usage: '.addlist <nama>|<isi>',
    example: '.addlist Syarat & Ketentuan|1. Pembelian tidak bisa dibatalkan;;2. Garansi 7 hari',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: true,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function uploadToCatbox(buffer, filename = 'file.jpg') {
    try {
        const form = new FormData()
        form.append('fileToUpload', buffer, { filename })
        form.append('reqtype', 'fileupload')
        const res = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders(),
            timeout: 30000
        })
        return res.data?.startsWith('http') ? res.data : null
    } catch {
        return null
    }
}

async function handler(m, { sock }) {
    if (m.isGroup) {
        return m.reply(
            `🚫 *Akses Ditolak*\n\n` +
            `Untuk menjaga keamanan data 🛡️, penambahan informasi hanya dapat dilakukan di *private chat*.\n\n` +
            `Silakan chat bot secara langsung 📱, lalu ketik:\n` +
            `\`${m.prefix}addlist <nama>|<isi>\``
        )
    }

    const db = getDatabase()
    const text = m.text?.trim() || ''
    const pipeIdx = text.indexOf('|')

    if (pipeIdx === -1) {
        return m.reply(
            `➕ *TAMBAH INFORMASI TOKO*\n\n` +
            `📋 Format:\n` +
            `\`${m.prefix}addlist <nama>|<isi>\`\n\n` +
            `📌 *Parameter:*\n` +
            `• *nama* — Judul informasi (min. 2 karakter)\n` +
            `• *isi* — Konten informasi (gunakan \`;;\` untuk baris baru)\n\n` +
            `📝 *Contoh:*\n` +
            `\`${m.prefix}addlist Syarat & Ketentuan|1. Pembelian tidak bisa dibatalkan;;2. Garansi 7 hari;;3. Hubungi admin untuk klaim\`\n` +
            `\`${m.prefix}addlist Cara Order|1. Ketik .listproduk;;2. Pilih produk;;3. Ketik .beli <nomor>\`\n\n` +
            `🖼️ *Tips:*\n` +
            `• Kirim gambar/video terlebih dahulu, lalu reply media tersebut dengan command di atas untuk menambahkan media 📸\n` +
            `• Gunakan \`;;\` untuk membuat baris baru dalam isi informasi ✍️\n` +
            `• Informasi ini bisa dilihat semua orang melalui \`${m.prefix}list\` 👥`
        )
    }

    const name = text.substring(0, pipeIdx).trim()
    const content = text.substring(pipeIdx + 1).trim().replace(/;;/g, '\n')

    if (!name || name.length < 2) {
        return m.reply(`❌ *Nama terlalu pendek.*\n\nMinimal 2 karakter diperlukan agar mudah dikenali 📝`)
    }
    if (!content || content.length < 3) {
        return m.reply(`❌ *Isi informasi terlalu pendek.*\n\nMinimal 3 karakter diperlukan ✍️`)
    }

    let imageUrl = null
    let videoUrl = null

    const hasQuotedMedia = m.quoted?.isMedia
    const isDirectMedia = m.isMedia && (m.isImage || m.isVideo)

    if (hasQuotedMedia || isDirectMedia) {
        await m.reply(`⏳ _Mengunggah media..._`)
        try {
            const buffer = hasQuotedMedia ? await m.quoted.download() : await m.download()
            if (buffer) {
                const isImage = m.quoted?.isImage || m.quoted?.type === 'imageMessage' || m.isImage
                const isVideo = m.quoted?.isVideo || m.quoted?.type === 'videoMessage' || m.isVideo
                const url = await uploadToCatbox(buffer, isVideo ? 'video.mp4' : 'image.jpg')
                if (url) {
                    if (isVideo) videoUrl = url
                    else imageUrl = url
                }
            }
        } catch (e) {
            console.error('[AddList] Upload error:', e.message)
        }
    }

    const lists = db.setting('storeLists') || []
    const newList = {
        id: `L${Date.now()}`,
        name,
        content,
        description: content.substring(0, 80).replace(/\n/g, ' '),
        image: imageUrl,
        video: videoUrl,
        createdAt: new Date().toISOString()
    }

    lists.push(newList)
    db.setting('storeLists', lists)

    await m.react('✅')

    let reply = `✅ *INFORMASI DITAMBAHKAN*\n\n`
    reply += `🏷️ Nama: *${name}*\n`
    if (imageUrl) reply += `🖼️ Media: ✅ Gambar\n`
    if (videoUrl) reply += `🎬 Media: ✅ Video\n`
    reply += `📝 Isi:\n${content}\n\n`
    reply += `📋 _Lihat daftar: \`${m.prefix}list\`_\n`
    reply += `✏️ _Edit: \`${m.prefix}editlist ${lists.length}\`_`

    return m.reply(reply)
}

export { pluginConfig as config, handler }
