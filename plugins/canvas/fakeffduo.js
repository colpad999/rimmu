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
  name: "fakeffduo",
  category: "canvas",
  description: "Bikin gambar banner Fake FF (Duo)",
  usage: ".fakeffduo <nama1>|<nama2>|[bgNum]",
  example: ".fakeffduo Fauzan|Bot|1",
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
  if (!input || !input.includes("|")) {
    return m.reply(`⚠️ Harap masukkan 2 nama dipisah dengan tanda |\nContoh: \`${m.prefix}${m.command} Fauzan|Bot|1\``);
  }

  const parts = input.split("|");
  const name1 = parts[0]?.trim();
  const name2 = parts[1]?.trim();
  const bg = parseInt(parts[2]?.trim() || "1");

  if (!name1 || !name2) {
    return m.reply(`⚠️ Parameter name1 dan name2 diperlukan!`);
  }

  const githubBaseUrl = "https://raw.githubusercontent.com/Raavfy-24/Maker/refs/heads/main";
  const max = 50;

  if (bg < 1 || bg > max) {
    return m.reply(`⚠️ Background harus 1-${max}`);
  }

  await m.react("🕕");
  
  try {
    const bgUrl = `${githubBaseUrl}/FAKE%20FF%20DUO/${bg}.png`;
    const bgBuffer = await axios.get(bgUrl, { responseType: "arraybuffer" }).then(r => r.data);

    const background = await loadImage(Buffer.from(bgBuffer));
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = `bold 38px "TeutonNormal"`;
    ctx.textAlign = "center";

    ctx.fillStyle = "#ffffff";
    ctx.fillText(name1, 212, canvas.height - 314);

    ctx.fillStyle = "#ffb300";
    ctx.fillText(name1, 212, canvas.height - 314);

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 1.6;
    ctx.strokeText(name1, 212, canvas.height - 314);


    ctx.fillStyle = "#ffffff";
    ctx.fillText(name2, 740, canvas.height - 434);

    ctx.fillStyle = "#ffb300";
    ctx.fillText(name2, 740, canvas.height - 434);

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 1.6;
    ctx.strokeText(name2, 740, canvas.height - 434);

    const buffer = await canvas.encode("png");
    await sock.sendMessage(m.chat, { image: buffer, caption: "🎮 *Fake FF Duo*" }, { quoted: m });
    await m.react("✅");

  } catch (err) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
