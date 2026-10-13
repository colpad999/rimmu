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

import { Canvas, loadImage, FontLibrary } from 'skia-canvas'
import fs from 'fs'
import path from 'path'
import te from '../../src/lib/rimuru-error.js'
async function ensureFile(url, file) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(file)) {
    const res = await fetch(url)
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(file, buf)
  }
}

async function generateImage(saldo, greet) {
  const bgUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/52e39f-1773064858080.jpg"
  const fontUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/49bbd8-1773045557233.otf"
  const font2Url = "https://raw.githubusercontent.com/uploader762/dat1/main/uploads/203827-1773063086445.ttf"

  const font1 = "../data/Demo_fonts/Fontspring-DEMO-ceraroundpro-medium.otf"
  const font2 = "../data/Roboto_Medium.ttf"

  await ensureFile(fontUrl, font1)
  await ensureFile(font2Url, font2)

  FontLibrary.use("CustomFont", font1)
  FontLibrary.use("GreetingFont", font2)

  const bgRes = await fetch(bgUrl)
  const bg = await loadImage(Buffer.from(await bgRes.arrayBuffer()))

  const canvas = new Canvas(bg.width, bg.height)
  const ctx = canvas.getContext("2d")

  ctx.drawImage(bg, 0, 0, bg.width, bg.height)

  const numberText = saldo
  const baseX = 2470
  const baseY = 894

  ctx.font = "125px CustomFont"
  ctx.fillStyle = "black"

  const numberWidth = ctx.measureText(numberText).width
  const numberX = baseX - numberWidth

  ctx.fillText(numberText, numberX, baseY)

  const rpText = "Rp"
  const rpWidth = ctx.measureText(rpText).width
  const rpX = numberX - rpWidth - 4

  ctx.fillText(rpText, rpX, baseY)

  ctx.font = "93px GreetingFont"
  ctx.fillStyle = "gray"

  ctx.fillText(greet, 98, 86)

  return await canvas.png
}
const pluginConfig = {
    name: 'fakebankjago',
    category: 'canvas',
    description: 'Membuat gambar chat iPhone style',
    usage: '.fakebankjago <text>',
    example: '.fakebankjago Hai cantik',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const [nama,nominal] = m.text?.split(',')
    if (!nama || !nominal) {
        return m.reply(`*FAKE BANK*\n\n> Masukkan teks untuk chat\n\n\`Contoh: ${m.prefix}fakebank Zann,10000\``)
    }
    if(isNaN(nominal)) return m.reply(`*HARAP MASUKKAN ANGKA*`)
    m.react('🕕')
    
    try {
        const saldo = Number(nominal.replace(/[^0-9]/g, '')).toLocaleString('id-ID')
        const hour = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false })
        const h = Number(hour)
        let waktu = 'Malam'
        if (h >= 4 && h < 11) waktu = 'Pagi'
        else if (h >= 11 && h < 15) waktu = 'Siang'
        else if (h >= 15 && h < 18) waktu = 'Sore'
        const fake = await generateImage(saldo, `Selamat ${waktu}, ${nama}`)
        await sock.sendMedia(m.chat, fake, null, m, {
            type: 'image',
        })
        m.react('✅')
        
    } catch (error) {
        m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }