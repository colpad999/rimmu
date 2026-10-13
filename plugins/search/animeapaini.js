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
import FormData from "form-data";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
    name: "animeapaini",
    category: "search",
    description: "Identifikasi judul anime dari gambar/screenshot",
    usage: ".animeapaini (reply gambar)",
    example: ".animeapaini",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 15,
    energi: 1,
    isEnabled: true,
};

async function handler(m, { sock }) {
    const isImage = m.isImage || (m.quoted && m.quoted.type === "imageMessage");

    if (!isImage) {
        let help = `🔍 *ANIME APA INI?*\n\n`
        help += `Fitur cerdas untuk mengetahui judul anime hanya dari sebuah screenshot atau potongan gambar!\n\n`
        help += `*Cara Penggunaan:*\n`
        help += `- Kirim gambar adegan anime dengan caption *${m.prefix}animeapaini*\n`
        help += `- Atau balas (reply) gambar adegan anime dengan perintah *${m.prefix}animeapaini*\n\n`
        help += `⚠️ *Catatan:* Video tidak didukung, hanya gambar/screenshot saja ya!`
        return m.reply(help);
    }

    await m.react("🕕");

    try {
        let buffer;
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download();
        } else if (m.isMedia) {
            buffer = await m.download();
        }

        if (!buffer) {
            await m.react("❌");
            return m.reply(`Maaf, sistem gagal mengunduh gambar yang kamu berikan. Silakan coba kirim ulang gambarnya!`);
        }

        const form = new FormData();
        form.append("image", buffer, { filename: "image.jpg", contentType: "image/jpeg" });

        const response = await axios.post("https://my.izuka-api.xyz/api/anime/anime-checker", form, {
            headers: form.getHeaders(),
            timeout: 60000
        });

        const data = response.data;
        if (!data || !data.status || !data.result || !data.result.full_matches) {
            await m.react("❌");
            return m.reply(`Maaf, judul anime tidak ditemukan. Coba dengan screenshot adegan yang lebih jelas atau karakter yang lebih spesifik.`);
        }

        await m.react("✅");

        const resObj = data.result;
        const match = resObj.full_matches[0];

        const similarityRaw = resObj.similarity ? parseFloat(resObj.similarity) : (match.similarity * 100);
        const similarity = isNaN(similarityRaw) ? resObj.similarity : similarityRaw.toFixed(2);

        let txt = `🔍 *ANIME DITEMUKAN!*\n\n`;
        txt += `🎬 *Judul Romaji:* ${resObj.title_romaji || match.anilist.title.romaji}\n`;
        txt += `🇯🇵 *Judul Asli:* ${resObj.title_native || match.anilist.title.native}\n`;
        txt += `📺 *Episode:* ${resObj.episode || match.episode}\n`;
        txt += `📊 *Kemiripan:* ${similarity}%\n`;
        txt += `🔞 *Dewasa (18+):* ${resObj.is_adult ? 'Ya' : 'Tidak'}\n\n`;
        txt += `🔗 *Detail Anilist:*\n${match.anilist.siteUrl || `https://anilist.co/anime/${match.anilist.id}`}`;

        if (resObj.image_preview || match.image) {
            await sock.sendMessage(m.chat, { image: { url: resObj.image_preview || match.image }, caption: txt }, { quoted: m });
        } else {
            await m.reply(txt);
        }

    } catch (error) {
        console.error("[ANIMECHECKER Plugin Error]", error);
        await m.react("☢");
        m.reply(te(m.prefix, m.command, m.pushName));
    }
}

export { pluginConfig as config, handler };