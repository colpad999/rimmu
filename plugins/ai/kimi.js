//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "kimi",
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
  if (!text) return m.reply('Masukkan pertanyaan!\nContoh: .kimi apa itu bot wa')

  try {
    let res = await fetch(`https://api.zenzxz.my.id/api/ai/kimi?query=${encodeURIComponent(text)}`)
    let json = await res.json()
    let hasil = json?.data?.response || json?.response || 'Tidak ada respons dari AI.'
    m.reply(hasil)
  } catch (e) {
    m.reply('yahh error.')
  }
}

export { pluginConfig as config, handler };
