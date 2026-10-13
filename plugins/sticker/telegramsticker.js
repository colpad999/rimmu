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

import { RIMURU_DEVELOPER } from "../../config.js";
import axios from 'axios';
import _sharp from 'sharp';
import config from '../../config.js';

const sharp = _sharp;

const pluginConfig = {
  name: 'telegramsticker',
  category: 'sticker',
  description: 'Ambil sticker pack dari Telegram dan kirim sebagai sticker pack WhatsApp',
  usage: '.telestick <url>',
  example: '.telestick https://t.me/addstickers/AnimeSticker',
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 30,
  energi: 3,
  isEnabled: true,
};

function getBotToken() {
  return String(config.telegram?.botToken || '').trim();
}

async function toWebp(buffer) {
  return sharp(buffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 80 })
    .toBuffer();
}

async function handler(m, { sock }) {
  const url = String(m.args?.[0] || '').trim();
  const match = url.match(/^https:\/\/t\.me\/addstickers\/([^/?#]+)$/i);
  if (!match) return m.reply(`📌 Contoh: ${m.prefix}telestick https://t.me/addstickers/AnimeSticker`);
  if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup.');

  const botToken = getBotToken();
  if (!botToken) {
    return m.reply('❌ Telegram Bot Token belum diisi di config.telegram.botToken.');
  }
  if (typeof sock.sendStickerPack !== 'function') {
    return m.reply('❌ WhatsApp client Rimuru tidak mendukung pengiriman sticker pack otomatis.');
  }

  await m.react('⏳');
  try {
    const base = `https://api.telegram.org/bot${botToken}`;
    const { data: setRes } = await axios.get(`${base}/getStickerSet`, {
      params: { name: match[1] },
      timeout: 20000,
    });
    const stickerSet = setRes?.result;
    if (!stickerSet?.stickers?.length) throw new Error('Sticker pack Telegram tidak ditemukan.');

    const buffers = [];
    for (const sticker of stickerSet.stickers.slice(0, 20)) {
      try {
        const { data: fileRes } = await axios.get(`${base}/getFile`, {
          params: { file_id: sticker.file_id },
          timeout: 15000,
        });
        const filePath = fileRes?.result?.file_path;
        if (!filePath) continue;
        const { data: fileBuffer } = await axios.get(`https://api.telegram.org/file/bot${botToken}/${filePath}`, {
          responseType: 'arraybuffer',
          timeout: 30000,
        });
        buffers.push(await toWebp(Buffer.from(fileBuffer)));
      } catch {}
    }

    if (!buffers.length) throw new Error('Tidak ada sticker yang berhasil diunduh.');

    const packName = stickerSet.title || 'Telegram Sticker';
    await sock.sendStickerPack(m.chat, buffers, m, {
      name: packName,
      packname: packName,
      publisher: RIMURU_DEVELOPER || 'RimuruMD',
      author: RIMURU_DEVELOPER || 'RimuruMD',
      description: `Telegram sticker pack: ${packName}`,
      emojis: ['❤'],
    });

    await m.react('✅');
    await m.reply(`✅ Sticker Telegram berhasil dipindahkan.\n📦 Pack: ${packName}\n🧩 Sticker: ${buffers.length}`);
  } catch (error) {
    console.error('[TELESTICK]', error?.message || error);
    await m.react('❌');
    await m.reply(`❌ Gagal mengambil sticker Telegram: ${error?.message || 'Unknown error'}`);
  }
}

export { pluginConfig as config, handler };
