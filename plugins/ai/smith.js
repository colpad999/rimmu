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

/***
  @ Base: https://play.google.com/store/apps/details?id=com.smartwidgetlabs.chatgpt
  @ Author: Shannz (Adapted for WA Bot)
  @ Note: Wrapper from Chat Smith with real-time token bearer
***/

import axios from 'axios';

const CONFIG = {
    URL: {
        TOKEN: 'https://api.vulcanlabs.co/smith-auth/api/v1/token',
        CHAT: 'https://api.vulcanlabs.co/smith-v2/api/v7/chat_android'
    },
    DEVICE_ID: 'A718E10669C7C5F7',
    HEADERS: {
        'User-Agent': 'Chat Smith Android, Version 4.0.1(970)',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json; charset=utf-8',
        'x-vulcan-application-id': 'com.smartwidgetlabs.chatgpt'
    }
};

const smith = {
    getToken: async () => {
        const payload = {
            device_id: CONFIG.DEVICE_ID,
            order_id: "",
            product_id: "",
            purchase_token: "",
            subscription_id: ""
        };

        try {
            const response = await axios.post(CONFIG.URL.TOKEN, payload, {
                headers: {
                    ...CONFIG.HEADERS,
                    'x-vulcan-request-id': '9149487891752494707093'
                }
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    },

    chat: async (messages) => {
        const tokenResponse = await smith.getToken();
        
        if (!tokenResponse.success) {
            console.error("[-] Gagal mengambil token akses.");
            return tokenResponse;
        }

        const payload = {
            usage_model: {
                provider: "openai",
                model: "gpt-4o-mini"
            },
            user: CONFIG.DEVICE_ID,
            messages: messages,
            nsfw_check: true,
            tools: [
                {
                    function: {
                        name: "create_ai_art"
                    }
                }
            ]
        };

        try {
            const response = await axios.post(CONFIG.URL.CHAT, payload, {
                headers: {
                    ...CONFIG.HEADERS,
                    'x-auth-token': 'A4gnMV1ReuPphVWC/az7HiXbdiG4lpynFp0GA1k6EJ3P1os8bLHiYgAwJZ8Hi80hDMLzxEWsn+srJ5CxEVHDU/mBrrfSVHV1MJhm9WKM4dTHOcCc4RMpHDEg5GTNPsS19bUFsm8IW/SH5eY+BIwgPg4P4JT41c1eC83swjZ3FVA=',
                    'authorization': `Bearer ${tokenResponse.data.AccessToken}`,
                    'x-firebase-appcheck-error': '-9%3A+Integrity+API+error...',
                    'x-vulcan-request-id': '9149487891752494721341'
                }
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }
};

const pluginConfig = {
    name: 'smith',
    category: 'ai',
    description: 'AI Chat menggunakan Chat Smith (GPT-4o Mini)',
    usage: '.chatsmith <pesan>',
    example: '.chatsmith Siapakah penemu listrik?',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 1,
    isEnabled: true
};

async function handler(m, { text, prefix, command }) {
    const pfx = prefix || m.prefix || '.';

    if (!text) {
        if (m.react) await m.react('❌');
        return m.reply(
            `*Format Salah!*\n\n` +
            `Contoh penggunaan:\n` +
            `\`${pfx}${command} Jelaskan mengenai teori relativitas!\``
        );
    }

    if (m.react) await m.react('⏳');

    try {
        const messages = [
            {
                role: "system",
                content: "You are Chat Smith, a personal AI assistant. Be helpful, polite, direct, and concise."
            },
            {
                role: "user",
                content: text
            }
        ];

        const res = await smith.chat(messages);

        if (!res.success) {
            throw new Error(typeof res.error === 'string' ? res.error : JSON.stringify(res.error));
        }

        const replyMessage = res.data?.Choices?.[0]?.Message?.Content || res.data?.choices?.[0]?.message?.content || res.data?.response;

        if (!replyMessage) {
            if (m.react) await m.react('❌');
            return m.reply('❌ Tidak mendapat respon yang valid dari AI.');
        }

        if (m.react) await m.react('✅');
        await m.reply(replyMessage.trim());

    } catch (error) {
        console.error('ChatSmith Plugin Error:', error);
        if (m.react) await m.react('❌');
        await m.reply('❌ *GAGAL*\n\n> ' + error.message);
    }
}

export { pluginConfig as config, handler };
