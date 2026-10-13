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
    name: 'kepribadian',
    category: 'cek',
    description: 'Cek kepribadian kamu',
    usage: '.cekkepribadian <nama>',
    example: '.cekkepribadian Budi',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const personalities = [
    { type: 'INTJ', title: 'The Architect', desc: 'Visioner, strategis, dan independen' },
    { type: 'INTP', title: 'The Logician', desc: 'Analitis, inovatif, dan ingin tahu' },
    { type: 'ENTJ', title: 'The Commander', desc: 'Tegas, ambisius, dan pemimpin alami' },
    { type: 'ENTP', title: 'The Debater', desc: 'Cerdas, penasaran, dan suka tantangan' },
    { type: 'INFJ', title: 'The Advocate', desc: 'Idealis, bijaksana, dan penuh empati' },
    { type: 'INFP', title: 'The Mediator', desc: 'Kreatif, idealis, dan setia' },
    { type: 'ENFJ', title: 'The Protagonist', desc: 'Karismatik, inspiratif, dan peduli' },
    { type: 'ENFP', title: 'The Campaigner', desc: 'Antusias, kreatif, dan sosial' },
    { type: 'ISTJ', title: 'The Logistician', desc: 'Bertanggung jawab, praktis, dan teliti' },
    { type: 'ISFJ', title: 'The Defender', desc: 'Setia, suportif, dan reliable' },
    { type: 'ESTJ', title: 'The Executive', desc: 'Terorganisir, tegas, dan tradisional' },
    { type: 'ESFJ', title: 'The Consul', desc: 'Peduli, sosial, dan loyal' },
    { type: 'ISTP', title: 'The Virtuoso', desc: 'Fleksibel, observan, dan praktis' },
    { type: 'ISFP', title: 'The Adventurer', desc: 'Artistik, sensitif, dan spontan' },
    { type: 'ESTP', title: 'The Entrepreneur', desc: 'Energik, perceptive, dan berani' },
    { type: 'ESFP', title: 'The Entertainer', desc: 'Spontan, energik, dan fun' }
]

async function handler(m) {
        const mentioned = m.mentionedJid[0] || m.sender

        const p = personalities[Math.floor(Math.random() * personalities.length)]
    
    let txt = mentioned === m.sender ? `Hai @${mentioned.split('@')[0]}
    
Tingkat kepribadian kamu *${p.type} - ${p.title}*
\`\`\`${p.desc}\`\`\`` : `Kamu ingin ngecek kepribadian @${mentioned.split('@')[0]} yak? 
    
Kepribadian dia adalah *${p.type} - ${p.title}*
\`\`\`${p.desc}\`\`\``
    
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }