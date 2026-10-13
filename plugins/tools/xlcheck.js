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

import axios from "axios"
import te from "../../src/lib/rimuru-error.js"

const pluginConfig = {
    name: "xlcheck",
    category: "tools",
    description: "Cek informasi paket dan kuota nomor XL/Axis secara detail",
    usage: ".cekxl <nomor>",
    example: ".cekxl 083150850721",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

function cleanNumber(phoneNumber) {
    let num = phoneNumber.replace(/\D/g, "")
    if (num.startsWith("0")) num = "62" + num.substring(1)
    if (!num.startsWith("62")) num = "62" + num
    return num
}

function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return "0 B"
    const units = ["B", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + units[i]
}

async function handler(m, { sock }) {
    const input = m.args[0] || m.text?.trim()

    if (!input) {
        return m.reply(
            `📱 *CEK XL/AXIS*\n\n` +
            `Fitur ini digunakan untuk mengecek informasi paket dan kuota yang tersedia pada nomor XL atau Axis kamu secara lengkap dan detail\n\n` +
            `*Cara pakai:*\n` +
            `> \`${m.prefix}cekxl <nomor hp>\`\n\n` +
            `*Contoh:*\n` +
            `> \`${m.prefix}cekxl 083150850721\`\n` +
            `> \`${m.prefix}cekxl 6281234567890\`\n\n` +
            `_Format nomor bisa pakai 08xx, 628xx, atau tanpa awalan_`
        )
    }

    const cleanNum = cleanNumber(input)

    if (cleanNum.length < 10 || cleanNum.length > 15) {
        return m.reply(`❌ Nomor yang kamu masukkan tidak valid, pastikan nomor tersebut merupakan nomor XL atau Axis yang benar ya`)
    }

    m.react("🕕")

    try {
        const { data } = await axios.get(
            `https://xl-ku.my.id/end.php?check=package&number=${cleanNum}&version=2`,
            { timeout: 30000 }
        )

        if (!data || data.error || data.status === false) {
            m.react("❌")
            return m.reply(`❌ Tidak bisa mengecek nomor *${cleanNum}*, pastikan nomor tersebut merupakan nomor XL atau Axis yang aktif`)
        }

        let txt = `📱 *INFORMASI XL/AXIS*\n\n`
        txt += `📞 Nomor: *${cleanNum}*\n`

        if (data.msisdn) txt += `🆔 MSISDN: *${data.msisdn}*\n`
        if (data.status) txt += `📊 Status: *${data.status}*\n`
        if (data.activeDate) txt += `📅 Aktif Sejak: *${data.activeDate}*\n`
        if (data.expireDate) txt += `⏰ Masa Aktif: *${data.expireDate}*\n`
        if (data.graceDate) txt += `⚠️ Masa Tenggang: *${data.graceDate}*\n`

        if (data.packages && Array.isArray(data.packages) && data.packages.length > 0) {
            txt += `\n📦 *DAFTAR PAKET AKTIF*\n\n`
            for (const pkg of data.packages) {
                txt += `- *${pkg.name || pkg.packageName || "Paket"}*\n`
                if (pkg.quota || pkg.remainingQuota) txt += `  > Sisa Kuota: *${pkg.remainingQuota || pkg.quota}*\n`
                if (pkg.totalQuota) txt += `  > Total Kuota: *${pkg.totalQuota}*\n`
                if (pkg.expireDate || pkg.validUntil) txt += `  > Berlaku Sampai: *${pkg.expireDate || pkg.validUntil}*\n`
                if (pkg.type) txt += `  > Tipe: *${pkg.type}*\n`
                txt += `\n`
            }
        }

        if (data.balance || data.pulsa) {
            txt += `💰 *SALDO*\n`
            txt += `> Pulsa: *${data.balance || data.pulsa}*\n\n`
        }

        if (data.result && typeof data.result === "object") {
            const r = data.result
            if (r.name) txt += `👤 Nama Paket: *${r.name}*\n`
            if (r.quota) txt += `📊 Kuota: *${r.quota}*\n`
            if (r.masa_aktif) txt += `📅 Masa Aktif: *${r.masa_aktif}*\n`
            if (r.status) txt += `📊 Status: *${r.status}*\n`
        }

        if (typeof data === "object" && !data.packages && !data.result) {
            const skipKeys = ["error", "status", "msisdn", "activeDate", "expireDate", "graceDate", "balance", "pulsa"]
            const extraKeys = Object.keys(data).filter(k => !skipKeys.includes(k))
            if (extraKeys.length > 0) {
                txt += `\n📋 *DETAIL LAINNYA*\n\n`
                for (const key of extraKeys) {
                    const val = data[key]
                    if (typeof val === "string" || typeof val === "number") {
                        txt += `- ${key}: *${val}*\n`
                    }
                }
            }
        }

        m.react("✅")
        await m.reply(txt.trim())

    } catch (error) {
        m.react("☢")
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
