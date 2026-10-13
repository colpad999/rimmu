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
    name: "autolistproduk",
    category: "store_autoorder",
    description: "🛍️ Menampilkan daftar produk autoorder",
    usage: ".autolistproduk",
    example: ".autolistproduk",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true,
};

function formatPrice(n) {
    return "Rp " + n.toLocaleString("id-ID");
}

async function handler(m, { sock }) {
    const db = getDatabase();
    
    const products = db.setting('storeAutoProducts') || [];
    if (products.length === 0) {
        return m.reply(`📭 *Belum ada produk tersedia saat ini.*`);
    }

    await m.react("🕕");
    
    let txt = `🛍️ *DAFTAR PRODUK AUTOORDER*\n\n`;
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const stockCount = p.stockItems?.length || 0;
        const status = stockCount > 0 ? `✅ Tersedia (${stockCount})` : `❌ Habis`;
        
        txt += `*${i + 1}. ${p.name}*\n`;
        if (m.isOwner) txt += `> 🆔 ID: \`${p.id}\`\n`;
        txt += `> 💰 Harga: *${formatPrice(p.price)}*\n`;
        txt += `> 📦 Stok: *${status}*\n`;
        if (p.desc) txt += `> 📝 Detail: _${p.desc}_\n`;
        txt += `\n`;
    }

    txt += `🛒 *Cara Beli:*\n`;
    txt += `Ketik \`${m.prefix}autobeli <nomor/id>\`\n\n`;
    txt += `💰 *Saldo Anda:*\n`;
    const user = db.getUser(m.sender);
    txt += `*${formatPrice(user?.saldo || 0)}* (Ketik \`${m.prefix}topupsaldo\` untuk isi saldo)`;

    await m.reply(txt);
    await m.react("✅");
}

export { pluginConfig as config, handler };
