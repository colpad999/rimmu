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


import axios from 'axios';

async function ipLookup(query) {
    try {
        const response = await axios.get(`https://whoisjson.com/api/v1/whois?domain=${query}`, {
            headers: {
                'Authorization': 'Token=557187f3affef2235eb0ed83a407200a08450e81deb4adead2b278af003754ca' // Ganti dengan token Anda jika perlu
            }
        });

        // Ambil data dari respons
        const data = response.data;

        // Format hasil yang lebih rapi
        let result = '*Hasil Pencarian Domain:*\n\n';

        // Iterasi semua properti dari data dan tambahkan ke hasil
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                result += `*${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value.join(', ')}\n`;
            } else {
                result += `*${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value || 'N/A'}\n`;
            }
        }

        return result;
    } catch (error) {
        console.log(error);
        return 'Error: ' + error.message;
    }
}

const handler = async (m, { command, text }) => {
    if (!text) {
        return m.reply('Silakan masukkan domain yang ingin dicari.');
    }

    const result = await ipLookup(text);
    m.reply(result);
};

handler.help = ['iplookup <domain>'];
handler.tags = ["internet"]
handler.command = /^(iplookup)$/i;
handler.limit = false;

export default handler;
