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
import moment from 'moment-timezone';

const handler = async (m, { conn }) => {
    try {
        const Abcd = await waktu();
        let pesan = "*🌍 World Time Information*\n\n";

        const Bell = Abcd.sort((a, b) => {
            const zonaA = moment.tz(a.kota, 'UTC').utcOffset();
            const zonaB = moment.tz(b.kota, 'UTC').utcOffset();
            return zonaA - zonaB;
        });

        Bell.forEach(kota => {
            pesan += `${kota.bndera} *${kota.kota}*: ${kota.waktu}\n`;
        });

        await m.reply(pesan);
    } catch (error) {
        console.error("Kesalahan dalam mengambil waktu dunia:", error);
        await m.reply("Maaf, tidak dapat mengambil informasi waktu saat ini.");
    }
};

async function waktu() {
    const Abella = 'https://onlinealarmkur.com/world/id/';
    try {
        const { data } = await axios.get(Abella);
        const $ = cheerio.load(data);
        let hasil = [];
        
        $('.flex.items-center.space-x-3').each((index, element) => {
            const bndera = $(element).find('.avatar .text-2xl').text().trim();
            const kota = $(element).find('.city-name').text().trim();
            const Zona = $(element).find('.city-time').attr('data-tz');
            
            if (Zona) {
                const Yatta = {
    'Sun': 'Min',
    'Mon': 'Sen',
    'Tue': 'Sel',
    'Wed': 'Rab',
    'Thu': 'Kam',
    'Fri': 'Jum',
    'Sat': 'Sab'
};

const realTime = moment().tz(Zona).format('ddd - HH:mm').replace(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/g, match => Yatta[match]);
                hasil.push({ bndera, kota, waktu: realTime });
            }
        });
        
        return hasil;
    } catch (error) {
        console.error("Error :", error);
        return [];
    }
}

handler.help = ['worldtime', 'waktuglobal'];
handler.command = ['worldtime', 'waktuglobal'];
handler.tags  = ['internet'];

export default handler;
