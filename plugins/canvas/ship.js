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
import te from "../../src/lib/rimuru-error.js";
import axios from "axios";

const pluginConfig = {
  name: "ship",
  category: "canvas",
  description: "Buat gambar persentase jodoh",
  usage: ".ship @tag1 @tag2",
  example: ".ship @tag1 @tag2",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function getPP(sock, jid) {
    try {
        const url = await sock.profilePictureUrl(jid, "image");
        const res = await axios.get(url, { responseType: "arraybuffer" });
        return await loadImage(Buffer.from(res.data));
    } catch {
        const res = await axios.get("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1771157829363.jpeg", { responseType: "arraybuffer" });
        return await loadImage(Buffer.from(res.data));
    }
}

async function handler(m, { sock }) {
  if (m.mentionedJid.length < 2) {
    return m.reply("⚠️ Harap tag 2 orang yang ingin di-ship!\nContoh: `.ship @user1 @user2`");
  }

  await m.react("🕕");

  try {
    const user1 = m.mentionedJid[0];
    const user2 = m.mentionedJid[1];

    const pp1 = await getPP(sock, user1);
    const pp2 = await getPP(sock, user2);

    const bgUrl = "https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1771827988894.jpeg";
    const bgRes = await axios.get(bgUrl, { responseType: "arraybuffer" });
    const bg = await loadImage(Buffer.from(bgRes.data));

    const persen = Math.floor(Math.random() * 101);

    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawAvatar = (img, x, y, size) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();
        
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#f0f0f0";
        ctx.stroke();
    };

    drawAvatar(pp1, 50, 70, 260);
    drawAvatar(pp2, 490, 70, 260);

    ctx.font = "bold 80px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 10;
    
    const heartEmoji = persen > 50 ? "❤️" : "💔";
    ctx.fillText(heartEmoji, 400, 160);
    ctx.fillText(`${persen}%`, 400, 260);

    const buffer = await canvas.encode("png");
    
    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: `👩‍❤️‍👨 Ship Result!\nKecocokan: *${persen}%*`,
      mentions: [user1, user2]
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
