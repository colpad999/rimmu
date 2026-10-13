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
    name: 'randomtag',
    category: 'group',
    description: 'Tag member random di group',
    usage: '.randomtag',
    example: '.randomtag',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    const group = await sock.groupMetadata(m.chat)
    const members = group.participants
        .map(v => v.id)
        .filter(v => v !== sock.user.id)

    if (members.length === 0) {
        return m.reply(`Hmm... sepertinya tidak ada member yang bisa aku pilih darling.`)
    }

    const random = members[Math.floor(Math.random() * members.length)]

    const teks = `🎲 *RIMURU RANDOM SELECT*

Ara ara~

Hari ini aku memilih seseorang secara acak di group ini...

✨ Target terpilih adalah...

💗 @${random.split('@')[0]}

Jangan kaget ya darling~
Sepertinya kamu sedang diperhatikan olehku 👀`

    await sock.sendMessage(m.chat, {
        text: teks,
        mentions: [random]
    }, { quoted: m.raw })
}

export { pluginConfig as config, handler };
