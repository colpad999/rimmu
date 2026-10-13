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
    name: 'performa',
    category: 'fun',
    description: 'Cek performa secara random (bercanda)',
    usage: '.cekperforma <nama>',
    example: '.cekperforma Budi',
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

    const durasi = Math.floor(Math.random() * 30) + 1 // menit
    const stamina = Math.floor(Math.random() * 100) + 1
    const skill = Math.floor(Math.random() * 100) + 1

    const efekList = [
        'getar dikit 😭',
        'mode santai 😌',
        'agresif 🔥',
        'auto aim 🗿',
        'combo cepat ⚡',
        'delay dikit 😅',
        'full fokus 😎',
        'mode barbar 💀'
    ]

    const roastList = [
        'baru mulai udah selesai 🗿',
        'speedrun any% 😭',
        'kayak iklan doang bentar 😅',
        'loading lama, selesai cepet 🗿',
        'timing nya... ya gitu lah 😭'
    ]

    const pujianList = [
        'tahan lama boss 🔥',
        'pro player 😎',
        'gak ada lawan 💀',
        'legendary performa 😭',
        'full combo tanpa miss 🗿'
    ]

    const efek = efekList[Math.floor(Math.random() * efekList.length)]

    let komentar = ''
    if (durasi <= 5) {
        komentar = roastList[Math.floor(Math.random() * roastList.length)]
    } else if (durasi >= 20) {
        komentar = pujianList[Math.floor(Math.random() * pujianList.length)]
    } else {
        komentar = 'standar aman 👍'
    }

    // 🔥 BAR VISUAL
    const bar = '⚡' + '═'.repeat(Math.floor(durasi / 2)) + '🔥'

    let txt = `⚡ *CEK PERFORMA*\n\n`
    txt += `> 👤 Nama: *${nama}*\n`
    txt += `> ⏱️ Durasi: *${durasi} menit*\n`
    txt += `> 🔋 Stamina: *${stamina}%*\n`
    txt += `> 🎯 Skill: *${skill}%*\n`
    txt += `> 💫 Efek: *${efek}*\n`
    txt += `> ${bar}\n\n`
    txt += `> 💬 ${komentar}`

    await m.reply(txt)
}

export { pluginConfig as config, handler };
