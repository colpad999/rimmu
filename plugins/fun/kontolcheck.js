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

const pluginConfig = {
    name: 'kontolcheck',
    category: 'fun',
    description: 'Cek ukuran random (bercanda doang)',
    usage: '.cekkontol <nama>',
    example: '.cekkontol Budi',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const nama = m.text?.trim() || m.pushName || 'Kamu'
    const ukuran = Math.floor(Math.random() * 30) + 1

    const bentukList = [
        'lurus sempurna 😎',
        'belok ke kiri dikit 😏',
        'condong ke kanan tipis 🤏',
        'melengkung elegan 😅',
        'unik bentuknya 🤭',
        'kayak tanda tanya ❓',
        'zigzag dikit 🗿',
        'aerodinamis 🏎️'
    ]

    const roastList = [
        'kecil amat njir 🗿',
        'itu apaan? lidi? 😭',
        'ilang kah? gak keliatan 😭',
        'versi mini banget 🤏',
        'hemat tempat 👍',
        'travel size 😭',
        'kayak bonus doang 😅',
        'fitur tambahan aja ya? 🗿'
    ]

    const pujianList = [
        'waduh bahaya ini 🔥',
        'auto bikin pingsan 😳',
        'level dewa 😎',
        'gak masuk akal 🗿',
        'overpower banget 💀',
        'ini sih senjata 😭'
    ]

    const bentuk = bentukList[Math.floor(Math.random() * bentukList.length)]

    // 🔥 EMOJI BAR
    const panjangBar = Math.max(1, Math.floor(ukuran / 2))
    const bar = '🍆' + '═'.repeat(panjangBar) + '💦'

    let komentar = ''
    if (ukuran <= 7) {
        komentar = roastList[Math.floor(Math.random() * roastList.length)]
    } else if (ukuran >= 20) {
        komentar = pujianList[Math.floor(Math.random() * pujianList.length)]
    } else {
        komentar = 'standar manusia bumi 👍'
    }

    let txt = `📏 *CEK KONTOL*\n\n`
    txt += `> 👤 Nama: *${nama}*\n`
    txt += `> 📊 Ukuran: *${ukuran} cm*\n`
    txt += `> 📐 Bentuk: *${bentuk}*\n`
    txt += `> ${bar}\n\n`
    txt += `> 💬 ${komentar}`

    await m.reply(txt)
}
export { pluginConfig as config, handler };