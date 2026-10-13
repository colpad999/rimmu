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
    name: 'colongsw',
    category: 'tools',
    description: 'Ambil SW khusus yang mention grup',
    usage: '.colongsw (reply sw mention)',
    example: '.colongsw',
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    if (!m.quoted) {
        return m.reply(
`╭━━〔 💖 RIMURU SW STEALER 〕━━⬣
┃
┃ Ehh darling 😳
┃ reply status yang mention grup dulu yaa~
╰━━━━━━━━━━━━━━━━⬣`)
    }

    try {

        let q = m.quoted

        // 🔥 UNWRAP
        let msg = q.message || {}

        if (msg?.ephemeralMessage) msg = msg.ephemeralMessage.message
        if (msg?.viewOnceMessage) msg = msg.viewOnceMessage.message
        if (msg?.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message

        // 🔥 CONTEXT FIX
        const context =
            msg?.extendedTextMessage?.contextInfo ||
            msg?.imageMessage?.contextInfo ||
            msg?.videoMessage?.contextInfo ||
            {}

        const mentioned = context?.mentionedJid || []

        const isStatus = q.key?.remoteJid === 'status@broadcast'
        const isMentionGroup = mentioned.includes(m.chat)

        if (!isStatus || !isMentionGroup) {
            return m.reply(
`╭━━〔 ❌ RIMURU NOTICE 〕━━⬣
┃
┃ Ihh ini bukan SW yang mention grup 😤
┃ jangan asal colong yaa darling 😳
╰━━━━━━━━━━━━━━━━⬣`)
        }

        m.react('💖')

        const type = Object.keys(msg)[0]

        // ===== IMAGE =====
        if (type === 'imageMessage') {

            const media = await q.download()

            await sock.sendMessage(m.chat, {
                image: media,
                caption:
`╭━━〔 💖 RIMURU RESULT 〕━━⬣
┃
┃ 🖼️ SW berhasil aku ambil 🤭
┃ khusus buat kamu darling 😳
╰━━━━━━━━━━━━━━━━⬣`
            }, { quoted: m })

            return
        }

        // ===== VIDEO =====
        if (type === 'videoMessage') {

            const media = await q.download()

            await sock.sendMessage(m.chat, {
                video: media,
                caption:
`╭━━〔 💖 RIMURU RESULT 〕━━⬣
┃
┃ 🎬 Nih SW nya darling 😋
┃ jangan disebar yaa 🤫
╰━━━━━━━━━━━━━━━━⬣`
            }, { quoted: m })

            return
        }

        // ===== TEXT =====
        const text =
            q.text ||
            msg.conversation ||
            msg.extendedTextMessage?.text ||
            'Tidak ada isi'

        await m.reply(
`╭━━〔 💖 RIMURU TEXT 〕━━⬣
┃
┃ 📄 Isi SW nya nih 😋
┃
┃ "${text}"
┃
┃ Jangan kepo banget yaa 🤭
╰━━━━━━━━━━━━━━━━⬣`)
        
    } catch (e) {

        console.log(e)

        m.reply(
`╭━━〔 ❌ RIMURU ERROR 〕━━⬣
┃
┃ Ihh gagal ambil SW 😭
┃ coba lagi yaa darling 😳
╰━━━━━━━━━━━━━━━━⬣`)
    }
}

export { pluginConfig as config, handler };
