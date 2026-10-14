//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import axios from 'axios'

const pluginConfig = {
  name: "cekrekening",
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

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) {
    throw `Contoh:\n${usedPrefix + command} Dana|0855xxxxx`
  }

  let [bank, number] = text.split('|')

  if (!bank || !number) {
    throw `Format salah!\n\nContoh:\n${usedPrefix + command} Dana|0855xxxx`
  }

  try {
    let { data } = await axios.get('https://api.nexray.eu.cc/information/check-rekening', {
      params: {
        number: number.trim(),
        bank: bank.trim()
      }
    })

    let result = data.result || {}

    let teks = `❏ Cek Rekening

❏ Bank : ${bank}
❏ Nomor : ${number}
❏ Status : ${result.success ? 'Valid' : 'Tidak Valid'}
❏ Pesan : ${result.error?.message || result.message || '-'}

❏ Response Time : ${data.response_time || '-'}`

    m.reply(teks)

  } catch (e) {
    console.error(e)
    m.reply('Gagal melakukan pengecekan rekening.')
  }
}

export { pluginConfig as config, handler };
