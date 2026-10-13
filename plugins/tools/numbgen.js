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


/*
 Fitur : Luban SMS ( Virtual Number Free)
 Type : Plugins ESM 
 Source : https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
 Source Scrape : https://whatsapp.com/channel/0029Vb5EZCjIiRotHCI1213L/390
 */
import axios from 'axios'

const pluginConfig = {
  name: "numbgen",
  category: "tools",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock, text, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  let [negara, nomor] = text.split('|').map(v => v?.trim())

  if (!text) {
    return m.reply(`Contoh:\n${usedPrefix + command} russia\n${usedPrefix + command} russia|79654138229`)
  }

  const headers = {
    'user-agent': 'NB Android/1.0.0',
    'accept-encoding': 'gzip',
    system: 'Android',
    time: `${Date.now()}`,
    type: '2'
  }

  const atom = (text) => {
    const map = {
      minute: 1, minutes: 1,
      hour: 60, hours: 60,
      day: 1440, days: 1440,
      week: 10080, weeks: 10080
    }
    const [val, unit] = text.split(' ')
    return parseInt(val) * (map[unit] || 999999)
  }

  if (negara && !nomor) {
    try {
      const res = await axios.get(`https://lubansms.com/v2/api/freeCountries?language=en`, { headers })
      const country = res.data?.msg?.find(c => c.name.toLowerCase() === negara.toLowerCase())

      if (!country) throw `Negara ${negara} tidak ditemukan`
      if (!country.online) throw `Negara ${negara} sedang offline`

      const result = await axios.get(`https://lubansms.com/v2/api/freeNumbers?countries=${negara}`, { headers })
      const list = result.data?.msg?.filter(n => !n.is_archive) || []

      if (!list.length) throw `Gagal ambil nomor`

      const sorted = list.sort((a, b) => atom(a.data_humans) - atom(b.data_humans))
      const top = sorted.slice(0, 5)

      let rows = top.map(n => ({
        title: n.full_number,
        description: n.data_humans,
        id: `${usedPrefix + command} ${negara}|${n.full_number}`
      }))

      await conn.sendMessage(m.chat, {
        text: `LUBAN NUMBERS\nNegara: ${negara.toUpperCase()}\nTotal: ${list.length}`,

        footer: 'Ryo Yamada MD',

        nativeFlow: [
          {
            text: 'Pilih Nomor',
            sections: [
              {
                title: 'Daftar Nomor',
                rows
              }
            ]
          }
        ]

      }, { quoted: m })

    } catch (e) {
      m.reply(typeof e === 'string' ? e : 'Gagal ambil nomor')
    }
  }

  if (negara && nomor) {
    try {
      nomor = nomor.replace(/\D/g, '')
      const url = `https://lubansms.com/v2/api/freeMessage?countries=${negara}&number=${nomor}`
      const { data } = await axios.get(url, { headers })

      if (data.code !== 0 || !Array.isArray(data.msg)) throw 'Belum ada pesan'

      const pesan = data.msg
        .map(m => `Dari: ${m.in_number || '-'}\nTeks: ${m.text}\n${m.data_humans}`)
        .join('\n\n')

      m.reply(`Pesan untuk ${nomor} (${negara.toUpperCase()})\n\n${pesan}`)
    } catch (e) {
      m.reply(typeof e === 'string' ? e : 'Gagal cek pesan')
    }
  }
}

export { pluginConfig as config, handler };
