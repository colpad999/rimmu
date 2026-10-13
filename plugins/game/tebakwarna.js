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

import axios from "axios"

async function scrapeWarna() {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/siputzx/databasee/main/games/butawarna.json",
      { timeout: 30000 }
    )

    const list = res.data.filter(v =>
      v.correct && v.image && v.image.startsWith("http")
    )

    if (!list.length) throw new Error("Database warna tidak valid")

    const pick = list[Math.floor(Math.random() * list.length)]

    return {
      img: pick.image,
      answer: String(pick.correct).toLowerCase()
    }
  } catch {
    throw new Error("Gagal mengambil data warna!")
  }
}

let timeout = 60000 // 60 detik

let handler = async (m, { conn, command }) => {
  global.tebakwarna = global.tebakwarna || {}
  const chat = m.chat
  let room = global.tebakwarna[chat]

  switch (command) {
    case "tebakwarna": {
      if (room?.active)
        return m.reply("❌ Masih ada soal yang belum terjawab!", m)

      let data
      try {
        data = await scrapeWarna()
      } catch {
        return m.reply("❌ Gagal mengambil data warna!", m)
      }

      await conn.sendFile(
        chat,
        data.img,
        "warna.jpg",
        `🎨 *TES BUTA WARNA (Ishihara)*\n\nKamu melihat angka berapa pada gambar ini?\n⏳ Timeout: *${timeout / 1000} detik*\nJawab langsung.`,
        m
      )

      global.tebakwarna[chat] = {
        active: true,
        answer: data.answer,
        player: m.sender,
        timer: setTimeout(() => {
          conn.reply(chat, `❌ Waktu habis!\nJawaban: *${data.answer}*`)
          delete global.tebakwarna[chat]
        }, timeout)
      }
      break
    }

    case "whowarna": {
      if (!room?.active) return m.reply("❌ Tidak ada game aktif.", m)

      let ans = room.answer
      let hint =
        ans[0] +
        "_".repeat(Math.max(ans.length - 2, 1)) +
        ans[ans.length - 1]

      return m.reply(`🧩 *KLU:* ${hint}`, m)
    }
  }
}

handler.all = async function (m) {
  global.tebakwarna = global.tebakwarna || {}
  const room = global.tebakwarna[m.chat]
  if (!room?.active) return

  let text = (m.text || "").trim().toLowerCase()
  if (!text) return

  if (text === room.answer) {
    clearTimeout(room.timer)

    this.reply(
      m.chat,
      `✅ Benar! 🎉\nJawaban yang benar adalah *${room.answer}*`,
      m
    )

    delete global.tebakwarna[m.chat]
  }
}

handler.help = ["tebakwarna"] 
handler.tags = ["game"]
handler.command = /^(tebakwarna|whowarna)$/i
handler.limit = false

export default handler
