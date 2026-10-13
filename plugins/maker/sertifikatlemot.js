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


import { createCanvas } from '@napi-rs/canvas'

const pluginConfig = {
  name: "sertifikatlemot",
  category: "maker",
  description: "Imported from Rimuru MD V4.6",
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

async function handler(m, { text, sock }) {
    const conn = sock;
  const nama = text || m.pushName || 'Orang Lemot'

  const alasan = pick([
    'karena membalas chat 2 hari sekali',
    'karena loading mulu padahal sinyal 5G',
    'karena buka WA kayak nunggu sinetron tayang ulang',
    'karena suka bales "iya" 3 minggu kemudian',
    'karena kecepatan responnya ngalahin kura-kura pensiun'
  ])

  try {
    const canvas = createCanvas(800, 600)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#f3f3f3'
    ctx.fillRect(0, 0, 800, 600)

    // Header
    ctx.fillStyle = '#000'
    ctx.font = 'bold 34px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🐢 SERTIFIKAT KELEMBAMAN INTERNASIONAL 🐢', 400, 80)

    // Nama
    ctx.font = '28px Arial'
    ctx.fillText(`Dianugerahkan kepada: ${nama}`, 400, 170)

    // Alasan
    ctx.font = '22px Arial'
    ctx.fillText(`Sebagai pengakuan resmi`, 400, 230)
    ctx.fillText(`${alasan}`, 400, 270)

    // Footer
    ctx.font = '18px Arial'
    ctx.fillText('Dikeluarkan oleh: Komite Anti Slow Respon Dunia', 400, 450)
    ctx.fillText(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 400, 490)

    ctx.fillText('_______________________', 400, 540)
    ctx.fillText('TTD: Ketua Lemot Nasional', 400, 570)

    const buffer = canvas.toBuffer()
    await conn.sendFile(m.chat, buffer, 'sertif-lemot.jpg', `📜 Sertifikat resmi untuk *${nama}*`, m)
  } catch (e) {
    console.error(e)
    m.reply('❌ Gagal membuat sertifikat lemot.')
  }
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export { pluginConfig as config, handler };
