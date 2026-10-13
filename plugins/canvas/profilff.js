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

import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import te from "../../src/lib/rimuru-error.js";
import axios from "axios";

const pluginConfig = {
  name: "profilff",
  category: "canvas",
  description: "Buat gambar profil FF keren",
  usage: ".profileff <nama> | <guild> | <bg_index>",
  example: ".profileff Fauzan | Rimuru | 1",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

const backgroundList = [
  "https://files.catbox.moe/6a4utu.jpg",
  "https://files.catbox.moe/bkc7z4.jpg",
  "https://files.catbox.moe/5f4r4j.jpg",
  "https://files.catbox.moe/wgvfbb.jpg",
  "https://files.catbox.moe/wo1fi3.jpg",
  "https://files.catbox.moe/11hbzc.jpg",
  "https://files.catbox.moe/8ahm3q.jpg",
  "https://files.catbox.moe/ohpm1n.jpg",
  "https://files.catbox.moe/nneipb.jpg",
  "https://files.catbox.moe/oge6p6.jpg",
  "https://files.catbox.moe/uoqhpg.jpg"
];

let isFontLoaded = false;
async function loadFont() {
    if (isFontLoaded) return;
    try {
        const fontBuffer = await axios.get("https://files.catbox.moe/knb2k0.otf", { responseType: "arraybuffer" }).then(r => r.data);
        GlobalFonts.register(Buffer.from(fontBuffer), "TeutonFF");
        isFontLoaded = true;
    } catch (e) {
    }
}

async function handler(m, { sock }) {
  await loadFont();
  const input = m.text?.trim();

  if (!input) {
    return m.reply(`⚠️ Harap masukkan nama!\nContoh: \`${m.prefix}${m.command} Fauzan | Guild | rand\``);
  }

  const parts = input.split("|").map(v => v.trim());
  const nickname = parts[0];
  const guild = parts[1] || "";
  let bgPick = parts[2] || "rand";

  if (bgPick.toLowerCase() === "rand" || bgPick.toLowerCase() === "random") {
    bgPick = String(Math.floor(Math.random() * backgroundList.length) + 1);
  }

  const index = parseInt(bgPick, 10) - 1;
  if (isNaN(index) || index < 0 || index >= backgroundList.length) {
    return m.reply(`⚠️ Background tidak valid! Pilih angka 1–${backgroundList.length} atau 'rand'.`);
  }

  await m.react("🕕");

  try {
    const bgBuffer = await axios.get(backgroundList[index], { responseType: 'arraybuffer' }).then(r => r.data);
    const bg = await loadImage(Buffer.from(bgBuffer));
    
    const canvas = createCanvas(bg.width, bg.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const safeLeft = 300;
    const safeRight = canvas.width - 50;
    const maxWidth = safeRight - safeLeft;
    const x = safeLeft;
    const yName = canvas.height - 200;
    const yGuild = yName + 150;
    
    const fontFamily = isFontLoaded ? "TeutonFF" : "sans-serif";

    const fitText = (ctx, text, maxWidth, maxFont, minFont, fontFamily) => {
      let size = maxFont;
      while (size > minFont) {
        ctx.font = `bold ${size}px "${fontFamily}"`;
        if (ctx.measureText(text).width <= maxWidth) break;
        size -= 2;
      }
      return size;
    };

    const ellipsize = (ctx, text, maxWidth) => {
      if (ctx.measureText(text).width <= maxWidth) return text;
      let t = text;
      while (t.length > 1 && ctx.measureText(t + "…").width > maxWidth) t = t.slice(0, -1);
      return t + "…";
    };

    let nameSize = fitText(ctx, nickname, maxWidth, 90, 26, fontFamily);
    ctx.font = `bold ${nameSize}px "${fontFamily}"`;
    ctx.textAlign = "left";

    const drawOutlined = (text, x, y) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, x, y);
      ctx.fillStyle = "#ffb300";
      ctx.fillText(text, x, y);
      ctx.strokeStyle = "rgba(0,0,0,0.8)";
      ctx.lineWidth = 1.8;
      ctx.strokeText(text, x, y);
    };

    drawOutlined(ellipsize(ctx, nickname, maxWidth), x, yName);

    if (guild.length > 0) {
      let guildSize = fitText(ctx, guild, maxWidth, 90, 26, fontFamily);
      ctx.font = `bold ${guildSize}px "${fontFamily}"`;
      drawOutlined(ellipsize(ctx, guild, maxWidth), x, yGuild);
    }

    const buffer = await canvas.encode("png");
    
    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: `🔥 Profil FF berhasil dibuat!\n👤 Nama: ${nickname}\n🛡️ Guild: ${guild || "-"}`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
