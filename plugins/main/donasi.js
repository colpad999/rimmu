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
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
const pluginConfig = {
  name: "donasi",
  category: "main",
  description: "Informasi donasi untuk mendukung bot dengan QRIS",
  usage: ".donasi",
  example: ".donasi",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const botName = config.bot?.name || "Rimuru-AI";
  const ownerName = config.owner?.name || "Owner";
  const saluranId = config.saluran?.id || "120363380765405182@newsletter";
  const saluranName = config.saluran?.name || botName;

  const donasiConfig = config.donasi || {};
  const payments = donasiConfig.payment || [];
  const links = donasiConfig.links || [];
  const qrisUrl = donasiConfig.qris || "";
  const benefits = donasiConfig.benefits || [
    "Mendukung development",
    "Server lebih stabil",
    "Fitur baru lebih cepat",
    "Priority support",
  ];

  let text = `DONASI KE OWNER ${botName} 🙏`;

  if (payments.length > 0 || links.length > 0) {
    text += `Pembayaran\n`;
    for (const pay of payments) {
      text += `🏦 *${pay.name
        ?.toLowerCase()
        .split("")
        .map((c, i) => (i === 0 ? c.toUpperCase() : c))
        .join("")}*\n`;
      text += `◦ ${pay.number} (a/n ${pay.holder})\n`;
    }

    for (const link of links) {
      const icons = {
        saweria: "☕",
        trakteer: "🍵",
        paypal: "💰",
        default: "🔗",
      };
      const icon = icons[link.name?.toLowerCase()] || icons.default;
      text += `${icon} *${link.name}*\n`;
      text += `${link.url}\n`;
    }
  } else {
    text += `╭┈┈⬡「 💳 *ᴘᴀʏᴍᴇɴᴛ* 」\n`;
    text += `┃\n`;
    text += `┃ > Belum dikonfigurasi\n`;
    text += `┃ > Edit config.donasi\n`;
    text += `┃\n`;
    text += `╰┈┈┈┈┈┈┈┈⬡\n\n`;
  }

  text += `🎁 *ʙᴇɴᴇꜰɪᴛ*\n`;
  for (const benefit of benefits) {
    text += `◦ ${benefit}\n`;
  }
  text += `\n`;

  text += `_Donasi berapapun sangat berharga_\n`;
  text += `Contact: @${config.owner?.number?.[0] || "owner"}`;

  const copyButtons = payments.map((pay) => ({
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: `📋 Copy No. ${pay.name}`,
      copy_code: pay.number,
    }),
  }));

  const contextInfo = {
    mentionedJid: config.owner?.number?.[0]
      ? [`${config.owner.number[0]}@s.whatsapp.net`]
      : [],
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: saluranId,
      newsletterName: saluranName,
      serverMessageId: 127,
    },
  };

  if (qrisUrl) {
    try {
      const response = await fetch(qrisUrl);
      const qrisBuffer = Buffer.from(await response.arrayBuffer());

      await sock.sendButton(m.chat, qrisBuffer, text, m, {
        buttons: copyButtons,
      });
    } catch (e) {
      await sock.sendButton(m.chat, null, text, m, {
        buttons: copyButtons,
      });
    }
  } else {
    await sock.sendMessage(
      m.chat,
      {
        text: text,
        footer: botName,
        contextInfo: contextInfo,
        interactiveButtons: copyButtons,
      },
      { quoted: m },
    );
  }
}

export { pluginConfig as config, handler };
