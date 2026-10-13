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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


/*
Jangan Hapus Wm Bang 

*Morse,Demorse Kode  Plugins Esm*

Mungkin Anak Pramuka Butuh Entahlah 

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Original Source]*

https://whatsapp.com/channel/0029ValggF79mrGXnImOmk1F/121
*/

const morseDict = {
    'a': '•–', 'b': '–•••', 'c': '–•–•', 'd': '–••', 'e': '•',
    'f': '••–•', 'g': '––•', 'h': '••••', 'i': '••', 'j': '•–––',
    'k': '–•–', 'l': '•–••', 'm': '––', 'n': '–•', 'o': '–––',
    'p': '•––•', 'q': '––•–', 'r': '•–•', 's': '•••', 't': '–',
    'u': '••–', 'v': '•••–', 'w': '•––', 'x': '–••–', 'y': '–•––',
    'z': '––••', '1': '•––––', '2': '••–––', '3': '•••––', '4': '••••–',
    '5': '•••••', '6': '–••••', '7': '––•••', '8': '–––••', '9': '––––•',
    '0': '–––––', ' ': '/'
};

const reverseMorseDict = Object.fromEntries(
    Object.entries(morseDict).map(([key, value]) => [value, key])
);

const textToMorse = (text) => {
    return text.toLowerCase().split('').map(char => {
        return morseDict[char] || char;
    }).join(' ');
};

const morseToText = (morse) => {
    return morse.split(/\/|\s/).map(word => {
        return word.split(' ').map(char => reverseMorseDict[char] || char).join('');
    }).join(' ');
};

const pluginConfig = {
  name: "morse",
  category: "tools",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { text, command, prefix }) {
    const usedPrefix = prefix || m.prefix || ".";
    const isEncode = command === 'morse';
    const inputText = text || (m.quoted && m.quoted.text) || '';
    
    if (!inputText) {
        const example = isEncode ? 'hello world' : '•– / –••• / –•–• / –•• / •';
        return m.reply(`Masukkan ${isEncode ? 'teks' : 'kode morse'}!\n\nContoh:\n${usedPrefix}${command} ${example}`);
    }

    try {
        const result = isEncode ? textToMorse(inputText) : morseToText(inputText);
        m.reply(result);
    } catch (e) {
        m.reply('Terjadi kesalahan dalam konversi');
    }
};

export { pluginConfig as config, handler };
