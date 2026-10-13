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

import axios from 'axios'
import FormData from 'form-data'
import te from '../../src/lib/rimuru-error.js'

const pluginConfig = {
    name: 'fakecallwa',
    category: 'canvas',
    description: 'Membuat gambar fake call WhatsApp (Tersedia versi Android dan iOS)',
    usage: '.fakecall nama | durasi',
    example: '.fakecall Zann | 19:00',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const cmd = m.command.toLowerCase()
    const text = m.text

    if (!text || !text.includes('|')) {
        let helpText = `Halo! Sepertinya format yang kamu masukkan kurang tepat.\n\n`
        helpText += `Fitur ini digunakan untuk membuat gambar panggilan palsu (Fake Call) seolah-olah seseorang sedang meneleponmu secara langsung.\n\n`
        helpText += `*Daftar Perintah yang Tersedia:*\n`
        helpText += `- *${m.prefix}fakecall* (Untuk tampilan panggilan Android)\n`
        helpText += `- *${m.prefix}fakecall-ios* (Untuk tampilan panggilan iPhone atau iOS)\n\n`
        helpText += `*Cara Penggunaan:*\n`
        helpText += `Ketik perintah diikuti dengan *Nama* dan *Durasi* yang dipisahkan oleh tanda pipa (|).\n\n`
        helpText += `*Contoh Penggunaan:*\n`
        helpText += `- *${m.prefix}fakecall Zann | 03:33:33*\n`
        helpText += `- *${m.prefix}fakecall-ios Sayangku | 12:00:00*\n\n`
        helpText += `*Tips Tambahan:*\n`
        helpText += `Kamu bisa me-reply (membalas) sebuah gambar jika ingin menggunakan foto tersebut sebagai avatar profil sang penelepon!`
        
        return m.reply(helpText)
    }

    const [nama, durasi] = text.split('|').map(s => s.trim())

    if (!nama) {
        return m.reply(`Maaf, nama penelepon tidak boleh dikosongkan. Silakan isi namanya terlebih dahulu!`)
    }

    if (!durasi) {
        return m.reply(`Maaf, durasi panggilan tidak boleh dikosongkan. Silakan isi durasinya terlebih dahulu!`)
    }

    await m.react('🕕')

    try {
        let bufferBase
        
        if (m.isImage) {
            try {
                bufferBase = await m.download()
            } catch (err) {}
        } else if (m.quoted?.isImage) {
            try {
                bufferBase = await m.quoted.download()
            } catch (err) {}
        }

        if (!bufferBase) {
            try {
                const ppUrl = await sock.profilePictureUrl(m.sender, 'image')
                const res = await axios.get(ppUrl, { responseType: 'arraybuffer' })
                bufferBase = Buffer.from(res.data)
            } catch (err) {
                const res = await axios.get('https://files.catbox.moe/nwvkbt.png', { responseType: 'arraybuffer' })
                bufferBase = Buffer.from(res.data)
            }
        }

        const form = new FormData()
        form.append('avatarUrl', bufferBase, { filename: 'avatar.jpg', contentType: 'image/jpeg' })
        form.append('name', nama)
        form.append('duration', durasi)

        let endpoint = 'fakecall-android'
        if (cmd === 'fakecall-ios') {
            endpoint = 'fakecall-ios'
        }

        const apiUrl = `https://my.izuka-api.xyz/api/canvas/${endpoint}`

        const response = await axios.post(apiUrl, form, {
            headers: form.getHeaders(),
            responseType: 'arraybuffer'
        })

        await sock.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m })

        await m.react('📞')

    } catch (err) {
        await m.react('☢')
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }