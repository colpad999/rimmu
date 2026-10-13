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

const pluginConfig = {
  name: "drakness",
  category: "canvas",
  description: "Beri efek gelap pada gambar",
  usage: ".darkness [amount]",
  example: ".darkness 100 (sambil reply gambar)",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

function applyDarkness(ctx, width, height, amount) {
  const img = ctx.getImageData(0, 0, width, height);

  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] = Math.max(0, img.data[i] - amount);
    img.data[i + 1] = Math.max(0, img.data[i + 1] - amount);
    img.data[i + 2] = Math.max(0, img.data[i + 2] - amount);
  }

  ctx.putImageData(img, 0, 0);
}

async function handler(m, { sock }) {
  const amountStr = m.text?.trim() || "50";
  const amount = parseInt(amountStr, 10);

  if (isNaN(amount) || amount < 0 || amount > 255) {
    return m.reply("⚠️ Parameter amount harus angka antara 0 - 255.");
  }

  const msg = m.message;
  const isQuotedImage = m.quoted && (getContentType(m.quoted.message) === "imageMessage" || m.quoted.mtype === "imageMessage");
  const isImage = getContentType(msg) === "imageMessage" || m.mtype === "imageMessage";

  if (!isImage && !isQuotedImage) {
    return m.reply(`⚠️ Harap kirim atau balas gambar dengan caption \`${m.prefix}${m.command} ${amount}\``);
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

    const img = await loadImage(mediaData);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);
    applyDarkness(ctx, canvas.width, canvas.height, amount);

    const buffer = await canvas.encode("png");
    
    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: `🌙 Efek darkness diterapkan (amount: ${amount})`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
