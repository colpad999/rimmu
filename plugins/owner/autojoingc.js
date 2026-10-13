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
import { getDatabase } from "../../src/lib/rimuru-database.js";
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "autojoingc",
  category: "owner",
  description: "Auto join grup dari link yang terdeteksi di chat",
  usage: ".autojoingc on/off",
  example: ".autojoingc on",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};
const GROUP_LINK_REGEX = /chat\.whatsapp\.com\/([a-zA-Z0-9]{18,24})/gi;
async function handler(m) {
  const db = getDatabase();
  const arg = (m.args?.[0] || "").toLowerCase();
  if (!arg || !["on", "off"].includes(arg)) {
    const current = db.setting("autoJoinGc") || false;
    return m.reply(
      `🔗 *AUTO JOIN GROUP*\n\nStatus: *${current ? "ON ✅" : "OFF ❌"}*\n\n\`${m.prefix}autojoingc on\` — aktifkan\n\`${m.prefix}autojoingc off\` — nonaktifkan`,
    );
  }
  const enabled = arg === "on";
  db.setting("autoJoinGc", enabled);
  await db.save();
  m.reply(
    `${enabled ? "✅" : "❌"} Auto join group *${enabled ? "diaktifkan" : "dinonaktifkan"}*`,
  );
}
async function autoJoinDetector(m, sock) {
  const db = getDatabase();
  if (!db?.ready) return false;
  if (!db.setting("autoJoinGc")) return false;
  if (!m.body) return false;
  const matches = [...m.body.matchAll(GROUP_LINK_REGEX)];
  if (!matches.length) return false;
  let joined = 0;
  for (const match of matches) {
    const code = match[1];
    try {
      const result = await sock.groupAcceptInvite(code);
      if (result) {
        joined++;
      }
    } catch (e) {
      const msg = e.message || String(e);
      if (msg.includes("already") || msg.includes("participant")) {
        await m.reply(`⚠️ Sudah ada di grup tersebut`);
      } else if (msg.includes("expired") || msg.includes("revoked")) {
        await m.reply(`❌ Link grup sudah expired/revoked`);
      } else {
        await m.reply(te(m.prefix, m.command, m.pushName));
      }
    }
  }
  return joined > 0;
}
export { pluginConfig as config, handler, autoJoinDetector };
