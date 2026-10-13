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


// Search kode pos 
// source Scrape https://whatsapp.com/channel/0029Vb6vl1tJkK71pFdFso0y/123

class KodePosScraper {
  constructor() {
    this.baseUrl = 'https://kodepos.co.id/data'
    this.endpoints = {
      provinsi: '/provinsi.json',
      kota: '/kota.json',
      kecamatan: '/kecamatan.json',
      kelurahan: '/kelurahan.json'
    }
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      if (!response.ok) throw new Error()
      return await response.json()
    } catch {
      return []
    }
  }

  async search(query) {
    if (!query || typeof query !== 'string' || query.length < 3) {
      return { message: 'Query minimal 3 karakter', data: [] }
    }

    const keyword = query.toLowerCase()

    const [provinsiData, kotaData, kecamatanData, kelurahanData] = await Promise.all([
      this.fetchData(this.endpoints.provinsi),
      this.fetchData(this.endpoints.kota),
      this.fetchData(this.endpoints.kecamatan),
      this.fetchData(this.endpoints.kelurahan)
    ])

    const matches = kelurahanData.filter(item =>
      item.nama.toLowerCase().includes(keyword) ||
      item.kode_pos.toString().includes(keyword) ||
      item.kecamatan_nama.toLowerCase().includes(keyword) ||
      item.kota_nama.toLowerCase().includes(keyword) ||
      item.provinsi_nama.toLowerCase().includes(keyword)
    )

    if (matches.length === 0) {
      return { message: 'Data tidak ditemukan', data: [] }
    }

    const formatted = matches.map(kel => {
      const kec = kecamatanData.find(k => k.nama === kel.kecamatan_nama && k.kota_nama === kel.kota_nama)
      const kot = kotaData.find(c => c.nama === kel.kota_nama && c.provinsi_nama === kel.provinsi_nama)
      const prov = provinsiData.find(p => p.nama === kel.provinsi_nama)

      return {
        kodePos: kel.kode_pos,
        kelurahan: {
          nama: kel.nama,
          kemendagri: kel.kode_kemendagri,
          lat: kel.lat,
          lng: kel.lng,
          elevasi: kel.elevasi
        },
        kecamatan: kec ? {
          nama: kec.nama,
          kemendagri: kec.kode_kemendagri,
          zona: kec.zona_waktu
        } : null,
        kota: kot ? {
          nama: kot.nama,
          kemendagri: kot.kode_kemendagri,
          lat: kot.lat,
          lng: kot.lng
        } : null,
        provinsi: prov ? {
          nama: prov.nama,
          kemendagri: prov.kode_kemendagri,
          zona: prov.zona_waktu
        } : null
      }
    })

    return {
      total: formatted.length,
      query: query,
      results: formatted
    }
  }
}

const scraper = new KodePosScraper()

const pluginConfig = {
  name: "kodepos",
  category: "search",
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

async function handler(m, { sock, text }) {
    const conn = sock;
  if (!text) {
    return conn.reply(
      m.chat,
      'Masukkan query pencarian.\nContoh: .kodepos Jakarta Barat',
      m,
      { quoted: global.fkontak }
    )
  }

  await conn.reply(m.chat, 'Mencari data kode pos...', m, { quoted: global.fkontak })

  const hasil = await scraper.search(text)

  if (hasil.data?.length === 0 || hasil.results?.length === 0) {
    return conn.reply(m.chat, 'Data tidak ditemukan.', m, { quoted: global.fkontak })
  }

  let teks = `Hasil pencarian: ${hasil.query}\nTotal: ${hasil.total}\n\n`

  hasil.results.slice(0, 10).forEach((r, i) => {
    teks += `${i + 1}. Kode Pos: ${r.kodePos}\n`
    teks += `Kelurahan: ${r.kelurahan.nama}\n`
    teks += `Kecamatan: ${r.kecamatan?.nama || '-'}\n`
    teks += `Kota: ${r.kota?.nama || '-'}\n`
    teks += `Provinsi: ${r.provinsi?.nama || '-'}\n\n`
  })

  await conn.reply(m.chat, teks.trim(), m, { quoted: global.fkontak })
}

export { pluginConfig as config, handler };
