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

import fs from 'fs';
import path from 'path';

const pluginConfig = {
  name: 'fotorimuru',
  category: 'anime',
  description: 'Rimuru random image 💗',
  usage: '.foto-randomrimuru',
  isEnabled: true,
  cooldown: 5
}

async function handler(m, { sock }) {

const folderPath = path.join(process.cwd(), 'assets', 'foto-rimuru-random')

// cek folder
if (!fs.existsSync(folderPath)) {
    return m.reply('❌ Folder Rimuru belum ada, darling...')
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
    return m.reply('📂 Foto Rimuru masih kosong... aku jadi kesepian 😢')
}

// random file
const randomFile = images[Math.floor(Math.random() * images.length)]
const filePath = path.join(folderPath, randomFile)

// 💗 caption random ala Rimuru
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
caption: `╭━━━〔 💗 RIMURU RANDOM 💗 〕━━━⬣
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