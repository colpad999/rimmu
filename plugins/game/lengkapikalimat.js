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


import fs from 'fs'
import similarity from 'similarity'

let timeout = 120000
let poin = 4999
const threshold = 0.72

const pluginConfig = {
  name: "lengkapikalimat",
  category: "game",
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

async function handler(m, { sock, prefix }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {}

  let id = m.chat
  if (id in conn.lengkapikalimat)
    return m.reply('Masih ada soal yang belum terjawab di chat ini!')

  let src = JSON.parse(fs.readFileSync('../../json/lengkapikalimat.json'))
  let json = src[Math.floor(Math.random() * src.length)]

  let soal = json.soal || '-'
  let jawaban = (json.jawaban || '').toLowerCase().trim()

  let caption = `
*LENGKAPI KALIMAT*

${soal}

⏱️ Timeout ${(timeout / 1000)} detik
💎 Bonus ${poin} XP

Ketik *nyerah* untuk menyerah
`.trim()

  let msg = await m.reply(caption)

  conn.lengkapikalimat[id] = [
    msg,
    { soal, jawaban },
    poin,
    setTimeout(() => {
      if (conn.lengkapikalimat[id]) {
        m.reply(`⏰ Waktu habis!\nJawaban: *${jawaban}*`)
        delete conn.lengkapikalimat[id]
      }
    }, timeout)
  ]
}


handler.before = async function (m, { conn }) {
  conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {}

  let id = m.chat
  if (!(id in conn.lengkapikalimat)) return

  let [msg, data, poin, time] = conn.lengkapikalimat[id]
  if (!m.text) return

  let teks = m.text.toLowerCase().replace(/\s+/g, ' ').trim()
  let jawaban = data.jawaban

  if (/^((me)?nyerah|surr?ender)$/i.test(teks)) {
    clearTimeout(time)
    delete conn.lengkapikalimat[id]
    m.reply(`🏳️ *Menyerah!*\nJawaban: *${jawaban}*`)
    return true
  }

  if (teks === jawaban) {
    clearTimeout(time)
    delete conn.lengkapikalimat[id]
    global.db.data.users[m.sender].exp += poin
    m.reply(`✅ *Benar!*\nJawaban: *${jawaban}*\n+${poin} XP`)
    return true
  }

  if (similarity(teks, jawaban) >= threshold) {
    m.reply('🤏 Dikit lagi!')
    return true
  }

  return true
}

export { pluginConfig as config, handler };
