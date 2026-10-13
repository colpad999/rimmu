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

import fs from 'fs';
import path from 'path';
import config from '../../config.js';
const pluginConfig = {
    name: 'owneronly',
    category: 'owner',
    description: 'Atur mode hanya owner yang bisa pakai bot (owner utama + owner tambahan + creator)',
    usage: '.onlyowner on/off',
    example: '.onlyowner on',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock, db }) {
    const args = m.args || []
    const mode = args[0]?.toLowerCase()
    
    if (!mode || (mode !== 'on' && mode !== 'off')) {
        return m.reply(
`╭───〔 𝗭𝗘𝗥𝗢 𝗧𝗪𝗢 𝗢𝗡𝗟𝗬𝗢𝗪𝗡𝗘𝗥 〕───⬣
│
│ ✦ *Cara Pakai*
│
│  𖦹 .onlyowner on  = Aktifkan mode owner only
│  𖦹 .onlyowner off = Matikan mode owner only
│
│ ✦ *Fungsi*
│
│  𖦹 Saat aktif, HANYA owner utama,
│  𖦹 owner tambahan, dan creator
│  𖦹 yang bisa menggunakan bot
│
│ ✦ *Contoh*
│
│  𖦹 .onlyowner on
│
╰──────────────────⬣`
        )
    }
    
    const isEnabled = mode === 'on'
    
    // Simpan ke database (global setting)
    db.setting('onlyOwnerMode', isEnabled)
    await db.save()
    
    const status = isEnabled ? '🟢 *AKTIF*' : '🔴 *NONAKTIF*'
    const pesan = isEnabled 
        ? `> Hanya *OWNER UTAMA, OWNER TAMBAHAN & CREATOR* yang bisa menggunakan bot sekarang!`
        : `> Semua *USER* bisa menggunakan bot sekarang!`
    
    m.reply(
`╭───〔 𝗭𝗘𝗥𝗢 𝗧𝗪𝗢 𝗢𝗡𝗟𝗬𝗢𝗪𝗡𝗘𝗥 〕───⬣
│
│ ✦ *Status Mode*
│
│  ${status}
│
│ ${pesan}
│
│ ✦ *Diubah oleh*
│  @${m.sender.split('@')[0]}
│
╰──────────────────⬣`,
        { mentions: [m.sender] }
    )
}

export { pluginConfig as config, handler };
