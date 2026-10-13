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

import * as cheerio from 'cheerio'
async function scrapeWutheringWavesCharacter(name) {
    if (!name) throw new Error("Nama karakter kosong");

    const slug = name.trim().replace(/\s+/g, "_");
    const url = `https://wutheringwaves.fandom.com/wiki/${encodeURIComponent(slug)}`;

    const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res.ok) {
        throw new Error("Data tidak ditemukan");
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const clean = (v) => v?.replace(/\s+/g, " ").trim() || null;

    const title = clean($("#firstHeading").text());
    if (!title) {
        throw new Error("Halaman tidak valid");
    }

    const bio = clean($(".mw-parser-output > p").first().text());

    const profile = {};
    $(".pi-item.pi-data").each((_, el) => {
        const label = clean($(el).find(".pi-data-label").text());
        const value = clean($(el).find(".pi-data-value").text());
        if (!label || !value) return;

        const key = label
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "_")
            .replace(/^_+|_+$/g, "");

        profile[key] = value;
    });

    const pageSlug = slug.toLowerCase();
    const imageSet = new Set();

    $("img, noscript img").each((_, img) => {
        let src =
            $(img).attr("data-src") ||
            $(img).attr("src");

        const srcset =
            $(img).attr("data-srcset") ||
            $(img).attr("srcset");

        if (!src && srcset) {
            src = srcset.split(",")[0].split(" ")[0];
        }

        if (!src) return;
        if (!src.includes("static.wikia.nocookie.net")) return;
        if (!src.toLowerCase().includes(pageSlug)) return;

        imageSet.add(
            src.split("/revision/")[0] + "/revision/latest"
        );
    });

    return {
        title,
        slug,
        url,
        bio,
        profile,
        images: [...imageSet]
    };
}

export default scrapeWutheringWavesCharacter