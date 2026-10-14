//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


function getRandomDate() {
  const now = new Date()
  const future = new Date(now.getFullYear() + 70, 0, 1)
  const deathTime = new Date(now.getTime() + Math.random() * (future.getTime() - now.getTime()))
  return deathTime.toDateString()
}

const pluginConfig = {
  name: "kematian",
  category: "fun",
  description: "Imported from Yalena MD V4.6",
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

async function handler(m, { text }) {
  const nama = text || m.pushName || 'Kamu'

  const sebab = [
    'keracunan cilok expired 😵',
    'ditabrak mobil odading 😩',
    'terpeleset di kamar mandi pas nyanyi dangdut 🚿🎤',
    'kecanduan scrolling TikTok 48 jam nonstop 📱💀',
    'ngambek sama bot sendiri terus putus asa 😭',
    'kelamaan jomblo sampe badan menghilang 🫥',
    'makan mie pakai kopi dan susu 🤢',
    'diculik alien terus dikira bahan eksperimen 👽🔬',
    'dipukul karma karena suka nyolong meme 🙃',
    'ketawa ngakak sampai lupa napas 😂'
  ]

  let tanggal = getRandomDate()
  let penyebab = sebab[Math.floor(Math.random() * sebab.length)]

  m.reply(`💀 *Ramalan Kematian*\n\n📛 Nama: *${nama}*\n🗓️ Tanggal: *${tanggal}*\n⚰️ Penyebab: *${penyebab}*`)
}

export { pluginConfig as config, handler };
