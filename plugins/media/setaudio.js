//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fs from 'fs'
import path from 'path'

const pluginConfig = {
  name: "setaudio",
  category: "media",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || ''

    if (!mime.startsWith('audio/')) return m.reply(`Kirim/reply audio dulu!\nContoh: reply audio lalu ketik *${usedPrefix}${command}*`)

    const filePath = '../../media/tes.mp3'
    const buffer = await quoted.download()

    fs.writeFileSync(filePath, buffer)
    m.reply('✅ Audio menu berhasil diupdate!')

  } catch (e) {
    console.error(e)
    m.reply('Error: ' + e.message)
  }
}

export { pluginConfig as config, handler };
