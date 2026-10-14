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

import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "menfess",
  category: "fun",
  description: "Kirim pesan anonim ke seseorang",
  usage: ".confess nomor|pesan",
  example: ".confess 6281234567890|Hai, aku suka kamu!",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 60,
  energi: 1,
  isEnabled: true,
};

if (!global.confessData) global.confessData = new Map();

async function handler(m, { sock }) {
  const input = m.fullArgs?.trim() || m.text?.trim();

  if (!input || !input.includes("|")) {
    let txt = `💌 *LAYANAN MENFESS ANONIM* 💌\n\n`;
    txt += `Mau ngirim pesan rahasia ke gebetan atau teman tanpa ketahuan? Bisa banget kak!\n\n`;
    txt += `*Cara Pakai:*\n`;
    txt += `👉 \`${m.prefix}confess nomor|pesan\`\n\n`;
    txt += `*Contoh:*\n`;
    txt += `> \`${m.prefix}confess 6281234567890|Hai kak, aku suka deh liat senyum kamu!\`\n\n`;
    txt += `> 🤫 _Tenang aja, identitas kamu 100% aman dan dirahasiakan!_`;
    return m.reply(txt);
  }

  const [rawNumber, ...messageParts] = input.split("|");
  const message = messageParts.join("|").trim();

  if (!rawNumber || !message) {
    return m.reply(`Aduh kak formatnya salah! 😅\n\nCoba ketik gini: \`${m.prefix}confess nomor|pesan\``);
  }

  let targetNumber = rawNumber.trim().replace(/[^0-9]/g, "");

  if (targetNumber.startsWith("0")) {
    targetNumber = "62" + targetNumber.slice(1);
  }

  if (targetNumber.length < 10 || targetNumber.length > 15) {
    return m.reply(`Hmm, nomor tujuan yang kamu masukin kayaknya nggak valid deh kak! 🤔`);
  }

  const targetJid = targetNumber + "@s.whatsapp.net";
  const senderNumber = m.sender.split("@")[0];

  if (targetNumber === senderNumber) {
    return m.reply(`Ih masa ngirim menfess buat diri sendiri sih kak? Kasih buat orang lain dong! 😂`);
  }

  try {
    const [onWa] = await sock.onWhatsApp(targetNumber);
    if (!onWa?.exists) {
      return m.reply(`Yah kak, nomor \`${targetNumber}\` ternyata nggak terdaftar di WhatsApp! 😔`);
    }
  } catch (e) {}

  if (message.length < 5) {
    return m.reply(`Pesannya kependekan kak! Minimal 5 karakter ya biar lebih bermakna. 📝`);
  }

  if (message.length > 1000) {
    return m.reply(`Wah pesannya kepanjangan kak! Maksimal 1000 karakter ya biar bacanya nggak pusing. 📜`);
  }

  const confessText = `💌 *ADA PESAN RAHASIA BUAT KAMU KAK!* 💌\n\n` +
    `Sstt.. Ada seseorang yang diam-diam ngirim pesan buat kamu nih:\n\n` +
    `💬 *Isi Pesan:*\n` +
    `\`\`\`${message}\`\`\`\n\n` +
    `> 🔒 _Pesan ini dikirim secara anonim (identitas pengirim dirahasiakan)._\n` +
    `> ✉️ _Kamu bisa balas pesan ini kok! Tinggal *REPLY* aja pesannya ya!_`;

  try {
    const sentMsg = await sock.sendMessage(targetJid, {
      text: confessText,
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
      },
    });

    global.confessData.set(sentMsg.key.id, {
      senderJid: m.sender,
      senderChat: m.chat,
      targetJid: targetJid,
      createdAt: Date.now(),
    });

    setTimeout(() => {
      global.confessData.delete(sentMsg.key.id);
    }, 24 * 60 * 60 * 1000);

    let successTxt = `✅ *MENFESS BERHASIL TERKIRIM!* ✅\n\n`;
    successTxt += `> 📱 Terkirim ke: \`${targetNumber}\`\n`;
    successTxt += `> 🔒 Identitas kamu aman sentosa!\n\n`;
    successTxt += `> _Nanti kalau dia balas pesannya, aku bakal langsung terusin ke sini kak! Santai aja_ 😉`;
    await m.reply(successTxt);
  } catch (error) {
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

async function replyHandler(m, { sock }) {
  if (!m.quoted) return false;

  const quotedId = m.quoted?.id || m.quoted?.key?.id;
  if (!quotedId) return false;

  const confessInfo = global.confessData.get(quotedId);
  if (!confessInfo) return false;

  if (m.sender !== confessInfo.targetJid) return false;

  const replyMessage = m.body?.trim();
  if (!replyMessage) return false;

  const saluranId = config.saluran?.id || "120363380765405182@newsletter";
  const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

  const replyText = `💌 *ADA BALASAN MENFESS NIH KAK!* 💌\n\n` +
    `Orang yang kamu kirimin menfess tadi barusan balas pesanmu:\n\n` +
    `💬 *Isi Balasan:*\n` +
    `\`\`\`${replyMessage}\`\`\`\n\n` +
    `> 🔒 _Tenang, identitas kamu masih aman!_`;

  try {
    await sock.sendMessage(confessInfo.senderChat, {
      text: replyText,
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: saluranId,
          newsletterName: saluranName,
          serverMessageId: 127,
        },
      },
    });

    await sock.sendMessage(m.chat, {
      text: `✅ Sip kak! Balasan kamu udah aku sampaikan ke pengirim rahasianya.`,
    });

    global.confessData.delete(quotedId);
    return true;
  } catch (error) {
    return false;
  }
}

export { pluginConfig as config, handler, replyHandler };
