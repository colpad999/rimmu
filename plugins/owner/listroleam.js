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

import { listRole, ROLES, isRealOwner } from "../../src/lib/am-roles.js";

const pluginConfig = {
  name: "listroleam",
  category: "owner",
  description: "List user role Alight Motion",
  usage: ".listam [role]",
  example: ".listam partner",
  isOwner: false,
  isPremium: false,
  cooldown: 5,
  isEnabled: true,
};

async function handler(m, { text, isOwner }) {
  const { getRole } = await import("../../src/lib/am-roles.js");
  const ownerFlag = Boolean(isOwner || m.isOwner || isRealOwner(m.sender));
  const actor = ownerFlag ? "owner" : getRole(m.sender, false);
  if (actor === "free" || actor === "member") {
    return m.reply("❌ Hanya reseller+ / owner.");
  }

  const want = String(text || "").trim().toLowerCase();
  const roles = want && ROLES.includes(want) && want !== "free" ? [want] : ["member", "reseller", "premium", "partner", "owner"];

  let out = `*📋 LIST AM ROLE*\n\n`;
  for (const r of roles) {
    const db = listRole(r);
    const keys = Object.keys(db);
    out += `*${r.toUpperCase()}* (${keys.length})\n`;
    if (!keys.length) out += `└ (kosong)\n\n`;
    else {
      keys.slice(0, 50).forEach((k, i) => {
        out += `${i + 1}. ${k.replace(/\D/g, "")}\n`;
      });
      if (keys.length > 50) out += `... +${keys.length - 50} lagi\n`;
      out += `\n`;
    }
  }
  return m.reply(out.trim());
}

export const config = pluginConfig;
export { handler };
export default { config: pluginConfig, handler };
