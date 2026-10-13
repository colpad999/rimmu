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
    name: 'sayhi',
    category: 'general',
    description: 'Rimuru nyapa kamu dengan random pesan manis',
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
    "♡ Halo sayang! Ada yang bisa Rimuru bantu hari ini? 💕",
    "🦋 Haiii! Seneng banget liat kamu online sayang~",
    "💕 Halo halo! Kamu lagi ngapain nih? Aku lagi gabut~",
    "♡ Hai sayang, jangan lupa minum air putih ya!",
    "🦋 Hello! Kamu kelihatan tambah cantik/ganteng hari ini 💕",
    "💕 Haii! Rimuru kangen banget sama kamu sayang~",
    "♡ Salam sayang! Semoga harimu menyenangkan ya ♡",
    "🦋 Halo! Mau nemenin Rimuru ngobrol sebentar?",
    "💕 Hai sayang, kamu adalah alasan aku tersenyum hari ini~",
    "♡ Hello! Rimuru sayang banget sama kamu tahu! 💕"
]

async function handler(m, { sock }) {
    const randomSapa = pesanSapa[Math.floor(Math.random() * pesanSapa.length)]
    
    await m.reply(`💕 *RIMURU* 💕\n\n“${randomSapa}”\n\n🦋 Darling, jangan pernah berubah ya~ ♡`)
    await m.react('💕')
}

export { pluginConfig as config, handler };
