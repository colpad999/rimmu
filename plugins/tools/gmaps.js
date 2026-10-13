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


import axios from 'axios'
import * as cheerio from 'cheerio'
import sharp from 'sharp'

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0';

async function jarak(dari, ke) {
    let html = (await axios.get(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`, {
        headers: {
            'User-Agent': userAgent
        }
    })).data;
    let $ = cheerio.load(html);
    let obj = {};

    let img = html.split("var s=\'")?.[1]?.split("\'")?.[0];
    obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split(',')[1], 'base64') : '';
    
    // ngambil waktu jarak
    obj.captions = [];
    $('div.BbbuR.uc9Qxb.uE1RRc').each((index, element) => {
        let caption = $(element).text()?.trim();
        obj.captions.push(caption);
    });

    return obj;
}

const pluginConfig = {
  name: "jarak",
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

const handler = async (m, { conn, text, usedPrefix, command }) => {
    let [dari, ke] = text.split('|');
    if (!dari || !ke) throw `Ex: ${usedPrefix + command} pekalongan|sukabumi`;
    
    if (dari.toLowerCase() === ke.toLowerCase()) {
        conn.reply(m.chat, "hey bung, kau dari kota bodoh mana ?!\nAWOKAWOAKOAK", m);
        return;
    }

    conn.reply(m.chat, "Tunggu sebentar yah, sedang diminta peta nya...", m);

    let result = await jarak(dari, ke);

    if (result.img) {
        let imgBuffer = Buffer.from(result.img, 'base64');
        let resizedImgBuffer = await sharp(imgBuffer).toBuffer();

        conn.sendMessage(m.chat, { image: resizedImgBuffer, caption: result.captions.join('\n') + `\n\nhttps://www.google.com/maps/dir/${encodeURIComponent(dari)}/${encodeURIComponent(ke)}/` }, { quoted: m });
    } else {
        conn.reply(m.chat, result.captions.join('\n') + `\n\nhttps://www.google.com/maps/dir/${encodeURIComponent(dari)}/${encodeURIComponent(ke)}/`, m);
    }
};


handler.register = true

export { pluginConfig as config, handler };
