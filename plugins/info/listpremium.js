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

import { getAllPlugins } from "../../src/lib/rimuru-plugins.js";
import { getDatabase } from "../../src/lib/rimuru-database.js";

const config = {
  name: "listpremium",
  category: "info",
  description: "Melihat daftar seluruh fitur premium bot",
  usage: ".fiturpremium",
  example: ".fiturpremium",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  await m.react("🕕");

  const db = getDatabase();
  const overrides = db.setting("capprem") || {};
  const allPlugins = getAllPlugins();
  
  let premiumFeatures = [];
  
  for (const plugin of allPlugins) {
    if (plugin && plugin.config && plugin.config.name) {
      const isPremium = overrides[plugin.config.name] !== undefined 
        ? overrides[plugin.config.name] 
        : plugin.config.isPremium;
        
      if (isPremium) {
        premiumFeatures.push(plugin.config.name);
      }
    }
  }
  
  if (premiumFeatures.length === 0) {
    await m.react("✅");
    return m.reply(
      `📝 *DAFTAR FITUR PREMIUM*\n\n` +
      `Saat ini belum ada fitur yang terdaftar sebagai fitur premium eksklusif.`
    );
  }
  
  premiumFeatures.sort(); // Urutkan sesuai abjad
  
  let listText = premiumFeatures.map((f) => `- ${f}`).join("\n");
  
  await m.react("✅");
  return m.reply(
    `💎 *DAFTAR FITUR PREMIUM*\n\n` +
    `Berikut adalah seluruh daftar fitur eksklusif yang hanya bisa diakses oleh member berstatus Premium:\n\n` +
    `${listText}\n\n` +
    `_Untuk berlangganan premium, silakan hubungi owner._`
  );
}

export { config, handler };
