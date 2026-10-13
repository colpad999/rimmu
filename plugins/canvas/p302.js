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

import { createCanvas } from "@napi-rs/canvas";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "p302",
  category: "canvas",
  description: "Buat logo 3D metal (p302)",
  usage: ".p302 <teks>",
  example: ".p302 Fauzan",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  let text = m.text?.trim();

  if (!text) {
    return m.reply(`⚠️ Harap masukkan teksnya!\nContoh: \`${m.prefix}${m.command} Fauzan\``);
  }

  await m.react("🕕");

  try {
    text = text.toUpperCase();

    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#0b1220");
    bgGradient.addColorStop(0.5, "#000000");
    bgGradient.addColorStop(1, "#111827");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let fontSize = 320;
    const maxWidth = width * 0.95;

    ctx.font = `bold ${fontSize}px sans-serif`;
    let textWidth = ctx.measureText(text).width;

    if (textWidth > maxWidth) {
      fontSize = Math.floor(fontSize * (maxWidth / textWidth));
    }

    ctx.font = `bold ${fontSize}px sans-serif`;

    const x = width / 2;
    const y = height / 2;

    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 30;
    ctx.fillStyle = "#000000";
    ctx.fillText(text, x, y + 25);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    const metal = ctx.createLinearGradient(0, y - fontSize, 0, y + fontSize);
    metal.addColorStop(0, "#ffffff");
    metal.addColorStop(0.2, "#e5e7eb");
    metal.addColorStop(0.5, "#9ca3af");
    metal.addColorStop(0.8, "#e5e7eb");
    metal.addColorStop(1, "#ffffff");

    ctx.fillStyle = metal;
    ctx.fillText(text, x, y);

    ctx.lineWidth = fontSize * 0.05;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.strokeText(text, x, y);

    const buffer = await canvas.encode("png");
    
    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: "✨ Logo p302 berhasil dibuat!"
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
