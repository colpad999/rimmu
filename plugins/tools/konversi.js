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

import fs from "fs";
import path from "path";
import { mconverter } from "../../src/scraper/mconverter.js";
import { downloadContentFromMessage } from "rimuru";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "konversi",
  category: "tools",
  description: "Convert file ke format lain",
  usage: ".converter <format> (reply file)",
  example: ".converter mp3",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 3,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const targetFormat = m.text?.trim()?.toLowerCase();

  if (!m.quoted && !m.isMedia) {
    return m.reply(
      `🔄 *ᴄᴏɴᴠᴇʀᴛᴇʀ*\n\n` +
        `> Reply file dengan format tujuan\n\n` +
        `*Format:*\n` +
        `> \`${m.prefix}converter <format>\`\n\n` +
        `*Contoh:*\n` +
        `> \`${m.prefix}converter mp3\`\n` +
        `> \`${m.prefix}converter mp4\`\n` +
        `> \`${m.prefix}converter png\`\n\n` +
        `*Cara pakai:*\n` +
        `> 1. Reply file yang mau diconvert\n` +
        `> 2. Ketik \`${m.prefix}converter <format>\``,
    );
  }

  if (!targetFormat) {
    return m.reply(
      `❌ Masukkan format tujuan!\n\n> Contoh: \`${m.prefix}converter mp3\``,
    );
  }

  const quoted = m.quoted;
  let mediaMessage = null;
  let filename = "file";

  if (quoted?.isMedia) {
    mediaMessage = quoted;
    filename = quoted.message?.[quoted.type]?.fileName || `file_${Date.now()}`;
  } else if (m.isMedia) {
    mediaMessage = m;
    filename = m.message?.[m.type]?.fileName || `file_${Date.now()}`;
  }

  if (!mediaMessage) {
    return m.reply(`❌ Reply file yang mau diconvert!`);
  }

  m.react("🕕");
  await m.reply(`🕕 *ᴍᴇɴɢᴜɴᴅᴜʜ ғɪʟᴇ...*`);

  try {
    const stream = await downloadContentFromMessage(
      mediaMessage.message[mediaMessage.type],
      mediaMessage.type.replace("Message", ""),
    );

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const ext = filename.split(".").pop() || "bin";
    const tempFile = path.join(tempDir, `convert_${Date.now()}.${ext}`);
    fs.writeFileSync(tempFile, buffer);

    await m.reply(`🔄 *ᴄᴏɴᴠᴇʀᴛɪɴɢ...*\n\n> ${ext} → ${targetFormat}`);

    const result = await mconverter.convert(tempFile, targetFormat);

    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    if (result.error) {
      m.react("❌");
      return m.reply(`❌ *ɢᴀɢᴀʟ ᴄᴏɴᴠᴇʀᴛ*\n\n> ${result.error}`);
    }

    const saluranId = config.saluran?.id || "120363412350560864@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    await sock.sendMessage(
      m.chat,
      {
        document: { url: result.url },
        fileName: `converted_${Date.now()}.${targetFormat}`,
        mimetype: `application/${targetFormat}`,
        contextInfo: {
          forwardingScore: 9999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: saluranId,
            newsletterName: saluranName,
            serverMessageId: 127,
          },
        },
      },
      { quoted: m },
    );

    m.react("✅");
  } catch (err) {
    console.error("[Converter] Error:", err.message);
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
