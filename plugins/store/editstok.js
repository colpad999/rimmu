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
    name: 'editstok',
    category: 'store',
    description: '✏️ Edit stok item produk (hanya di private chat)',
    usage: '.editstok <nomor_produk> <nomor_item>|<detail_baru>',
    example: '.editstok 1 3|Email: baru@mail.com;;Password: newpass',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: true,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    if (m.isGroup) {
        return m.reply(
            `🚫 *Akses Ditolak*\n\n` +
            `Untuk menjaga privasi 🛡️, pengeditan stok hanya dapat dilakukan di *private chat*.\n\n` +
            `Silakan chat bot secara langsung 📱`
        )
    }

    const db = getDatabase()
    const products = db.setting('storeProducts') || []

    if (products.length === 0) {
        return m.reply(`📭 *Belum ada produk.*\n\nTambahkan produk terlebih dahulu: \`${m.prefix}addproduk\` ➕`)
    }

    const text = m.text?.trim() || ''
    const firstPipe = text.indexOf('|')

    if (firstPipe === -1) {
        return m.reply(
            `✏️ *EDIT STOK*\n\n` +
            `📋 Format: \`${m.prefix}editstok <nomor_produk> <nomor_item>|<detail_baru>\`\n\n` +
            `📝 *Contoh:*\n` +
            `\`${m.prefix}editstok 1 3|Email: baru@mail.com;;Password: newpass\`\n\n` +
            `• Gunakan \`;;\` untuk baris baru dalam detail 🔑\n` +
            `📋 Lihat nomor item: \`${m.prefix}liststok <nomor_produk>\`\n\n` +
            `⚠️ _Stok yang sudah terkirim ke pembeli tidak akan berubah_ 🔒`
        )
    }

    const before = text.substring(0, firstPipe).trim()
    const newDetail = text.substring(firstPipe + 1).trim().replace(/;;/g, '\n')

    const parts = before.split(/\s+/)
    const productNo = parseInt(parts[0]) - 1
    const itemNo = parseInt(parts[1]) - 1

    if (isNaN(productNo) || productNo < 0 || productNo >= products.length) {
        return m.reply(`❌ *Nomor produk tidak valid.*\n\nRentang: 1-${products.length} 📋`)
    }

    const product = products[productNo]

    if (product.type === 'fisik') {
        return m.reply(
            `📦 *Produk Fisik*\n\n` +
            `Produk fisik tidak memiliki data per-item 🔑\n` +
            `Untuk mengubah stok, gunakan:\n` +
            `\`${m.prefix}editproduk ${productNo + 1} stok <jumlah>\``
        )
    }

    const stockItems = product.stockItems || []

    if (isNaN(itemNo) || itemNo < 0 || itemNo >= stockItems.length) {
        return m.reply(`❌ *Nomor item tidak valid.*\n\nRentang: 1-${stockItems.length}\n\n📋 Lihat daftar: \`${m.prefix}liststok ${productNo + 1}\``)
    }

    if (!newDetail || newDetail.length < 3) {
        return m.reply(`❌ *Detail terlalu pendek.*\n\nMinimal 3 karakter diperlukan 🔑`)
    }

    const oldDetail = stockItems[itemNo].detail
    stockItems[itemNo].detail = newDetail
    stockItems[itemNo].updatedAt = new Date().toISOString()

    db.setting('storeProducts', products)
    await m.react('✅')

    return m.reply(
        `✅ *STOK DIPERBARUI*\n\n` +
        `🏷️ Produk: *${product.name}*\n` +
        `🔑 Item #${itemNo + 1}\n\n` +
        `❌ Sebelum:\n\`${oldDetail.replace(/\n/g, ' ').substring(0, 50)}\`\n\n` +
        `✅ Sesudah:\n\`${newDetail.replace(/\n/g, ' ').substring(0, 50)}\`\n\n` +
        `⚠️ _Perubahan hanya berlaku untuk item yang belum dikirim ke pembeli_ 🔒`
    )
}

export { pluginConfig as config, handler }
