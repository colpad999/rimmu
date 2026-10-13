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
import te from "../../src/lib/rimuru-error.js";

const dbFile = path.join(process.cwd(), "database", "gbbot.json");

function readDb() {
  try {
    if (fs.existsSync(dbFile)) {
      return JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    }
  } catch (e) {}
  return { link: "" };
}

function writeDb(data) {
  try {
    const dir = path.dirname(dbFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  } catch (e) {}
}

const pluginConfig = {
  name: "officialgb",
  category: "main",
  description: "Menampilkan dan mengatur link Grup Official Bot",
  usage: ".gbbot / .setgbbot <link>",
  example: ".setgbbot https://chat.whatsapp.com/xxxxxxxxxxxxxxxxxxxx",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, isOwner }) {
  const fullText = (m.text || m.body || "").trim();
  const prefix = m.prefix || ".";

  // Mode Pengaturan Link Khusus Owner (.setgbbot <link>)
  if (/^[\/.!#]?setgbbot/i.test(m.command || fullText)) {
    const checkOwner = m.isOwner || isOwner;
    if (!checkOwner) {
      await m.react("❌");
      return m.reply("❌ Perintah ini *khusus untuk Owner Bot*!");
    }

    const newLink = fullText.replace(/^[\/.!#]?setgbbot\s*/i, "").trim();
    if (!newLink || !newLink.includes("chat.whatsapp.com")) {
      return m.reply(`❌ Masukkan link grup WhatsApp yang valid!\nContoh: \`${prefix}setgbbot https://whatsapp.com/channel/RIMURU_CHANNEL\``);
    }

    writeDb({ link: newLink });
    await m.react("✅");
    return m.reply(`✅ Link *gbbot* berhasil diperbarui!\n🔗 Link Baru: ${newLink}`);
  }

  // --- MODE TAMPILKAN UNTUK SEMUA USER (.gbbot) ---
  await m.react("🌐");

  try {
    const db = readDb();
    const groupLink = db.link || "https://whatsapp.com/channel/RIMURU_CHANNEL";
    const pushName = m.pushName || "Kak";

    let caption = `╭───〔 🌐 *OFFICIAL COMMUNITY* 〕───\n`;
    caption += `├ 🤖 *Bot Name:* Tendou deluxe\n`;
    caption += `├ 📌 *Status:* Active & Official\n`;
    caption += `╰─────────────────────────\n\n`;
    caption += `Halo Kak *@${m.sender.split("@")[0]}* 👋\n\n`;
    caption += `Grup khusus bot tendou deluxe\n\n`;
    caption += `🔗 *Group Link:*\n${groupLink}\n\n`;
    caption += `⚠️ *Catatan:* Bagi yang mau join tetapi tidak bayar, maka tidak akan gw acc`;

    await m.react("✅");

    return await sock.sendMessage(m.chat, {
      text: caption.trim(),
      mentions: [m.sender]
    }, { quoted: m });

  } catch (error) {
    console.error("[GBBot Error]:", error?.message);
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
