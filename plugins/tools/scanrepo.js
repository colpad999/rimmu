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

import axios from "axios"

const pluginConfig = {
  name: "scanrepo",
  category: "tools",
  description: "Scan repository GitHub untuk security risk",
  usage: ".scanrepo <github-url>",
  example: ".scanrepo https://github.com/owner/repo",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 2,
  isEnabled: true,
}

const API_URL = "https://www.scanrepo.dev/api/scan"

function riskEmoji(level) {
  switch (String(level || "").toLowerCase()) {
    case "critical": return "🔴"
    case "high": return "🟠"
    case "medium": return "🟡"
    case "low": return "🟢"
    default: return "⚪"
  }
}

async function handler(m) {
  let url = m.text?.trim()
  if (!url) return m.reply(`🔍 *SCANREPO*\n\nScan repository GitHub untuk security risk.\n\nContoh:\n\`${m.prefix}scanrepo https://github.com/owner/repo\``)
  if (!/^https?:\/\/github\.com\/[^\/]+\/[^\/]+/i.test(url)) {
    if (!url.startsWith("http")) url = `https://${url}`
    if (!/^https?:\/\/github\.com\/[^\/]+\/[^\/]+/i.test(url)) return m.reply("❌ URL GitHub tidak valid.")
  }
  await m.react("🔍")
  try {
    const res = await axios.post(API_URL, { url }, {
      timeout: 120000,
      headers: { "Content-Type": "application/json", Accept: "text/plain", "User-Agent": "Mozilla/5.0" },
      responseType: "text"
    })
    const raw = String(res.data || "")
    let result = null
    for (const line of raw.split(/\r?\n/)) {
      if (!line.trim()) continue
      try {
        const item = JSON.parse(line)
        if (item.type === "result") result = item.data
        if (item.type === "error") throw new Error(item.error || "scan error")
      } catch (e) {
        if (e?.message === "scan error" || /^HTTP|^scan error/.test(e?.message || "")) throw e
      }
    }
    if (!result) {
      try { result = JSON.parse(raw)?.data || JSON.parse(raw) } catch {}
    }
    if (!result) throw new Error("Tidak ada hasil scan")
    const meta = result.meta || {}
    const findings = (result.categories || []).flatMap(c => (c.findings || []).map(f => ({ ...f, category: c.name })))
    let txt = `╔═ 『 🔍 SCANREPO 』\n║ 📦 *${meta.owner && meta.repo ? `${meta.owner}/${meta.repo}` : url}*\n╠══════════════════════════\n║ ${riskEmoji(result.riskLevel)} *Risk Score:* *${Number(result.riskScore || 0).toFixed(0)} / 100*\n║ ├ Level: *${String(result.riskLevel || "UNKNOWN").toUpperCase()}*\n║ └ Files: *${result.filesScanned ?? 0} / ${result.totalRepoFiles ?? 0}*\n╠══════════════════════════`
    if (findings.length) {
      txt += `\n║ ⚠️ *Findings* (${findings.length})`
      for (const f of findings.slice(0, 8)) {
        txt += `\n║ ├ *${f.title || "Finding"}*\n║ │ ├ ${f.file || "?"}${f.line ? `:${f.line}` : ""}\n║ │ └ +${f.points || 0}pts`
      }
    }
    txt += `\n╚══════════════════════════`
    await m.reply(txt)
    await m.react("✅")
  } catch (e) {
    await m.react("❌")
    return m.reply(`❌ ScanRepo gagal: ${e.message}`)
  }
}

export { pluginConfig as config, handler }
