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
import * as cheerio from 'cheerio'
const client = axios.create({
  withCredentials: true,
  headers: {
    origin: "https://unrestrictedaiimagegenerator.com",
    referer: "https://unrestrictedaiimagegenerator.com/",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Mobile Safari/537.36",
  },
});

async function unrestrictedai(prompt, style = "anime") {
  const styles = [
    "photorealistic",
    "digital-art",
    "impressionist",
    "anime",
    "fantasy",
    "sci-fi",
    "vintage",
  ];

  if (!prompt) throw new Error("Prompt is required");
  if (!styles.includes(style))
    throw new Error(`Available styles: ${styles.join(", ")}`);

  const { data: html, headers } = await client.get(
    "https://unrestrictedaiimagegenerator.com/"
  );

  const cookies = headers["set-cookie"]?.join("; ");
  if (cookies) client.defaults.headers.Cookie = cookies;

  const $ = cheerio.load(html);
  const nonce = $('input[name="_wpnonce"]').val();
  if (!nonce) throw new Error("Nonce not found");

  const form = new URLSearchParams({
    generate_image: "true",
    image_description: prompt,
    image_style: style,
    _wpnonce: nonce,
  });

  const { data: resultHtml } = await client.post(
    "https://unrestrictedaiimagegenerator.com/",
    form.toString(),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  const $$ = cheerio.load(resultHtml);
  const img = $$("img#resultImage").attr("src");

  if (!img) throw new Error("Image not found");

  return img;
}

export default unrestrictedai