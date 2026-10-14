//

import { getAssetBuffer } from "../../src/lib/yalena-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "sc",
    category: "main",
    description: "Link script bot wa terbaru",
    usage: ".sc",
    example: ".sc",
    isPremium: false,
    isOwner: false,
    isBanned: false,
    isAdmin: false,
    cooldown: 10,
    energi: 0,
    isBotAdmin: false,
    isEnabled: true
}

async function handler(m, { sock }) {
    return await sock.sendMessage(m.chat, {
        image: { url: config.assets?.["yalena"] },
        caption: `🌾 Halo kak *${m.pushName}*
        
Untuk asli dari bot ini, kamu bisa dapatkan melalui link, nanti kamu tinggal cari kata kunci *Yalena MD*`,
        footer: "💬 Link ini nanti akan mengarahkan kamu ke Youtube *Zanspiw*",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🥐 Kunjungi Youtube Zanspiw",
                    url: "https://youtube.com/@JanpiwWok",
                    merchant_url: "https://youtube.com/@JanpiwWok"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }