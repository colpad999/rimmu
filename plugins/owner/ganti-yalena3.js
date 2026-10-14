//

import fs from 'fs'
import path from 'path'
import te from '../../src/lib/yalena-error.js'
import { updateAssetUrl } from '../../src/lib/yalena-uploader.js'
const pluginConfig = {
    name: 'ganti-yalena3.jpg',
    category: 'owner',
    description: 'Ganti gambar yalena3.jpg',
    usage: '.ganti-yalena3.jpg (reply/kirim gambar)',
    example: '.ganti-yalena3.jpg',
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
        return m.reply(`🖼️ *ɢᴀɴᴛɪ ᴏᴜʀɪɴ3.ᴊᴘɢ*\n\n> Kirim/reply gambar untuk mengganti\n> File: assets/images/yalena3.jpg`)
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
            const newUrl = await updateAssetUrl('yalena3', buffer, 'yalena3.jpg')
            m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n\n> Gambar yalena3.jpg telah diganti ke URL baru:\n> ${newUrl}\n> Config telah diupdate secara realtime!`)
        } catch (e) {
            m.reply(`❌ Gagal mengupload gambar: ${e.message}`)
        }
    } catch (error) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }