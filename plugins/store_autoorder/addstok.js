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
    name: "autoaddstok",
    category: "store_autoorder",
    description: "📦 Menambah stok digital ke produk",
    usage: ".autoaddstok <id_produk/nomor> | <data_stok>",
    example: ".autoaddstok 1 | email:pass:profile",
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
    let target = '';
    let stokRaw = '';

    const isTxtDoc = m.quoted?.mtype === 'documentMessage' && (m.quoted.mimetype === 'text/plain' || m.quoted.fileName?.endsWith('.txt'));

    if (isTxtDoc) {
        const parts = m.text?.trim().split('|').map(s => s.trim()) || [];
        target = parts[0] || '';
        if (target) {
            try {
                const buffer = await m.quoted.download();
                stokRaw = buffer.toString('utf-8');
            } catch (e) {
                return m.reply("❌ Gagal mengunduh file .txt stok.");
            }
        }
    } else {
        const parts = m.text?.split('|') || [];
        if (parts.length >= 2) {
            target = parts[0].trim();
            stokRaw = parts.slice(1).join('|').trim();
        }
    }

    if (!target || !stokRaw) {
        return m.reply(
            `⚠️ *Format Salah*\n\n` +
            `Ada 2 cara menambahkan stok autoorder:\n\n` +
            `1️⃣ *Lewat Teks Pesan (Bisa banyak baris)*\n` +
            `Gunakan: \`${m.prefix}autoaddstok <ID/Nomor> | <Data Stok>\`\n` +
            `_Tiap baris baru (Enter) akan dihitung sebagai 1 stok yang terpisah_\n\n` +
            `Contoh:\n` +
            `> \`${m.prefix}autoaddstok 1 | email1;;pass1\nemail2;;pass2\`\n\n` +
            `2️⃣ *Lewat Reply File .txt*\n` +
            `Kirim file \`.txt\` berisi stok (1 baris = 1 stok), lalu reply file tersebut dengan pesan:\n` +
            `> \`${m.prefix}autoaddstok <ID/Nomor>\``
        );
    }

    const stokArray = stokRaw.split(/\r?\n/).map(s => s.trim().replace(/;;/g, '\n')).filter(s => s !== '');
    
    if (stokArray.length === 0) {
        return m.reply(`❌ Tidak ada data stok yang ditemukan (teks kosong).`);
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
    if (!product.stockItems) product.stockItems = [];
    
    product.stockItems.push(...stokArray);
    db.setting('storeAutoProducts', products);

    let ditambahkanTxt = stokArray.slice(0, 3).map((s, i) => `*Stok ${i+1}:*\n${s}`).join('\n\n');
    if (stokArray.length > 3) ditambahkanTxt += `\n... dan ${stokArray.length - 3} lainnya`;

    await m.reply(
        `✅ *STOK BERHASIL DITAMBAHKAN*\n\n` +
        `📦 Produk: *${product.name}*\n` +
        `➕ Menambah: *${stokArray.length}* stok\n\n` +
        `📝 Data yang masuk:\n${ditambahkanTxt}\n\n` +
        `📊 Total Stok Sekarang: *${product.stockItems.length}*`
    );
    await m.react("✅");
}

export { pluginConfig as config, handler };
