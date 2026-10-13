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

const pluginConfig = {
  name: "kartu",
  category: "main",
  description: "Menampilkan kartu profil pengguna",
  usage: ".usercard [reply/tag]",
  example: ".usercard",
  isOwner: false, isPremium: false, isGroup: false, isPrivate: false,
  cooldown: 5, energi: 0, isEnabled: true,
};

function targetJid(m) {
  return m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
}

async function handler(m, { sock, db }) {
  const jid = targetJid(m);
  const user = db.getUser?.(jid) || db.setUser?.(jid) || {};
  let name = m.pushName || jid.split("@")[0];

  if (m.isGroup) {
    try {
      const meta = await sock.groupMetadata(m.chat);
      const p = meta.participants?.find(x => (x.id || x.jid) === jid);
      if (p?.notify) name = p.notify;
    } catch {}
  }

  const premium = Boolean(user.isPremium || user.premium);
  const energi = user.energi ?? 0;
  const exp = user.exp ?? user.xp ?? 0;
  const level = user.level ?? Math.floor(Number(exp) / 100) + 1;

  return m.reply(
    `🪪 *USER CARD*\n\n` +
    `👤 Nama: *${name}*\n` +
    `📱 Nomor: @${jid.split("@")[0]}\n` +
    `⭐ Level: *${level}*\n` +
    `✨ EXP: *${exp}*\n` +
    `⚡ Energi: *${energi === -1 ? "Unlimited" : energi}*\n` +
    `💎 Premium: *${premium ? "Ya" : "Tidak"}*`,
    { mentions: [jid] }
  );
}

export { pluginConfig as config, handler };
