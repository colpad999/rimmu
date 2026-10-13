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
    name: 'delstok',
    category: 'store',
    description: '🗑️ Hapus stok item dari produk',
    usage: '.hapusstok <nomor_produk> <nomor_item>',
    example: '.hapusstok 1 3',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const products = db.setting('storeProducts') || []

    if (products.length === 0) {
        return m.reply(`📭 *Belum ada produk.*\n\nTambahkan produk terlebih dahulu: \`${m.prefix}addproduk\` ➕`)
    }

    const args = m.text?.trim().split(/\s+/) || []
    const productNo = parseInt(args[0]) - 1
    const itemNo = parseInt(args[1]) - 1

    if (args.length < 2 || isNaN(productNo) || isNaN(itemNo)) {
        return m.reply(
            `🗑️ *HAPUS STOK*\n\n` +
            `Format: \`${m.prefix}hapusstok <nomor_produk> <nomor_item>\`\n\n` +
            `📝 *Contoh:*\n` +
            `\`${m.prefix}hapusstok 1 3\` — Hapus item ke-3 dari produk ke-1\n\n` +
            `📋 Lihat nomor item: \`${m.prefix}liststok <nomor_produk>\``
        )
    }

    if (productNo < 0 || productNo >= products.length) {
        return m.reply(`❌ *Nomor produk tidak valid.*\n\nRentang: 1-${products.length} 📋`)
    }

    const product = products[productNo]

    if (product.type === 'fisik') {
        const reduceCount = parseInt(args[1])
        if (isNaN(reduceCount) || reduceCount <= 0) {
            return m.reply(
                `📦 *Produk Fisik*\n\n` +
                `Untuk mengurangi stok fisik, gunakan:\n` +
                `\`${m.prefix}editproduk ${productNo + 1} stok <jumlah_baru>\`\n\n` +
                `Stok saat ini: *${product.stock === -1 ? '♾️ Unlimited' : product.stock + ' pcs'}*`
            )
        }
        if (product.stock !== -1) {
            product.stock = Math.max(0, product.stock - reduceCount)
            db.setting('storeProducts', products)
            await m.react('✅')
            return m.reply(
                `📦 *STOK FISIK DIKURANGI*\n\n` +
                `🏷️ Produk: *${product.name}*\n` +
                `➖ Dikurangi: *${reduceCount} pcs*\n` +
                `📊 Sisa stok: *${product.stock} pcs*`
            )
        }
        return m.reply(`♾️ *Stok unlimited tidak bisa dikurangi.*\n\nUbah tipe stok terlebih dahulu: \`${m.prefix}editproduk ${productNo + 1} stok <jumlah>\``)
    }

    const stockItems = product.stockItems || []

    if (itemNo < 0 || itemNo >= stockItems.length) {
        return m.reply(`❌ *Nomor item tidak valid.*\n\nRentang: 1-${stockItems.length}\n\n📋 Lihat daftar: \`${m.prefix}liststok ${productNo + 1}\``)
    }

    const deleted = stockItems.splice(itemNo, 1)[0]
    product.stock = stockItems.length
    db.setting('storeProducts', products)

    await m.react('✅')
    return m.reply(
        `🗑️ *STOK DIHAPUS*\n\n` +
        `🏷️ Produk: *${product.name}*\n` +
        `🔑 Item: \`${deleted.detail.replace(/\n/g, ' ').substring(0, 50)}\`\n` +
        `📊 Sisa stok: *${stockItems.length}* akun`
    )
}

export { pluginConfig as config, handler }
