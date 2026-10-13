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

import config from '../../config.js';
const pluginConfig = {
    name: 'regtt',
    category: 'stalker',
    description: 'Mendaftarkan username TikTok ke database user',
    usage: '.daftartt <username>',
    example: '.daftartt faizprst7',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

async function handler(m, { args, usedPrefix, sock }) {
    let user = global.db.data.users[m.sender]
    if (!user) return m.reply('❌ Data user tidak ditemukan!')

    // ===== INIT DATA =====
    if (!user.tiktok) {
        user.tiktok = {
            username: null,
            registered: false
        }
    }

    let username = args[0]

    if (!username) {
        return m.reply(`❌ Masukkan username TikTok!\n\nContoh:\n${usedPrefix}daftartt faizprst7`)
    }

    // bersihin @ kalau ada
    username = username.replace('@', '').trim()

    // validasi sederhana
    if (username.length < 2) {
        return m.reply('❌ Username tidak valid!')
    }

    // simpan
    user.tiktok.username = username
    user.tiktok.registered = true

    m.reply(`
✅ *BERHASIL DAFTAR TIKTOK*

👤 Username: @${username}

Sekarang kamu bisa cek akun dengan:
${usedPrefix}cekakuntt
`)
}

export { pluginConfig as config, handler };
