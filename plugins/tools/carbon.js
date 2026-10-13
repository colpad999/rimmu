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

import mql from "@microlink/mql"
import te from "../../src/lib/rimuru-error.js"

const pluginConfig = {
    name: "carbon",
    category: "tools",
    description: "Membuat gambar kode dengan tampilan carbon style",
    usage: ".carbon <kode>",
    example: '.carbon console.log("Hello World")',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

const THEMES = [
    "dracula-pro", "monokai", "nord", "solarized-dark", "solarized-light",
    "one-dark", "material", "panda-syntax", "night-owl", "cobalt2"
]

const FONTS = [
    "Fira Code", "JetBrains Mono", "Hack", "Source Code Pro", "Inconsolata",
    "Droid Sans Mono", "Anonymous Pro"
]

function buildCarbonUrl(config) {
    const theme = THEMES.includes(config.theme) ? config.theme : "dracula-pro"
    const font = FONTS.includes(config.font) ? config.font : "Fira Code"

    const params = new URLSearchParams({
        bg: config.background,
        t: theme,
        wt: "none",
        l: config.language || "auto",
        ds: "false",
        dsyoff: "20px",
        dsblur: "68px",
        wc: "true",
        wa: "true",
        pv: "56px",
        ph: "56px",
        ln: config.lineNumbers ? "true" : "false",
        fl: "1",
        fm: font,
        fs: config.fontSize || "14px",
        lh: "152%",
        si: "false",
        es: "2x",
        wm: "false"
    })

    params.append("code", config.code)
    return `https://carbon.now.sh/?${params.toString()}`
}

async function handler(m, { sock }) {
    const text = m.text || m.quoted?.text

    if (!text) {
        return m.reply(
            `🖥️ *CARBON CODE*\n\n` +
            `Fitur ini mengubah teks kode program kamu menjadi gambar cantik ala Carbon\n\n` +
            `*Cara pakai:*\n` +
            `> \`${m.prefix}carbon <kode>\`\n` +
            `> Atau kamu bisa reply pesan yang berisi kode\n\n` +
            `*Contoh:*\n` +
            `> \`${m.prefix}carbon console.log("Halo")\``
        )
    }

    await m.react("🕕")

    try {
        const config = {
            code: text,
            language: "auto",
            theme: "dracula-pro",
            font: "Fira Code",
            fontSize: "14px",
            background: "rgba(226,233,239,1)",
            lineNumbers: true,
            width: 1024,
            height: 768,
            waitFor: 3000
        }

        const targetUrl = buildCarbonUrl(config)

        const res = await mql(targetUrl, {
            screenshot: {
                element: ".export-container",
                optimizeForSpeed: true
            },
            viewport: {
                width: config.width,
                height: config.height
            },
            waitFor: config.waitFor,
            meta: false
        })

        const imageUrl = res.data?.screenshot?.url || null

        if (!imageUrl) throw new Error("Gagal generate carbon gambar")

        await sock.sendMedia(m.chat, imageUrl, null, m, {
            type: "image"
        })

    } catch (err) {
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }