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

const pluginConfig = {
    name: 'sholawatnabi',
    category: 'religi',
    description: 'Kumpulan Sholawat Nabi lengkap dengan Arab, Latin, Arti, dan Keutamaan',
    usage: '.sholawat <nama sholawat>',
    example: '.sholawat nariyah',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    isEnabled: true,
};

// Database Sholawat
const SHOLAWAT_DATABASE = {
    'nariyah': {
        arab: 'اَللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ',
        latin: 'Allahumma shalli shalatan kamilatan wa sallim salaman tammam \'ala sayyidina muhammad',
        arti: 'Ya Allah, limpahkanlah sholawat yang sempurna dan salam yang sempurna kepada junjungan kami Muhammad',
        keutamaan: 'Dibaca 100x setiap hari, dijaga dari fitnah dan musibah',
        sumber: 'Habib Umar bin Hafidz'
    },
    'badar': {
        arab: 'صَلَّى اللهُ عَلَى النَّبِيِّ الْأُمِّيِّ الْهَاشِمِيِّ',
        latin: 'Shallallahu \'alan nabiyyil ummiyyil hasyimiyy',
        arti: 'Semoga Allah melimpahkan sholawat kepada Nabi yang ummi, yang berasal dari Bani Hasyim',
        keutamaan: 'Dibaca setelah sholat, mendapat syafaat Nabi SAW',
        sumber: 'Ulama Nusantara'
    },
    'munjiyat': {
        arab: 'اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَآلِهِ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ',
        latin: 'Allahumma shalli \'ala sayyidina muhammad wa alihi shalatan tunjina biha min jami\'il ahwal',
        arti: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Muhammad dan keluarganya, yang menyelamatkan kami dari segala ketakutan',
        keutamaan: 'Dibaca saat menghadapi kesulitan, diijabah oleh Allah',
        sumber: 'Habib Ali bin Muhammad Al-Habsyi'
    },
    'tibbilqulub': {
        arab: 'اَللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ صَلَاةً تُطَهِّرُ الْقُلُوبَ',
        latin: 'Allahumma shalli wa sallim wa barik \'ala sayyidina muhammad wa \'ala alihi shalatan tuthahhirul qulub',
        arti: 'Ya Allah, limpahkanlah sholawat, salam, dan berkah kepada junjungan kami Muhammad, sholawat yang membersihkan hati',
        keutamaan: 'Menyucikan hati dari penyakit hati (dengki, iri, sombong)',
        sumber: 'Habib Umar bin Hafidz'
    },
    'adzkiya': {
        arab: 'اَللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ صَلَوَاتٍ وَسَلَامًا',
        latin: 'Allahumma shalli wa sallim wa barik \'ala sayyidina muhammad wa \'ala alihi shalawatan wa salaman',
        arti: 'Ya Allah, limpahkanlah sholawat, salam, dan berkah kepada junjungan kami Muhammad dan keluarganya dengan sholawat dan salam',
        keutamaan: 'Mempercepat terkabulnya doa',
        sumber: 'Habib Umar bin Hafidz'
    },
    'fatih': {
        arab: 'اَللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ',
        latin: 'Allahumma shalli wa sallim wa barik \'ala sayyidina muhammadil fatihi lima ughliq',
        arti: 'Ya Allah, limpahkanlah sholawat dan salam kepada junjungan kami Muhammad, yang membuka apa yang tertutup',
        keutamaan: 'Dibaca untuk membuka pintu rezeki dan kemudahan',
        sumber: 'Syekh Ahmad At-Tijani'
    }
};

async function handler(m, { sock, args, text, prefix }) {
    const p = prefix || '.';
    const query = text?.replace(new RegExp(`^\\${p}sholawat\\s*`, 'i'), '').trim();

    if (!query) {
        let list = '🤲 *SHOLAWAT NABI*\n\n';
        list += `Cara pakai: ${p}sholawat <nama sholawat>\n`;
        list += `Contoh: ${p}sholawat nariyah\n\n`;
        list += '📋 Daftar Sholawat:\n';
        const keys = Object.keys(SHOLAWAT_DATABASE);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            list += `${i+1}. ${key.charAt(0).toUpperCase() + key.slice(1)}\n`;
        }
        list += `\n💗 ZERO TWO AI • ${new Date().getFullYear()}`;
        return m.reply(list);
    }

    const sholawatKey = query.toLowerCase();
    let sholawat = SHOLAWAT_DATABASE[sholawatKey];

    if (!sholawat) {
        const match = Object.keys(SHOLAWAT_DATABASE).find(key => key.includes(sholawatKey));
        if (match) {
            sholawat = SHOLAWAT_DATABASE[match];
            const foundKey = match;
            const displayKey = foundKey.charAt(0).toUpperCase() + foundKey.slice(1);
            let caption = `🤲 *SHOLAWAT ${displayKey.toUpperCase()}*\n\n`;
            caption += `📜 Arab:\n${sholawat.arab}\n\n`;
            caption += `🔤 Latin:\n${sholawat.latin}\n\n`;
            caption += `💡 Artinya:\n${sholawat.arti}\n\n`;
            caption += `✨ Keutamaan:\n${sholawat.keutamaan}\n\n`;
            caption += `📚 Sumber: ${sholawat.sumber}\n`;
            caption += `\n💗 ZERO TWO AI • ${new Date().getFullYear()}`;
            return m.reply(caption);
        }
        return m.reply(`❌ Sholawat "${query}" tidak ditemukan.\n\n📋 Ketik ${p}sholawat untuk melihat daftar.`);
    }

    const displayKey = sholawatKey.charAt(0).toUpperCase() + sholawatKey.slice(1);
    let caption = `🤲 *SHOLAWAT ${displayKey.toUpperCase()}*\n\n`;
    caption += `📜 Arab:\n${sholawat.arab}\n\n`;
    caption += `🔤 Latin:\n${sholawat.latin}\n\n`;
    caption += `💡 Artinya:\n${sholawat.arti}\n\n`;
    caption += `✨ Keutamaan:\n${sholawat.keutamaan}\n\n`;
    caption += `📚 Sumber: ${sholawat.sumber}\n`;
    caption += `\n💗 ZERO TWO AI • ${new Date().getFullYear()}`;

    await m.reply(caption);
    await m.react('🤲');
}


export { pluginConfig as config, handler };