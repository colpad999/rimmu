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

import config from '../../config.js';
const pluginConfig = {
    name: 'tebakkata2',
    category: 'game',
    description: 'Tebak kata (huruf per huruf)',
    usage: '.hangman',
    example: '.hangman',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 30,
    energi: 1,
    isEnabled: true
}

const words = [
    'zero two', 'darling', 'franxx', 'strelizia', 'hiro',
    'ichigo', 'goro', 'miku', 'kokoro', 'mitsuru',
    'zorome', 'futoshi', 'nana', 'hachi', 'klaxosaur'
]

let activeGames = {}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord(word, guessed) {
    return word.split('').map(letter => {
        if (letter === ' ') return ' '
        return guessed.has(letter) ? letter : '_'
    }).join(' ')
}

async function handler(m, { sock, db }) {
    const chatId = m.chat
    
    if (activeGames[chatId]) {
        return m.reply(`⏳ *ᴍᴀꜱɪʜ ᴀᴅᴀ ɢᴀᴍᴇ ʏᴀɴɢ ʙᴇʀʟᴀɴɢꜱᴜɴɢ!*`)
    }
    
    m.react('🔤')
    
    const word = getRandomWord()
    const guessed = new Set()
    
    activeGames[chatId] = {
        word: word,
        guessed: guessed,
        attempts: 6,
        time: setTimeout(() => {
            if (activeGames[chatId]) {
                m.reply(`⏰ *ᴡᴀᴋᴛᴜ ʜᴀʙɪꜱ!*\n\n> Jawabannya: *${word}*`)
                delete activeGames[chatId]
            }
        }, 60000)
    }
    
    await m.reply(
        `🔤 *ʜᴀɴɢᴍᴀɴ* 🔤\n\n` +
        `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
        `┃ 📝 *ᴋᴀᴛᴀ*: ${displayWord(word, guessed)}\n` +
        `┃ ❌ *ᴘᴇʀᴄᴏʙᴀᴀɴ*: ${activeGames[chatId].attempts}/6\n` +
        `┃\n` +
        `┃ ⏱️ *ᴡᴀᴋᴛᴜ*: 60 detik\n` +
        `┃ 💰 *ʜᴀᴅɪᴀʜ*: 50 limit\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━⬣\n\n` +
        `> Kirim *1 huruf* untuk menebak, atau *jawab kata lengkap*`
    )
}

async function answerHandler(m, { sock, db }) {
    const chatId = m.chat
    const game = activeGames[chatId]
    
    if (!game) return false
    
    const input = m.text?.toLowerCase().trim()
    if (!input) return false
    
    // Tebak kata lengkap
    if (input === game.word) {
        clearTimeout(game.time)
        delete activeGames[chatId]
        
        const user = db.getUser(m.sender)
        user.limit = (user.limit || 0) + 50
        db.setUser(m.sender, user)
        
        await m.reply(`🎉 *ʙᴇɴᴀʀ!*\n\n> Kata: *${game.word}*\n> Kamu dapat +50 limit! 🎁`)
        await m.react('🎉')
        return true
    }
    
    // Tebak huruf
    if (input.length === 1 && /[a-z]/.test(input)) {
        if (game.guessed.has(input)) {
            await m.reply(`⚠️ *ʜᴜʀᴜꜰ '${input}' ꜱᴜᴅᴀʜ ᴘᴇʀɴᴀʜ ᴅɪᴛᴇʙᴀᴋ!*`)
            return true
        }
        
        game.guessed.add(input)
        
        if (game.word.includes(input)) {
            const display = displayWord(game.word, game.guessed)
            
            if (!display.includes('_')) {
                clearTimeout(game.time)
                delete activeGames[chatId]
                
                const user = db.getUser(m.sender)
                user.limit = (user.limit || 0) + 50
                db.setUser(m.sender, user)
                
                await m.reply(`🎉 *ʙᴇɴᴀʀ!*\n\n> Kata: *${game.word}*\n> Kamu dapat +50 limit! 🎁`)
                await m.react('🎉')
                return true
            }
            
            await m.reply(
                `✅ *ʙᴇɴᴀʀ!* Huruf '${input}' ada dalam kata!\n\n` +
                `📝 *ᴋᴀᴛᴀ*: ${display}\n` +
                `❌ *ᴘᴇʀᴄᴏʙᴀᴀɴ*: ${game.attempts}/6`
            )
        } else {
            game.attempts--
            
            if (game.attempts === 0) {
                clearTimeout(game.time)
                delete activeGames[chatId]
                await m.reply(`💀 *ɢᴀᴍᴇ ᴏᴠᴇʀ!*\n\n> Jawabannya: *${game.word}*`)
                return true
            }
            
            await m.reply(
                `❌ *ꜱᴀʟᴀʜ!* Huruf '${input}' tidak ada!\n\n` +
                `📝 *ᴋᴀᴛᴀ*: ${displayWord(game.word, game.guessed)}\n` +
                `❌ *ᴘᴇʀᴄᴏʙᴀᴀɴ*: ${game.attempts}/6`
            )
        }
        return true
    }
    
    return false
}

export { pluginConfig as config, handler, answerHandler };
