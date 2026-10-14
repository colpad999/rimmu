//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fetch from 'node-fetch'

const pluginConfig = {
  name: "mikutalk",
  category: "tools",
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

async function handler(m, { sock, text, command }) {
    const conn = sock;
  let apikey = 'planaai'
  if (!text) throw `Kirim teks yang mau diucapkan Miku!\n\nContoh: .${command} Haloo Hilman`
  
  await m.react('🎶')
  
  try {
    let res = await fetch(`https://www.sankavolereii.my.id/anime/ttsmiku?apikey=${apikey}&text=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()

    let buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'miku.mp3', `🎶 Miku sudah ngomong: ${text}`, m)
    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.reply('❌ Gagal mengambil audio dari API.')
    await m.react('❌')
  }
}

export { pluginConfig as config, handler };
