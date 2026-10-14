//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


/*
 • Fitur By Anomaki Team
 • Created : xyzan code
 • Share teks *(Plugins)*
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

import axios from 'axios';

const pluginConfig = {
  name: "bagiteks",
  category: "tools",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

const handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw 'Kasih teks yang mau dishare dong...';

    try {
        const link = await bikinLink(text);
        await conn.reply(m.chat, `Nih link teks lu: ${link}`, m);
    } catch (e) {
        await conn.reply(m.chat, `Waduh error: ${e}`, m);
    }
};


const bikinLink = async (teks) => {
    const {
        data
    } = await axios.post('https://sharetext.io/api/text', {
        text: teks
    }, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://sharetext.io/'
        }
    });

    if (!data) throw 'Gagal bikin link';
    return `https://sharetext.io/${data}`;
};

// kok simple bang? Ya emng gini simple webnya 😹

export { pluginConfig as config, handler };
