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
  name: "list",
  category: "store",
  description: "📋 Lihat daftar informasi toko",
  usage: ".list atau .list <nomor>",
  example: ".list 1",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const lists = db.setting("storeLists") || [];

  if (lists.length === 0) {
    return m.reply(
      `📋 *Belum Ada Informasi Toko*\n\n` +
        `Saat ini belum ada informasi yang ditambahkan oleh admin 😔\n\n` +
        `Silakan cek kembali nanti atau hubungi admin untuk informasi lebih lanjut.\n\n` +
        `_Terima kasih atas ketertarikan Anda_ 🙏`,
    );
  }

  const input = m.text?.trim();
  const idx = parseInt(input) - 1;

  if (!isNaN(idx) && idx >= 0 && idx < lists.length) {
    const l = lists[idx];
    let txt = `${l.content}`;

    if (l.image) {
      await sock.sendMessage(
        m.chat,
        { image: { url: l.image }, caption: txt },
        { quoted: m },
      );
      return;
    }
    if (l.video) {
      await sock.sendMessage(
        m.chat,
        { video: { url: l.video }, caption: txt },
        { quoted: m },
      );
      return;
    }
    return m.reply(txt);
  }

  let txt = `📋 *DAFTAR INFORMASI TOKO*\n\n`;
  txt += `Berikut informasi yang tersedia saat ini 📝\n`;
  txt += `Ketik \`${m.prefix}list <nomor>\` untuk melihat detail.\n\n`;

  for (let i = 0; i < lists.length; i++) {
    const l = lists[i];
    const mediaIcon = l.image ? "🖼️" : l.video ? "🎬" : "📝";
    txt += `*${i + 1}.* ${mediaIcon} *${l.name}*\n`;
  }
  txt += "\n";

  txt += `💡 _Ketik \`${m.prefix}list <nomor>\` untuk membaca detail informasi_`;

  await m.reply(txt);
}

export { pluginConfig as config, handler };
