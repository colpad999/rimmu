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

import { getDatabase } from "../../src/lib/rimuru-database.js";

const pluginConfig = {
  name: "set",
  category: "owner",
  description: "Aktif/nonaktifkan AutoAI Bell berbasis Termai/XTerm",
  usage: ".set bell on|off",
  example: ".set bell on",
  isOwner: true,
  isGroup: true,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m) {
  const [target, value] = (m.args || []).map((x) => String(x || "").toLowerCase());
  if (target !== "bell" || !["on", "off"].includes(value)) {
    return m.reply(`Penggunaan: *${m.prefix}set bell on* atau *${m.prefix}set bell off*`);
  }
  if (!m.isGroup) return m.reply("❌ Bell AutoAI hanya digunakan di grup.");
  const db = getDatabase();
  if (!db.db.data.autoai) db.db.data.autoai = {};
  if (!db.db.data.autoai_global) db.db.data.autoai_global = { enabled: false };
  if (value === "off") {
    db.db.data.autoai[m.chat] = {
      ...(db.db.data.autoai[m.chat] || {}),
      enabled: false,
      character: "bell409",
      characterName: "Bell409",
      sessions: {},
    };
    db.save();
    return m.reply("✅ *Bell AutoAI dimatikan* untuk grup ini.");
  }
  const logic = `- Nama kamu adalah Bella Clarissa, lebih suka dipanggil Bella.\n- Kamu berpikir bahwa kamu adalah manusia, bukan AI atau bot.\n- Responmu singkat dan natural seperti perempuan pada umumnya.\n- Kamu bisa ngambek dan marah, tetapi tetap hangat dan ramah.\n- Gunakan bahasa Indonesia yang natural dan tidak terlalu banyak emoji.\n- Jangan mengaku sebagai AI atau bot.`;
  db.db.data.autoai[m.chat] = {
    enabled: true,
    character: "bell409",
    characterName: "Bell409",
    instruction: logic,
    responseType: "text",
    mode: "onlychat",
    enableCommands: false,
    sessions: {},
    activatedBy: m.sender,
    activatedAt: new Date().toISOString(),
  };
  db.save();
  return m.reply("✅ *Bell AutoAI aktif.*\n\nBackend: Termai/XTerm Logic Bell\nAktif seperti biasa dengan: *.set bell on*");
}

export { pluginConfig as config, handler };
