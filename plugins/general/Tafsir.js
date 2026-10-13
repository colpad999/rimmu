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

import axios from "axios";
import * as cheerio from 'cheerio';

async function topik(query) {
    try {
        const { data } = await axios.get(`https://tafsirq.com/topik/${query}`);
        const $ = cheerio.load(data);
        let hasil = $('body > div:nth-child(4) > div > div.col-md-6 > div')
            .map((_, el) => {
                const surah = $(el).find('> div.panel-heading.panel-choco > div > div > a').text().trim();
                const tafsir = $(el).find('> div.panel-body.excerpt').text().trim();
                const type = $(el).find('> div.panel-heading.panel-choco > div > div > span').text().trim();

                if (!surah || !tafsir) return null;

                return { surah, tafsir, type };
            })
            .get();

        if (hasil.length < 5) return [{ status: 404, message: "Topik tidak ditemukan atau terlalu sedikit hasil." }];
        
        hasil = hasil.slice(0, Math.min(hasil.length, 10));

        return hasil;
    } catch (error) {
        return [{ status: 500, message: "Terjadi kesalahan saat mengambil data." }];
    }
}

async function handler(m, { conn, text }) {
    if (!text) return m.reply("Masukkan topik tafsir yang ingin dicari.\n\nContoh: *.tafsir Surga*");

    const results = await topik(text);
    if (results[0]?.status === 404) return m.reply("Topik tidak ditemukan atau hasil terlalu sedikit.");
    if (results[0]?.status === 500) return m.reply("Terjadi kesalahan saat mengambil data.");

    let pesan = `*🔍 Hasil Tafsir untuk Topik: ${text}*\n\n`;
    results.forEach((res, i) => {
        pesan += `*${i + 1}. Surah:* ${res.surah} (${res.type})\n`;
        pesan += `📖 *Tafsir:* ${res.tafsir}\n\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: "https://files.catbox.moe/gket5y.jpg" }, caption: pesan }, { quoted: m });
}

handler.help = ['tafsir'];
handler.tags = ['internet'];
handler.command = ['tafsir'];
handler.limit = false;

export default handler;
