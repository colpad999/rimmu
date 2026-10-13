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
    name: 'cekmuscle',
    category: 'fun',
    description: 'Cek seberapa berotot kamu (random)',
    usage: '.cekotot <nama>',
    example: '.cekotot Budi',
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
    const power = Math.floor(Math.random() * 100) + 1

    const bentukList = [
        'sixpack samar 😎',
        'berisi dan padat 💪',
        'atlet vibes 🏋️',
        'bodybuilder mode 🔥',
        'lean tapi kuat ⚡',
        'dad bod santai 😌',
        'tipis tapi effort 😅',
        'kenceng kayak batu 🗿'
    ]

    const roastList = [
        'ini otot apa bayangan? 😭',
        'tipis banget njir 🗿',
        'angin lewat langsung goyang 😅',
        'push up 1x udah capek 😭',
        'kayak belum unlock fitur 💀'
    ]

    const pujianList = [
        'gila ini sih tank 🔥',
        'sekali pukul KO 😎',
        'body idaman 😭',
        'auto jadi sigma 💪',
        'monster gym 🗿'
    ]

    const bentuk = bentukList[Math.floor(Math.random() * bentukList.length)]

    let komentar = ''
    if (power <= 30) {
        komentar = roastList[Math.floor(Math.random() * roastList.length)]
    } else if (power >= 80) {
        komentar = pujianList[Math.floor(Math.random() * pujianList.length)]
    } else {
        komentar = 'lumayan lah masih progress 👍'
    }

    // 🔥 BAR OTOT
    const bar = '💪' + '═'.repeat(Math.floor(power / 5)) + '🔥'

    let txt = `💪 *CEK OTOT*\n\n`
    txt += `> 👤 Nama: *${nama}*\n`
    txt += `> 📊 Power: *${power}%*\n`
    txt += `> 🏋️ Bentuk: *${bentuk}*\n`
    txt += `> ${bar}\n\n`
    txt += `> 💬 ${komentar}`

    await m.reply(txt)
}
export { pluginConfig as config, handler };