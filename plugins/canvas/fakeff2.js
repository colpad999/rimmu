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
  name: "fakeff2",
  category: "canvas",
  description: "Bikin gambar banner Fake FF (Solo 2)",
  usage: ".fakeff2 <teks>|[bgNum]",
  example: ".fakeff2 Fauzan|2",
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
    const fontBuffer = await axios.get("https://files.catbox.moe/knb2k0.otf", { responseType: "arraybuffer" }).then(r => r.data);
    GlobalFonts.register(Buffer.from(fontBuffer), "TeutonNormal");
    isFontLoaded = true;
}

async function handler(m, { sock }) {
  await loadFont();
  const input = m.text?.trim();
  if (!input) {
    return m.reply(`⚠️ Harap masukkan teksnya!\nContoh: \`${m.prefix}${m.command} Fauzan|2\``);
  }

  const [text, bgNum] = input.split("|");
  if (!text) {
    return m.reply(`⚠️ Harap masukkan teksnya!`);
  }

  await m.react("🕕");
  
  try {
    const backgrounds = [
      "https://c.termai.cc/i139/c3AE.png",
      "https://c.termai.cc/i190/1Bl.png",
      "https://c.termai.cc/i127/BGpc9R.png",
      "https://c.termai.cc/i111/PiZ7.png",
      "https://c.termai.cc/i139/r9kbes.png",
      "https://c.termai.cc/i102/Sg6Y.png",
      "https://c.termai.cc/i101/08JOs0.png",
      "https://c.termai.cc/i166/AYfQRT.png",
      "https://c.termai.cc/i120/pJoap1K.png",
      "https://c.termai.cc/i176/6ZBF.png",
      "https://c.termai.cc/i104/IMs.png",
      "https://c.termai.cc/i102/LKC.png",
      "https://c.termai.cc/i152/UQsC.png",
      "https://c.termai.cc/i164/owW1J.png",
      "https://c.termai.cc/i180/bPl01wI.png",
      "https://c.termai.cc/i187/qEz.png",
      "https://c.termai.cc/i169/iYMybl.png",
      "https://c.termai.cc/i149/8n6.png",
      "https://c.termai.cc/i193/vp6.png",
      "https://c.termai.cc/i106/9RvfDi.png",
      "https://c.termai.cc/i144/cOYfeO.png",
      "https://c.termai.cc/i164/09Fl.png",
      "https://c.termai.cc/i170/6Vp6Qja.png",
      "https://c.termai.cc/i177/nMwo.png",
      "https://c.termai.cc/i149/cvx1wmH.png",
      "https://c.termai.cc/i173/n9YxdU.png",
      "https://c.termai.cc/i113/8wiCPNx.png",
      "https://c.termai.cc/i155/yBerT.png",
      "https://c.termai.cc/i136/pHN5eK.png",
      "https://c.termai.cc/i144/DXA.png"
    ];

    let index = Math.floor(Math.random() * backgrounds.length);
    if (bgNum) {
      const n = parseInt(bgNum.trim());
      if (!isNaN(n) && n >= 1 && n <= backgrounds.length) {
        index = n - 1;
      }
    }

    const bgBuffer = await axios.get(backgrounds[index], { responseType: "arraybuffer" }).then(r => r.data);
    const bg = await loadImage(Buffer.from(bgBuffer));
    
    const canvas = createCanvas(bg.width, bg.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    let fontSize = 50;
    if (text.length > 12) {
      fontSize = Math.max(26, fontSize - (text.length - 12) * 2);
    }

    const x = 582;
    const y = canvas.height - 378;

    ctx.textAlign = "center";
    ctx.font = `bold ${fontSize}px "TeutonNormal"`;

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 1.8;
    ctx.strokeText(text, x, y);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x, y);

    ctx.fillStyle = "#ffb300";
    ctx.fillText(text, x, y);

    const buffer = await canvas.encode("png");
    await sock.sendMessage(m.chat, { image: buffer, caption: "🎮 *Fake FF 2*" }, { quoted: m });
    await m.react("✅");

  } catch (err) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
