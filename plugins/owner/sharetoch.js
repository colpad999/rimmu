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
    name: "sharetoch",
    category: "owner",
    description: "Share ke channel tanpa watermark",
    usage: ".sharetoch (reply pesan)",
    example: ".sharetoch",
    isOwner: true,
    cooldown: 3,
    isEnabled: true
}

async function handler(m, { sock }) {
    const quoted = m.quoted
    if (!quoted) return m.reply("Reply pesan yang mau dikirim.")

    const CHANNEL_ID = RIMURU_CORE_CONFIG.saluran?.id
    if (!CHANNEL_ID) {
        return m.reply("❌ ID Saluran tidak ditemukan di config!\n\n> Cek bagian `saluran.id` di config.js")
    }

    m.react("⏳")

    try {
        let msg = quoted.message

        if (msg?.ephemeralMessage) msg = msg.ephemeralMessage.message
        if (msg?.viewOnceMessage) msg = msg.viewOnceMessage.message
        if (msg?.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message

        const type = Object.keys(msg)[0]

        if (type === "conversation" || type === "extendedTextMessage") {
            await sock.sendMessage(CHANNEL_ID, {
                text: quoted.text || msg.conversation
            })
        } else {
            const buffer = await quoted.download()
            if (!buffer) return m.reply("❌ Gagal ambil media")

            let payload = {}

            switch (type) {
                case "imageMessage":
                    payload = {
                        image: buffer,
                        caption: msg.imageMessage?.caption || ""
                    }
                    break

                case "videoMessage":
                    payload = {
                        video: buffer,
                        caption: msg.videoMessage?.caption || ""
                    }
                    break

                case "audioMessage":
                    payload = {
                        audio: buffer,
                        mimetype: "audio/mpeg",
                        ptt: msg.audioMessage?.ptt || false
                    }
                    break

                case "stickerMessage":
                    payload = { sticker: buffer }
                    break

                case "documentMessage":
                    payload = {
                        document: buffer,
                        mimetype: msg.documentMessage?.mimetype || "application/octet-stream",
                        fileName: msg.documentMessage?.fileName || "file"
                    }
                    break

                default:
                    return m.reply("❌ Tipe tidak support")
            }

            await sock.sendMessage(CHANNEL_ID, payload)
        }

        m.react("✅")

    } catch (e) {
        console.log(e)
        m.react("❌")
        m.reply("Error: " + e.message)
    }
}

export { pluginConfig as config, handler };
