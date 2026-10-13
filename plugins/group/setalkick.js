/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 — GROUP SECURITY        ║
╚══════════════════════════════════════════════╝

Fitur By: Anita Putri Azzahra
*/

import { getDatabase } from '../../src/lib/rimuru-database.js'

const pluginConfig = {
    name: 'setalkick',
    category: 'group',
    description: 'Mengubah batas peringatan AntiLinkKick',
    usage: '.setantilinkkick <1-20>',
    example: '.setantilinkkick 5',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    isAdmin: true,
    isBotAdmin: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const value = Number.parseInt(m.args?.[0], 10)
    if (!Number.isInteger(value) || value < 1 || value > 20) {
        const db = getDatabase()
        const group = db.getGroup(m.chat) || {}
        const current = Number.parseInt(group.antilinkKickLimit, 10) || 3
        return m.reply(`⚠️ Batas harus angka *1-20*.\n> Batas saat ini: *${current}x*\n> Contoh: *${m.prefix}setantilinkkick 5*`)
    }

    const db = getDatabase()
    db.setGroup(m.chat, { antilinkKickLimit: value })
    return m.reply(`✅ *Batas AntiLinkKick diubah*\n> Sekarang member akan di-kick saat mencapai *${value}x* pelanggaran.`)
}

export { pluginConfig as config, handler }
