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

import { getPlugin } from "../../src/lib/rimuru-plugins.js";
import { getDatabase } from "../../src/lib/rimuru-database.js";

const config = {
  name: "whatrole",
  category: "info",
  description: "Cek persyaratan akses banyak fitur sekaligus",
  usage: ".whatrolethis <nama_fitur1> <nama_fitur2> ...",
  example: ".whatrolethis hd jpm",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  if (m.args.length === 0) {
    return m.reply(
      `🔍 *PENGECEKAN AKSES FITUR*\n\n` +
      `Sistem untuk mengetahui detail informasi persyaratan akses sebuah fitur atau beberapa fitur sekaligus.\n\n` +
      `*PENGGUNAAN:*\n` +
      `- *${m.prefix}whatrolethis <nama_fitur1> <nama_fitur2> ...*\n\n` +
      `*CONTOH PENGGUNAAN:*\n` +
      `- *${m.prefix}whatrolethis hd jpm warn*\n\n` +
      `*PENJELASAN:*\n` +
      `Masukkan perintah beserta satu atau banyak nama fitur yang ingin kamu cek. Pisahkan dengan spasi.`
    );
  }

  await m.react("🕕");
  
  const db = getDatabase();
  const overrides = db.setting("capprem") || {};
  
  let responseText = `🔍 *DETAIL AKSES FITUR*\n\n`;
  
  for (const cmd of m.args) {
    const targetCommand = cmd.toLowerCase();
    const plugin = getPlugin(targetCommand);
    
    if (!plugin) {
      responseText += `❌ *${targetCommand}* : Tidak ditemukan!\n\n`;
      continue;
    }
    
    const isPremium = overrides[plugin.config.name] !== undefined 
      ? overrides[plugin.config.name] 
      : plugin.config.isPremium;
    
    let roles = [];
    
    if (plugin.config.isOwner) roles.push("Owner Only 👑");
    if (plugin.config.isAdmin) roles.push("Admin Grup 👮");
    if (plugin.config.isBotAdmin) roles.push("Bot Admin 🤖");
    if (plugin.config.isGroup) roles.push("Grup Only 👥");
    if (plugin.config.isPrivate) roles.push("Private Chat 📱");
    if (isPremium) roles.push("Premium 💎");
    
    if (roles.length === 0) {
      roles.push("Free / Semua Orang 🆓");
    }
    
    let listRoles = roles.map(r => `  - ${r}`).join("\n");
    responseText += `✅ *${plugin.config.name}*\n${listRoles}\n\n`;
  }

  await m.react("✅");
  return m.reply(responseText.trim());
}

export { config, handler };
