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

import axios from 'axios'
import * as timeHelper from '../../src/lib/rimuru-time.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
  name: "getpaste",
  category: "tools",
  description: "Ambil konten dari Pastebin",
  usage: ".getpaste <link pastebin>",
  example: ".getpaste https://pastebin.com/Gu8RZaqv",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

class GetPastebin {
  constructor() {
    this.url = "https://pastebin.com/raw/";
  }

  _id(link) {
    const match = link.match(/pastebin\.com\/(?:raw\/)?([a-zA-Z0-9]+)/);
    return match ? match[1] : link;
  }

  async fetch(link) {
    const id = this._id(link);
    if (!id) return null;

    try {
      const req = await fetch(this.url + id);
      if (!req.ok) return null;
      return await req.text();
    } catch {
      return null;
    }
  }
}

async function handler(m, { sock }) {
  const text = m.text?.trim();

  if (!text || !text.includes("pastebin.com")) {
    return m.reply(
      `📋 *ɢᴇᴛ ᴘᴀsᴛᴇʙɪɴ*\n\n` +
      `> Masukkan link Pastebin yang valid\n\n` +
      `> Contoh: \`${m.prefix}getpaste https://pastebin.com/Gu8RZaqv\``,
    );
  }

  m.react("📋");

  try {
    const data = await new GetPastebin().fetch(text);
    await m.reply(data);
    m.react("✅");
  } catch (err) {
    m.react('☢');
    m.reply(te(m.prefix, m.command, m.pushName))
  }
}

export { pluginConfig as config, handler }