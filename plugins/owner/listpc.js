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

/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    command,
    args
}) => {
    let pc = (Object.entries(await conn.chats).map(([nama, isi]) => {
        return {
            nama,
            ...isi
        }
    })).filter(v => !v.nama.endsWith('g.us'))
    let list = pc.map((chat, index) => `*${index + 1}.* Name: ${chat.name}\nwa.me/${chat.id.split('@')[0]}\n`).join('\n')

    if (!args[0]) {
        m.reply(`📡 Private Chats List:\n\n${list}`)
        return
    }

    let i = parseInt(args[0]) - 1
    if (!pc[i]) {
        return m.reply('Invalid index!')
    }

    let pp = await conn.profilePictureUrl(pc[i].id, 'image')
    let str = `*Information about ${await conn.getName(pc[i].id)}*\n\n`
    str += `*Name:* ${pc[i].name || 'Tidak diketahui'}\n`
    str += `*ID:* @${pc[i].id.replace('@s.whatsapp.net', '')}\n`
    str += `*Presences:* ${pc[i].presences || 'Tidak diketahui'}\n`

    await conn.sendFile(m.chat, pp, 'profile.jpg', str, m, null, {
        mentions: [pc[i].id]
    })
}

handler.help = ['listpc']
handler.tags = ['owner']
handler.command = ['listpc']

export default handler
