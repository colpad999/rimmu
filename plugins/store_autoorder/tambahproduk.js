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
    name: "autotambahproduk",
    category: "store_autoorder",
    description: "🛍️ Menambah produk ke autoorder store",
    usage: ".autotambahproduk <nama> | <harga> | <deskripsi>",
    example: ".autotambahproduk Netflix 1 Bulan | 35000 | Akun sharing anti screen limit",
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 0,
    energi: 0,
    isEnabled: true,
};

function formatPrice(n) {
    return "Rp " + n.toLocaleString("id-ID");
}

async function handler(m, { sock }) {
    const db = getDatabase();
    const args = m.text?.trim().split("|").map(s => s.trim());
    
    if (!args || args.length < 3) {
        return m.reply(
            `⚠️ *Format Salah*\n\n` +
            `Gunakan format: \`${m.prefix}autotambahproduk <nama> | <harga> | <deskripsi>\`\n\n` +
            `*Penjelasan:*\n` +
            `- *<nama>*: Nama produk yang ingin ditambahkan\n` +
            `- *<harga>*: Harga produk dalam bentuk angka (tanpa titik)\n` +
            `- *<deskripsi>*: Keterangan singkat tentang produk\n\n` +
            `*Contoh Penggunaan:*\n` +
            `> \`${m.prefix}autotambahproduk Netflix 1 Bulan | 35000 | Akun sharing anti screen limit\``
        );
    }

    const name = args[0];
    const price = parseInt(args[1].replace(/[^0-9]/g, ''));
    const desc = args[2];

    if (isNaN(price) || price <= 0) {
        return m.reply(`❌ Harga tidak valid! Harus berupa angka lebih dari 0.`);
    }

    await m.react("🕕");
    
    const products = db.setting('storeAutoProducts') || [];
    const productId = `P-${Date.now()}`;
    
    products.push({
        id: productId,
        name,
        price,
        desc,
        type: "digital",
        stockItems: []
    });
    
    db.setting('storeAutoProducts', products);

    await m.reply(
        `✅ *PRODUK BERHASIL DITAMBAHKAN*\n\n` +
        `🆔 ID Produk: \`${productId}\`\n` +
        `📦 Nama: *${name}*\n` +
        `💰 Harga: *${formatPrice(price)}*\n` +
        `📝 Deskripsi: _${desc}_\n\n` +
        `> Selanjutnya, gunakan \`${m.prefix}autoaddstok ${productId} | <data_stok>\` untuk mengisi stok produk ini.`
    );
    await m.react("✅");
}

export { pluginConfig as config, handler };
