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


import axios from "axios"

async function getGistFiles(input) {
	const match = input.match(/([0-9a-f]{20,40})/i)
	if (!match) throw new Error('ID Gist tidak valid!')
    const apiUrl = `https://api.github.com/gists/${match[1]}`
    try {
    const res = await axios.get(apiUrl, {
        headers: { 'User-Agent': 'wa-bot-gist' }
    })

    const files = res.data.files
    const result = []

    for (const fname of Object.keys(files)) {
        const rawUrl = files[fname].raw_url
        const type = files[fname].type
        const bahasa = files[fname].language
        const isi = files[fname].content
        const size = files[fname].size
        result.push({
            fileName: fname,
            url: rawUrl,
            filesType: type,
            language: bahasa,
            fileSize: size,
            content: isi
        })
    }
    return result
    } catch (e) {
    throw new Error(e.message)
    }
}

const pluginConfig = {
  name: "vgist",
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

async function handler(m, { sock, text }) {
    const conn = sock;
    if (!text) return m.reply(`Contoh:\n.gist https://gist.github.com/user/abc123`)
    await m.reply('⏳ Mengambil isi Gist...')
    try {
        const files = await getGistFiles(text)
        if (!files.length) return m.reply('Tidak ada file di dalam Gist.')
        for (let file of files) {
            let teks = `*GIST GITHUB*\n> *Filename:* ${file.fileName}\n> *Language:* ${file.language}\n> *Size:* ${formatUkuranMedia(file.fileSize)}\n> *Raw:* ${file.url}`
            await conn.sendMessage(
                m.chat,
                {
                    document: { url: file.url },
                    fileName: file.fileName,
                    mimetype: file.filesType,
                    caption: teks
                },
                { quoted: m }
               )
        }
    } catch (err) {
        console.error(err)
        m.reply('❌ Gagal mengambil Gist.' + err.message)
    }
}


function formatUkuranMedia(angka) {
    if (angka >= 1024 * 1024 * 1024) {
      return (angka / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (angka >= 1024 * 1024) {
      return (angka / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (angka >= 1024) {
      return (angka / 1024).toFixed(2) + ' KB';
    } else {
      return angka + ' B';
    }
}

export { pluginConfig as config, handler };
