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

import config from "../../config.js"
import { getDatabase } from "../../src/lib/rimuru-database.js"
import { getAssetBuffer } from "../../src/lib/rimuru-asset-manager.js"

const pluginConfig = {
    name: "botrules",
    category: "main",
    description: "Menampilkan rules dan aturan penggunaan bot secara lengkap",
    usage: ".rules",
    example: ".rules",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true,
}

function buildDefaultRules(botName, prefix) {
    return `📜 *PERATURAN ${botName.toUpperCase()}*

Hai! Sebelum kamu menggunakan semua fitur yang tersedia, pastikan kamu memahami dan mematuhi peraturan berikut ini ya. Peraturan ini dibuat supaya semua pengguna bisa nyaman dan bot bisa berjalan dengan lancar.

🔹 *ATURAN UMUM*

- Dilarang keras melakukan *spam command* secara berulang-ulang dalam waktu singkat. Sistem anti-spam aktif dan pelanggar bisa langsung dibanned otomatis oleh bot.
- Gunakan semua fitur bot dengan *bijak dan bertanggung jawab*. Jangan menyalahgunakan fitur untuk hal-hal yang merugikan orang lain.
- Dilarang menggunakan bot untuk menyebarkan *konten SARA, ujaran kebencian, atau konten ilegal* dalam bentuk apapun.
- *Hormati sesama pengguna* bot. Jangan menggunakan fitur untuk mengganggu, membully, atau merugikan pengguna lain.

🔹 *ATURAN PENGGUNAAN FITUR*

- Setiap penggunaan command membutuhkan *energi*. Gunakan energi kamu dengan bijak supaya tidak cepat habis.
- Fitur *premium* hanya bisa diakses oleh pengguna yang sudah berlangganan. Ketik *${prefix}benefitpremium* untuk info lengkap.
- Jika menemukan *bug atau error*, segera laporkan ke owner bot melalui *${prefix}owner*. Jangan disalahgunakan.
- Dilarang melakukan *request fitur yang tidak masuk akal* atau memaksa owner untuk menambahkan fitur tertentu.

🔹 *KONSEKUENSI PELANGGARAN*

- Pelanggaran ringan akan mendapat *peringatan* dari admin atau owner
- Pelanggaran berat atau berulang dapat mengakibatkan *banned permanen* dari penggunaan bot
- Owner berhak memutuskan sanksi tanpa pemberitahuan terlebih dahulu

_Dengan menggunakan bot ini, kamu dianggap sudah membaca dan menyetujui seluruh peraturan di atas._`
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const botName = config.bot?.name || "Rimuru-AI"
    const customRules = db.setting("botRules")

    let rulesText
    if (customRules && typeof customRules === "string" && customRules.trim().length > 0) {
        rulesText = customRules
    } else if (Array.isArray(customRules) && customRules.length > 0) {
        rulesText = `📜 *PERATURAN ${botName.toUpperCase()}*\n\n`
        customRules.forEach((rule, i) => {
            rulesText += `${i + 1}. ${rule}\n`
        })
    } else {
        rulesText = buildDefaultRules(botName, m.prefix)
    }

    const imageUrl = config.assets?.["rimuru-rules"]

    if (imageUrl) {
        await sock.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: rulesText,
        }, { quoted: m })
    } else {
        await m.reply(rulesText)
    }
}

export { pluginConfig as config, handler }