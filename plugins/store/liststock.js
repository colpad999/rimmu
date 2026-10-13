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
    name: 'liststock',
    category: 'store',
    description: '📋 Lihat daftar stok item produk',
    usage: '.liststok <nomor_produk>',
    example: '.liststok 1',
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

    const idx = parseInt(m.text?.trim()) - 1

    if (isNaN(idx) || idx < 0 || idx >= products.length) {
        let txt = `📋 *DAFTAR STOK PRODUK*\n\nPilih produk untuk melihat stok:\n\n`
        for (let i = 0; i < products.length; i++) {
            const p = products[i]
            const typeIcon = p.type === 'fisik' ? '📦' : '🔑'
            const stockDisplay = p.type === 'fisik'
                ? (p.stock === -1 ? '♾️' : `${p.stock} pcs`)
                : `${p.stockItems?.length || 0} akun`
            const icon = (p.type === 'fisik' ? (p.stock > 0 || p.stock === -1) : (p.stockItems?.length > 0 || p.stock === -1)) ? '✅' : '⚠️'
            txt += `${typeIcon} *${i + 1}.* ${p.name} — ${stockDisplay} ${icon}\n`
        }
        txt += `\nKetik \`${m.prefix}liststok <nomor>\` untuk melihat detail stok 📊`
        return m.reply(txt)
    }

    const product = products[idx]
    const typeIcon = product.type === 'fisik' ? '📦' : '🔑'

    if (product.type === 'fisik') {
        return m.reply(
            `📦 *STOK: ${product.name}*\n\n` +
            `📊 Tipe: *Fisik*\n` +
            `📦 Total: *${product.stock === -1 ? '♾️ Unlimited' : product.stock + ' pcs'}*\n\n` +
            `*Kelola stok:*\n` +
            `• Tambah: \`${m.prefix}addstok ${idx + 1} <jumlah>\`\n` +
            `• Edit: \`${m.prefix}editproduk ${idx + 1} stok <jumlah>\`\n\n` +
            `_Stok fisik diatur berdasarkan jumlah, bukan per-item_ 📦`
        )
    }

    const stockItems = product.stockItems || []

    if (stockItems.length === 0) {
        return m.reply(
            `🔑 *Stok: ${product.name}*\n\n` +
            `📭 Belum ada stok item yang ditambahkan.\n\n` +
            `*Tambah stok:*\n` +
            `• Manual: \`${m.prefix}addstok ${idx + 1}|<detail>\`\n` +
            `• Import: \`${m.prefix}addstok ${idx + 1}\` (reply file .txt 📄)\n\n` +
            `_Stok item bersifat rahasia 🔒 dan hanya dikirim ke pembeli setelah pembayaran dikonfirmasi_`
        )
    }

    let txt = `🔑 *STOK: ${product.name}*\n\n`
    txt += `📊 Total: *${stockItems.length}* akun\n\n`

    const showItems = stockItems.slice(0, 30)
    for (let i = 0; i < showItems.length; i++) {
        const preview = showItems[i].detail.replace(/\n/g, ' ').substring(0, 40)
        txt += `\`${i + 1}.\` ${preview}${showItems[i].detail.length > 40 ? '...' : ''}\n`
    }

    if (stockItems.length > 30) {
        txt += `\n_dan ${stockItems.length - 30} item lainnya..._ 📋`
    }

    txt += `\n\n🛠️ *Kelola stok:*\n`
    txt += `🗑️ Hapus: \`${m.prefix}hapusstok ${idx + 1} <nomor_item>\`\n`
    txt += `✏️ Edit: \`${m.prefix}editstok ${idx + 1} <nomor_item>|<detail_baru>\`\n`
    txt += `➕ Tambah: \`${m.prefix}addstok ${idx + 1}|<detail>\``

    return m.reply(txt)
}

export { pluginConfig as config, handler }
