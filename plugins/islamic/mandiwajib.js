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

const pluginConfig = {
    name: 'mandiwajib',
    category: 'religi',
    description: 'Panduan cara mandi wajib beserta doa',
    usage: '.mandiwajib',
    example: '.mandiwajib',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const text =
`🕌 *PANDUAN MANDI WAJIB*

Hai ${m.pushName || 'Darling'} 🌙

Mandi wajib dilakukan untuk menghilangkan hadas besar sebelum melakukan ibadah yang mensyaratkan keadaan suci.

╭━━〔 📖 *NIAT* 〕━━╮
┃
┃ *Niat mandi wajib:*
┃
┃ "Saya berniat mandi untuk
┃ menghilangkan hadas besar
┃ karena Allah Ta'ala."
┃
╰━━━━━━━━━━━━━━╯

🚿 *CARA MANDI WAJIB*

1️⃣ *Niat*
   Niatkan dalam hati untuk
   menghilangkan hadas besar.

2️⃣ *Mencuci tangan*
   Bersihkan kedua tangan.

3️⃣ *Membersihkan bagian tubuh*
   Bersihkan bagian tubuh yang
   terkena kotoran/najis.

4️⃣ *Berwudu*
   Lakukan wudu seperti wudu
   untuk salat.

5️⃣ *Membasahi kepala*
   Siram kepala hingga air
   mengenai kulit kepala dan
   seluruh rambut.

6️⃣ *Membasahi seluruh tubuh*
   Siram dan ratakan air ke
   seluruh tubuh. Pastikan tidak
   ada bagian tubuh yang terlewat.

7️⃣ *Selesai*
   Setelah seluruh tubuh terkena
   air, mandi wajib telah selesai.

╭━━〔 🤲 *DOA* 〕━━╮
┃
┃ Setelah mandi wajib, tidak ada
┃ doa khusus yang wajib dibaca.
┃
┃ Kamu dapat membaca doa setelah
┃ wudu jika menginginkannya.
┃
╰━━━━━━━━━━━━━━╯

💡 *Catatan:*
Yang paling penting dalam mandi
wajib adalah *niat* dan memastikan
air mengenai seluruh tubuh.

✨ Semoga bermanfaat dan membantu
kamu menjaga kesucian sebelum
beribadah.

> 🕌 ZERO AI • Islamic Guide`

    await m.reply(text)
}

export { pluginConfig as config, handler };
