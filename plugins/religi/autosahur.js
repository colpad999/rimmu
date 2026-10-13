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

import cron from 'node-cron';
import { RIMURU_CORE_CONFIG } from "../../config.js";
import config from '../../config.js';
import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'autosahur',
    category: 'religi',
    description: 'Pengingat sahur otomatis (Setiap jam 03:00)',
    usage: '.autosahur on/off',
    example: '.autosahur on',
    isGroup: true,
    isBotAdmin: false,
    isAdmin: true,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const AUDIO_SAHUR = 'https://raw.githubusercontent.com/AhmadAkbarID/media/refs/heads/main/sahur.mp3';
let sahurTask = null;
function initSahurCron(sock) {
    if (sahurTask) sahurTask.stop();
    sahurTask = cron.schedule('00 03 * * *', async () => {
        const db = getDatabase();
        if (!db) return;

        try {
            const groupsObj = await sock.groupFetchAllParticipating();
            const groupList = Object.keys(groupsObj);
            
            for (const jid of groupList) {
                const groupData = db.getGroup(jid) || {};
                
                if (groupData.autoSahur === true) {
                    try {
                        await sock.sendMessage(jid, {
                            audio: { url: AUDIO_SAHUR },
                            mimetype: 'audio/mpeg',
                            ptt: true,
                            contextInfo: {
                                isForwarded: true,
                                forwardingScore: 777,
                                externalAdReply: {
                                    title: '🌙 WAKTU SAHUR!',
                                    body: 'Sahur dulu kawan-kawan! 🥘',
                                    thumbnailUrl: 'https://cdn.gimita.id/download/sahur-ilustrasi-qazwa_1771141170617_2377330d.jpg',
                                    sourceUrl: RIMURU_CORE_CONFIG.saluran?.link || '',
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        });
                        await new Promise(res => setTimeout(res, 2000));
                    } catch (e) {
                         console.log(`[AutoSahur] Gagal kirim ke ${jid}:`, e.message);
                    }
                }
            }
        } catch (e) {
            console.error('[AutoSahur] Cron Job Error:', e);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
    
    console.log('[AutoSahur] Cron job initialized (03:00 WIB)');
}

async function handler(m, { sock, db }) {
    if (!m.isGroup) return m.reply(config.messages.groupOnly);
    if (!m.isAdmin && !m.isOwner) return m.reply(config.messages.adminOnly);

    const args = m.args[0]?.toLowerCase();

    if (args === 'on') {
        db.setGroup(m.chat, { autoSahur: true });
        m.reply('✅ *Auto Sahur Diaktifkan!*\n\n> Bot akan mengirim pengingat di grup ini setiap jam 03:00 WIB.');
    } else if (args === 'off') {
        db.setGroup(m.chat, { autoSahur: false });
        m.reply('❌ *Auto Sahur Dinonaktifkan di grup ini!*');
    } else {
        m.reply(`*AUTO SAHUR*
            
⚠️ Gunakan: \`${m.prefix}autosahur on/off\``);
    }
}

export { pluginConfig as config, handler, initSahurCron };
