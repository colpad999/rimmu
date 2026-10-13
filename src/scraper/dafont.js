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

async function DaFont(query) {
  try {
    const url = "https://www.dafont.com/search.php?q=" + encodeURIComponent(query);
    const res = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
      },
    });

    const $ = cheerio.load(res.data);
    const results = [];

    $(".lv1left.dfbg").each((i, el) => {
      const base = $(el);
      const lv2 = base.nextAll(".lv2right").first();
      const dlbox = base.nextAll(".dlbox").first();
      const previewBox = base.nextAll(".preview").first();

      const raw = base.text().replace(/\s+/g, " ").trim();
      const author = base.find("a").first().text().trim();
      const name = raw.replace(/\s*by\s*.+$/i, "").trim();

      const info = lv2.find(".light").text().trim();
      const downloads = info.match(/[\d,]+ downloads/)?.[0] || null;
      const yesterday = info.match(/\((.*?)\)/)?.[1] || null;
      const license = lv2.find("a.help").first().text().trim();

      const dl = dlbox.find("a.dl").attr("href");
      const download = dl ? "https:" + dl : null;

      const style = previewBox.attr("style");
      const preview = style
        ? "https://www.dafont.com" + (style.match(/url\((.*?)\)/)?.[1] || "")
        : null;

      results.push({ name, author, downloads, yesterday, license, download, preview });
    });

    if (results.length === 0) {
      return { status: false, error: "Font tidak ditemukan" };
    }

    return { status: true, query, count: results.length, results };
  } catch (e) {
    return { status: false, error: e.message };
  }
}

export { DaFont };
