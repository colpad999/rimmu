//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


/* 
Sertifikat Tolol
Plugin ESM 
API : https://api.siputzx.my.id
*/
import fetch from 'node-fetch'

const pluginConfig = {
  name: "sertiftolol",
  category: "maker",
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

async function handler(m, { text, sock }) {
    const conn = sock;
  if (!text) return m.reply('⚠️ Masukkan nama untuk sertifikatnya!\n\nContoh:\n.sertiftolol Hilman')

  try {
    let url = `https://api.siputzx.my.id/api/m/sertifikat-tolol?text=${encodeURIComponent(text)}`
    let res = await fetch(url)
    if (!res.ok) throw 'Gagal mengunduh gambar.'

    let buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'sertif.jpg', `🏅 Sertifikat untuk: *${text}*`, m)
  } catch (e) {
    console.error(e)
    m.reply('❌ Gagal membuat sertifikat. Coba lagi nanti.')
  }
}

export { pluginConfig as config, handler };
