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
  name: "humanizer",
  category: "ai",
  description: "Ubah teks AI-generated jadi lebih natural (Humanized)",
  usage: ".humanize <teks> (atau reply teks)",
  example: ".humanize Berdasarkan analisis yang mendalam...",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, text }) {
  // Ambil teks dari input langsung ATAU dari pesan yang di-reply (quoted text)
  let queryText = text || (m.quoted && m.quoted.text ? m.quoted.text : '');

  if (!queryText) {
    return m.reply(
      `⚠️ *Format Salah*\n\n` +
      `Penggunaan:\n\`.humanize <teks>\` atau reply pesan teks AI dengan \`.humanize\`\n\n` +
      `Contoh:\n\`.humanize Berdasarkan analisis yang mendalam, dapat disimpulkan bahwa... (min. 50 karakter)\``
    );
  }

  queryText = queryText.trim();

  // Validasi batas minimal karakter (sesuai dokumentasi API: min 50 karakter)
  if (queryText.length < 50) {
    return m.reply(`⚠️ *Teks Terlalu Pendek!*\nMinimal teks yang di-humanize adalah *50 karakter*. Teks kamu saat ini: ${queryText.length} karakter.`);
  }

  const apiUrl = `https://api.nexray.web.id/ai/humanizer?teks=${encodeURIComponent(queryText)}`;

  await m.react('⏳');

  try {
    const response = await withNetworkRetry(() => fetch(apiUrl, { timeout: 30000 }));
    const res = await response.json();

    // Mengakomodasi respons 'success' sesuai spesifikasi JSON API
    if ((!res.success && !res.status) || !res.result) {
      await m.react('❌');
      return m.reply(`❌ *Gagal:* Tidak mendapat respon dari server Humanizer.`);
    }

    const humanizedResult = res.result;

    await m.react('✅');
    await m.reply(
      `✨ *AI TEXT HUMANIZER* ✨\n\n` +
      `${humanizedResult}\n\n` +
      `📊 *Panjang Awal:* ${res.input_length || queryText.length} karakter | *Panjang Hasil:* ${res.output_length || humanizedResult.length} karakter`
    );

  } catch (err) {
    console.error('[HUMANIZER ERROR]', err);
    await m.react('❌');
    await m.reply(`❌ *Gagal:* ${formatNetworkError(err, 'AlwaysCodex Humanizer')}`);
  }
}

export { pluginConfig as config, handler };
