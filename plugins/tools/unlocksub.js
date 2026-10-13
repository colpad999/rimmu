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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "unlocksub",
  category: "tools",
  description: "Melakukan bypass link subs4unlock secara otomatis",
  usage: ".subs4unlock <link>",
  example: ".subs4unlock https://subs4unlock.id/VjeQWY",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

// 🔑 API Key Theresav
const THERESAV_KEY = "4ZtwE";

async function handler(m, { sock }) {
  const fullText = (m.text || m.body || "").trim();
  const prefix = m.prefix || ".";

  const args = fullText.replace(/^[\/.!#]?(subs4unlock|sub4unlock|bypasssub|unlocksub)\s*/i, "").trim();

  if (!args) {
    return m.reply(
      `🔓 *sᴜʙs𝟺ᴜɴʟᴏᴄᴋ ʙʏᴘᴀssᴇʀ*\n\n` +
      `> *Penggunaan:* \`${prefix}subs4unlock <link>\`\n` +
      `> *Contoh:* \`${prefix}subs4unlock https://subs4unlock.id/VjeQWY\``
    );
  }

  // Cek apakah input berupa URL valid
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = args.match(urlRegex);

  if (!match) {
    return m.reply("❌ Masukkan URL Subs4Unlock yang valid!");
  }

  const targetUrlInput = match[0];
  await m.react("🕕");

  try {
    const targetApiUrl = `https://api.theresav.biz.id/bypass/subs4unlock`;

    const res = await axios.get(targetApiUrl, {
      params: {
        url: targetUrlInput,
        apikey: THERESAV_KEY
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 20000
    });

    const data = res?.data;

    if (!data || data.status === false || !data.result) {
      await m.react("❌");
      return m.reply(`❌ Gagal melakukan bypass link. Pastikan link aktif & valid!`);
    }

    const bypassedUrl = data.result;

    let caption = `🔓 *sᴜʙs𝟺ᴜɴʟᴏᴄᴋ ʙʏᴘᴀss sᴜᴄᴄᴇss*\n`;
    caption += `───────────────────\n`;
    caption += `📥 *Link Asli:* ${data.input || targetUrlInput}\n`;
    caption += `🎯 *Result Link:* ${bypassedUrl}\n`;
    caption += `───────────────────`;

    await m.react("✅");

    return await sock.sendMessage(m.chat, {
      text: caption.trim()
    }, { quoted: m });

  } catch (error) {
    console.error("[Subs4Unlock Error]:", error?.message);
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
