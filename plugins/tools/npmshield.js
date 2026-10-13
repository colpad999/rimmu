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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


/**
 ╔══════════════════════
      ⧉  [npmshield] — [tools]
╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ Note    : menyediakan quick info berbasis badge, bukan untuk analisis data mendalam atau perhitungan presisi, ditanya berguna engga nya juga kurang tau v:
*/

const pluginConfig = {
  name: "npmshield",
  category: "tools",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, text, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
    try {
        if (!text) {
            return m.reply(`*Contoh:* ${usedPrefix + command} /npm/dw/react`)
        }

        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let path = text.trim()
        if (!path.startsWith('/')) {
            return m.reply(`🍂 *Path tidak valid.*\nGunakan:\n*/npm/dw/react*`)
        }

        const url = `https://img.shields.io${path}?format=json`

        const res = await fetch(url, {
            headers: {
                "user-agent": "Mozilla/5.0",
                "accept": "application/json,image/svg+xml"
            }
        })

        if (!res.ok) {
            return m.reply(`🍂 *Fetch gagal.*\nStatus: *${res.status}*`)
        }

        const type = res.headers.get('content-type') || ''

        if (type.includes('application/json')) {
            const data = await res.json()

            let output = `📦 *Shields.io Badge Info*\n\n`
            output += `🏷️ *Label:* ${data.label || '-'}\n`
            output += `📊 *Value:* ${data.message || '-'}\n`
            output += `🎨 *Color:* ${data.color || '-'}\n`

            if (data.namedLogo) {
                output += `🧩 *Logo:* ${data.namedLogo}\n`
            }

            return m.reply(output)
        }

        const svg = await res.text()

        const texts = [...svg.matchAll(/<text[^>]*>(.*?)<\/text>/g)]
            .map(v => v[1].replace(/&[^;]+;/g, '').trim())
            .filter(Boolean)

        if (texts.length >= 2) {
            let output = `📦 *Shields.io Badge Info (SVG)*\n\n`
            output += `🏷️ *Label:* ${texts[0]}\n`
            output += `📊 *Value:* ${texts[texts.length - 1]}\n`
            output += `🖼️ *Source:* SVG fallback\n`

            return m.reply(output)
        }

        throw new Error('SVG parse failed')
    } catch (e) {
        await m.reply(`🍂 *Gagal memproses badge.*\nEndpoint tidak bisa dibaca.`)
    } finally {
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } })
    }
}

handler.register = false; // true kan jika ada fitur register atau daftar di bot mu.

export { pluginConfig as config, handler };
