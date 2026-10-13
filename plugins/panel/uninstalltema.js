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

import { Client } from 'ssh2'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: ['uinstalltema', 'uninstalltema', 'removetema', 'hapustema'],
    category: 'panel',
    description: 'Uninstall tema Pterodactyl via SSH',
    usage: '.uinstalltema <ip>|<password>',
    example: '.uinstalltema 192.168.1.1|secretpass',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 60,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const text = m.text?.trim()
    
    if (!text) {
        return m.reply(
            `╭┈┈⬡「 🗑️ *ᴜɴɪɴsᴛᴀʟʟ ᴛᴇᴍᴀ* 」
┃ ㊗ ᴜsᴀɢᴇ: \`${m.prefix}uinstalltema <ip>|<password>\`
╰┈┈⬡

> \`Contoh: ${m.prefix}uinstalltema 192.168.1.1|secretpass\``
        )
    }
    
    const parts = text.split('|')
    if (parts.length < 2) {
        return m.reply(`❌ Format salah! Gunakan: \`ip|password\``)
    }
    
    const ipvps = parts[0].trim()
    const passwd = parts[1].trim()
    
    global.installtema = { vps: ipvps, pwvps: passwd }
    
    const connSettings = {
        host: ipvps,
        port: 22,
        username: 'root',
        password: passwd
    }
    
    const command = `bash <(curl -s https://raw.githubusercontent.com/veryLinh/Theme-Autoinstaller/main/install.sh)`
    const ress = new Client()
    
    m.react('🕕')
    await m.reply(`🕕 *ᴍᴇᴍᴘʀᴏsᴇs ᴜɴɪɴsᴛᴀʟʟ ᴛᴇᴍᴀ...*\n\n> Tunggu 1-10 menit hingga proses selesai`)
    
    ress.on('ready', () => {
        ress.exec(command, (err, stream) => {
            if (err) {
                m.react('☢')
                return m.reply(te(m.prefix, m.command, m.pushName))
            }
            
            stream.on('close', async () => {
                m.react('✅')
                await m.reply(
                    `╭┈┈⬡「 ✅ *ᴜɴɪɴsᴛᴀʟʟ ᴛᴇᴍᴀ* 」
┃ ㊗ sᴛᴀᴛᴜs: *Berhasil*
┃ ㊗ ɪᴘ: ${ipvps}
╰┈┈⬡

> _Tema berhasil diuninstall!_`
                )
                ress.end()
            }).on('data', (data) => {
                console.log('[UninstallTema]', data.toString())
                stream.write('skyzodev\n')
                stream.write('2\n')
                stream.write('y\n')
                stream.write('x\n')
            }).stderr.on('data', (data) => {
                console.log('[UninstallTema STDERR]', data.toString())
            })
        })
    }).on('error', (err) => {
        console.log('[SSH Error]', err)
        m.react('❌')
        m.reply(`❌ Koneksi gagal!\n\n> IP atau Password tidak valid.`)
    }).connect(connSettings)
}

export { pluginConfig as config, handler }