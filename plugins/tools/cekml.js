//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


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

    const data = await res.json()
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
