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


import axios from "axios";

async function redNote(url) {
    try {
        const { data } = await axios.get(url);

        const extractMeta = (pattern) => (data.match(pattern) || [])[1]?.trim() || "";

        const noteId = extractMeta(/<meta\s+name="og:url"\s+content="(.*?)"/i).split('/').pop();
        const nickname = extractMeta(/<meta\s+name="og:title"\s+content="(.*?)"/i).split(" - ")[0];
        const title = extractMeta(/<title>(.*?)<\/title>/i);
        const description = extractMeta(/<meta\s+name="description"\s+content="(.*?)"/i);
        const keywords = extractMeta(/<meta\s+name="keywords"\s+content="(.*?)"/i);
        const duration = extractMeta(/<meta\s+name="og:videotime"\s+content="(.*?)"/i);
        const videoUrl = extractMeta(/<meta\s+name="og:video"\s+content="(.*?)"/i);
        const likes = extractMeta(/<meta\s+name="og:xhs:note_like"\s+content="(.*?)"/i);
        const comments = extractMeta(/<meta\s+name="og:xhs:note_comment"\s+content="(.*?)"/i);
        const collects = extractMeta(/<meta\s+name="og:xhs:note_collect"\s+content="(.*?)"/i);

        const images = [...data.matchAll(/<meta\s+name="og:image"\s+content="(.*?)"/gi)].map((match) => match[1]?.trim());

        return {
            metadata: {
                noteId,
                nickname,
                title,
                description,
                keywords,
                duration,
                likes,
                comments,
                collects,
            },
            media: {
                videoUrl,
                images,
            },
        };
    } catch (err) {
        console.error("Failed to fetch data:", err.message);
        return null;
    }
}

let handler = async (m, { text, sock }) => {
    if (!text) return m.reply("Mana Url Nyah!");

    const result = await redNote(text);
    if (!result) return m.reply("Terkadi Kesalahan Pastikan URL valid!");

    let { media } = result;

    await sock.sendMessage(m.chat, {
        sticker: { url: "https://files.catbox.moe/0ksa1n.webp" }
    }, { quoted: m });

    if (media.videoUrl) {
        await sock.sendMessage(m.chat, {
            video: { url: media.videoUrl }
        });
    } else if (media.images.length > 0) {
        for (let img of media.images) {
            await sock.sendMessage(m.chat, {
                image: { url: img }
            });
        }
    } else {
        m.reply("Terjadi Error");
    }
};


export default handler;
const pluginConfig = {
  name: 'xhs',
  category: 'download',
  description: 'Downloader XHS/RedNote untuk video atau gambar.',
  usage: '.xhs <url>',
  example: '.xhs <url>',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

export { pluginConfig as config, handler };
