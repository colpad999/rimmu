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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "wp",
  category: "search",
  description: "Mencari artikel lengkap dari Wikipedia",
  usage: ".wikipedia <query>",
  example: ".wikipedia Rendang",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

const LANG = "id";
const LIMIT = 5;
const BASE = `https://${LANG}.wikipedia.org`;
const API = `${BASE}/w/api.php`;
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function decodeHtml(text) {
  return String(text || "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanText(text) {
  return decodeHtml(text)
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\[[a-z]\]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBlock(text) {
  return decodeHtml(text)
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\[[a-z]\]/gi, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function fixUrl(url) {
  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE}${url}`;
  return url;
}

function uniqueBy(array, key) {
  return array.filter((item, index, self) => self.findIndex(x => x[key] === item[key]) === index);
}

async function searchWikipedia(query) {
  const { data, status } = await axios.get(API, {
    params: {
      action: "query",
      list: "search",
      srsearch: query,
      srlimit: LIMIT,
      format: "json",
      origin: "*"
    },
    headers: {
      "user-agent": UA,
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    }
  });

  return {
    code: status,
    results: data?.query?.search || []
  };
}

async function getFullArticle(title) {
  const pagePath = `/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
  const pageUrl = `${BASE}${pagePath}`;

  const { data, status } = await axios.get(pageUrl, {
    headers: {
      "user-agent": UA,
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "referer": "https://www.wikipedia.org/"
    }
  });

  const $ = cheerio.load(data);

  $("script, style, noscript, sup.reference, .mw-editsection, .navbox, .metadata, .ambox, .hatnote, .toc, #toc, table.vertical-navbox").remove();

  const pageTitle = cleanText($("#firstHeading").text()) || title;
  const description = cleanText($(".tagline").first().text()) || null;

  const introParagraphs = [];

  $(".mw-parser-output > section").first().find("p").each((_, el) => {
    const text = cleanBlock($(el).text());
    if (text.length > 40) introParagraphs.push(text);
  });

  if (!introParagraphs.length) {
    $(".mw-parser-output > p").each((_, el) => {
      const text = cleanBlock($(el).text());
      if (text.length > 40) introParagraphs.push(text);
    });
  }

  const sections = [];

  $(".mw-parser-output > section").each((_, section) => {
    const heading = cleanText($(section).find("h2, h3").first().text());

    if (!heading || heading.toLowerCase() === "daftar isi") return;

    const texts = [];

    $(section).find("p, ul, ol").each((_, el) => {
      const text = cleanBlock($(el).text());
      if (text.length > 40) texts.push(text);
    });

    if (texts.length) {
      sections.push({
        Title: heading,
        Text: texts.join("\n\n")
      });
    }
  });

  const infobox = {};

  $(".infobox tr").each((_, tr) => {
    const key = cleanText($(tr).find("th").first().text());
    const value = cleanText($(tr).find("td").first().text());

    if (key && value && key.length < 100) {
      infobox[key] = value;
    }
  });

  const images = [];

  $(".mw-parser-output img").each((_, img) => {
    const src = fixUrl($(img).attr("src"));
    const alt = cleanText($(img).attr("alt"));

    if (!src) return;
    if (src.includes("static/images")) return;
    if (src.includes("Semi-protection")) return;
    if (src.includes("OOjs_UI")) return;

    images.push({
      Alt: alt || null,
      Url: src
    });
  });

  return {
    code: status,
    article: {
      Title: pageTitle,
      Description: description,
      Url: pageUrl,
      Extract: introParagraphs.join("\n\n") || null,
      Sections: sections,
      Infobox: infobox,
      Images: uniqueBy(images, "Url")
    }
  };
}

async function handler(m, { sock }) {
  const query = m.args.join(" ") || m.text?.trim();

  if (!query) {
    return m.reply("❌ Masukkan kata kunci pencarian Wikipedia.\n\nContoh: `.wikipedia Indonesia`");
  }

  await m.react("🕕");

  try {
    const search = await searchWikipedia(query);

    if (!search.results.length) {
      await m.react("❌");
      return m.reply(`⚠️ Artikel tentang *${query}* tidak ditemukan di Wikipedia.`);
    }

    const first = search.results[0];
    const detail = await getFullArticle(first.title);
    const r = detail.article;

    let text = `📚 *WIKIPEDIA SEARCH* 📚\n\n`;
    text += `*Judul:* ${r.Title}\n`;
    if (r.Description) text += `*Deskripsi:* ${r.Description}\n`;
    text += `\n*Ringkasan:*\n${r.Extract || "Tidak ada ringkasan tersedia."}\n\n`;

    if (Object.keys(r.Infobox).length > 0) {
      text += `*Info Tambahan:*\n`;
      let count = 0;
      for (const [key, val] of Object.entries(r.Infobox)) {
        if (count >= 5) break;
        text += `- ${key}: ${val}\n`;
        count++;
      }
      text += `\n`;
    }

    text += `\n🔗 *Selengkapnya:* ${r.Url}`;

    if (r.Images && r.Images.length > 0) {
      await sock.sendMessage(m.chat, {
        image: { url: r.Images[0].Url },
        caption: text
      }, { quoted: m });
    } else {
      await m.reply(text);
    }

    await m.react("✅");

  } catch (error) {
    console.error("[Wikipedia Search]", error.message);
    await m.react("☢");
    m.reply("😔 Terjadi kesalahan saat mencari artikel di Wikipedia.");
  }
}

export { pluginConfig as config, handler };
