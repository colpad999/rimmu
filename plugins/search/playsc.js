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

import { scSearch } from "./soundcloud.js";
import scdl from "../../src/scraper/soundclouddl.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "playsc",
  category: "search",
  description: "Cari dan download lagu dari SoundCloud",
  usage: ".playsc judul",
  example: ".playsc Only We Know",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 15,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { args, sock }) {
  if (!args[0]) {
    let txt = `🎶 *PLAY SOUNDCLOUD* 🎶\n\n`;
    txt += `Halo kak! Pengen dengerin lagu dari SoundCloud? Aku bisa cariin sekalian downloadin format MP3-nya buat kamu!\n\n`;
    txt += `*Cara Pakai:*\n`;
    txt += `👉 \`${m.prefix}playsc <judul lagu>\`\n\n`;
    txt += `*Contoh:*\n`;
    txt += `\`${m.prefix}playsc Only We Know\``;
    return m.reply(txt);
  }

  await m.react("🕕");

  try {
    const searchResults = await scSearch(args.join(" "));
    if (!searchResults.length) {
      return m.reply(`❌ Yah kak, lagunya nggak ketemu! Coba cari dengan judul lain ya. 😭`);
    }

    const track = searchResults[0];
    const downloadInfo = await scdl(track.url);
    let contentTxt = `🎵 *Judul :* ${downloadInfo.title}\n`;
    contentTxt += `👤 *Uploader :* ${downloadInfo.uploader}\n`;
    contentTxt += `⏱️ *Durasi :* ${downloadInfo.duration}\n`;
    contentTxt += `👁️ *Views :* ${downloadInfo.views}\n`;
    contentTxt += `❤️ *Likes :* ${downloadInfo.likes}\n`;
    contentTxt += `📦 *Ukuran :* ${downloadInfo.size}`;

    let txt = `🎉 *BERHASIL DOWNLOAD LAGU!* 🎉\n\n`;
    txt += contentTxt.trim().split("\n").map(line => `${line}`).join("\n");
    txt += `\n\n`;
    txt += `_Audio MP3 sedang dikirim, ditunggu ya kak!_ 🎶`;

    await sock.sendMedia(m.chat, downloadInfo.thumbnail || track.artwork, txt.trim(), m, { type: "image" });
    await sock.sendMedia(m.chat, downloadInfo.download_url, downloadInfo.title, m, { type: "audio" });

    await m.react("✅");
  } catch (e) {
    m.reply(`❌ Gagal mendownload lagu kak! 😭\nError: ${e.message}`);
  }
}

export { pluginConfig as config, handler };
