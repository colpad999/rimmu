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


import fetch from 'node-fetch'
import { load } from 'cheerio'

const pluginConfig = {
  name: "bmkggempa",
  category: "info",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
  try {
    const res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml')
    const xml = await res.text()

    const $ = load(xml, { xmlMode: true })
    const gempa = $('Infogempa gempa').first()

    const tanggal = gempa.find('Tanggal').text()
    const jam = gempa.find('Jam').text()
    const lintang = gempa.find('Lintang').text()
    const bujur = gempa.find('Bujur').text()
    const magnitude = gempa.find('Magnitude').text()
    const kedalaman = gempa.find('Kedalaman').text()
    const wilayah = gempa.find('Wilayah').text()
    const potensi = gempa.find('Potensi').text()
    const shakemap = gempa.find('Shakemap').text()

    let teks = `🌐 *Info Gempa Terkini - BMKG*\n\n`
    teks += `📅 *Tanggal:* ${tanggal}\n`
    teks += `🕒 *Jam:* ${jam} WIB\n`
    teks += `📍 *Lokasi:* ${lintang} - ${bujur} (${wilayah})\n`
    teks += `📏 *Magnitudo:* ${magnitude}\n`
    teks += `📉 *Kedalaman:* ${kedalaman}\n`
    teks += `🌊 *Potensi:* ${potensi || '—'}`

    const urlShakemap = `https://data.bmkg.go.id/DataMKG/TEWS/${shakemap}`
    await conn.sendFile(m.chat, urlShakemap, 'gempa.jpg', teks, m)
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Gagal mengambil data dari BMKG langsung.', m)
  }
}

export { pluginConfig as config, handler };
