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

const CONFIG = {
  base: "https://flowvideoplayer.com",
  ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

async function TeraBoxDL(url) {
  try {
    const session = await axios.get(CONFIG.base, {
      headers: { "User-Agent": CONFIG.ua },
    });

    const rawCookies = session.headers["set-cookie"] || [];
    const cookieStr = rawCookies.map((c) => c.split(";")[0]).join("; ");
    const token = session.data.match(
      /name=["']csrf-token["']\s+content=["']([^"']+)["']/i,
    )?.[1];

    if (!token) {
      return { status: false, error: "CSRF Token not found" };
    }

    const response = await axios.post(
      `${CONFIG.base}/telegram/bot/search/video`,
      { url },
      {
        headers: {
          "User-Agent": CONFIG.ua,
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
          "X-Requested-With": "XMLHttpRequest",
          Cookie: cookieStr,
          Origin: CONFIG.base,
          Referer: `${CONFIG.base}/`,
        },
      },
    );

    const result = response.data;
    if (result.error === false && result.data && result.data.length > 0) {
      const item = result.data[0];
      return {
        status: true,
        file_name: item.file_name,
        thumbnail: item.thumbnail,
        download_url: item.download_url,
        stream_url: item.stream_final_url || item.stream_url,
        file_size: item.file_size,
        file_size_bytes: item.file_size_bytes,
        duration: item.duration,
        extension: item.extension,
        share_url: item.share_url,
      };
    }

    return { status: false, error: "Tidak ada data ditemukan" };
  } catch (e) {
    return { status: false, error: e.message };
  }
}

export { TeraBoxDL };
