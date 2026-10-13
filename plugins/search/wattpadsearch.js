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

import axios from 'axios';

const pluginConfig = {
  name: 'wattpadsearch',
  category: 'search',
  description: 'Mencari cerita Wattpad',
  usage: '.wattpadsearch <query>',
  example: '.wattpadsearch cinta',
  cooldown: 8,
  energi: 1,
  isEnabled: true,
};

function compactNumber(value) {
  const n = Number(value || 0);
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}

async function handler(m, { text }) {
  const query = (text || '').trim();
  if (!query) return m.reply(`📖 *ᴡᴀᴛᴛᴘᴀᴅ sᴇᴀʀᴄʜ*\n\nContoh: ${m.prefix}wattpadsearch cinta`);

  if (m.react) await m.react('📖');
  try {
    const { data } = await axios.get(
      `https://api.lolhuman.xyz/api/wattpadsearch?apikey=none&query=${encodeURIComponent(query)}`,
      { timeout: 30000 }
    );

    if (data?.status !== 200 || !Array.isArray(data?.result) || !data.result.length) {
      throw new Error('Cerita tidak ditemukan');
    }

    const rows = data.result.slice(0, 5).map((s, i) =>
      `${i + 1}. *${s.title || '-'}*\n` +
      `   ✍️ ${s.author || '-'} | 👁️ ${compactNumber(s.readCount)} | ⭐ ${compactNumber(s.voteCount)}\n` +
      `   📝 ${(s.description || '-').slice(0, 100)}${(s.description || '').length > 100 ? '...' : ''}\n` +
      `${s.url ? `   🔗 ${s.url}\n` : ''}`
    ).join('\n');

    if (m.react) await m.react('✅');
    return m.reply(`📖 *ᴡᴀᴛᴛᴘᴀᴅ sᴇᴀʀᴄʜ*\n\n> Query: *${query}*\n━━━━━━━━━━━━━━━\n\n${rows}`.trim());
  } catch (e) {
    if (m.react) await m.react('❌');
    return m.reply(`❌ *Wattpad Search gagal:* ${String(e.message).slice(0, 160)}`);
  }
}

export { pluginConfig as config, handler };
