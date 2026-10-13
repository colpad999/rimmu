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
    name: 'getppgc',
    category: 'group',
    description: 'Mengambil foto profile group',
    usage: '.getppgc',
    example: '.getppgc',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 3,
    isEnabled: true
}

async function handler(m, { sock, config }) {

    const group = await sock.groupMetadata(m.chat)
    const sender = m.sender

    const admins = group.participants
        .filter(v => v.admin)
        .map(v => v.id)

    const ownerNumbers = config.owner?.number || []

    const isAdmin = admins.includes(sender)
    const isCreator = ownerNumbers.some(num => sender.includes(num))

    if (!isAdmin && !isCreator) {
        return m.reply(`👿 *Ara ara~*

Fitur ini hanya bisa digunakan oleh *Admin Group* atau *Creator Bot* ya darling 💗`)
    }

    await m.reply(`💗 *Siap darling~*
Tunggu sebentar ya...
Aku ambil dulu foto group ini 👀`)

    let pp

    try {
        pp = await sock.profilePictureUrl(m.chat, 'image')
    } catch {
        pp = 'https://cdn.gimita.id/download/pp%20kosong%20wa%20default%20(1)_1769506608569_52b57f5b.jpg'
    }

    const caption = `👿 *GROUP PROFILE DETECTED*

Ara ara~ ini dia foto group kalian darling 📸

Jaga baik-baik group ini ya~
Rimuru selalu mengawasi group ini 👀💗`

    await sock.sendMessage(m.chat, {
        image: { url: pp },
        caption
    }, { quoted: m.raw })
}

export { pluginConfig as config, handler };
