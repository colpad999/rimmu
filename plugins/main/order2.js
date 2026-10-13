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


const orders = {
'3': { name: '3 Day Premium', price: 'Rp. 3.000' },
'7': { name: '7 Day Premium', price: 'Rp. 10.000' },
'30': { name: '30 Day Premium', price: 'Rp. 15.000' },
'60': { name: '60 Day Premium', price: 'Rp. 30.000' },
'90': { name: '90 Day Premium', price: 'Rp. 40.000' },
'365': { name: '365 Day Premium', price: 'Rp. 115.000' },
'G7': { name: '7 Day Join Group', price: 'Rp. 2.000' },
'G30': { name: '30 Day Join Group', price: 'Rp. 5.000' },
'G365': { name: '365 Day Join Group', price: 'Rp. 80.000' }
}

let handler = async (m, { sock, text }) => {
if (!text) {
  return m.reply(
    `🌷 *PREMIUM & SEWA BOT*\n\n` +
    `❏ 3 → 3 Day Premium — Rp. 3.000\n` +
    `❏ 7 → 7 Day Premium — Rp. 10.000\n` +
    `❏ 30 → 30 Day Premium — Rp. 15.000\n` +
    `❏ 60 → 60 Day Premium — Rp. 30.000\n` +
    `❏ 90 → 90 Day Premium — Rp. 40.000\n` +
    `❏ 365 → 365 Day Premium — Rp. 115.000\n\n` +
    `❏ G7 → 7 Day Join Group — Rp. 2.000\n` +
    `❏ G30 → 30 Day Join Group — Rp. 5.000\n` +
    `❏ G365 → 365 Day Join Group — Rp. 80.000\n\n` +
    `Cara order: .sewa2 <kode>\n` +
    `Contoh: .sewa2 30`
  )
}

let code = text.trim().toUpperCase()

if (!orders[code]) {
return m.reply('🌷 Kode paket tidak ditemukan.\n\n❏ Ketik .sewa2 untuk melihat daftar paket.')
}

let paket = orders[code]

let orderMsg = `🌷 Pesanan Baru

❏ Nama : ${m.pushName}
❏ Paket : ${paket.name}
❏ Harga : ${paket.price}
❏ Waktu : ${new Date().toLocaleString('id-ID')}

✨ 𝗠𝗘𝗚𝗔𝗠𝗜 𝗠𝗗 𝗠𝗨𝗟𝗧𝗜 𝗗𝗘𝗩𝗜𝗖𝗘`

await m.reply(`🌷 Pesanan Berhasil Dibuat

❏ Paket : ${paket.name}
❏ Harga : ${paket.price}

❏ Pesanan telah dikirim ke Owner.
❏ Silakan tunggu konfirmasi ya.

✨ Terima kasih telah memesan.`)

let owner = Array.isArray(global.owner)
? global.owner[0]
: global.owner

owner = owner.toString().replace(/[^0-9]/g, '')

await sock.sendMessage(owner + '@s.whatsapp.net', {
text: orderMsg
})
}
const pluginConfig = {
  name: 'sewa2',
  category: 'main',
  description: 'Varian paket sewa/premium dari Tensura.',
  usage: '.sewa2 <kode>',
  example: '.sewa2 <kode>',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

export { pluginConfig as config, handler };
