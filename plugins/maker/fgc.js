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

import axios from 'axios';
import FormData from 'form-data';
// Fake Group - Zero Bot Style
// API: https://api.zenzxz.my.id

const pluginConfig = {
    name: 'fgc',
    category: 'maker',
    description: 'Membuat fake tampilan grup WhatsApp',
    usage: '.fakegroup <url|title|member|time>',
    example: '.fakegroup https://img.jpg|Zero Squad|256 members|12:30',
    cooldown: 5,
    energi: 3,
    isEnabled: true
}

async function uploadUguu(buffer) {
    try {

        const form = new FormData()

        form.append('files[]', buffer, 'image.jpg')

        const { data } = await axios.post(
            'https://uguu.se/upload',
            form,
            {
                headers: form.getHeaders()
            }
        )

        return data?.files?.[0]?.url || null

    } catch {
        return null
    }
}

async function handler(m, { sock }) {

    const text = m.args?.join(' ')
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''

    if (!text) {
        return m.reply(
            `👥 *FAKE GROUP GENERATOR*\n\n` +
            `📌 Format:\n` +
            `> ${m.prefix}fakegroup url|title|member|time\n\n` +
            `📌 Reply gambar:\n` +
            `> ${m.prefix}fakegroup title|member|time`
        )
    }

    await sock.sendMessage(m.chat, {
        react: {
            text: '🕒',
            key: m.key
        }
    })

    try {

        let url, title, member, time

        const args = text.split('|').map(v => v?.trim())

        // pakai url langsung
        if (args.length === 4) {

            ;[url, title, member, time] = args

        // reply gambar
        } else if (args.length === 3) {

            if (!mime.startsWith('image/')) {
                throw new Error('Reply gambar untuk dijadikan foto grup.')
            }

            ;[title, member, time] = args

            const media = await q.download()

            url = await uploadUguu(media)

            if (!url) {
                throw new Error('Gagal upload gambar.')
            }

        } else {

            throw new Error(
                `Format salah!\n\n` +
                `Contoh:\n` +
                `> ${m.prefix}fakegroup Zero Squad|256 members|12:30`
            )
        }

        const api =
            `https://api.zenzxz.my.id/maker/fakegroup?` +
            `url=${encodeURIComponent(url)}` +
            `&title=${encodeURIComponent(title)}` +
            `&number=${encodeURIComponent(member)}` +
            `&time=${encodeURIComponent(time)}`

        const { data } = await axios.get(api, {
            responseType: 'arraybuffer'
        })

        const buffer = Buffer.from(data)

        await sock.sendMessage(m.chat, {
            image: buffer,
            caption:
                `👥 *FAKE GROUP BERHASIL DIBUAT*\n\n` +
                `> 🏷️ Nama: ${title}\n` +
                `> 👤 Member: ${member}\n` +
                `> 🕒 Time: ${time}`
        }, {
            quoted: m
        })

        await sock.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })

    } catch (err) {

        console.error('FakeGroup Error:', err)

        await sock.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key
            }
        })

        return m.reply(
            `❌ *Gagal membuat fake group!*\n\n` +
            `> ${err.message || 'API sedang bermasalah.'}`
        )
    }
}

export { pluginConfig as config, handler };
