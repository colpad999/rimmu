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

import { RIMURU_CORE_CONFIG } from "../../config.js";
import config from '../../config.js';
const pluginConfig = {
    name: 'tovnsaluran',
    category: 'owner',
    description: 'Upload audio ke saluran (channel) WhatsApp',
    usage: '.upaudioch (reply audio) <teks>',
    example: '.upaudioch Pesan dari owner',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const quoted = m.quoted
    
    if (!quoted) {
        return m.reply(
            `💕 *ᴜᴘʟᴏᴀᴅ ᴀᴜᴅɪᴏ ᴛᴏ ᴄʜᴀɴɴᴇʟ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   Reply audio dengan caption\n` +
            `┃   ${m.prefix}upaudioch <teks>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}upaudioch Info terbaru!\n` +
            `┃\n` +
            `┃ 💗 *Rimuru:* Mau upload audio ke channel apa darling~?\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    const text = m.args.join(' ') || m.text?.trim() || 'Audio dari Owner'
    
    // 🔥 AMBIL ID CHANNEL DARI CONFIG
    const CHANNEL_ID = RIMURU_CORE_CONFIG.saluran?.id
    if (!CHANNEL_ID) {
        return m.reply(
            `❌ *ᴇʀʀᴏʀ*\n\n` +
            `> ID Saluran tidak ditemukan di config!\n` +
            `> Cek bagian \`saluran.id\` di config.js`
        )
    }
    
    const mime = quoted.mimetype || quoted.msg?.mimetype || ''
    
    if (!/audio/.test(mime)) {
        return m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> Reply audio/voice note yang mau diupload darling~ 🥺`)
    }
    
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Rimuru:* Lagi upload audio ke channel darling~ tunggu sebentar yaa 🎵`)
    
    try {
        const audioBuffer = await quoted.download()
        
        if (!audioBuffer) {
            throw new Error('Gagal download audio')
        }
        
        await sock.sendMessage(CHANNEL_ID, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: {
                isForwarded: true,
                mentionedJid: [m.sender],
                businessMessageForwardInfo: {
                    businessOwnerJid: "0@s.whatsapp.net"
                },
                forwardedNewsletterMessageInfo: {
                    newsletterName: `${text}`,
                    newsletterJid: CHANNEL_ID
                }
            }
        })
        
        m.react('✅')
        
        await m.reply(
            `✅ *ᴜᴘʟᴏᴀᴅ sᴜᴄᴄᴇss*\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ 🎵 *ᴀᴜᴅɪᴏ*: Berhasil dikirim\n` +
            `┃ 📢 *ᴄʜᴀɴɴᴇʟ*: ${CHANNEL_ID}\n` +
            `┃ 📝 *ᴘᴇꜱᴀɴ*: ${text}\n` +
            `┃\n` +
            `┃ 💗 *Rimuru:* Audio sudah terkirim darling~ 🎤\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
        
    } catch (err) {
        console.error('[UpAudioCh] Error:', err)
        m.react('💔')
        await m.reply(
            `💔 *ᴇʀʀᴏʀ*\n\n` +
            `> ${err.message}\n\n` +
            `> Coba lagi ya darling~ 🥺`
        )
    }
}

export { pluginConfig as config, handler };
