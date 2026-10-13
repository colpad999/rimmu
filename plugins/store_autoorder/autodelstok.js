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
    name: "autodelstok",
    category: "store_autoorder",
    description: "📦 Menghapus stok digital tertentu dari produk",
    usage: ".autohapusstok <id_produk/nomor> | <nomor_stok>",
    example: ".autohapusstok 1 | 1",
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
    const args = m.text?.trim().split("|").map(s => s.trim());
    
    if (!args || args.length < 2) {
        return m.reply(
            `⚠️ *Format Salah*\n\n` +
            `Gunakan: \`${m.prefix}autohapusstok <ID Produk/Nomor> | <Nomor Stok>\`\n\n` +
            `*Penjelasan:*\n` +
            `Perintah ini digunakan untuk menghapus stok tertentu secara manual (misalnya jika stok invalid/hangus).\n` +
            `- Gunakan \`${m.prefix}autocekstok\` terlebih dahulu untuk mengetahui Nomor/Urutan stok.\n\n` +
            `*Contoh Penggunaan:*\n` +
            `> \`${m.prefix}autohapusstok 1 | 2\` (Menghapus stok urutan ke-2 pada produk nomor 1)`
        );
    }

    const target = args[0];
    const targetStok = parseInt(args[1]);

    if (isNaN(targetStok) || targetStok <= 0) {
        return m.reply(`❌ *Nomor stok tidak valid!*`);
    }

    await m.react("🕕");
    
    let products = db.setting('storeAutoProducts') || [];
    let index = -1;

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

    const product = products[index];
    const stok = product.stockItems || [];

    if (targetStok > stok.length) {
        return m.reply(`❌ *Stok nomor ${targetStok} tidak ditemukan.*\nTotal stok saat ini hanya ${stok.length}.`);
    }

    const stokIndex = targetStok - 1;
    const deletedStok = stok[stokIndex];
    
    stok.splice(stokIndex, 1);
    product.stockItems = stok;
    db.setting('storeAutoProducts', products);

    await m.reply(
        `✅ *STOK BERHASIL DIHAPUS*\n\n` +
        `📦 Produk: *${product.name}*\n` +
        `➖ Data Dihapus: \n\`${deletedStok}\`\n\n` +
        `📊 Sisa Stok Sekarang: *${stok.length}*`
    );
    await m.react("✅");
}

export { pluginConfig as config, handler };
