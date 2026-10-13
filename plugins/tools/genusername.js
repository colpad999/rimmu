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

import axios from 'axios'

const pluginConfig = {
  name: "genusername",
  category: "tools",
  description: "Generate pilihan username keren berdasarkan nama, mode, & tema",
  usage: ".usernamegen <nama> | [theme] | [mode]",
  cooldown: 5,
  isEnabled: true,
}

async function handler(m, extra) {
  const fullText = (m.text || m.body || "").trim()
  
  // Ambil teks setelah nama command
  const argsText = fullText.replace(/^[\/.!#]?(usernamegen|genuser|username|genusername)\s*/i, "").trim()

  if (!argsText) {
    let guide = `✨ *USERNAME GENERATOR*\n\n`
    guide += `📌 *Cara Pakai:*\n`
    guide += `• \`.genuser <nama> | <theme> | <mode>\`\n\n`
    guide += `🎮 *Pilihan Theme:* \n`
    guide += `\`action\`, \`adventure\`, \`fantasy\`, \`historical\`, \`horror\`, \`mythology\`, \`nature\`, \`sci-fi\`, \`strategy\`\n\n`
    guide += `⚙️ *Pilihan Mode:*\n`
    guide += `\`instans\` (Default), \`ai\`\n\n`
    guide += `💡 *Contoh:* \`.genuser geto | mythology | instans\``
    return m.reply(guide)
  }

  // Split berdasarkan pipa (|)
  const parts = argsText.split("|").map(v => v.trim()).filter(Boolean)

  const name = parts[0] || "geto"
  const theme = (parts[1] || "action").toLowerCase()
  const mode = (parts[2] || "instans").toLowerCase()

  try {
    const targetUrl = `https://api.nexray.eu.cc/tools/usernamegen`

    const res = await axios.get(targetUrl, {
      params: {
        name: name,
        mode: mode,
        theme: theme
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 10000
    })

    const data = res?.data

    if (!data) {
      return m.reply("❌ *Gagal mendapatkan respons dari API NexRay!*")
    }

    // Ekstrak Array Username
    let usernames = []
    if (Array.isArray(data?.result?.result)) {
      usernames = data.result.result
    } else if (Array.isArray(data?.result)) {
      usernames = data.result
    } else if (Array.isArray(data?.usernames)) {
      usernames = data.usernames
    }

    if (usernames.length === 0) {
      return m.reply("❌ *Gagal memproses daftar username dari server!*")
    }

    let resultText = `✨ *USERNAME GENERATOR RESULT (100 Teratas)*\n\n`
    resultText += `👤 *Nama Base:* ${name}\n`
    resultText += `🎨 *Theme:* ${theme}\n`
    resultText += `⚙️ *Mode:* ${mode}\n`
    resultText += `───────────────────\n\n`

    // Tampilkan 100 username teratas
    const limitList = usernames.slice(0, 100)
    limitList.forEach((username, idx) => {
      resultText += `${idx + 1}. \`${username}\`\n`
    })

    if (usernames.length > 100) {
      resultText += `\n_...dan ${usernames.length - 100} pilihan username lainnya!_`
    }

    resultText += `\n\n💡 *Tips:* Tap/salin username yang kamu suka!`

    return m.reply(resultText)

  } catch (error) {
    console.error("[UsernameGen Error]:", error?.message)
    const errDetail = error?.response?.data?.message || error?.message || "Server Error"
    return m.reply(`❌ *Terjadi Kesalahan:* ${errDetail}`)
  }
}

async function before(m) {
  return true
}

export { pluginConfig as config, handler, before }
