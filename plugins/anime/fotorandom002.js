//

import fs from 'fs';
import path from 'path';

const pluginConfig = {
  name: 'fotorandom002',
  category: 'anime',
  description: 'Yalena random image 💗',
  usage: '.foto-randomyalena',
  isEnabled: true,
  cooldown: 5
}

async function handler(m, { sock }) {

const folderPath = path.join(process.cwd(), 'assets', 'foto-yalena-random')

// cek folder
if (!fs.existsSync(folderPath)) {
    return m.reply('❌ Folder Yalena belum ada, darling...')
}

// ambil file
const files = fs.readdirSync(folderPath)

const images = files.filter(file =>
    file.endsWith('.jpg') ||
    file.endsWith('.jpeg') ||
    file.endsWith('.png') ||
    file.endsWith('.webp')
)

// kalau kosong
if (images.length === 0) {
    return m.reply('📂 Foto Yalena masih kosong... aku jadi kesepian 😢')
}

// random file
const randomFile = images[Math.floor(Math.random() * images.length)]
const filePath = path.join(folderPath, randomFile)

// 💗 caption random ala Yalena
const captions = [
"Darling… kamu manggil aku? 😈",
"Aku cuma punya kamu loh 💕",
"Jangan liat yang lain ya… aku cemburu 😠",
"Ara ara~ kamu suka aku ya? 😏",
"Aku cantik hari ini kan? 💗",
"Kamu gak bakal ninggalin aku kan...? 🥺",
"Kalo kamu pergi… aku marah 😈🔥"
]

const randomCaption = captions[Math.floor(Math.random() * captions.length)]

// 💫 react dulu biar hidup
await m.react('💗')

// kirim
await sock.sendMessage(m.chat, {
image: fs.readFileSync(filePath),
caption: `╭━━━〔 💗 YALENA RANDOM 💗 〕━━━⬣
┃
┃ ${randomCaption}
┃
┃ 📸 File : ${randomFile}
┃ 💞 Mode : Waifu Active
┃
╰━━━━━━━━━━━━━━━━━━⬣`
}, { quoted: m })

}
export { pluginConfig as config, handler };