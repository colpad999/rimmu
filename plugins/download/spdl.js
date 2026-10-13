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

const pluginConfig = {
  name: "spdl",
  category: "download",
  description: "Unduh lagu favoritmu langsung dari Spotify tanpa ribet!",
  usage: ".spdl <link>",
  example: ".spdl https://open.spotify.com/track/...",
  cooldown: 15,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.text?.trim();

  if (!text || !/open\.spotify\.com\/track/i.test(text)) {
    return m.reply("❌ *Waduh, link Spotify-nya mana nih atau kurang tepat!*\n\nKamu harus memasukkan tautan (link) lagu dari Spotify yang valid. Pastikan itu adalah link ke track/lagu ya! \n\nContoh: `.spdl https://open.spotify.com/track/3RY0NyQQXxuAiyk5eAS4fC`");
  }

  await m.react("🕕");

  try {
    const apiUrl = `https://api.nexray.eu.cc/downloader/spotify?url=${encodeURIComponent(text)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data.status || !data.result || !data.result.url) {
      await m.react("❌");
      return m.reply("⚠️ *Gagal mengambil lagu!* \n\nServer tidak merespon dengan tautan unduhan yang valid.");
    }

    const { title, artist, url } = data.result;
    const filename = `${artist || "Spotify"} - ${title || "Audio"}.mp3`;

    await sock.sendMessage(m.chat, {
      audio: { url: url },
      mimetype: "audio/mpeg",
      fileName: filename,
      ptt: false
    }, { quoted: m });

    await m.react("✅");

  } catch (error) {
    console.error("[Spotify DL Error]", error);
    await m.react("❌");
    m.reply("😔 *Terjadi kesalahan sistem saat memproses tautan Spotify tersebut.* Mohon coba lagi nanti ya!");
  }
}

export { pluginConfig as config, handler };
