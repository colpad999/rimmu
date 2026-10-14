//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


/**
 * Fitur    : Search GitHub Gist
 * Type     : Plugins ESM
 * Creator  : Hilman
 * Channel  : https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
 */

const pluginConfig = {
  name: "searchgist",
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

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) throw `${usedPrefix}${command} query`

  try {
    let hasil = []

    for (let page = 1; page <= 3; page++) {
      let res = await fetch(`https://gist.github.com/search?p=${page}&q=${encodeURIComponent(text)}`)
      let html = await res.text()

      let links = [...html.matchAll(/href="(\/[^"]+)"/g)]
        .map(v => 'https://gist.github.com' + v[1])
        .filter(v => /^https:\/\/gist\.github\.com\/[^/]+\/[a-f0-9]+$/.test(v))

      hasil.push(...links)
    }

    hasil = [...new Set(hasil)]
      .slice(0, 30)
      .map((v, i) => `❀ ${i + 1}. ${v}`)
      .join('\n\n')

    m.reply(hasil || 'Tidak ditemukan')

  } catch {
    throw 'Error'
  }
}

export { pluginConfig as config, handler };
