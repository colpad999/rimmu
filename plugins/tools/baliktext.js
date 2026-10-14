/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

  Fitur tambahan hasil audit FURINA V17 → Yalena MD.
*/

const pluginConfig = {
    name: 'baliktext',
    category: 'tools',
    description: 'Membalik susunan teks',
    usage: '.fliptext <teks>',
    example: '.fliptext Yalena MD',
    cooldown: 3,
    energi: 1,
    isEnabled: true
}

async function handler(m) {
    const text = m.text?.trim()
    if (!text) return m.reply(`Contoh: ${m.prefix}fliptext Yalena MD`)
    const flipped = [...text].reverse().join('')
    return m.reply(`「 FLIP TEXT 」\n\n• Normal :\n${text}\n\n• Flip :\n${flipped}`)
}

export { pluginConfig as config, handler }
