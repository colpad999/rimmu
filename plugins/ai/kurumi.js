//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fetch from "node-fetch"

const pluginConfig = {
  name: "kurumi",
  category: "ai",
  description: "Imported from Yalena MD V4.6",
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

async function handler(m, { sock, text }) {
    const conn = sock;
  if (!text) return m.reply("Masukkan teks.\nContoh: .kurumi kamu siapa?")

  try {
    const prompt = encodeURIComponent(
      "Kamu adalah Kurumi Tokisaki dari anime Date A Live. " +
      "Kamu berbicara dengan gaya imut, sedikit nakal, ramah, hangat, " +
      "kadang menggoda, dan jangan menyebut dirimu sebagai AI."
    )

    const query = encodeURIComponent(text)
    const url = `https://api.deline.web.id/ai/openai?text=${query}&prompt=${prompt}`

    const res = await fetch(url)
    const data = await res.json()

    if (!data.status || !data.result) {
      return m.reply("AI Kurumi tidak merespon.")
    }

    await conn.sendMessage(m.chat, {
      text: data.result,
      contextInfo: {
        externalAdReplyOff: {
          title: "Kurumi Tokisaki AI",
          thumbnailUrl: "https://raw.githubusercontent.com/himanackerman/Image/main/1767877404043-832.jpeg",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply("Terjadi error saat menghubungi AI Kurumi.")
  }
}

export { pluginConfig as config, handler };
