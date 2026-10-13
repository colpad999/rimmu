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

import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'doneconfig',
    category: 'store',
    description: 'Set template untuk .done',
    usage: '.setdone template <full text>',
    example: '.setdone template 「 *TRANSAKSI BERHASIL* 」\\n\\n⌚️ JAM : {jam}',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const defaultTemplate = `「 *TRANSAKSI BERHASIL* 」

⌚️ JAM     : {jam}
✨ STATUS  : Berhasil
*📝 Pesanan:*
{pesanan}

*📝 Note :*
{note}

Terimakasih @{buyer_number}, Next Order ya🙏`

async function handler(m, { sock }) {
    const db = getDatabase()
    const text = m.text?.trim() || ''
    const args = text.split(' ')
    const option = args[0]?.toLowerCase()
    
    const current = db.setting('doneTemplate') || {}
    
    if (!option) {
        let info = `⚙️ *sᴇᴛ ᴅᴏɴᴇ ᴛᴇᴍᴘʟᴀᴛᴇ*\n\n`
        info += `╭┈┈⬡「 📋 *ᴄᴜʀʀᴇɴᴛ sᴇᴛᴛɪɴɢs* 」\n`
        info += `┃ ▧ Template: ${current.template ? '✅ Custom' : '❌ Default'}\n`
        info += `╰┈┈┈┈┈┈┈┈⬡\n\n`
        info += `*ᴜsᴀɢᴇ:*\n\n`
        info += `1️⃣ *Set Template:*\n`
        info += `\`${m.prefix}setdone template <text>\`\n\n`
        info += `2️⃣ *Contoh:*\n`
        info += `\`\`\`\n${m.prefix}setdone template 「 *TRANSAKSI BERHASIL* 」\n\n⌚️ JAM : {jam}\n✨ STATUS : Berhasil\n📝 Pesanan: {pesanan}\n📝 Note: {note}\n\nTerimakasih @{buyer_number}!\n\`\`\`\n\n`
        info += `*ᴘʟᴀᴄᴇʜᴏʟᴅᴇʀs:*\n`
        info += `> {buyer} = Nama buyer\n`
        info += `> {buyer_number} = Nomor buyer\n`
        info += `> {jam} / {time} = Jam (HH.MM.SS)\n`
        info += `> {date} = Tanggal (DD-MM-YYYY)\n`
        info += `> {pesanan} / {title} / {produk} = Pesanan\n`
        info += `> {note} = Catatan\n\n`
        info += `3️⃣ *Reset ke Default:*\n`
        info += `\`${m.prefix}setdone reset\`\n\n`
        info += `4️⃣ *Preview Template:*\n`
        info += `\`${m.prefix}setdone preview\``
        
        return m.reply(info)
    }
    
    if (option === 'reset') {
        db.setting('doneTemplate', {})
        await db.save()
        return m.reply(`✅ Template .done direset ke default!`)
    }
    
    if (option === 'preview') {
        const template = current.template || defaultTemplate
        
        const now = new Date()
        const jam = `${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}.${now.getSeconds().toString().padStart(2, '0')}`
        const tanggal = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
        
        const previewText = template
            .replace(/{buyer}/gi, 'Zann')
            .replace(/{buyer_number}/gi, '628123456789')
            .replace(/{jam}/gi, jam)
            .replace(/{time}/gi, jam)
            .replace(/{date}/gi, tanggal)
            .replace(/{pesanan}/gi, 'Canva Pro 1 Bulan')
            .replace(/{title}/gi, 'Canva Pro 1 Bulan')
            .replace(/{produk}/gi, 'Canva Pro 1 Bulan')
            .replace(/{note}/gi, 'Akun dikirim via chat')
        
        return m.reply(`📋 *ᴘʀᴇᴠɪᴇᴡ ᴛᴇᴍᴘʟᴀᴛᴇ:*\n\n${previewText}`)
    }
    
    if (option === 'template') {
        const templateText = m.fullArgs.slice(9).trim()
        
        if (!templateText) {
            return m.reply(`❌ Template tidak boleh kosong!\n\n> Gunakan \`${m.prefix}setdone\` untuk melihat contoh`)
        }
        
        current.template = templateText
        db.setting('doneTemplate', current)
        await db.save()
        
        return m.reply(`✅ *ᴛᴇᴍᴘʟᴀᴛᴇ ᴅɪsɪᴍᴘᴀɴ!*\n\n> Gunakan \`${m.prefix}setdone preview\` untuk melihat hasil`)
    }
    
    return m.reply(`❌ Option tidak valid!\n\n> Gunakan: \`template\`, \`preview\`, atau \`reset\``)
}

export { pluginConfig as config, handler };
