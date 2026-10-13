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
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'ramalanjodoh',
    category: 'primbon',
    description: 'Ramalan jodoh berdasarkan primbon Jawa',
    usage: '.ramalanjodoh nama1 tgl1 bln1 thn1 nama2 tgl2 bln2 thn2',
    example: '.ramalanjodoh putu 16 11 2007 keyla 1 1 2008',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    if (m.args.length < 8) {
        return m.reply(`💑 *ʀᴀᴍᴀʟᴀɴ ᴊᴏᴅᴏʜ*\n\n> Format:\nrama1 tgl1 bln1 thn1 nama2 tgl2 bln2 thn2\n\n\`Contoh:\n${m.prefix}ramalanjodoh putu 16 11 2007 keyla 1 1 2008\``)
    }
    
    const [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = m.args
    
    m.react('💑')
    
    try {
        const url = `https://api.siputzx.my.id/api/primbon/ramalanjodoh?nama1=${encodeURIComponent(nama1)}&tgl1=${tgl1}&bln1=${bln1}&thn1=${thn1}&nama2=${encodeURIComponent(nama2)}&tgl2=${tgl2}&bln2=${bln2}&thn2=${thn2}`
        const { data } = await axios.get(url, { timeout: 30000 })
        
        if (!data?.status || !data?.data?.result) {
            m.react('❌')
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Gagal meramal`)
        }
        
        const r = data.data.result
        let response = `💑 *ʀᴀᴍᴀʟᴀɴ ᴊᴏᴅᴏʜ*\n\n`
        response += `👤 *${r.orang_pertama.nama}*\n> ${r.orang_pertama.tanggal_lahir}\n\n`
        response += `👤 *${r.orang_kedua.nama}*\n> ${r.orang_kedua.tanggal_lahir}\n\n`
        response += `📜 *ʜᴀꜱɪʟ ʀᴀᴍᴀʟᴀɴ:*\n`
        
        r.hasil_ramalan.forEach((h, i) => {
            response += `${i+1}. ${h}\n\n`
        })
        
        response += `> ⚠️ _${data.data.peringatan}_`
        
        m.react('✅')
        await m.reply(response)
        
    } catch (error) {
        m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }