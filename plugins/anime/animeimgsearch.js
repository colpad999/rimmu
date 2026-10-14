//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


//Dont delete this credit!!!
//Script by ShirokamiRyzen

import fetch from 'node-fetch'
import { uploadImage } from '../../src/lib/yalena-uploader.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `Kirim/Reply gambar anime dengan caption ${usedPrefix + command}`;

        m.reply(wait);

        let media = await q.download();
        let url = await uploadImage(media);
        let hasil = await fetch(`https://api.trace.moe/search?cutBorders&url=${encodeURIComponent(url)}`);
        let response = await hasil.json();

        if (response && response.result && response.result.length > 0) {
            let firstResult = response.result[0];

            let filename = firstResult.filename;
            let episode = firstResult.episode;
            let similarity = Math.round(firstResult.similarity * 100);
            let videoURL = firstResult.video;
            let videoIMG = firstResult.image;

            let captionVid = `Name: ${filename}\nEpisode: ${episode}\n\nSimilarity: ${similarity}%`;
            let captionImg = `Name: ${filename}\nEpisode: ${episode}\n\nSimilarity: ${similarity}%`;

            await conn.sendFile(m.chat, videoURL, filename, captionVid, m);
            await conn.sendFile(m.chat, videoIMG, filename, captionImg, m);
        } else {
            m.reply('No result found');
        }
    } catch (error) {
        console.error(error);
        if (error.includes(`Kirim/Reply gambar anime dengan caption ${usedPrefix + command}`)) {
            m.reply(error);
        } else {
            m.reply('Internal server error');
        }
    }
};

handler.help = ['animeimgsearch']
handler.tags = ['anime']
handler.command = /^(animeimgsearch)$/i

handler.register = true
handler.limit = false

export default handler
