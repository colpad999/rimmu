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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


// Telegram Chanel Search 
// Type Plugins ESM 
// Source : https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
// Source Scrape : https://whatsapp.com/channel/0029Vb5EZCjIiRotHCI1213L/410
import axios from "axios"
import * as cheerio from 'cheerio'

async function getRealTelegramLink(joinUrl) {
  try {
    const { data } = await axios.get(joinUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
      }
    })
    const $ = cheerio.load(data)
    const realLink = $('a[href^="tg://resolve"]').attr("href")
    if (realLink) {
      const username = realLink.split("tg://resolve?domain=")[1]
      return `https://t.me/${username}`
    }
  } catch (e) {
    console.error(`Gagal ambil link asli: ${e.message}`)
  }
  return joinUrl
}

async function searchTelegramChannels(query) {
  try {
    const url = `https://en.tgramsearch.com/search?query=${encodeURIComponent(query)}`
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/113.0.0.0 Safari/537.36"
      }
    })
    const $ = cheerio.load(data)
    const results = []

    for (const el of $(".tg-channel-wrapper").toArray()) {
      const name = $(el).find(".tg-channel-link a").text().trim()
      let link = $(el).find(".tg-channel-link a").attr("href")
      const image = $(el).find(".tg-channel-img img").attr("src")
      const members = $(el).find(".tg-user-count").text().trim()
      const description = $(el).find(".tg-channel-description").text().trim()
      const category = $(el).find(".tg-channel-categories a").text().trim()

      if (link?.startsWith("/join/")) {
        link = await getRealTelegramLink(`https://en.tgramsearch.com${link}`)
      } else if (link?.startsWith("tg://resolve?domain=")) {
        const username = link.split("tg://resolve?domain=")[1]
        link = `https://t.me/${username}`
      }

      results.push({ name, link, image, members, description, category })
    }

    return results
  } catch (err) {
    console.error(`Error scraping: ${err.message}`)
    return []
  }
}

const pluginConfig = {
  name: "tgram",
  category: "general",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) throw `Contoh:\n${usedPrefix + command} anime`

  m.reply(`🔍 Sedang mencari channel Telegram untuk kata kunci: *${text}*...`)

  const results = await searchTelegramChannels(text)
  if (!results.length) throw `Tidak ada hasil untuk kata kunci: *${text}*`

  let output = `📢 Hasil pencarian untuk *${text}*:\n`
  results.slice(0, 10).forEach((item, i) => {
    output += `\n${i + 1}. *${item.name}*\n`
    output += `   👥 ${item.members}\n`
    output += `   🏷️ ${item.category || '-'}\n`
    output += `   📝 ${item.description || '-'}\n`
    output += `   🔗 ${item.link}\n`
  })

  m.reply(output)
}

export { pluginConfig as config, handler };
