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

import axios from 'axios';
import config from '../../config.js';
const pluginConfig = {
    name: 'cektiktok',
    category: 'stalker',
    description: 'Cek informasi akun TikTok (terdaftar atau manual)',
    usage: '.cektt <username>',
    example: '.cektt faizprst7',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 2,
    isEnabled: true
}

async function handler(m, { args, usedPrefix, sock }) {
    let user = global.db.data.users[m.sender]
    if (!user) return m.reply('❌ Data user tidak ditemukan!')

    // ===== INIT =====
    if (!user.tiktok) {
        user.tiktok = {
            username: null,
            registered: false
        }
    }

    // ===== AMBIL USERNAME =====
    let username = args[0] || user.tiktok.username

    if (!username) {
        return m.reply(`❌ Kamu belum daftar!\n\nGunakan:\n${usedPrefix}daftartt username`)
    }

    // bersihin @ kalau ada
    username = username.replace('@', '').trim()

    try {
        let url = `https://api.deline.web.id/stalker/ttstalk?username=${username}`
        let res = await axios.get(url)

        if (!res.data.status) {
            return m.reply('❌ Gagal mengambil data!')
        }

        let u = res.data.result.user
        let s = res.data.result.stats

        // ===== FORMAT TEXT =====
        let teks = `
╭━━━〔 📱 *INFO AKUN TIKTOK* 〕━━━⬣

┃ 👤 *Username* : @${u.uniqueId}
┃ 📛 *Nama*     : ${u.nickname}
┃ 🌍 *Region*   : ${u.region}
┃ ✔️ *Verified* : ${u.verified ? '✅ Ya' : '❌ Tidak'}
┃ 🔒 *Privasi*  : ${u.privateAccount ? '🔐 Private' : '🌐 Publik'}

┣━━━〔 📊 *STATISTIK* 〕━━━⬣

┃ 👥 *Followers* : ${s.followerCount.toLocaleString()}
┃ ➡️ *Following* : ${s.followingCount.toLocaleString()}
┃ ❤️ *Likes*     : ${s.heartCount.toLocaleString()}
┃ 🎬 *Video*     : ${s.videoCount.toLocaleString()}

┣━━━〔 📝 *BIO* 〕━━━⬣

${u.signature ? u.signature : 'Tidak ada bio'}

╰━━━〔 ⚡ Data TikTok 〕━━━⬣
`

        // ===== KIRIM =====
        await sock.sendMessage(m.chat, {
            image: { url: u.avatarLarger },
            caption: teks
        }, { quoted: m })

    } catch (error) {
        console.error('Cek TikTok Error:', error)
        await m.reply('❌ Terjadi error saat mengambil data!\n\n> ' + error.message)
    }
}

export { pluginConfig as config, handler };
