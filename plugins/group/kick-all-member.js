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
    name: 'kickall',
    category: 'group',
    description: 'Kick semua member (non-admin)',
    usage: '.kickall member',
    example: '.kickall member',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    cooldown: 10,
    isEnabled: true
}

async function handler(m, { sock }) {

    const args = m.args?.[0]

    if (!args || args !== 'member') {
        return m.reply(
`╭━━〔 ❤️ RIMURU MASS KICK 〕━━⬣
┃
┃ ⚔️ *MODE PEMBERSIHAN*
┃
┃ Gunakan:
┃ • .kickall member
┃
┃ ⚠️ Akan menghapus semua
┃ member non-admin
┃
╰━━━━━━━━━━━━━━━━⬣`
        )
    }

    m.react("⏳")

    try {

        const group = await sock.groupMetadata(m.chat)

        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'

        const members = group.participants.filter(p => 
            !p.admin && p.id !== botNumber
        )

        if (members.length === 0) {
            return m.reply("❌ Tidak ada member untuk di kick")
        }

        for (let user of members) {
            await sock.groupParticipantsUpdate(m.chat, [user.id], 'remove')
        }

        m.react("✅")

        return m.reply(
`╭━━〔 ❤️ RIMURU SYSTEM 〕━━⬣
┃
┃ 💀 *MASS CLEAN SUCCESS*
┃
┃ 👥 Member dihapus:
┃ ${members.length} orang
┃
┃ ⚡ Grup sekarang lebih bersih
┃
╰━━━━━━━━━━━━━━━━⬣`
        )

    } catch (e) {
        m.react("❌")
        return m.reply(
`╭━━〔 ❌ ERROR SYSTEM 〕━━⬣
┃
┃ ${e.message}
┃
╰━━━━━━━━━━━━━━━━⬣`
        )
    }
}

export { pluginConfig as config, handler };
