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

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const execPromise = promisify(exec);

const pluginConfig = {
  name: "alultimate",
  category: "tools",
  description: "Convert document/link to image/video HD (Anti-Buffering) v2",
  usage: ".swhd2 [link / caption]",
  example: ".swhd2 https://catbox.moe/example.mp4 [caption]",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 10,
  isEnabled: true,
};

// Helper untuk deteksi URL
function isUrl(str) {
  try {
    return /^https?:\/\//i.test(str);
  } catch {
    return false;
  }
}

async function handler(m, { sock, text, command, prefix }) {
  const args = text ? text.split(/\s+/) : [];
  const possibleUrl = args[0] || '';
  const hasUrl = isUrl(possibleUrl);

  if (!m.isMedia && !m.hasQuotedMedia && !hasUrl) {
    return await sock.sendMessage(
      m.chat,
      {
        text: `⚠️ *Format Salah*\n\n` +
              `📌 *Cara Pakai:*\n` +
              `1. *Reply/Kirim Document:* \`${prefix || '.'}${command} [caption]\`\n` +
              `2. *Pakai Link:* \`${prefix || '.'}${command} https://link-media.com/file.mp4 [caption]\``,
      },
      { quoted: m }
    );
  }

  await m.react('✨');

  let inputPath = null;
  let outputPath = null;

  try {
    let buffer = null;
    let mimeType = '';
    let captionText = '';

    // CASE 1: Jika menggunakan Link / URL Direct
    if (hasUrl) {
      captionText = args.slice(1).join(' ') || '';
      
      const response = await axios.get(possibleUrl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        timeout: 60000
      });

      buffer = Buffer.from(response.data);
      mimeType = response.headers['content-type'] || '';

      if (!mimeType || mimeType.includes('octet-stream')) {
        const ext = path.extname(possibleUrl).toLowerCase();
        if (['.mp4', '.mov', '.mkv', '.webm', '.avi'].includes(ext)) mimeType = 'video/mp4';
        else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) mimeType = 'image/jpeg';
      }
    } 
    // CASE 2: Jika Reply / Kirim Media / Document langsung
    else {
      captionText = text || m.text || '';
      buffer = m.isQuoted ? await m.quoted.download() : await m.download();
      
      mimeType = m.isQuoted 
        ? (m.quoted.mimetype || m.quoted.message?.documentMessage?.mimetype) 
        : (m.mimetype || m.message?.documentMessage?.mimetype);
    }

    if (!buffer || buffer.length === 0) {
      throw new Error('Gagal mengambil buffer/file media.');
    }

    if (!mimeType) {
      throw new Error('Mimetype tidak ditemukan dari media/link.');
    }

    // PROSES CONVERT VIDEO
    if (mimeType.startsWith('video/')) {
      const time = Date.now();
      inputPath = path.join('.', `input_${time}.mp4`);
      outputPath = path.join('.', `output_${time}.mp4`);

      fs.writeFileSync(inputPath, buffer);

      try {
        await execPromise(`ffmpeg -i "${inputPath}" -c copy -movflags +faststart "${outputPath}" -y`);
      } catch (ffmpegErr) {
        await execPromise(`ffmpeg -i "${inputPath}" -vcodec libx264 -pix_fmt yuv420p -acodec aac -movflags +faststart "${outputPath}" -y`);
      }

      const videoBuffer = fs.readFileSync(outputPath);

      await sock.sendMessage(
        m.chat,
        {
          video: videoBuffer,
          mimetype: 'video/mp4',
          caption: captionText,
          ptv: false
        },
        { quoted: m }
      );
    } 
    // PROSES GAMBAR
    else if (mimeType.startsWith('image/')) {
      await sock.sendMessage(
        m.chat,
        {
          image: buffer,
          mimetype: mimeType,
          caption: captionText,
        },
        { quoted: m }
      );
    } 
    else {
      throw new Error(`Tipe media tidak didukung: ${mimeType}`);
    }

    await m.react('✅');
  } catch (err) {
    console.error('[SWHD2 ERROR]', err);
    await m.react('❌');
    await sock.sendMessage(
      m.chat,
      {
        text: `❌ *Gagal convert media/link (SWHD BY AL 53RUPU7)*\n\n> ${err.message}`,
      },
      { quoted: m }
    );
  } finally {
    if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
}

export { pluginConfig as config, handler };
