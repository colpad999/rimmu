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

import { createCanvas, loadImage } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'fakediploma',
    category: 'canvas',
    description: 'Bikin fake ijazah (buat konten/gaguan doang)',
    usage: '.fakeijazah <nama> | <gelar> | <universitas>',
    example: '.fakeijazah Rimuru | S.Kom | Universitas Zero',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 8,
    energi: 1,
    isEnabled: true
}

const CANVAS_WIDTH = 1100
const CANVAS_HEIGHT = 760

function escapeXml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

async function generateFakeIjazah(nama, gelar, universitas) {
    const tahun = new Date().getFullYear()
    const ijazahNo = 'IZH-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}">
      <rect width="1100" height="760" fill="#f8f4e8"/>
      <rect x="28" y="28" width="1044" height="704" rx="10" fill="none" stroke="#333" stroke-width="4"/>
      <rect x="42" y="42" width="1016" height="676" rx="8" fill="none" stroke="#777" stroke-width="2"/>
      <text x="550" y="105" text-anchor="middle" font-family="Times New Roman, serif" font-size="34" font-weight="700">IJAZAH</text>
      <text x="550" y="145" text-anchor="middle" font-family="Times New Roman, serif" font-size="17">CONTOH / UNTUK HIBURAN</text>
      <line x1="220" y1="170" x2="880" y2="170" stroke="#333" stroke-width="2"/>
      <text x="550" y="235" text-anchor="middle" font-family="Times New Roman, serif" font-size="15">Diberikan kepada</text>
      <text x="550" y="290" text-anchor="middle" font-family="Times New Roman, serif" font-size="30" font-weight="700">${escapeXml(nama).toUpperCase()}</text>
      <text x="550" y="340" text-anchor="middle" font-family="Times New Roman, serif" font-size="20">${escapeXml(gelar).toUpperCase()}</text>
      <text x="550" y="390" text-anchor="middle" font-family="Times New Roman, serif" font-size="18">${escapeXml(universitas).toUpperCase()}</text>
      <line x1="220" y1="425" x2="880" y2="425" stroke="#888" stroke-width="1"/>
      <text x="550" y="485" text-anchor="middle" font-family="Times New Roman, serif" font-size="16">No. Ijazah: ${ijazahNo}</text>
      <text x="550" y="525" text-anchor="middle" font-family="Times New Roman, serif" font-size="16">Tahun Lulus: ${tahun}</text>
      <text x="550" y="630" text-anchor="middle" font-family="Times New Roman, serif" font-size="14" fill="#666">DOKUMEN CONTOH — TIDAK BERLAKU SEBAGAI DOKUMEN RESMI</text>
    </svg>`

    const template = await loadImage(Buffer.from(svg))
    const canvas = createCanvas(template.width, template.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(template, 0, 0)
    return canvas.toBuffer('image/png')
}

async function handler(m, { sock }) {
    const text = m.args.join(' ') || m.text?.trim() || ''
    
    if (!text) {
        return m.reply(
            `💕 *ғᴀᴋᴇ ɪᴊᴀᴢᴀʜ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakeijazah <nama> | <gelar> | <universitas>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakeijazah Rimuru | S.Kom | Universitas Zero\n` +
            `┃\n` +
            `┃ 💗 *Rimuru:* Mau lulusan mana darling~?\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    const parts = text.split('|').map(p => p.trim())
    const nama = parts[0] || 'Darling'
    const gelar = parts[1] || 'S.Kom'
    const universitas = parts[2] || 'Universitas Zero'
    
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Rimuru:* Lagi bikin fake ijazah darling~`)
    
    try {
        const imageBuffer = await generateFakeIjazah(nama, gelar, universitas)
        
        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `💕 *ғᴀᴋᴇ ɪᴊᴀᴢᴀʜ* 💕\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ ✅ *ʙᴇʀʜᴀꜱɪʟ*\n` +
                    `┃ 👨‍🎓 *ɴᴀᴍᴀ*: ${nama}\n` +
                    `┃ 🎓 *ɢᴇʟᴀʀ*: ${gelar}\n` +
                    `┃ 🏛️ *ᴜɴɪᴠᴇʀꜱɪᴛᴀꜱ*: ${universitas}\n` +
                    `┃\n` +
                    `┃ 💗 *Rimuru:* Selamat ya darling! 🗿\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[FakeIjazah] Error:', err)
        m.react('💔')
        return m.reply(`💔 *ᴇʀʀᴏʀ*\n\n> ${err.message}`)
    }
}
export { pluginConfig as config, handler };