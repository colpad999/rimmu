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
import NodeCache from 'node-cache'
const BASE_URL = 'https://api.myquran.com/v2/sholat';
const cache = new NodeCache({ stdTTL: 86400 });

async function searchKota(query) {
    const key = `kota_${query.toLowerCase()}`;
    const cached = cache.get(key);
    if (cached) return cached;

    const { data } = await axios.get(`${BASE_URL}/kota/cari/${encodeURIComponent(query)}`, { timeout: 10000 });
    if (data?.status && Array.isArray(data.data) && data.data.length > 0) {
        const result = data.data[0];
        cache.set(key, result);
        return result;
    }
    return null;
}

async function fetchAllKota() {
    const cached = cache.get('all_kota');
    if (cached) return cached;

    const { data } = await axios.get(`${BASE_URL}/kota/semua`, { timeout: 15000 });
    if (data?.status && Array.isArray(data.data)) {
        cache.set('all_kota', data.data);
        return data.data;
    }
    throw new Error('Gagal mengambil daftar kota');
}

async function getTodaySchedule(kotaId) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const key = `jadwal_${kotaId}_${year}_${month}_${day}`;
    const cached = cache.get(key);
    if (cached) return cached;

    const { data } = await axios.get(`${BASE_URL}/jadwal/${kotaId}/${year}/${month}/${day}`, { timeout: 10000 });
    if (data?.status && data.data) {
        cache.set(key, data.data);
        return data.data;
    }
    throw new Error('Gagal mengambil jadwal sholat');
}

function extractPrayerTimes(jadwalData) {
    const j = jadwalData.jadwal || jadwalData;
    return {
        imsak: j.imsak || '-',
        subuh: j.subuh || '-',
        terbit: j.terbit || '-',
        dhuha: j.dhuha || '-',
        dzuhur: j.dzuhur || '-',
        ashar: j.ashar || '-',
        maghrib: j.maghrib || '-',
        isya: j.isya || '-'
    };
}

function clearCache() {
    cache.flushAll();
}

export { searchKota, fetchAllKota, getTodaySchedule, extractPrayerTimes, clearCache }