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

import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from 'rimuru';

const pluginConfig = {
    name: 'ramadhan2027',
    primaryName: 'ramadhan2027',
    command: 'ramadhan2027',
    category: 'religi',
    description: 'Menghitung mundur waktu menuju bulan suci Ramadhan 2027 ala Zero Two',
    usage: '.ramadhan2027',
    example: '.ramadhan2027',
    isEnabled: true
};

async function getSafeImageBuffer(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Gagal fetch');
        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (err) {
        const fallbackUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";
        const resFallback = await fetch(fallbackUrl);
        const bufferFallback = await resFallback.arrayBuffer();
        return Buffer.from(bufferFallback);
    }
}

async function handler(m, { sock }) {
    const chatId = m.chat;

    const targetDate = new Date('2027-02-08T00:00:00+07:00');
    const now = new Date();
    
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const imageUrl = "https://cdn.phototourl.com/member/2026-07-29-d7e9e19c-9055-4a95-9424-6d3b7bd2238e.jpg";

    let imageBuffer;
    try {
        imageBuffer = await getSafeImageBuffer(imageUrl);
    } catch (e) {
        await m.reply('❌ Gagal memuat gambar Ramadhan!');
        return;
    }

    let mediaAttachment = null;
    try {
        mediaAttachment = await prepareWAMessageMedia(
            { image: imageBuffer },
            { upload: sock.waUploadToServer }
        );
    } catch (e) {}

    let countdownText = "";
    if (diffDays > 0) {
        countdownText = `Dalam *${diffDays} hari* lagi, kita akan menyambut bulan suci Ramadhan 2027! ✨`;
    } else if (diffDays === 0) {
        countdownText = `Hari ini kita telah memasuki bulan suci Ramadhan 2027! Marhaban ya Ramadhan! 🌙`;
    } else {
        countdownText = `Bulan suci Ramadhan 2027 telah terlewat.`;
    }

    const pesanTeks = 
`🌙 *COUNTDOWN RAMADHAN 2027*

"Darling... Zero Two sudah siap sedia menyambut bulan penuh berkah ini bersamamu!"

✨ *Info & Persiapan:*
Mari kita bersihkan hati dan niat menyambut bulan suci penuh ampunan dan rahmat-Nya.

⏳ ${countdownText}

> 📅 *Perkiraan 1 Ramadhan:* 8 Februari 2027
> 💖 _"Let's prepare our best self, Darling!"_`;

    const interactiveMsg = generateWAMessageFromContent(chatId, {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '',
                hasMediaAttachment: !!mediaAttachment,
                ...(mediaAttachment || {})
            }),
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: pesanTeks
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: ''
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📋 Menu',
                            id: '.menu'
                        })
                    }
                ]
            }),
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
    }, { userJid: m.sender, quoted: m });

    await sock.relayMessage(chatId, interactiveMsg.message, { messageId: interactiveMsg.key.id });
}

async function answerHandler(m, sock) {
    return false; 
}

export { pluginConfig as config, handler, answerHandler };
