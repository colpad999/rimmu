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

import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import te from "../../src/lib/rimuru-error.js";
import axios from "axios";
import config from "../../config.js";

const pluginConfig = {
  name: "sroast",
  category: "canvas",
  description: "Buat stiker roast",
  usage: ".sroast <teks1> | <teks2> | <teks3>",
  example: ".sroast kamu | JELEK | banget",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

let isFontLoaded = false;
async function loadFont() {
    if (isFontLoaded) return;
    try {
        const fontBuffer = await axios.get("https://files.catbox.moe/8wqg77.ttf", { responseType: "arraybuffer" }).then(r => r.data);
        GlobalFonts.register(Buffer.from(fontBuffer), "ArialBoldSroast");
        isFontLoaded = true;
    } catch (e) {
    }
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line ? line + ' ' + words[i] : words[i];
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && line) {
      lines.push(line);
      line = words[i];
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function handler(m, { sock }) {
  await loadFont();
  const input = m.text?.trim();

  if (!input) {
    return m.reply(`⚠️ Harap masukkan teks!\nContoh: \`${m.prefix}${m.command} aku | JELEK | banget\``);
  }

  const parts = input.split('|').map(v => v.trim());
  const t1 = parts[0] || '-';
  const t2 = (parts[1] || '-').toUpperCase();
  const t3 = parts[2] || '-';

  await m.react("🕕");

  try {
    const width = 512;
    const height = 512;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const marginXText = 70;
    const marginXTitle = 30;
    const maxWidthTop = width - marginXText * 2;
    const maxWidthTitle = width - marginXTitle * 2;
    const spacingAfterT1 = 14;
    const spacingAfterT2 = 18;

    const fontFace = isFontLoaded ? "ArialBoldSroast" : "sans-serif";

    ctx.font = `28px "${fontFace}"`;
    let lines1 = wrapText(ctx, t1, maxWidthTop);
    const heightT1 = lines1.length * 34;

    let fontSizeTitle = 60;
    ctx.font = `bold ${fontSizeTitle}px "${fontFace}"`;
    let lines2 = wrapText(ctx, t2, maxWidthTitle);
    const heightT2 = lines2.length * (fontSizeTitle + 6);

    ctx.font = `28px "${fontFace}"`;
    let lines3 = wrapText(ctx, t3, maxWidthTop);
    const heightT3 = lines3.length * 34;

    const totalHeight = heightT1 + spacingAfterT1 + heightT2 + spacingAfterT2 + heightT3;
    let y = (height - totalHeight) / 2;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#1E90FF';

    ctx.font = `28px "${fontFace}"`;
    for (const line of lines1) { ctx.fillText(line, marginXText, y); y += 34; }
    y += spacingAfterT1;

    ctx.font = `bold ${fontSizeTitle}px "${fontFace}"`;
    for (const line of lines2) { ctx.fillText(line, marginXTitle, y); y += fontSizeTitle + 6; }
    y += spacingAfterT2;

    ctx.font = `28px "${fontFace}"`;
    for (const line of lines3) { ctx.fillText(line, marginXText, y); y += 34; }

    const buffer = await canvas.encode("png");
    
    await sock.sendImageAsSticker(m.chat, buffer, m, {
        packname: config.sticker.packname,
        author: config.sticker.author
    });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
