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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";

import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'iqc5',
    category: 'canvas',
    description: 'Membuat Fake Quote iOS style tanpa API eksternal.',
    usage: '.iqc5 [text/reply]',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 2,
    isEnabled: true,
};

const WIDTH = 1080;
const PAD = 56;
const BG = '#f2f2f7';
const BUBBLE = '#ffffff';
const TEXT = '#111111';
const MUTED = '#777777';
const BLUE = '#0a84ff';

function wrapText(ctx, text, maxWidth, font) {
    ctx.font = font;
    const words = String(text).trim().split(/\s+/);
    const lines = [];
    let line = '';

    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) {
            line = test;
            continue;
        }
        if (line) lines.push(line);
        line = word;
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
}

function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function getClock() {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date()).replace('.', ':');
}

async function buildIqc(text) {
    const ctx0 = createCanvas(WIDTH, 900);
    const g = ctx0.getContext('2d');
    g.fillStyle = BG;
    g.fillRect(0, 0, WIDTH, 900);

    g.fillStyle = '#000000';
    g.font = 'bold 31px sans-serif';
    g.fillText('9:41', PAD, 54);

    g.font = 'bold 24px sans-serif';
    g.fillText('LTE', WIDTH - 150, 54);
    g.fillText('100%', WIDTH - 92, 54);

    const bubbleX = PAD;
    const bubbleY = 115;
    const bubbleW = WIDTH - PAD * 2;
    const textFont = '38px sans-serif';
    const lines = wrapText(g, text, bubbleW - 64, textFont);
    const lineHeight = 52;
    const bubbleH = Math.max(160, 86 + lines.length * lineHeight);

    g.fillStyle = BUBBLE;
    roundedRect(g, bubbleX, bubbleY, bubbleW, bubbleH, 38);
    g.fill();

    g.fillStyle = BLUE;
    g.font = 'bold 25px sans-serif';
    g.fillText('Anita Putri Azzahra', bubbleX + 34, bubbleY + 46);

    g.fillStyle = TEXT;
    g.font = textFont;
    lines.forEach((line, i) => {
        g.fillText(line, bubbleX + 34, bubbleY + 104 + i * lineHeight);
    });

    const footerY = bubbleY + bubbleH - 26;
    g.fillStyle = MUTED;
    g.font = '23px sans-serif';
    const clock = getClock();
    g.fillText(clock, WIDTH - PAD - 105, footerY);
    g.fillText('✓✓', WIDTH - PAD - 54, footerY);

    return ctx0.toBuffer('image/png');
}

async function handler(m, { sock, text }) {
    const targetText = String(text || m.quoted?.text || '').trim();

    if (!targetText) {
        return m.reply(
            `💬 *FAKE QUOTE iOS*\n\n` +
            `Gunakan:\n` +
            `• ${m.prefix}iqc5 teks kamu\n` +
            `• Reply pesan teks lalu ${m.prefix}iqc\n\n` +
            `Fitur ini bekerja lokal tanpa API eksternal.`,
        );
    }

    try {
        await m.react?.('⏳');
        const imageBuffer = await buildIqc(targetText);
        await sock.sendMessage(
            m.chat,
            { image: imageBuffer, mimetype: 'image/png', caption: '✨ IQC generated' },
            { quoted: m },
        );
        await m.react?.('✅');
    } catch (error) {
        console.error('[IQC Plugin Error]', error);
        await m.react?.('❌');
        await m.reply('❌ Gagal membuat IQC. Silakan coba lagi.');
    }
}

export { pluginConfig as config, handler };
