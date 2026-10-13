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

import { DaFont } from "../../src/scraper/dafont.js";

if (!global.dafontSessions) global.dafontSessions = {};

const SESSION_TIMEOUT = 120000;

function getSessionKey(jid) {
  return String(jid || "").replace(/[^0-9]/g, "") || String(jid).toLowerCase();
}

function getSession(jid) {
  const key = getSessionKey(jid);
  return global.dafontSessions[key] || null;
}

function setSession(jid, data) {
  const key = getSessionKey(jid);
  clearSession(jid);
  global.dafontSessions[key] = {
    data,
    chat: null,
    startedAt: Date.now(),
    timeout: setTimeout(() => {
      delete global.dafontSessions[key];
    }, SESSION_TIMEOUT),
  };
  return global.dafontSessions[key];
}

function clearSession(jid) {
  const key = getSessionKey(jid);
  const session = global.dafontSessions[key];
  if (session?.timeout) clearTimeout(session.timeout);
  delete global.dafontSessions[key];
}

const pluginConfig = {
  name: "daffont",
  category: "tools",
  description: "Cari dan download font dari DaFont",
  usage: ".dafont <nama font>",
  example: ".dafont arial",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");
  if (!text) {
    m.react("❌");
    return m.reply(
      `🔤 *DaFont Search*\n\n` +
        `Cari font dari DaFont, lalu reply nomor buat download.\n\n` +
        `*PENGGUNAAN:*\n` +
        `> *${m.prefix}dafont <nama font>*\n\n` +
        `*CONTOH:*\n` +
        `> *${m.prefix}dafont arial*\n` +
        `> *${m.prefix}dafont horror*\n\n` +
        `_Setelah daftar muncul, reply pesan bot dengan nomor font buat download_`
    );
  }

  m.react("🕕");

  try {
    const result = await DaFont(text);

    if (!result.status) {
      m.react("☢");
      return m.reply(`❌ *DaFont Gagal*\n\n> ${result.error}`);
    }

    const items = result.results.slice(0, 10);

    let txt = `🔤 *DaFont — ${result.count} Font Ditemukan*\n\n`;
    txt += `> Pencarian: *${text}*\n\n`;

    items.forEach((v, i) => {
      txt += `*${i + 1}.* ${v.name}\n`;
      txt += `   ├ 👤 Author: ${v.author}\n`;
      txt += `   ├ 📥 Downloads: ${v.downloads || "-"}\n`;
      txt += `   └ 📜 License: ${v.license || "-"}\n`;
    });

    txt += `\n_Reply pesan ini dengan nomor font buat download file-nya_`;

    const session = setSession(m.sender, items);
    session.chat = m.chat;

    await m.reply(txt);
    m.react("✅");
  } catch (e) {
    console.error(e);
    m.react("☢");
    m.reply("❌ Gagal mencari font, coba lagi nanti");
  }
}

async function dafontAnswerHandler(m, sock) {
  const session = getSession(m.sender);
  if (!session) return false;
  if (m.chat !== session.chat) return false;

  const text = (m.body || m.text || "").trim();
  const index = parseInt(text) - 1;

  if (isNaN(index) || index < 0 || index >= session.data.length) return false;

  const v = session.data[index];

  let detail = `🔤 *${v.name}*\n\n` +
    `> 👤 Author: ${v.author}\n` +
    `> 📥 Downloads: ${v.downloads || "-"}\n` +
    `> 📜 License: ${v.license || "-"}`;

  if (v.preview) {
    await sock.sendMedia(m.chat, v.preview, detail, m, { type: "image" });
  } else {
    await m.reply(detail);
  }

  if (v.download) {
    await sock.sendMessage(
      m.chat,
      {
        document: { url: v.download },
        fileName: v.name + ".zip",
        mimetype: "application/zip",
      },
      { quoted: m },
    );
  }

  clearSession(m.sender);
  return true;
}

export { pluginConfig as config, handler, dafontAnswerHandler, clearSession };
