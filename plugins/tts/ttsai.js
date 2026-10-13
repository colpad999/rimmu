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
import { exec as execCallback } from 'child_process'
import { writeFileSync, unlinkSync, readFileSync } from 'fs'
import { promisify } from 'util'

const exec = promisify(execCallback)

const AvailableVoices = {
  nahida: 'nahida',
  nami: 'nami',
  ana: 'ana',
  optimus: 'optimus_prime',
  goku: 'goku',
  elon: 'elon_musk',
  mickey: 'mickey_mouse',
  kendrick: 'kendrick_lamar',
  eminem: 'eminem'
}

const pluginConfig = {
  name: "ttsvoice",
  category: "tts",
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
  let [model, ...rest] = text.split(" ")
  let message = rest.join(" ")

  if (!model || !message)
    return m.reply(
`🗣️ *Cara pakai:*
${usedPrefix + command} <model> <teks>

📌 *Daftar suara:*
${Object.keys(AvailableVoices).join(", ")}

Contoh:
${usedPrefix + command} nahida halo hilman`
    )

  model = model.toLowerCase()

  if (!AvailableVoices[model])
    return m.reply(
`❌ Model tidak ditemukan!

📌 *List model:* 
${Object.keys(AvailableVoices).join(", ")}`)
  
  await m.reply(`🎤 Membuat suara *${model}* ...`)

  try {
    let api = `https://api-faa.my.id/faa/tts-legkap?text=${encodeURIComponent(message)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json?.result) throw 'Gagal ambil list suara.'

    // FIX: trim & case-insensitive
    let selected = json.result.find(v => 
      String(v.model).trim().toLowerCase() === AvailableVoices[model].toLowerCase()
      && v.url
    )

    if (!selected)
      return m.reply(`❌ Suara *${model}* tidak tersedia.`)

    let audioRes = await fetch(selected.url)
    let wav = Buffer.from(await audioRes.arrayBuffer())

    let input = `./tmp_${model}.wav`
    let output = `./tmp_${model}.opus`

    writeFileSync(input, wav)

    await exec(`ffmpeg -y -i ${input} -c:a libopus -b:a 64k ${output}`)

    let opus = readFileSync(output)

    await conn.sendMessage(m.chat, {
      audio: opus,
      mimetype: 'audio/ogg; codecs=opus',
      ptt: true,
      caption: `🎤 *${selected.voice_name || model}*`
    }, { quoted: m })

    unlinkSync(input)
    unlinkSync(output)

  } catch (e) {
    console.error(e)
    m.reply('❌ Error saat membuat suara TTS.')
  }
}

export { pluginConfig as config, handler };
