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


//Open AI 
// Sumber scrape : https://whatsapp.com/channel/0029Vaf07jKCBtxAsekFFk3i/3924
import axios from 'axios'
import * as cheerio from 'cheerio'
import FormData from 'form-data'

const pluginConfig = {
  name: "openai",
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

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) throw `Contoh: *${usedPrefix + command} apa itu AI?*`

  const message = text
  const prompt = `Kamu adalah AI pintar dan ramah. Jawab setiap pertanyaan dengan jelas, padat, dan sopan.`
  const tanggapan = `Hai! Saya adalah AI yang siap menjawab pertanyaanmu dengan informasi akurat dan mudah dipahami.`

  const htmlRes = await axios.get('https://chatopenai.id', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36'
    }
  })
  const $ = cheerio.load(htmlRes.data)
  const scriptContent = $('#wpaicg-init-js-extra').html()
  const match = scriptContent?.match(/"search_nonce":"([a-z0-9]+)"/i)
  const wpnonce = match?.[1]
  if (!wpnonce) throw 'Gagal mengambil token dari halaman.'

  const form = new FormData()
  form.append('_wpnonce', wpnonce)
  form.append('post_id', '2')
  form.append('url', 'https://chatopenai.id')
  form.append('action', 'wpaicg_chat_shortcode_message')
  form.append('message', message)
  form.append('bot_id', '0')
  form.append('chatbot_identity', 'shortcode')
  form.append('wpaicg_chat_client_id', '6MizuOGxCL')
  form.append('wpaicg_chat_history', JSON.stringify([
    `Human: ${prompt}`,
    `AI: ${tanggapan}`,
    `Human: ${message}`
  ]))

  const headers = {
    ...form.getHeaders(),
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://chatopenai.id/',
  }

  const res = await axios.post('https://chatopenai.id/wp-admin/admin-ajax.php', form, { headers })
  const jawab = res?.data?.data?.trim()

  if (!jawab) throw 'Gagal mendapatkan balasan dari AI.'

  m.reply(jawab)
}

export { pluginConfig as config, handler };
