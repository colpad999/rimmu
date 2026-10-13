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
import archiver from 'archiver';
const pluginConfig = {
    name: "ambifolde",
    category: "owner",
    description: "Ambil folder dan kirim sebagai zip",
    usage: ".ambilfolder path/folder",
    example: ".ambilfolder plugins/fun",
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    const folderPath = m.args?.[0]

    if (!folderPath) {
        return m.reply(
`╭━━〔 💖 RIMURU FOLDER GETTER 〕━━⬣
┃
┃ Gunakan:
┃ .ambilfolder path/folder
┃
┃ Contoh:
┃ .ambilfolder plugins/fun
╰━━━━━━━━━━━━━━━━⬣`)
    }

    try {

        const baseDir = process.cwd()
        const fullPath = path.join(baseDir, folderPath)

        if (!fullPath.startsWith(baseDir)) {
            return m.reply("❌ Akses ditolak 🗿")
        }

        if (!fs.existsSync(fullPath)) {
            return m.reply("❌ Folder tidak ditemukan")
        }

        const zipName = `backup_${Date.now()}.zip`
        const zipPath = path.join(baseDir, zipName)

        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })

        output.on('close', async () => {

            await sock.sendMessage(m.chat, {
                document: fs.readFileSync(zipPath),
                mimetype: 'application/zip',
                fileName: zipName
            }, { quoted: m })

            fs.unlinkSync(zipPath) // hapus setelah kirim
        })

        archive.pipe(output)
        archive.directory(fullPath, false)
        archive.finalize()

        m.react("📦")

    } catch (e) {

        console.log(e)

        m.react("❌")

        m.reply(
`╭━━〔 ❌ ERROR 〕━━⬣
┃
┃ ${e.message}
╰━━━━━━━━━━━━━━━━⬣`)
    }
}

export { pluginConfig as config, handler };
