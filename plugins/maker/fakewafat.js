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


import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const __dirname = './tmp'
const fontPath = path.join(__dirname, 'wafatfont.ttf')

async function getBuffer(url) {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function drawCircleImg(ctx, img, x, y, size) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, size / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size)
  ctx.restore()
}

async function loadAssets() {
  if (!fs.existsSync(__dirname)) {
    fs.mkdirSync(__dirname, { recursive: true })
  }

  if (!fs.existsSync(fontPath)) {
    const res = await fetch('https://uploader.zenzxz.dpdns.org/uploads/1776849905914.ttf')
    const buff = await res.arrayBuffer()
    fs.writeFileSync(fontPath, Buffer.from(buff))
  }

  GlobalFonts.registerFromPath(fontPath, 'WafatFont')
}

async function fakewafat({ fotourl, nama, lahir, wafat }) {
  await loadAssets()

  const bgurl = 'https://uploader.zenzxz.dpdns.org/uploads/1776848882042.jpeg'

  const [bgBuffer, imgBuffer] = await Promise.all([
    getBuffer(bgurl),
    getBuffer(fotourl)
  ])

  const bg = await loadImage(bgBuffer)
  const personImg = await loadImage(imgBuffer)

  const canvas = createCanvas(bg.width, bg.height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(bg, 0, 0, bg.width, bg.height)

  const centerX = bg.width / 2
  const fotoSize = 575

  drawCircleImg(ctx, personImg, centerX, 1210, fotoSize)

  ctx.fillStyle = '#462F29'
  ctx.textAlign = 'center'

  ctx.font = '60px WafatFont'
  ctx.fillText(nama, centerX, 1740)

  const rangeTahun = `${lahir} - ${wafat}`
  const midY = (1800 + 1830) / 2

  ctx.font = '40px WafatFont'
  ctx.fillText(rangeTahun, centerX, midY)

  return canvas.toBuffer('image/png')
}

const pluginConfig = {
  name: "fakewafat",
  category: "maker",
  description: "Imported from Rimuru MD V4.6",
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
  if (!text) throw `Contoh:\n.fakewafat Nama|1995|2026\n\nReply foto`

  let [nama, lahir, wafat] = text.split('|')
  if (!nama || !lahir || !wafat) throw `Contoh:\n.fakewafat Nama|1995|2026\n\nReply foto`

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  let img
  if (/image/.test(mime)) {
    img = await q.download()
  } else if (text.includes('http')) {
    img = text.split(' ').pop()
  } else {
    throw `Contoh:\n.fakewafat Nama|1995|2026\n\nReply foto`
  }

  await m.reply(global.wait)

  let buffer = await fakewafat({
    fotourl: Buffer.isBuffer(img)
      ? `data:image/jpeg;base64,${img.toString('base64')}`
      : img,
    nama,
    lahir,
    wafat
  })

  await conn.sendMessage(m.chat, {
    image: buffer
  }, { quoted: m })
}

export { pluginConfig as config, handler };
