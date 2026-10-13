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
    name: "autoliststok",
    category: "store_autoorder",
    description: "📦 Melihat daftar stok digital suatu produk",
    usage: ".autocekstok <id_produk/nomor>",
    example: ".autocekstok 1",
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
            `Gunakan: \`${m.prefix}autocekstok <ID Produk/Nomor>\`\n\n` +
            `*Penjelasan:*\n` +
            `Perintah ini digunakan untuk melihat seluruh daftar stok yang tersisa/belum terjual pada suatu produk tertentu.\n\n` +
            `*Contoh Penggunaan:*\n` +
            `> \`${m.prefix}autocekstok 1\` (Mengecek sisa stok di produk urutan 1)\n` +
            `> \`${m.prefix}autocekstok P-123456789\``
        );
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

    if (stok.length === 0) {
        return m.reply(`📭 Stok untuk produk *${product.name}* saat ini kosong.`);
    }

    let txt = `📦 *DAFTAR STOK: ${product.name}*\n\n`;
    for (let i = 0; i < stok.length; i++) {
        txt += `*${i + 1}.* \`${stok[i]}\`\n`;
    }
    
    txt += `\n📊 Total Stok: *${stok.length}*\n`;
    txt += `> Hapus stok pakai \`${m.prefix}autohapusstok ${product.id} | <nomor_stok>\``;

    await m.reply(txt);
    await m.react("✅");
}

export { pluginConfig as config, handler };
