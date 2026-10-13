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

import axios from 'axios';
import * as cheerio from 'cheerio';

async function searchAddons(name) {
  const { data } = await axios.get(`https://mmcreviews.com/?s=${name}&id=1274&post_type=post`);
  const $ = cheerio.load(data);
  const modpacks = [];

  $('.post').each((i, element) => {
    const title = $(element).find('.entry-title a').text().trim();
    const link = $(element).find('.entry-title a').attr('href');
    const description = $(element).find('.ast-excerpt-container p').text().trim();
    const rating = $(element).find('.glsr-summary-rating .glsr-tag-value').text().trim();
    const tags = [];
    $(element).find('.taxonomy-tag a').each((_, tag) => {
      tags.push($(tag).text().trim());
    });

    modpacks.push({ title, link, description, rating, tags });
  });

  return modpacks;
}

async function detailAddons(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const image = $('figure img').attr('src');
  const title = $('h1').text().trim();
  const subtitle = $('h4').text().trim();
  const gameplay = $('.stk-block-text__text').text().trim();

  return { image, title, subtitle, gameplay };
}

async function getAddonInfo(query) {
  const addons = await searchAddons(query);
  if (!addons.length) return '*❌ Tidak ditemukan addon dengan kata kunci tersebut*';

  const addon = addons[0];
  const details = await detailAddons(addon.link);

  return {
    text: `🛠 *${addon.title}*\n\n📖 *Deskripsi:* ${addon.description}\n⭐ *Rating:* ${addon.rating || 'N/A'}\n🏷 *Tags:* ${addon.tags.join(', ') || 'N/A'}\n\n🎮 *Gameplay:* ${details.gameplay || 'Tidak tersedia'}\n🔗 *Link:* ${addon.link}`,
    image: details.image
  };
}

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('*🔍 Masukkan query untuk mencari addon*');

  const result = await getAddonInfo(text);
  
  if (typeof result === 'string') {
    return m.reply(result);
  }

  return conn.sendMessage(m.chat, { 
    image: { url: result.image },
    caption: result.text 
  });
};

handler.help = ['mcaddon'];
handler.tags = ['search']
handler.command = ['mcaddon'];

export default handler;
