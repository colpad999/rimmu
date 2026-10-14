//

const pluginConfig = {
    name: 'greet',
    category: 'general',
    description: 'Yalena nyapa kamu dengan random pesan manis',
    usage: '.sapa',
    example: '.sapa',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 5,
    isEnabled: true
}

const pesanSapa = [
    "♡ Halo sayang! Ada yang bisa Yalena bantu hari ini? 💕",
    "🦋 Haiii! Seneng banget liat kamu online sayang~",
    "💕 Halo halo! Kamu lagi ngapain nih? Aku lagi gabut~",
    "♡ Hai sayang, jangan lupa minum air putih ya!",
    "🦋 Hello! Kamu kelihatan tambah cantik/ganteng hari ini 💕",
    "💕 Haii! Yalena kangen banget sama kamu sayang~",
    "♡ Salam sayang! Semoga harimu menyenangkan ya ♡",
    "🦋 Halo! Mau nemenin Yalena ngobrol sebentar?",
    "💕 Hai sayang, kamu adalah alasan aku tersenyum hari ini~",
    "♡ Hello! Yalena sayang banget sama kamu tahu! 💕"
]

async function handler(m, { sock }) {
    const randomSapa = pesanSapa[Math.floor(Math.random() * pesanSapa.length)]
    
    await m.reply(`💕 *YALENA* 💕\n\n“${randomSapa}”\n\n🦋 Darling, jangan pernah berubah ya~ ♡`)
    await m.react('💕')
}

export { pluginConfig as config, handler };
