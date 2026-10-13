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
import config from '../../config.js'
const pluginConfig = {
    name: 'niatsholat',
    category: 'religi',
    description: 'Kumpulan fitur Islami (Asmaul Husna, Niat Sholat, Surah, Doa, Artikel, Kata Mutiara)',
    usage: '.islami <fitur>',
    isGroup: false,
    isBotAdmin: false,
    isAdmin: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

async function fetchJson(url) {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (e) {
        throw e
    }
}

async function handler(m, { sock }) {
    const command = m.command.toLowerCase()
    const text = m.text || ''

    try {
        switch (command) {
            case 'asmaulhusna': {
                let jir = await fetchJson('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna')
                let ye = jir.data

                let tks = '☪️ *ASMAUL HUSNA*\n\n' + ye.map((item) => {
                    return `Urutan: ${item.index}\nLatin: ${item.latin}\nArab: ${item.arabic}\nTerjemahan ID: ${item.translation_id}\nTerjemahan EN: ${item.translation_en}\n`
                }).join('\n')
                m.reply(tks)
            }
            break

            case 'niatsholat': 
            case 'niatshalat': {
                let jir = await fetchJson('https://islamic-api-zhirrr.vercel.app/api/niatshalat')
                let niatSholat = jir

                if (!text) {
                    let daftarNiat = '📋 *DAFTAR NIAT SHOLAT*\n\n' + niatSholat.map((item) => `- ${item.name}`).join('\n')
                    daftarNiat += `\n\n📌 Ketik \`${m.prefix}niatsholat [nama sholat]\` untuk melihat niat\nContoh: \`${m.prefix}niatsholat subuh\``
                    m.reply(daftarNiat)
                } else {
                    let hasil = niatSholat.find((item) => item.name.toLowerCase().includes(text.toLowerCase()))

                    if (hasil) {
                        let tks = `🕋 *${hasil.name.toUpperCase()}*\n\n` +
                            `📄 Arab: ${hasil.arabic}\n` +
                            `🔤 Latin: ${hasil.latin}\n` +
                            `🌍 Terjemahan: ${hasil.terjemahan}`
                        m.reply(tks)
                    } else {
                         m.reply('❌ Niat sholat yang kamu cari tidak ditemukan. Cek lagi nama sholatnya!')
                    }
                }
            }
            break

            case 'surah': {
                if (!text) {
                    m.reply(`⚠️ Ketik nomor surahnya!\nContoh: \`${m.prefix}surah 1\` buat ambil ayat-ayat dari Al-Fatihah`)
                    return
                }

                m.reply('🕕 Sedang memuat surah...')
                let response = await fetchJson(`https://api.siputzx.my.id/api/s/surah?no=${text}`)
                let data = response.data
                if (data && data.length > 0) {
                    let surahText = data.map((ayat, index) =>
                        `۝ Ayat ${ayat.no}:\n` +
                        `${ayat.arab}\n` +
                        `${ayat.latin}\n` +
                        `_${ayat.indo}_`
                    ).join('\n\n')

                    if (surahText.length > 60000) {
                         m.reply('❌ Surah terlalu panjang untuk dikirim via teks. Silakan cari ayat spesifik atau surah yang lebih pendek.')
                    } else {
                        m.reply(surahText)
                    }
                } else {
                    m.reply('❌ Gak ketemu, cek lagi nomor surahnya!')
                }
            }
            break

            case 'doa':
            case 'berdoa': {
                let jir = await fetchJson('https://doa-doa-api-ahmadramadhan.fly.dev/api')
                let daftarDoa = jir

                if (!text) {
                    let listDoa = '🤲 *DAFTAR DOA*\n\n' + daftarDoa.map((item) => `- ${item.doa}`).join('\n')
                     listDoa += `\n\n📌 Ketik \`${m.prefix}doa [nama doa]\` untuk melihat doa\nContoh: \`${m.prefix}doa doa sebelum tidur\``
                    m.reply(listDoa)
                } else {
                    let hasil = daftarDoa.find((item) => item.doa.toLowerCase().includes(text.toLowerCase()))

                    if (hasil) {
                        let tks = `🤲 *${hasil.doa.toUpperCase()}*\n\n` +
                            `📄 Ayat: ${hasil.ayat}\n` +
                            `🔤 Latin: ${hasil.latin}\n` +
                            `🌍 Artinya: ${hasil.artinya}`
                        m.reply(tks)
                    } else {
                         m.reply('❌ Doa yang kamu cari tidak ditemukan. Cek lagi nama doanya!')
                    }
                }
            }
            break

            case 'gislam': {
                if (!text) return m.reply(`❓ Mau cari artikel tentang apa?\nContoh: \`${m.prefix}gislam puasa\``)
                
                try {
                    const response = await fetchJson(`https://artikel-islam.netlify.app/.netlify/functions/api/ms?page=1&s=${text}`)
                    if (response.success) {
                        const articles = response.data.data
                        if (!articles || articles.length === 0) return m.reply('❌ Artikel tidak ditemukan.')

                        let message = `📚 *HASIL PENCARIAN: ${text.toUpperCase()}*\nTotal: ${articles.length}\n\n`
                        articles.forEach((article, index) => {
                            message += `${index + 1}. *${article.title}*\n🔗 ${article.url}\n\n`
                        })
                        return m.reply(message)
                    } else {
                        return m.reply('❌ Gagal mengambil data artikel.')
                    }
                } catch (error) {
                    return m.reply('❌ Terjadi kesalahan saat mengambil data.')
                }
            }
            break
        }
    } catch (e) {
        console.error('Religi Plugin Error:', e)
        m.reply('❌ Terjadi kesalahan pada sistem.')
    }
}

export { pluginConfig as config, handler }