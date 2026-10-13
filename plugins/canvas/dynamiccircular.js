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

import { createCanvas, loadImage } from "@napi-rs/canvas";
import { downloadMediaMessage, getContentType } from "rimuru";
import te from "../../src/lib/rimuru-error.js";
import axios from "axios";

const pluginConfig = {
  name: "dynamiccircular",
  category: "canvas",
  description: "Buat gambar dengan efek dynamic circular text",
  usage: ".dymc <teks>",
  example: ".dymc RIMURU BOT (sambil reply gambar)",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

function drawCircularText(ctx, text, centerX, centerY, radius) {
  const chars = text.split('');
  const n = chars.length;
  const arcSpan = Math.PI * 0.7;
  const angleIncrement = n > 1 ? arcSpan / (n - 1) : 0;
  const start = Math.PI / 2 + arcSpan / 2;

  for (let i = 0; i < n; i++) {
    const char = chars[i];
    const angle = start - i * angleIncrement;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle - Math.PI / 2);
    ctx.strokeText(char, 0, 0);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }
}

async function handler(m, { sock }) {
  const text = m.text?.trim();

  if (!text) {
    return m.reply(`⚠️ Harap masukkan teks!\nContoh: \`${m.prefix}${m.command} Halo (sambil balas gambar)\``);
  }

  const msg = m.message;
  const isQuotedImage = m.quoted && (getContentType(m.quoted.message) === "imageMessage" || m.quoted.mtype === "imageMessage");
  const isImage = getContentType(msg) === "imageMessage" || m.mtype === "imageMessage";

  if (!isImage && !isQuotedImage) {
    return m.reply(`⚠️ Harap kirim atau balas gambar dengan caption \`${m.prefix}${m.command} ${text}\``);
  }

  await m.react("🕕");

  try {
    const targetMsg = isQuotedImage ? m.quoted : m;
    const mediaData = await downloadMediaMessage(
      targetMsg,
      "buffer",
      {},
      { logger: console }
    );

    const bgUrl = "https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1771157829363.jpeg";
    const bgBuffer = await axios.get(bgUrl, { responseType: 'arraybuffer' }).then(r => r.data);
    
    const bg = await loadImage(Buffer.from(bgBuffer));
    const userImg = await loadImage(mediaData);

    const canvas = createCanvas(bg.width, bg.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const size = 489;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 12;

    const minSide = Math.min(userImg.width, userImg.height);
    const sx = (userImg.width - minSide) / 2;
    const sy = (userImg.height - minSide) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      userImg,
      sx,
      sy,
      minSide,
      minSide,
      centerX - size / 2,
      centerY - size / 2,
      size,
      size
    );
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2 + 18, 0, Math.PI * 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.save();
    const maxFontSize = 80;
    const minFontSize = 40;
    let fontSize = maxFontSize;
    if (text.length > 10) fontSize = Math.max(minFontSize, maxFontSize - (text.length - 10) * 2);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    const radius = size / 2 + 80;
    drawCircularText(ctx, text.toUpperCase(), centerX, centerY + 50, radius);
    ctx.restore();

    const buffer = await canvas.encode("png");
    
    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: "✨ Berhasil membuat efek dymc!"
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
