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

import fetch from "node-fetch";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "skiplink",
  category: "tools",
  description: "Bypass shortlink / skiplink menggunakan izen",
  usage: ".izen link",
  example: ".izen https://sfl.gl/xxxxx",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args, sock }) {
  if (!args[0]) {
    let txt = `🔗 *SKIPLINK BYPASS* 🔗\n\n`;
    txt += `Halo kak! Punya link yang ribet ngelewatin iklan? Sini aku bantu lewatin biar langsung ke tujuan akhir!\n\n`;
    txt += `*Cara Pakai:*\n`;
    txt += `👉 \`${m.prefix}izen <link>\`\n\n`;
    txt += `*Contoh:*\n`;
    txt += `👉 \`${m.prefix}izen https://sfl.gl/xxxxx\``;
    return m.reply(txt);
  }

  await m.react("⏳");
  
  try {
    const res = await fetch(`https://anabot.my.id/api/tools/izenLOL?url=${encodeURIComponent(args[0])}&apikey=freeApikey`);
    const json = await res.json();
    
    if (!json.data?.result?.result) {
       return m.reply("❌ Waduh kak, gagal ngelewatin link-nya nih! Coba link lain ya.");
    }
    
    let txt = `✅ *BERHASIL BYPASS LINK!* ✅\n\n`;
    txt += `*Link Asli:* \n`;
    txt += `🔗 ${args[0]}\n\n`;
    txt += `*Hasil Bypass:* \n`;
    txt += `🚀 ${json.data.result.result}\n\n`;
    txt += `Semoga ngebantu ya kak! ✨`;
    
    await m.reply(txt);
    await m.react("✅");
  } catch (e) {
    m.reply(`❌ Maaf kak, terjadi kesalahan sistem! 😭\nError: ${e.message}`);
  }
}

export { pluginConfig as config, handler };
