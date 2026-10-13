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

import { getDatabase } from "../../src/lib/rimuru-database.js";

const pluginConfig = {
    name: "autodelproduk",
    category: "store_autoorder",
    description: "🛍️ Menghapus produk dari autoorder store",
    usage: ".autohapusproduk <id_produk/nomor>",
    example: ".autohapusproduk 1",
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 0,
    energi: 0,
    isEnabled: true,
};

async function handler(m, { sock }) {
    const db = getDatabase();
    const target = m.text?.trim();
    
    if (!target) {
        return m.reply(
            `⚠️ *Format Salah*\n\n` +
            `Ketik: \`${m.prefix}autohapusproduk <ID Produk atau Nomor>\`\n\n` +
            `*Penjelasan:*\n` +
            `Perintah ini akan menghapus sebuah produk berserta seluruh sisa stok di dalamnya secara PERMANEN dari daftar Store Autoorder.\n\n` +
            `*Contoh Penggunaan:*\n` +
            `> \`${m.prefix}autohapusproduk 1\` (Menghapus produk urutan ke-1)\n` +
            `> \`${m.prefix}autohapusproduk P-123456789\``
        );
    }

    await m.react("🕕");
    
    let products = db.setting('storeAutoProducts') || [];
    if (products.length === 0) {
        return m.reply(`📭 *Belum ada produk untuk dihapus.*`);
    }

    let index = -1;
    let deletedProduct = null;

    if (target.startsWith("P-")) {
        index = products.findIndex(p => p.id === target);
    } else {
        const num = parseInt(target);
        if (!isNaN(num) && num > 0 && num <= products.length) {
            index = num - 1;
        }
    }

    if (index === -1) {
        return m.reply(`❌ *Produk tidak ditemukan.*\nPastikan nomor urut atau ID produk valid.`);
    }

    deletedProduct = products[index];
    products.splice(index, 1);
    db.setting('storeAutoProducts', products);

    await m.reply(
        `✅ *PRODUK BERHASIL DIHAPUS*\n\n` +
        `📦 Nama: *${deletedProduct.name}*\n` +
        `🆔 ID: \`${deletedProduct.id}\`\n` +
        `🗑️ Semua sisa stok (${deletedProduct.stockItems?.length || 0}) juga ikut terhapus.`
    );
    await m.react("✅");
}

export { pluginConfig as config, handler };
