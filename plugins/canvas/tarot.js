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

import { createTarotCard, getTarotCard } from '../../src/lib/elaina/tarotCard.js';
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "tarot",
  category: "fun",
  description: "Generate kartu tarot harian lengkap dengan visual card",
  usage: ".tarot [nomor/nama] [terbalik|upright]",
  example: ".tarot 10 terbalik",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  try {
    await m.react("🔮");
    const parts = String(m.text || "").split("|").map((s) => s.trim());
    const cardArg = parts[0] || "";
    const reversed = parts[1]?.toLowerCase() === "terbalik" ? true : parts[1]?.toLowerCase() === "upright" ? false : null;

    let cardIndex = null;
    if (cardArg) {
      const n = Number(cardArg);
      if (Number.isInteger(n) && n >= 0 && n <= 21) cardIndex = n;
    }

    let avatar = null;
    try { avatar = await sock.profilePictureUrl(m.sender, "image"); } catch {}
    if (m.quoted?.mimetype?.startsWith("image/")) {
      try { avatar = await m.quoted.download(); } catch {}
    }

    const username = m.pushName || String(m.sender || "").split("@")[0] || "Rimuru User";
    const card = getTarotCard(username);
    const result = await createTarotCard({ username, avatar, cardIndex, reversed });

    await sock.sendMessage(m.chat, {
      image: result,
      caption: `🃏 *${card.name}*${reversed ? " _(Terbalik)_" : ""}\n\n✨ ${card.keywords.join(" · ")}\n\n_Ramalan tarot harianmu sudah terungkap._`,
    }, { quoted: m });
    await m.react("✅");
  } catch (error) {
    console.error("[Tarot]", error);
    await m.react("❌");
    await m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
