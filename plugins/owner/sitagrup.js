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

import fs from 'fs'
import path from 'path'
import { getDatabase } from '../../src/lib/rimuru-database.js'
import te from '../../src/lib/rimuru-error.js'

const pluginConfig = {
    name: 'sitagrup',
    category: 'owner',
    description: 'Sistem pengambilalihan grup (Kudeta)',
    usage: '.sitagrup',
    example: '.sitagrup set namagrup Pwned',
    isOwner: true,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    isAdmin: false,
    isBotAdmin: true,
    cooldown: 0,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    let sitaCfg = db.setting('sitagrup') || {
        kickall: false,
        namagrup: 'OWNED BY OWNER',
        deskripsi: 'Grup ini telah disita.',
        katakata: '',
        katakataAktif: false
    }

    const args = m.args
    const action = args[0]?.toLowerCase()
    
    const ppPath = path.join(process.cwd(), 'database', 'sitagrup_pp.jpg')

    if (!action || action === 'status' || action === 'info' || action === 'help') {
        let statusMsg = `👑 *SISTEM KUDETA GRUP*\n\n`
        statusMsg += `Sistem ini memungkinkan owner untuk mengambil alih grup secara paksa dengan satu perintah.\n\n`
        statusMsg += `*PENGATURAN SAAT INI:*\n`
        statusMsg += `- Kick All: *${sitaCfg.kickall ? 'Aktif' : 'Nonaktif'}*\n`
        statusMsg += `- Nama Grup: *${sitaCfg.namagrup}*\n`
        statusMsg += `- Deskripsi: *${sitaCfg.deskripsi ? 'Telah diatur' : 'Kosong'}*\n`
        statusMsg += `- Foto Profil: *${fs.existsSync(ppPath) ? 'Tersimpan' : 'Belum diatur'}*\n`
        statusMsg += `- Kata Kata: *${sitaCfg.katakataAktif ? 'Aktif' : 'Nonaktif'}*\n\n`
        statusMsg += `*PERINTAH PENGATURAN:*\n`
        statusMsg += `- \`${m.prefix}sitagrup kickall on/off\`\n`
        statusMsg += `- \`${m.prefix}sitagrup set namagrup <nama>\`\n`
        statusMsg += `- \`${m.prefix}sitagrup set deskripsi <teks>\`\n`
        statusMsg += `- \`${m.prefix}sitagrup set pp\` (reply gambar)\n`
        statusMsg += `- \`${m.prefix}sitagrup set katakata <teks>\`\n`
        statusMsg += `- \`${m.prefix}sitagrup hapus katakata\`\n\n`
        statusMsg += `*EKSEKUSI KUDETA:*\n`
        statusMsg += `Ketik \`${m.prefix}sitagrup ini\` untuk memulai pengambilalihan grup secara paksa.`

        return m.reply(statusMsg)
    }

    if (action === 'ini') {
        m.react('🕕')
        await m.reply('🚨 *PROSES KUDETA DIMULAI!* 🚨\n\n> Memulai proses pengambilalihan grup...')

        try {
            const groupMetadata = await sock.groupMetadata(m.chat)
            const participants = groupMetadata.participants
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
            const ownerId = m.sender

            const adminsToDemote = participants
                .filter(p => p.admin && p.id !== botId && p.id !== ownerId)
                .map(p => p.id)

            if (adminsToDemote.length > 0) {
                await sock.groupParticipantsUpdate(m.chat, adminsToDemote, 'demote')
                await new Promise(resolve => setTimeout(resolve, 2000))
            }

            if (sitaCfg.kickall) {
                const membersToKick = participants
                    .filter(p => p.id !== botId && p.id !== ownerId)
                    .map(p => p.id)

                for (let i = 0; i < membersToKick.length; i++) {
                    await sock.groupParticipantsUpdate(m.chat, [membersToKick[i]], 'remove')
                    await new Promise(resolve => setTimeout(resolve, 1500)) 
                }
            }

            if (sitaCfg.namagrup) {
                await sock.groupUpdateSubject(m.chat, sitaCfg.namagrup)
                await new Promise(resolve => setTimeout(resolve, 1500))
            }

            if (sitaCfg.deskripsi) {
                await sock.groupUpdateDescription(m.chat, sitaCfg.deskripsi)
                await new Promise(resolve => setTimeout(resolve, 1500))
            }

            if (fs.existsSync(ppPath)) {
                await sock.updateProfilePicture(m.chat, { url: ppPath })
                await new Promise(resolve => setTimeout(resolve, 1500))
            }

            m.react('✅')
            
            if (sitaCfg.katakataAktif && sitaCfg.katakata) {
                await sock.sendMessage(m.chat, { text: sitaCfg.katakata })
            } else {
                await m.reply('✅ *KUDETA BERHASIL!* Grup ini sekarang sepenuhnya berada di bawah kendalimu.')
            }

        } catch (error) {
            m.react('❌')
            m.reply(`❌ *GAGAL MELAKUKAN KUDETA*\n\n> Pastikan bot memiliki akses admin penuh.\n> Error: ${error.message}`)
        }
        return
    }

    if (action === 'kickall') {
        const state = args[1]?.toLowerCase()
        if (state === 'on') {
            sitaCfg.kickall = true
            db.setting('sitagrup', sitaCfg)
            m.reply('✅ *Fitur Kick All diaktifkan untuk Kudeta.*')
        } else if (state === 'off') {
            sitaCfg.kickall = false
            db.setting('sitagrup', sitaCfg)
            m.reply('✅ *Fitur Kick All dinonaktifkan untuk Kudeta.*')
        } else {
            m.reply(`⚠️ *PENGGUNAAN SALAH*\n\n> Gunakan: ${m.prefix}sitagrup kickall on/off`)
        }
        return
    }

    if (action === 'set') {
        const subAction = args[1]?.toLowerCase()
        if (!subAction) {
            return m.reply(`⚠️ *PENGGUNAAN SALAH*\n\n> Contoh:\n- ${m.prefix}sitagrup set namagrup <nama>\n- ${m.prefix}sitagrup set deskripsi <teks>\n- ${m.prefix}sitagrup set pp (reply gambar)\n- ${m.prefix}sitagrup set katakata <teks>`)
        }

        if (subAction === 'namagrup') {
            const newName = m.text.replace(/^(set\s+namagrup\s+)/i, '').trim()
            if (!newName || newName === m.text) return m.reply(`⚠️ Masukkan nama grup yang baru.`)
            sitaCfg.namagrup = newName
            db.setting('sitagrup', sitaCfg)
            m.reply(`✅ *Nama grup kudeta diatur menjadi:* ${newName}`)
        } 
        else if (subAction === 'deskripsi') {
            const newDesc = m.text.replace(/^(set\s+deskripsi\s+)/i, '').trim()
            if (!newDesc || newDesc === m.text) return m.reply(`⚠️ Masukkan deskripsi grup yang baru.`)
            sitaCfg.deskripsi = newDesc
            db.setting('sitagrup', sitaCfg)
            m.reply(`✅ *Deskripsi grup kudeta berhasil diatur.*`)
        }
        else if (subAction === 'pp') {
            const qmsg = m.quoted || m
            if (qmsg.isImage || qmsg.mimetype?.startsWith('image/')) {
                try {
                    const buffer = await qmsg.download()
                    fs.writeFileSync(ppPath, buffer)
                    m.reply(`✅ *Foto profil kudeta berhasil disimpan.*`)
                } catch (e) {
                    m.reply(`❌ *Gagal menyimpan gambar.*`)
                }
            } else {
                m.reply(`⚠️ *Silakan reply gambar yang ingin dijadikan ikon grup saat kudeta.*`)
            }
        }
        else if (subAction === 'katakata') {
            const newWords = m.text.replace(/^(set\s+katakata\s+)/i, '').trim()
            if (!newWords || newWords === m.text) return m.reply(`⚠️ Masukkan kata-kata yang akan dikirim setelah kudeta.`)
            sitaCfg.katakata = newWords
            sitaCfg.katakataAktif = true
            db.setting('sitagrup', sitaCfg)
            m.reply(`✅ *Kata-kata berhasil diatur dan diaktifkan.*\n\n> Teks: ${newWords}`)
        }
        return
    }

    if (action === 'hapus') {
        const subAction = args[1]?.toLowerCase()
        if (subAction === 'katakata') {
            sitaCfg.katakataAktif = false
            db.setting('sitagrup', sitaCfg)
            m.reply(`✅ *Kata-kata setelah kudeta berhasil dinonaktifkan.*`)
        } else {
            m.reply(`⚠️ *PENGGUNAAN SALAH*\n\n> Gunakan: ${m.prefix}sitagrup hapus katakata`)
        }
        return
    }

}

export { pluginConfig as config, handler }
