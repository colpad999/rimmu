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

const pluginConfig = {
  name: "mcaddons",
  category: "general",
  description: "Mencari Minecraft Bedrock addon dan map terbaru",
  usage: ".mcaddons [atau .mcmap]",
  example: ".mcaddons",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function scrape(url) {
  const { data: html } = await axios.get(url, {
    timeout: 20000,
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const $ = cheerio.load(html);
  const results = [];

  $("#contentContainer #addon_rows .content-row-cell").each((_, element) => {
    const title =
      $(element).find(".card-product-title b#product-name").text().trim() ||
      $(element).find(".product-name").text().trim();
    const relativeLink = $(element).find(".product-card").attr("data-href");
    const link = relativeLink
      ? new URL(relativeLink, "https://www.bedrockexplorer.com").href
      : null;
    let image = $(element).find(".product-card-wrapper img").first().attr("src");
    if (image) image = new URL(image, "https://www.bedrockexplorer.com").href;
    const price =
      $(element).find(".price-element b").text().trim() ||
      $(element).find(".price-element").text().trim();

    if (title && link) results.push({ title, link, image, price });
  });

  return results;
}

async function handler(m, { sock }) {
  const isMap = String(m.command || "").toLowerCase() === "mcmap";
  const url = isMap
    ? "https://www.bedrockexplorer.com/queries/free-content/everyone/maps/latest"
    : "https://www.bedrockexplorer.com/discover";
  const label = isMap ? "Free Maps" : "Add-ons";

  try {
    await m.react("⏳");
    const results = await scrape(url);

    if (!results.length) {
      await m.react("❌");
      return m.reply(`⚠️ Tidak ditemukan ${label} terbaru.`);
    }

    let message = `📦 *MINECRAFT BEDROCK — ${label.toUpperCase()}*\n\n`;
    for (const [i, item] of results.slice(0, 5).entries()) {
      message += `*${i + 1}. ${item.title}*\n`;
      message += `🔗 ${item.link}\n`;
      if (item.price) message += `💰 ${item.price}\n`;
      message += "\n";
    }

    await m.react("✅");
    if (results[0].image) {
      return sock?.sendMessage
        ? sock.sendMessage(m.chat, {
            image: { url: results[0].image },
            caption: message.trim(),
          }, { quoted: m })
        : m.reply(message.trim());
    }
    return m.reply(message.trim());
  } catch (error) {
    console.error("[mcaddons]", error);
    await m.react("❌");
    return m.reply(
      `❌ Gagal mengambil data Minecraft Bedrock.\n` +
      `Website sumber mungkin sedang berubah atau tidak bisa diakses.`,
    );
  }
}

export { pluginConfig as config, handler };
