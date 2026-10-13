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


import safeJson from "../../src/lib/rimuru-safe-json.js";

let handler = async (m, { args, usedPrefix, command }) => {
  if (args.length < 2) {
    return m.reply(`Example:\n${usedPrefix + command} id zone`)
  }

  const userId = args[0]
  const zoneId = args[1]

  await m.reply('✨ wait..')

  try {
    const url = `https://api.nexray.web.id/stalker/mlbb?id=${encodeURIComponent(userId)}&zone=${encodeURIComponent(zoneId)}`
    const res = await fetch(url)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await safeJson(res)
    if (!data?.status || !data?.result) throw new Error('Data tidak ditemukan')

    const result = data.result
    const teks = `乂 *CEK AKUN MLBB*\n\n👤 *Nickname:* ${result.username || '-'}\n🌍 *Region:* ${result.region || '-'}\n\n🆔 *ID:* ${result.id || userId} (${result.zone || zoneId})`

    return m.reply(teks)
  } catch (e) {
    console.error('[cekml]', e)
    return m.reply('❌ *Gagal mengambil data MLBB.* API sedang bermasalah atau mengembalikan respons yang tidak valid.')
  }
}

handler.help = ['cekml']
handler.tags = ['tools']
handler.command = /^(mlbb|cekml)$/i

export default handler
