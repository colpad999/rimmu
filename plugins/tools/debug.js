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

import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "debug",
  category: "tools",
  description: "Cari bug di kode pemrograman",
  usage: ".caribug [kode] atau reply kode",
  example: ".caribug function test() {}",
  cooldown: 20,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args }) {
  let code = m.quoted?.text || args.join(" ");

  if (!code) {
    return m.reply(
      `*🐛 CARI BUG*\n\nKirim kode atau reply pesan kode untuk mencari bug.\n\nContoh:\n\`${m.prefix}caribug function test() {}\``
    );
  }

  m.react("🕕");

  try {
    const apiUrl = `https://api.cuki.biz.id/api/aicode/caribug`;
    const res = await axios.get(apiUrl, {
      params: {
        apikey: config.APIkey.cuki,
        code: code,
        language: "auto"
      },
      timeout: 60000
    });

    const data = res.data;

    if (!data.success || !data.data) {
      throw new Error("Gagal menganalisa kode dari server");
    }

    const info = data.data;
    const meta = info.metadata;
    const bugInfo = info.bugsFound;
    
    let text = `🐛 *HASIL ANALISA BUG*\n\n`;
    text += `*Bahasa:* ${meta.detectedLanguage}\n`;
    text += `*Tingkat:* ${meta.severityInfo.level} ${meta.severityInfo.icon}\n`;
    text += `*Bug Ditemukan:* ${bugInfo.total}\n\n`;
    
    if (bugInfo.summary) {
      text += `*📝 Ringkasan:*\n${bugInfo.summary}\n\n`;
    }
    
    if (info.codeAnalysis?.fixed?.code) {
      text += `*✨ Kode Perbaikan:*\n\`\`\`${meta.detectedLanguage}\n${info.codeAnalysis.fixed.code}\n\`\`\`\n\n`;
    }
    
    if (bugInfo.details && bugInfo.details.length > 0) {
      text += `*📌 Detail:* \n`;
      bugInfo.details.forEach((d, i) => {
        text += `- ${d.type || d.description}\n`;
      });
    }

    m.react("✅");
    await m.reply(text.trim());
  } catch (err) {
    console.error("[CariBug]", err.message);
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
