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

import fetch from 'node-fetch';
import { withNetworkRetry, formatNetworkError } from '../../src/lib/rimuru-network.js';

const pluginConfig = {
  name: "plat",
  category: "tools",
  description: "Cek informasi asal wilayah dan jenis kendaraan dari plat nomor",
  usage: ".cekplat <plat_nomor>",
  example: ".cekplat B 1234 XYZ",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, text }) {
  if (!text) {
    return m.reply(`⚠️ *Format Salah*\n\nPenggunaan:\n\`.cekplat <plat_nomor>\`\n\nContoh:\n\`.cekplat B 1234 XYZ\` atau \`.cekplat D 1234 ABC\``);
  }

  const queryPlate = text.trim();
  const apiUrl = `https://api.nexray.web.id/tools/cekplat?plate=${encodeURIComponent(queryPlate)}`;

  await m.react('⏳');

  try {
    const response = await withNetworkRetry(() => fetch(apiUrl, { timeout: 30000 }));
    const res = await response.json();

    if (!res.status || !res.result) {
      await m.react('❌');
      return m.reply(`❌ *Gagal:* Informasi untuk plat nomor \`${queryPlate}\` tidak ditemukan.`);
    }

    const data = res.result;

    const resultText = 
      `🚘 *INFORMASI PLAT NOMOR KENDARAAN* 🚘\n\n` +
      `🏷️ *Plat Nomor:* \`${data.raw || queryPlate}\`\n` +
      `📍 *Provinsi:* ${data.province || '-'}\n` +
      `🗺️ *Cakupan Wilayah:* ${data.region || '-'}\n` +
      `🏎️ *Jenis Kendaraan:* ${data.type || '-'}\n\n` +
      `📌 *Detail Rincian:*\n` +
      `  • Kode Depan (Prefix): \`${data.prefix || '-'}\`\n` +
      `  • Nomor Seri: \`${data.number || '-'}\`\n` +
      `  • Kode Belakang (Suffix): \`${data.suffix || '-'}\``;

    await m.react('✅');
    await m.reply(resultText);

  } catch (err) {
    console.error('[CEK PLAT ERROR]', err);
    await m.react('❌');
    await m.reply(`❌ *Gagal:* ${formatNetworkError(err, 'AlwaysCodex Cek Plat')}`);
  }
}

export { pluginConfig as config, handler };
