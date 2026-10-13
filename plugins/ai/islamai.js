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

import { f } from '../../src/lib/rimuru-http.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'islamai',
    category: 'ai',
    description: 'AI untuk bertanya tentang Islam dan Al-Quran',
    usage: '.muslimai <pertanyaan>',
    example: '.muslimai Apa itu sholat?',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

class MuslimAI {
    constructor() {
        this.url = "https://www.muslimai.io/api/chat";
        this.headers = { "Content-Type": "application/json" };
    }

    _id() {
        return "019e7d1d-e8a4-702d-96b8-defd87522114";
    }

    _body(q) {
        return JSON.stringify({
            query: q,
            distinctId: this._id()
        });
    }

    _opts(q) {
        return {
            method: "POST",
            headers: this.headers,
            body: this._body(q)
        };
    }

    _parse(res) {
        let txt = "";
        for (const l of res.split("\n")) {
            try {
                const p = JSON.parse(l);
                if (p.type === "text") txt += p.data;
            } catch {}
        }
        return txt || res;
    }

    async chat(q) {
        const req = await fetch(this.url, this._opts(q));
        const res = await req.text();
        return this._parse(res);
    }
}

async function handler(m, { sock }) {
    const text = m.args.join(' ')
    if (!text) {
        return m.reply(`☪️ *ᴍᴜsʟɪᴍ ᴀɪ*\n\n> Masukkan pertanyaan tentang Islam\n\n\`Contoh: ${m.prefix}muslimai Apa itu sholat?\``)
    }

    m.react('🕕')

    try {
        const data = await new MuslimAI().chat(`${text}`)
        let response = `${data}`

        m.react('✅')
        await m.reply(response)

    } catch (error) {
        m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }