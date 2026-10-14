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
import config from "../../config.js";

const pluginConfig = {
  name: "produk",
  category: "store",
  description: "🛍️ Lihat daftar produk yang tersedia",
  usage: ".listproduk",
  example: ".listproduk",
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
  const products = db.setting("storeProducts") || [];

  if (products.length === 0) {
    return m.reply(
      `🏪 *Produk Belum Tersedia*\n\n` +
        `Saat ini belum ada produk yang ditambahkan oleh admin 😔\n\n` +
        `Silakan cek kembali nanti atau hubungi admin untuk informasi lebih lanjut.\n\n` +
        `_Terima kasih atas ketertarikan Anda_ 🙏`,
    );
  }

  let txt = `🛍️ *DAFTAR PRODUK*\n\n`;
  txt += `Berikut adalah produk yang tersedia saat ini 🎉\n`;
  txt += `Untuk pembelian, ketik \`${m.prefix}beli <nomor>\`\n\n`;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const type = p.type || "digital";
    const typeIcon = type === "digital" ? "🔑" : "📦";
    const typeLabel = type === "digital" ? "Digital" : "Fisik";

    let stockDisplay;
    if (type === "digital") {
      const count = p.stockItems?.length || 0;
      stockDisplay = p.stock === -1 ? "♾️ Unlimited" : `${count} akun`;
    } else {
      stockDisplay = p.stock === -1 ? "♾️ Unlimited" : `${p.stock} pcs`;
    }

    const isAvailable =
      type === "digital"
        ? p.stockItems?.length > 0 || p.stock === -1
        : p.stock > 0 || p.stock === -1;
    const statusIcon = isAvailable ? "✅" : "❌";

    const priceStr = formatPrice(p.price);
    const originalPriceStr = p.originalPrice
      ? `~~${formatPrice(p.originalPrice)}~~ `
      : "";

    txt += `*${i + 1}.* ${typeIcon} ${p.name}\n`;
    txt += `   💰 ${originalPriceStr}${priceStr}\n`;
    txt += `   📊 Stok: ${stockDisplay} ${statusIcon}\n`;
    txt += `   🏷️ Tipe: ${typeLabel}\n`;
    if (p.description)
      txt += `   📝 _${p.description.substring(0, 60)}${p.description.length > 60 ? "..." : ""}_\n`;
    txt += `\n`;
  }

  txt += `💡 _Ketik \`${m.prefix}beli <nomor>\` untuk memesan produk_`;

  if (m.isGroup) {
    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";
    await sock.sendMessage(
      m.chat,
      {
        text: txt,
        contextInfo: {
          forwardingScore: 9999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: saluranId,
            newsletterName: saluranName,
            serverMessageId: 127,
          },
        },
      },
      { quoted: m },
    );
  } else {
    await m.reply(txt);
  }
}

export { pluginConfig as config, handler };
