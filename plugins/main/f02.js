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


import config from '../../config.js';
const pluginConfig = {
    name: 'f02',
    category: 'main',
    description: 'Seleksi masuk F02',
    usage: '.seleksif02',
    example: '.seleksif02',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function handler(m, { sock }) {

    const name = m.pushName || "Darling"

    const text1 = `
╭━━〔 💖 RIMURU SELECTION 💖 〕━━⬣
┃
┃ Wahh *${name}*~
┃ Darling mau seleksi *F02* yaa? 😋
┃
┃ Tapi baca syarat nya dulu ya!
┃
┃ 📜 *SYARAT MASUK F02*
┃
┃ • wajib bisa ngedit minimal
┃   *soft spoken style*
┃
┃ • umur *14+* wajib minimal 14
┃
┃ • *no drama basi*
┃
┃ • *good attitude*
┃
┃ • minimal punya pengalaman
┃   soal dunia editor
┃
┃ • *wajib CNTIKTOK*
┃
┃ Tunggu sebentar ya darling...
┃ Rimuru sedang menyiapkan
┃ akses masuk F02 💕
╰━━━━━━━━⬣
`

    await m.reply(text1)

    // delay 20 detik
    await sleep(20000)

    const text2 = `
╭━━〔 🚪 MASUK F02 〕━━⬣
┃
┃ Kalau darling sudah
┃ memenuhi semua syarat
┃
┃ Yuk langsung masuk
┃ ke grup F02 😋
┃
┃ Tekan tombol di bawah ya~
╰━━━━━━━━⬣
`

    await sock.sendMessage(m.chat, {
        text: text2,
        footer: "FAMOUS RIMURU",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🚀 Masuk Grup F02",
                    url: "https://chat.whatsapp.com/I9wzkvn0Fyr9Lz0i8dlHOJ?mode=gi_t"
                })
            }
        ]
    }, { quoted: m })

}

export { pluginConfig as config, handler };
