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

/**
 * .addam <role> <@tag|reply|628xxx>
 * role: member | reseller | premium | partner | owner
 */
import {
  ROLES,
  getRole,
  setRole,
  canAddRole,
  canManageTarget,
  extractTarget,
  rankOf,
  isRealOwner,
} from "../../src/lib/am-roles.js";

const ADDABLE_ROLES = ["member", "reseller", "premium", "partner", "owner"];

const pluginConfig = {
  name: "setam",
  category: "owner",
  description: "Tambah role Alight Motion (member/reseller/premium/partner/owner)",
  usage: ".addam <role> <@tag|reply|628xxx>",
  example: ".addam partner 6283xxx",
  isOwner: false,
  isPremium: false,
  cooldown: 3,
  isEnabled: true,
};

async function handler(m, { text, prefix, command, isOwner }) {
  const pfx = prefix || ".";
  // fallback ke m.isOwner kalau context.isOwner nggak ke-pass (jaga-jaga)
  const ownerFlag = Boolean(isOwner || m.isOwner || isRealOwner(m.sender));
  const args = String(text || "").trim().split(/\s+/).filter(Boolean);
  const role = (args[0] || "").toLowerCase();

  if (!role || !ADDABLE_ROLES.includes(role)) {
    return m.reply(
      `*ADD AM ROLE*\n\n` +
        `Format:\n*${pfx}${command}* <role> <@tag|reply|nomer>\n\n` +
        `Role: member · reseller · premium · partner · owner\n\n` +
        `Contoh:\n*${pfx}${command}* partner @user\n` +
        `*${pfx}${command}* member 6283xxxx\n` +
        `(atau reply pesan target)`
    );
  }

  const actorRole = ownerFlag ? "owner" : getRole(m.sender, false);

  // Owner asli & bot bisa nambah role apapun (termasuk owner), bebas hierarki
  if (!ownerFlag && !canAddRole(actorRole, role)) {
    return m.reply(
      `❌ Role *${actorRole}* tidak bisa menambah *${role}*.\n` +
        `Hierarki: free < member < reseller < premium < partner < owner`
    );
  }

  const target = extractTarget(m, args.slice(1).join(" "));
  if (!target) {
    return m.reply(`❌ Target tidak ditemukan. Tag, reply, atau isi nomor (628…).`);
  }

  const targetRole = getRole(target, false);
  if (!ownerFlag && !canManageTarget(actorRole, targetRole) && targetRole !== "free") {
    return m.reply(
      `❌ Tidak bisa mengubah *${targetRole}* (setara/lebih tinggi dari kamu).`
    );
  }

  setRole(target, role, { by: m.sender, at: Date.now() });
  const num = target.replace(/\D/g, "");
  return m.reply(
    `✅ *AM Role di-set*\n\n` +
      `👤 ${num}\n` +
      `🎖️ Role: *${role}*\n` +
      `👮 Oleh: *${actorRole}*`
  );
}

export const config = pluginConfig;
export { handler };
export default { config: pluginConfig, handler };
