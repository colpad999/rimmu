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
 * CR Ponta Sensei
 * CH https://whatsapp.com/channel/0029VagslooA89MdSX0d1X1z
 * WEB https://codeteam.my.id
**/

import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const ALL_CATEGORIES = [
  'afr','alb','ara','arm','aze','bas','bel','ben','bos','bre','bul','cat','chi','cro','cze','dan','dut','eng','est','fin','fre',
  'fri','gal','geo','ger','gre','hau','haw','heb','hun','ice','igb','ind','ins','iri','ita','jap','kaz','khm','kor','lat','lim',
  'lth','mac','mly','mao','ame','nep','nor','per','pol','por','rmn','rus','sco','ser','slk','sln','spa','swa','swe','tha','tur',
  'ukr','urd','vie','wel','yor','zul','myth','celm','egym','grem','neam','scam','romm','anci','enga','cela','gmca','grea','scaa',
  'roma','litk','bibl','indm','hist','lite','popu','theo','whim','fairy','goth','hb','hippy','kk','rap','trans','witch','wrest',
  'fntsy','fntsg','fntsm','fntso','fntsr','fntss','fntst','fntsx'
]

async function generateRandomName({
  gender = 'both',
  number = 2,
  surnameType = 'none', // none | random | custom
  customSurname = '',
  usage = []
} = {}) {
  const BASE_URL = 'https://www.behindthename.com/random/random.php'
  const params = new URLSearchParams({
    gender,
    number: number.toString(),
    sets: '1',
    showextra: 'yes',
    norare: 'yes',
    nodiminutives: 'yes',
    all: usage.length === 0 ? 'yes' : ''
  })
  if (surnameType === 'random') {
    params.set('randomsurname', 'yes')
  } else if (surnameType === 'custom' && customSurname) {
    params.set('surname', customSurname)
  }
  if (usage.length > 0) {
    usage.forEach(cat => {
      if (ALL_CATEGORIES.includes(cat)) {
        params.append(`usage_${cat}`, '1')
      }
    })
  }
  const url = `${BASE_URL}?${params.toString()}`
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  const html = await res.text()
  const $ = cheerio.load(html)
  const names = $('.random-results a').map((i, el) => $(el).text().trim()).get()
  return names
}

const pluginConfig = {
  name: "randomname",
  category: "random",
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

async function handler(m, { text }) {
  if (!text) return m.reply('Format: randomname gender|kata|surname(optional)|kategori(optional)\nContoh: randomname cowok|3|random|eng,spa')

  let [genderRaw, kataRaw, surnameRaw, kategoriRaw] = text.split('|').map(v => v?.trim() || '')
  let gender = 'both'
  if (genderRaw) {
    if (['cowok', 'm', 'male'].includes(genderRaw.toLowerCase())) gender = 'm'
    else if (['cewek', 'f', 'female'].includes(genderRaw.toLowerCase())) gender = 'f'
    else gender = 'both'
  }
  let number = parseInt(kataRaw)
  if (isNaN(number) || number < 1 || number > 4) number = 2

  let surnameType = 'none'
  let customSurname = ''
  if (surnameRaw) {
    if (surnameRaw.toLowerCase() === 'random') surnameType = 'random'
    else if (surnameRaw !== '') {
      surnameType = 'custom'
      customSurname = surnameRaw
    }
  }

  let usage = []
  if (kategoriRaw) {
    usage = kategoriRaw.toLowerCase().split(',').map(k => k.trim()).filter(k => ALL_CATEGORIES.includes(k))
  }

  m.reply('Sedang mencari nama random, tunggu sebentar ya Senpai...')

  try {
    let names = await generateRandomName({
      gender,
      number,
      surnameType,
      customSurname,
      usage
    })
    if (!names.length) return m.reply('Gagal mendapatkan nama random, coba lagi ya Senpai.')

    let namaJadi = names.join(' ')

    let teks = `*Random Name Generator*\n`
    teks += `• Gender: ${gender === 'm' ? 'Cowok' : gender === 'f' ? 'Cewek' : 'Bebas'}\n`
    teks += `• Jumlah Kata: ${number}\n`
    teks += `• Surname: ${surnameType === 'random' ? 'Random' : (customSurname ? customSurname : 'Tidak ada')}\n`
    teks += `• Kategori: ${usage.length ? usage.join(', ') : 'Semua'}\n\n`
    teks += `*${namaJadi}*`

    m.reply(teks)
  } catch {
    m.reply('Terjadi kesalahan saat mengambil nama random, coba lagi nanti ya Senpai.')
  }
}

handler.register = true

/**
 * CR Ponta Sensei
 * CH https://whatsapp.com/channel/0029VagslooA89MdSX0d1X1z
 * WEB https://codeteam.my.id
**/

export { pluginConfig as config, handler };
