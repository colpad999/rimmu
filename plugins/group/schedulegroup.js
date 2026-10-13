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

import { getDatabase } from '../../src/lib/rimuru-database.js'
const pluginConfig = {
    name: 'schedulegroup',
    category: 'group',
    description: 'Jadwal buka/tutup grup otomatis',
    usage: '.jadwalgroup <open/close> <HH:MM>',
    example: '.jadwalgroup open 06:00',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true,
    isAdmin: true,
    isBotAdmin: true
};

function parseTime(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return null;
    
    const cleaned = timeStr.trim().replace(/\s+/g, '');
    const match = cleaned.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    
    return { hours, minutes };
}

function formatTime(hours, minutes) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

async function handler(m, { sock, db }) {
    const args = m.args || []
    const action = args[0]?.toLowerCase();
    
    let time = args[1];
    if (args.length >= 4 && args[2] === ':') {
        time = `${args[1]}:${args[3]}`;
    } else if (args.length >= 2) {
        time = args.slice(1).join('').replace(/\s+/g, '');
    }
    
    if (!action) {
        const group = db.getGroup(m.chat) || {};
        const openTime = group.scheduleOpen || null;
        const closeTime = group.scheduleClose || null;
        
        let scheduleInfo = `⏰ *ᴊᴀᴅᴡᴀʟ ɢʀᴜᴘ*

「 📋 *sᴛᴀᴛᴜs* 」
🔓 ᴏᴘᴇɴ: *${openTime || 'Tidak aktif'}*
🔒 ᴄʟᴏsᴇ: *${closeTime || 'Tidak aktif'}*

*Cara Penggunaan:*
\`.jadwalgroup open 06:00\`
\`.jadwalgroup close 22:00\`
\`.jadwalgroup hapus open\`
\`.jadwalgroup hapus close\``;
        
        await m.reply(scheduleInfo);
        return;
    }
    
    if (action === 'hapus' || action === 'delete' || action === 'remove') {
        const type = args[1]?.toLowerCase();
        
        if (type !== 'open' && type !== 'close') {
            await m.reply(
                `⚠️ *ᴠᴀʟɪᴅᴀsɪ ɢᴀɢᴀʟ*\n\n` +
                `> Gunakan: \`.jadwalgroup hapus open\`\n` +
                `> atau: \`.jadwalgroup hapus close\``
            );
            return;
        }
        
        const group = db.getGroup(m.chat) || {};
        
        if (type === 'open') {
            delete group.scheduleOpen;
            db.setGroup(m.chat, group);
            
            await m.reply(
                `✅ *ʙᴇʀʜᴀsɪʟ*\n\n` +
                `> Jadwal *buka grup* otomatis telah dihapus.`
            );
        } else {
            delete group.scheduleClose;
            db.setGroup(m.chat, group);
            
            await m.reply(
                `✅ *ʙᴇʀʜᴀsɪʟ*\n\n` +
                `> Jadwal *tutup grup* otomatis telah dihapus.`
            );
        }
        return;
    }
    
    if (action !== 'open' && action !== 'close') {
        await m.reply(
            `⚠️ *ᴠᴀʟɪᴅᴀsɪ ɢᴀɢᴀʟ*\n\n` +
            `> Action harus \`open\` atau \`close\`!\n\n` +
            `> *Contoh:*\n` +
            `> \`.jadwalgroup open 06:00\`\n` +
            `> \`.jadwalgroup close 22:00\``
        );
        return;
    }
    
    if (!time) {
        await m.reply(
            `⚠️ *ᴠᴀʟɪᴅᴀsɪ ɢᴀɢᴀʟ*\n\n` +
            `> Waktu harus diisi!\n\n` +
            `> *Format:* \`HH:MM\` (24 jam)\n` +
            `> *Contoh:* \`.jadwalgroup ${action} 08:00\``
        );
        return;
    }
    
    const parsed = parseTime(time);
    if (!parsed) {
        await m.reply(
            `⚠️ *ᴠᴀʟɪᴅᴀsɪ ɢᴀɢᴀʟ*\n\n` +
            `> Format waktu tidak valid!\n\n` +
            `> *Format:* \`HH:MM\` (24 jam)\n` +
            `> *Contoh:* \`06:00\`, \`22:30\`, \`08:15\``
        );
        return;
    }
    
    const group = db.getGroup(m.chat) || {};
    const formattedTime = formatTime(parsed.hours, parsed.minutes);
    
    if (action === 'open') {
        group.scheduleOpen = formattedTime;
    } else {
        group.scheduleClose = formattedTime;
    }
    
    db.setGroup(m.chat, group);
    
    const actionText = action === 'open' ? 'BUKA' : 'TUTUP';
    const emoji = action === 'open' ? '🔓' : '🔒';
    
    const successMsg = `✅ *ᴊᴀᴅᴡᴀʟ ᴅɪsɪᴍᴘᴀɴ*

╭┈┈⬡「 ⏰ *sᴇᴛᴛɪɴɢ* 」
┃ ㊗ ${emoji} ᴀᴋsɪ: *${actionText}*
┃ ㊗ ⏱️ ᴡᴀᴋᴛᴜ: *${formattedTime} WIB*
┃ ㊗ 📡 sᴛᴀᴛᴜs: *🟢 Aktif*
╰┈┈⬡

> _Grup akan otomatis ${action === 'open' ? 'dibuka' : 'ditutup'}_
> _setiap hari pada jam *${formattedTime}* WIB._`;
    
    await m.reply(successMsg);
}

export { pluginConfig as config, handler }