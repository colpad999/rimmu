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

import axios from 'axios'
import * as cheerio from 'cheerio'
/* penguna esm
import axios from "axios";
import * as cheerio from "cheerio";
*/

const kusonime = {
    latest: async () => {
        try {
            const html = (await axios.get('https://kusonime.com/')).data;
            const $ = cheerio.load(html);

            const result = [];

            $(".venz > ul > .kover").each((i, el) => {
                const item = $(el);

                const title = item.find(".content h2 a").text().trim();
                const url = item.find(".content h2 a").attr("href");

                const thumb = item.find(".thumb img").attr("src") ||
                    item.find(".thumb img").attr("data-src");

                const released = item
                    .find('.content p:has(i.fa-clock-o)')
                    .text()
                    .replace("Released on", "")
                    .trim();

                const genre = item
                    .find('.content p:has(i.fa-tag) a')
                    .map((_, g) => $(g).text().trim())
                    .get();

                result.push({
                    title,
                    url,
                    thumb,
                    released,
                    genre
                });
            });

            return result
        } catch (e) {
            console.error({
                msg: e.message
            })
            throw e
        }
    },
    search: async (q, page = 1) => {
        try {
            const html = (await axios.get(`https://kusonime.com/page/${page}/?s=${encodeURIComponent(q)}`)).data;
            const $ = cheerio.load(html);

            const result = [];

            $(".venz > ul > .kover").each((i, el) => {
                const item = $(el);

                const title = item.find(".content h2 a").text().trim();
                const url = item.find(".content h2 a").attr("href");

                const thumb = item.find(".thumb img").attr("src") ||
                    item.find(".thumb img").attr("data-src");

                const released = item
                    .find('.content p:has(i.fa-clock-o)')
                    .text()
                    .replace("Released on", "")
                    .trim();

                const genre = item
                    .find('.content p:has(i.fa-tag) a')
                    .map((_, g) => $(g).text().trim())
                    .get();

                result.push({
                    title,
                    url,
                    thumb,
                    released,
                    genre
                });
            });

            return result
        } catch (e) {
            console.error({
                msg: e.message
            })
            throw e
        }
    },
    genre: async (genres, page = 1) => {
        try {
            const html = (await axios.get(`https://kusonime.com/genres/${encodeURIComponent(genres)}/page/${page}`)).data;
            const $ = cheerio.load(html);

            const result = [];

            $(".venz > ul > .kover").each((i, el) => {
                const item = $(el);

                const title = item.find(".content h2 a").text().trim();
                const url = item.find(".content h2 a").attr("href");

                const thumb = item.find(".thumb img").attr("src") ||
                    item.find(".thumb img").attr("data-src");

                const released = item
                    .find('.content p:has(i.fa-clock-o)')
                    .text()
                    .replace("Released on", "")
                    .trim();

                const genre = item
                    .find('.content p:has(i.fa-tag) a')
                    .map((_, g) => $(g).text().trim())
                    .get();

                result.push({
                    title,
                    url,
                    thumb,
                    released,
                    genre
                });
            });

            return result
        } catch (e) {
            console.error({
                msg: e.message
            })
            throw e
        }
    },
    detail: async (url) => {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const metadata = async (url) => {
                try {
                    const response = await axios.get(url);
                    const $ = cheerio.load(response.data);

                    const met = {};

                    met.title = $('h1.jdlz').text().trim();

                    const posterImg = $('.post-thumb img.wp-post-image');
                    met.poster_url = posterImg.attr('src') || '';

                    const info = {};
                    $('.info p').each((i, el) => {
                        const text = $(el).text().trim();
                        if (text.includes(':')) {
                            let [key, ...valueParts] = text.split(':');
                            key = key.trim().toLowerCase().replace(/\s+/g, '_');
                            let value = valueParts.join(':').trim();

                            if (key === 'genre') {
                                info.genres = $(el).find('a').map((j, a) => $(a).text().trim()).get();
                            } else if (key === 'seasons') {
                                const seasonLink = $(el).find('a');
                                info.season = seasonLink.text().trim() || value;
                            } else if (key === 'producers') {
                                info.producers = value;
                            } else {
                                info[key] = value;
                            }
                        }
                    });
                    met.info = info;

                    const sinopsisParts = [];
                    $('.venutama > p').each((i, el) => {
                        const text = $(el).text().trim();
                        const parentClass = $(el).parent().attr('class');
                        if (text && !text.toLowerCase().includes('download') && !text.toLowerCase().includes('credit') && parentClass !== 'info') {
                            sinopsisParts.push(text);
                        }
                    });
                    met.sinopsis = sinopsisParts.join('\n\n');

                    met.posted_info = $('.kategoz').text().trim();

                    return met;

                } catch (error) {
                    return error;
                }
            }

            const results = [];

            $('.smokeddlrh').each((i, batchEl) => {
                const $batch = $(batchEl);

                const title = $batch.find('.smokettlrh').text().trim();
                if (!title) return;

                const batch = {
                    title,
                    resolutions: {}
                };

                $batch.find('.smokeurlrh').each((j, resEl) => {
                    const $res = $(resEl);

                    const resolution = $res.find('strong').text().trim();
                    if (!resolution || !/\d{3,4}P/i.test(resolution)) return;

                    const links = [];
                    $res.find('a').each((k, a) => {
                        const $a = $(a);
                        const provider = $a.text().trim();
                        const url = $a.attr('href');
                        if (url && url.startsWith('http') && provider) {
                            links.push({
                                provider,
                                url
                            });
                        }
                    });

                    if (links.length > 0) {
                        batch.resolutions[resolution] = links;
                    }
                });

                if (Object.keys(batch.resolutions).length > 0) {
                    results.push(batch);
                }
            });

            const meta = await metadata(url);
            return {
                metadata: meta,
                download: results
            };

        } catch (e) {
            console.error({
                msg: e.message
            })
            throw e
        }
    },
}

export { kusonime }