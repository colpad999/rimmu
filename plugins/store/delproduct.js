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
  name: "delproduct",
  category: "store",
  description: "🗑️ Hapus produk dari toko",
  usage: ".hapusproduk <nomor>",
  example: ".hapusproduk 1",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const products = db.setting("storeProducts") || [];

  if (products.length === 0) {
    return m.reply(
      `📭 *Belum ada produk.*\n\nTambahkan produk terlebih dahulu dengan \`${m.prefix}addproduk\` ➕`,
    );
  }

  const idx = parseInt(m.text?.trim()) - 1;

  if (isNaN(idx) || idx < 0 || idx >= products.length) {
    let txt = `🗑️ *Pilih Produk yang Dihapus*\n\nKetik \`${m.prefix}hapusproduk <nomor>\`\n\n`;
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const typeIcon = p.type === "fisik" ? "📦" : "🔑";
      const stockDisplay =
        p.type === "fisik"
          ? p.stock === -1
            ? "♾️"
            : `${p.stock} pcs`
          : `${p.stockItems?.length || 0} akun`;
      txt += `${typeIcon} *${i + 1}.* ${p.name} — Rp ${p.price.toLocaleString("id-ID")} (${stockDisplay})\n`;
    }
    return m.reply(txt);
  }

  const deleted = products.splice(idx, 1)[0];
  db.setting("storeProducts", products);

  const typeIcon = deleted.type === "fisik" ? "📦" : "🔑";

  await m.react("✅");
  return m.reply(
    `🗑️ *PRODUK DIHAPUS*\n\n` +
      `${typeIcon} Nama: *${deleted.name}*\n` +
      `💰 Harga: *Rp ${deleted.price.toLocaleString("id-ID")}*\n` +
      `📊 Stok terhapus: *${deleted.type === "fisik" ? deleted.stock + " pcs" : (deleted.stockItems?.length || 0) + " akun"}*\n\n` +
      `⚠️ _Produk telah dihapus secara permanen dan tidak dapat dikembalikan._`,
  );
}

export { pluginConfig as config, handler };
