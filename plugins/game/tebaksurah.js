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

async function fetchAyah() {
  try {
    const rand = Math.floor(Math.random() * 6236) + 1
    const res = await axios.get(
      `https://api.alquran.cloud/v1/ayah/${rand}/ar.alafasy`,
      { timeout: 30000 }
    )

    if (!res.data?.data) throw new Error("Invalid")

    const ayah = res.data.data

    return {
      text: ayah.text,
      audio: ayah.audio,
      surah: ayah.surah?.englishName?.toLowerCase().replace(/[^a-z ]/g, "")
    }
  } catch {
    throw new Error("Gagal mengambil data ayat!")
  }
}

let timeout = 60000 // 60 detik

let handler = async (m, { conn, command }) => {
  global.tebaksurah = global.tebaksurah || {}
  const chat = m.chat
  let room = global.tebaksurah[chat]

  switch (command) {
    case "tebaksurah": {
      if (room?.active)
        return m.reply("❌ Masih ada soal yang belum terjawab!")

      let data
      try {
        data = await fetchAyah()
      } catch {
        return m.reply("❌ Gagal mengambil data ayat.")
      }

      await conn.sendMessage(
        chat,
        {
          text: `📖 *TEBAK SURAH*\n\nAyat:\n"${data.text}"\n\n⏳ Timeout: *${
            timeout / 1000
          } detik*\nKetik *.whosurah* untuk hint.`
        },
        { quoted: m }
      )

      if (data.audio) {
        await conn.sendMessage(
          chat,
          {
            audio: { url: data.audio },
            mimetype: "audio/mpeg",
            ptt: true
          },
          { quoted: m }
        )
      }

      global.tebaksurah[chat] = {
        active: true,
        answer: data.surah,
        timer: setTimeout(() => {
          conn.reply(chat, `❌ Waktu habis!\nJawaban: *${data.surah}*`)
          delete global.tebaksurah[chat]
        }, timeout)
      }

      break
    }

    case "whosurah": {
      if (!room?.active) return m.reply("❌ Tidak ada game aktif.")

      let ans = room.answer
      let hint = ans[0] + "_".repeat(Math.max(ans.length - 2, 1)) + ans.slice(-1)

      return m.reply(`🧩 *Hint:* ${hint}`)
    }
  }
}

handler.all = async function (m) {
  global.tebaksurah = global.tebaksurah || {}
  const room = global.tebaksurah[m.chat]
  if (!room?.active) return

  let text = m.text?.trim().toLowerCase().replace(/[^a-z ]/g, "")
  if (!text) return

  let ans = room.answer

  let accept = [
    ans,
    ans.replace(/^al /, ""),
    ans.replace(/ /g, "")
  ]

  if (accept.includes(text)) {
    clearTimeout(room.timer)

    this.reply(
      m.chat,
      `✅ *Benar!* 🎉\nSurah: *${room.answer.toUpperCase()}*`,
      m
    )

    delete global.tebaksurah[m.chat]
  }
}

handler.help = ["tebaksurah"]
handler.tags = ["game"]
handler.command = /^(tebaksurah|whosurah)$/i
handler.limit = false

export default handler
