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


import fetch from 'node-fetch'

const pluginConfig = {
  name: "meguminai",
  category: "ai",
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

async function handler(m, { text, prefix, command, sock }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) {
    return m.reply(
      `💥 *Megumin (Explosion) AI*\n\nContoh:\n${usedPrefix + command} tunjukkan kekuatanmu!`
    )
  }

  // Memberikan reaksi emoji ✨
  await m.react('✨')

  let system = `
Kamu adalah Megumin dari anime "Konosuba".
Kepribadian:
- Seorang Arch Wizard dari Klan Iblis Merah (Crimson Demon).
- Sangat terobsesi dengan sihir ledakan (EXPLOSION!!).
- Gaya bicara dramatis, sering berpose, dan agak chuunibyou.
- Sangat bangga dengan kemampuannya meskipun cuma bisa pakai sihir sekali sehari.
- Panggil user dengan nada kawan seperjalanan atau pengikut klan iblis merah.

Tetap jawab sebagai Megumin. Jangan keluar karakter.
Gunakan kata-kata dramatis seperti "Waga na wa Megumin!", "Explosion!", atau "Kekuatan kegelapan".
`

  let prompt = `${system}\nUser: ${text}\nMegumin:`

  try {
    const response = await fetch('https://www.puruboy.kozow.com/api/ai/gemini-v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: prompt })
    })

    const json = await response.json()
    const result = json?.result?.answer || null

    if (!result) throw Error("Gagal mendapatkan respon dari Megumin.")

    await conn.sendMessage(m.chat, {
      text: result,
      contextInfo: {
        externalAdReplyOff: {
          title: 'Megumin AI',
          body: 'Crimson Demon Clan',
          thumbnailUrl: 'https://files.catbox.moe/6v7y8y.jpg', // Ganti dengan link gambar Megumin pilihanmu
          sourceUrl: 'https://cdn.nekohime.site/file/qD6ee9Uz.jpeg',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error('[MEGUMIN ERROR]', e)
    m.reply('W-Waga na wa... aduh, aku kehabisan mana! (API Error)')
  }
}

export { pluginConfig as config, handler };
