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
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "quran",
  category: "islamic",
  description: "Baca ayat Al-Quran berdasarkan nama surah",
  usage: ".quran <nama surah>",
  example: ".quran al fatihah",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function quran(query) {
  const load = typeof cheerio.load === "function" ? cheerio.load : cheerio;

  const slug = query.toLowerCase().replace(/\s+/g, "-");
  const url = `https://quran.nu.or.id/${slug}`;

  const res = await fetch(url);
  const html = await res.text();

  const $ = load(html);

  const title = $("h1").first().text().trim();
  const info = $("h1").next("span").text().trim();

  const hasil = [];

  $("div[id]").each((i, el) => {
    const id = $(el).attr("id");

    if (!/^\d+$/.test(id)) return;

    const arab = $(el).find('[dir="rtl"]').first().text().trim();
    const latin = $(el).find(".text-primary-500").first().text().trim();
    const arti = $(el).find(".text-neutral-700").first().text().trim();

    if (arab && latin && arti) {
      hasil.push({
        ayat: Number(id),
        arab,
        latin,
        arti,
      });
    }
  });

  return {
    surah: title,
    info,
    total_ayat: hasil.length,
    ayat: hasil,
  };
}

async function handler(m, { sock }) {
  const query = m.args?.join(" ")?.trim();

  if (!query) {
    return m.reply(
      `📖 *QURAN*\n\n` +
        `> Masukkan nama surah\n\n` +
        `\`Contoh: ${m.prefix}quran al fatihah\`\n` +
        `\`Contoh: ${m.prefix}quran al baqarah\``,
    );
  }

  m.react("🔍");

  try {
    const data = await quran(query);

    if (!data.ayat?.length) {
      m.react("❌");
      return m.reply(`❌ Surah *${query}* tidak ditemukan`);
    }

    let teks = `📖 *${data.surah}*\n${data.info}\n\n`;
    for (const i of data.ayat) {
      teks += `${i.arab}\n${i.latin}\n_${i.arti}_\n\n`;
    }

    m.react("✅");

    const trimmed = teks.trim();
    if (trimmed.length > 60000) {
      const chunks = [];
      let current = "";
      for (const ayat of data.ayat) {
        const block = `${ayat.arab}\n${ayat.latin}\n_${ayat.arti}_\n\n`;
        if ((current + block).length > 60000) {
          chunks.push(current.trim());
          current = "";
        }
        current += block;
      }
      if (current.trim()) chunks.push(current.trim());

      for (let i = 0; i < chunks.length; i++) {
        const prefix = i === 0 ? `📖 *${data.surah}*\n${data.info}\n\n` : "";
        await m.reply(prefix + chunks[i]);
      }
    } else {
      await m.reply(trimmed);
    }
  } catch (e) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
