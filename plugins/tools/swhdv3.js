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

const execPromise = promisify(exec);

const pluginConfig = {
  name: "swhdv3",
  category: "tools",
  description: "Convert document to image/video (Ultra Fast & Zero Buffering)",
  usage: ".swhdv3 [caption]",
  example: "reply document dengan .swhdv3",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 10,
  isEnabled: true,
};

async function handler(m, { sock, text, command, prefix }) {
  if (!(m.isMedia || m.hasQuotedMedia)) {
    return await sock.sendMessage(
      m.chat,
      {
        text: `⚠️ *Format Salah*\n\nContoh:\nReply document video/image dengan caption ${prefix || '.'}${command} [caption]`,
      },
      { quoted: m }
    );
  }

  await m.react('⏰');

  let inputPath = null;
  let outputPath = null;

  try {
    const buffer = m.isQuoted ? await m.quoted.download() : await m.download();
    
    let mimeType = m.isQuoted 
      ? (m.quoted.mimetype || m.quoted.message?.documentMessage?.mimetype) 
      : (m.mimetype || m.message?.documentMessage?.mimetype);

    if (!mimeType) {
      throw new Error('Mimetype tidak ditemukan dari document.');
    }

    const captionText = text || m.text || '';

    if (mimeType.startsWith('video/')) {
      // 1. Simpan buffer ke temporary file
      const time = Date.now();
      inputPath = path.join('.', `input_${time}.mp4`);
      outputPath = path.join('.', `output_${time}.mp4`);

      fs.writeFileSync(inputPath, buffer);

      // 2. Optimized FFmpeg V3: Faststart + Fragmented MP4 Streaming + Clean Metadata (-c copy 100% HD)
      try {
        await execPromise(
          `ffmpeg -i "${inputPath}" -c copy -movflags +faststart+frag_keyframe+empty_moov -map_metadata -1 "${outputPath}" -y`
        );
      } catch (ffmpegErr) {
        // Fallback re-encode ultrafast jika video awal memakai codec aneh (misal H.265 / HEVC)
        await execPromise(
          `ffmpeg -i "${inputPath}" -vcodec libx264 -pix_fmt yuv420p -acodec aac -movflags +faststart+frag_keyframe+empty_moov -map_metadata -1 "${outputPath}" -y`
        );
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
    } else if (mimeType.startsWith('image/')) {
      await sock.sendMessage(
        m.chat,
        {
          image: buffer,
          mimetype: mimeType,
          caption: captionText,
        },
        { quoted: m }
      );
    } else {
      throw new Error(`Tipe media tidak didukung: ${mimeType}`);
    }

    await m.react('✅');
  } catch (err) {
    console.error('[SWHDV3 ERROR]', err);
    await m.react('❌');
    await sock.sendMessage(
      m.chat,
      {
        text: `❌ *Gagal convert document*\n\n> ${err.message}`,
      },
      { quoted: m }
    );
  } finally {
    // Bersihkan file sementara
    if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
}

export { pluginConfig as config, handler };
