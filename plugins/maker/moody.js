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

import sharp from 'sharp';

const pluginConfig = {
  name: 'moody',
  category: 'maker',
  description: 'Mengubah foto biasa menjadi Cinematic Dark Retro Flash Tone presisi',
  usage: '.cinematic (Kirim/Reply Foto)',
  example: '.cinematic',
  isEnabled: true,
};

function getMediaMessageAndMime(m) {
  const target = m.isQuoted ? m.quoted : m;
  const msg = target?.message || target;

  const viewOnceMsg = msg?.viewOnceMessage?.message || msg?.viewOnceMessageV2?.message || msg?.viewOnceMessageV2Extension?.message;
  const actualMsg = viewOnceMsg || msg;

  const imageMsg = actualMsg?.imageMessage;
  const docMsg = actualMsg?.documentMessage || actualMsg?.documentWithCaptionMessage?.message?.documentMessage;

  let mimeType = imageMsg?.mimetype || docMsg?.mimetype || target?.mimetype;

  return {
    isImage: Boolean(mimeType && mimeType.startsWith('image/')),
    targetToDownload: target
  };
}

async function handler(m, { sock, prefix, command }) {
  const { isImage, targetToDownload } = getMediaMessageAndMime(m);

  if (!((m.isMedia || m.hasQuotedMedia) && isImage)) {
    return await sock.sendMessage(
      m.chat,
      { text: `⚠️ *Format Salah!*\n\n> Balas/Kirim foto dengan ketik *${prefix || '.'}${command}*` },
      { quoted: m }
    );
  }

  try {
    await m.react('🎞️');

    const inputBuffer = await targetToDownload.download();
    if (!inputBuffer) throw new Error('Gagal mengunduh foto.');

    const metadata = await sharp(inputBuffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 1200;

    // 1. Film Grain Overlay (Simulasi bintik kamera analog 35mm / CCD)
    const filmGrainSvg = Buffer.from(`
      <svg width="${width}" height="${height}">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.07 0"/>
        </filter>
        <rect width="${width}" height="${height}" filter="url(#noise)" />
      </svg>
    `);

    // 2. Smooth Vignette Ultra (Penyebaran bayangan sudut yang pekat namun menyatu)
    const smoothVignetteSvg = Buffer.from(`
      <svg width="${width}" height="${height}">
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="65%" fx="50%" fy="50%">
            <stop offset="30%" stop-color="#000000" stop-opacity="0" />
            <stop offset="75%" stop-color="#000000" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
          </radialGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#vignette)" />
      </svg>
    `);

    // 3. Amber/Warm Tint Overlay (Efek warna hangat lampu malam / flash retro)
    const warmAmberTintSvg = Buffer.from(`
      <svg width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#ffaa33" opacity="0.06" />
      </svg>
    `);

    // Proses Layering & Adjustment Warna
    const processedBuffer = await sharp(inputBuffer)
      .sharpen({ sigma: 1.2 }) // Memperjelas tekstur pakaian & wajah
      .modulate({
        brightness: 0.88, // Menggelapkan nuansa keseluruhan secara halus
        saturation: 1.20, // Menghidupkan warna kulit & objek
      })
      .linear(1.35, -25) // High Contrast + Deep Crushed Shadow (Area hitam jadi pekat banget)
      .composite([
        { input: warmAmberTintSvg, blend: 'over' },
        { input: smoothVignetteSvg, blend: 'over' },
        { input: filmGrainSvg, blend: 'over' }
      ])
      .jpeg({ quality: 95 })
      .toBuffer();

    await sock.sendMessage(
      m.chat,
      { image: processedBuffer, caption: '✨ *Retro Night Flash Tone*' },
      { quoted: m }
    );

    await m.react('✅');

  } catch (err) {
    console.error('[CINEMATIC ERROR]', err);
    await m.react('❌');
    await sock.sendMessage(
      m.chat,
      { text: `❌ *Gagal memproses gambar:* ${err.message}` },
      { quoted: m }
    );
  }
}

export default { config: pluginConfig, handler };
