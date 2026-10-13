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

import FormData from 'form-data';
import { downloadMediaMessage } from 'rimuru';
import axios from 'axios';

const pluginConfig = {
  name: 'createchannel',
  category: 'owner',
  description: 'Membuat WhatsApp Channel/newsletter baru',
  usage: '.createchannel <nama>|<deskripsi>',
  example: '.createchannel Rimuru MD|Channel resmi bot',
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  isEnabled: true,
};

const DEFAULT_CHANNEL_IMAGE = 'https://files.catbox.moe/xpntd8.jpg';

async function uploadCatbox(buffer) {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', buffer, { filename: 'channel.jpg' });
  const res = await axios.post('https://catbox.moe/user/api.php', form, {
    headers: form.getHeaders(),
    timeout: 30000,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  const url = String(res.data || '').trim();
  if (!url.startsWith('https://')) throw new Error('Catbox tidak mengembalikan URL');
  return url;
}

async function handler(m, { sock }) {
  const text = String(m.text || '').trim();
  if (!text) return m.reply(`📛 Gunakan format:\n${m.prefix || '.'}createchannel <nama>|<deskripsi>`);

  const [nameRaw, ...descParts] = text.split('|');
  const name = String(nameRaw || '').trim();
  const desc = descParts.join('|').trim() || 'Tidak ada deskripsi.';
  if (!name) return m.reply('❌ Nama channel wajib diisi.');

  let imageUrl = DEFAULT_CHANNEL_IMAGE;
  try {
    const quoted = m.quoted;
    if (quoted && (quoted.mtype === 'imageMessage' || quoted.type === 'imageMessage' || quoted.isMedia)) {
      const buffer = await (quoted.download?.() || downloadMediaMessage(quoted, 'buffer', {}));
      if (buffer) imageUrl = await uploadCatbox(buffer);
    }
  } catch (e) {
    console.warn('[CREATECHANNEL] Upload image failed:', e?.message || e);
  }

  try {
    if (typeof sock.newsletterCreate !== 'function') {
      return m.reply('❌ Baileys pada SC ini tidak menyediakan `newsletterCreate`.');
    }

    const newsletter = await sock.newsletterCreate(name, desc, { url: imageUrl });
    const invite = newsletter?.invite || '';
    const id = newsletter?.id || '—';
    const link = invite ? `https://whatsapp.com/channel/${invite}` : 'Tidak tersedia';

    await sock.sendMessage(m.chat, {
      text: `✅ *Channel Berhasil Dibuat!*\n\n📡 *Nama:* ${name}\n📝 *Deskripsi:* ${desc}\n🆔 *ID:* ${id}\n🔗 *Link:* ${link}`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: 'WhatsApp Channel',
          sourceUrl: invite ? link : 'https://whatsapp.com/channel',
          thumbnailUrl: imageUrl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });
  } catch (err) {
    console.error('[CREATECHANNEL]', err);
    await m.reply(`❌ Gagal membuat channel: ${err?.message || err}`);
  }
}

export { pluginConfig as config, handler };
