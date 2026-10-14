//

import fs from 'fs'
import path from 'path'
import te from '../../src/lib/yalena-error.js'
import { updateAssetUrl } from '../../src/lib/yalena-uploader.js'
const pluginConfig = {
    name: 'gantigoodbye',
    category: 'owner',
    description: 'Ganti gambar yalena-goodbye.jpg (thumbnail goodbye)',
    usage: '.ganti-yalena-goodbye.jpg (reply/kirim gambar)',
    example: '.ganti-yalena-goodbye.jpg',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const isImage = m.isImage || (m.quoted && m.quoted.type === 'imageMessage')
    
    if (!isImage) {
        return m.reply(`🖼️ *ɢᴀɴᴛɪ ᴏᴜʀɪɴ-ɢᴏᴏᴅʙʏᴇ.ᴊᴘɢ*\n\n> Kirim/reply gambar untuk mengganti\n> File: assets/images/yalena-goodbye.jpg`)
    }
    
    try {
        let buffer
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download()
        } else if (m.isMedia) {
            buffer = await m.download()
        }
        
        if (!buffer) {
            return m.reply(`❌ Gagal mendownload gambar`)
        }
        
        await m.reply(`⏳ Sedang mengupload gambar...`)
        try {
            const newUrl = await updateAssetUrl('yalena-goodbye', buffer, 'yalena-goodbye.jpg')
            m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n\n> Gambar yalena-goodbye.jpg telah diganti ke URL baru:\n> ${newUrl}\n> Config telah diupdate secara realtime!`)
        } catch (e) {
            m.reply(`❌ Gagal mengupload gambar: ${e.message}`)
        }
    } catch (error) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }