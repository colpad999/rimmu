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
import FormData from 'form-data';

const pluginConfig = {
    name: 'nanopro',
    category: 'ai',
    description: 'Edit gambar dengan Nano Banana Pro dari source CANTARELLA',
    usage: '.nanobananapro <prompt> (reply gambar)',
    example: '.nanobananapro ubah jadi sketsa pensil',
    isOwner: false,
    isPremium: true,
    isGroup: false,
    isPrivate: false,
    cooldown: 30,
    energi: 2,
    isEnabled: true,
};

async function handler(m, { sock, text }) {
    if (!text?.trim()) return m.reply(`❌ Masukkan prompt. Contoh: ${m.prefix}nanobananapro ubah jadi sketsa pensil`);

    const q = m.quoted;
    const mime = q?.mimetype || q?.msg?.mimetype || '';
    if (!q || !/^image\//i.test(mime)) {
        return m.reply(`❌ Reply gambar dengan caption ${m.prefix}nanobananapro <prompt>`);
    }

    await m.react('⏳');
    let tempPath = null;
    try {
        const buffer = await q.download();
        if (!buffer?.length) throw new Error('Gagal mengunduh gambar');

        const form = new FormData();
        form.append('files[]', buffer, { filename: 'input.jpg', contentType: mime || 'image/jpeg' });
        const upload = await axios.post('https://uguu.se/upload.php', form, {
            headers: form.getHeaders(),
            timeout: 30000,
        });
        const imageUrl = upload.data?.files?.[0]?.url;
        if (!imageUrl) throw new Error('Upload gambar gagal');

        const apiUrl = `https://api-faa.my.id/faa/nano-banana?url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(text.trim())}`;
        const result = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 120000,
        });

        await sock.sendMessage(m.chat, {
            image: Buffer.from(result.data),
            caption: `✅ *NANO BANANA PRO*\n\n📝 Prompt: ${text.trim()}`,
        }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        await m.react('❌').catch(() => {});
        return m.reply(`❌ Nano Banana Pro gagal: ${error?.response?.status ? `HTTP ${error.response.status}` : (error?.message || 'unknown error')}`);
    } finally {
        if (tempPath) {
            // Kept intentionally empty: current uploader uses memory buffer only.
        }
    }
}

export { pluginConfig as config, handler };
