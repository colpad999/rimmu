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
import * as cheerio from "cheerio";

async function RedditDL(redditUrl) {
  const ts = Date.now();
  const apiUrl = `https://redvid.io/fetch?_=${ts}`;
  const headers = {
    authority: "redvid.io",
    accept: "application/json, text/plain, */*",
    "content-type": "application/json",
    origin: "https://redvid.io",
    referer: "https://redvid.io/",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "x-requested-with": "XMLHttpRequest",
  };

  try {
    const { data } = await axios.post(
      apiUrl,
      { url: redditUrl, lang: "en" },
      { headers },
    );

    if (data.success && data.view) {
      const $ = cheerio.load(data.view);
      const mediaResults = [];

      $(".response-cinema-gallery-item").each((i, el) => {
        const thumb = $(el).find("img.thumbnail-image").attr("src");
        const downloadBtn = $(el).find('a[href*="/download?token="]');
        const downloadUrl = downloadBtn.attr("href");
        const typeText = downloadBtn.text().trim();

        if (downloadUrl) {
          mediaResults.push({
            item: i + 1,
            type: typeText.toLowerCase().includes("video") ? "video" : "image",
            thumbnail: thumb,
            download_url: downloadUrl,
          });
        }
      });

      return {
        status: true,
        title: $(".response-cinema-title").text().trim(),
        results: mediaResults,
      };
    }

    return { status: false, error: "Gagal mengambil data" };
  } catch (e) {
    return { status: false, error: e.message };
  }
}

export { RedditDL };
