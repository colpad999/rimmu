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

import fs from 'node:fs';

let handler = async (m, {
    conn
}) => {
    const ootaedit = await conn.sendMessage(m.chat, {
        text: "Wait.... Sessions Mau Di Hapus!"
    }, {
        quoted: m
    });
    fs.readdir(`./sessions`, async function(err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return m.reply('Unable to scan directory: ' + err);
        }
        let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
            item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
        )
        console.log(filteredArray.length);
        let teks = ` *– 乂 Sessions - Akan Di Delete*\n\n`
        if (filteredArray.length == 0) return conn.sendMessage(m.chat, {
            text: `${teks}`,
            edit: ootaedit.key
        }, {
            quoted: m
        })
        filteredArray.map(function(e, i) {
            teks += (i + 1) + `. ${e}\n`
        })
        await conn.sendMessage(m.chat, {
            text: `${teks}`,
            edit: ootaedit.key
        }, {
            quoted: m
        })
        await sleep(2000)
        await conn.sendMessage(m.chat, {
            text: `🖐️Wait... Sessions Mau Di Hapus!!`,
            edit: ootaedit.key
        }, {
            quoted: m
        })
        await filteredArray.forEach(function(file) {
            fs.unlinkSync(`./sessions/${file}`)
        });
        await sleep(2000)
        await conn.sendMessage(m.chat, {
            text: `✅ Oke Sessions Udah Di Hapus!!`,
            edit: ootaedit.key
        }, {
            quoted: m
        })
    });
};

handler.command = ["delsesi", "clearsesi", "deletesesi"];
handler.help = ["delsesi", "clearsesi", "deletesesi"];
handler.tags = ["owner"];
handler.owner = true;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default handler;
