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

const pluginConfig = {
    name: 'rekanime',
    category: 'anime',
    description: 'Rekomendasi anime random',
    usage: '.rekom-anime',
    example: '.rekom-anime',
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {

const list = [

"Attack on Titan",
"Death Note",
"Fullmetal Alchemist Brotherhood",
"Steins Gate",
"Code Geass",
"Hunter x Hunter",
"Demon Slayer",
"Jujutsu Kaisen",
"Tokyo Ghoul",
"One Punch Man",
"Mob Psycho 100",
"Vinland Saga",
"Chainsaw Man",
"Your Lie in April",
"Clannad After Story",
"Toradora",
"Horimiya",
"Kaguya-sama Love is War",
"My Dress Up Darling",
"Angel Beats",

"No Game No Life",
"Re Zero",
"Sword Art Online",
"Overlord",
"Konosuba",
"Tensei Slime",
"Mushoku Tensei",
"Log Horizon",
"Shield Hero",
"Dr Stone",

"Made in Abyss",
"Erased",
"Parasyte",
"Akame ga Kill",
"Black Clover",
"Blue Exorcist",
"Noragami",
"Fire Force",
"Soul Eater",
"Haikyuu",

"Kuroko no Basket",
"Blue Lock",
"Yuri on Ice",
"Sk8 the Infinity",
"Free",
"Initial D",
"Megalo Box",
"Ping Pong the Animation",
"Run With The Wind",

"Neon Genesis Evangelion",
"Gurren Lagann",
"86 Eighty Six",
"Darling in the Franxx",
"Aldnoah Zero",
"Eureka Seven",
"Gundam Iron Blooded Orphans",
"SSSS Gridman",
"Macross Frontier",

"Bocchi the Rock",
"Carole and Tuesday",
"Vivy Fluorite Eye Song",
"Zombieland Saga",
"K-On",
"Sound Euphonium",
"Beck",
"Nana",
"Given",

"Monster",
"Berserk",
"Fate Zero",
"Fate Stay Night",
"Fate Apocrypha",
"Akudama Drive",
"Cyberpunk Edgerunners",
"Odd Taxi",
"Great Pretender",
"Bungo Stray Dogs",

"Dorohedoro",
"Heavenly Delusion",
"Summertime Rendering",
"Golden Kamuy",
"Dororo",
"Kabaneri of the Iron Fortress",
"Seraph of the End",
"The Promised Neverland",
"Classroom of the Elite",
"Tomodachi Game"

]

const anime = list[Math.floor(Math.random()*list.length)]

let text

if (anime === "Darling in the Franxx") {

m.react("😍")

text =
`╭━━━〔 💗 RIMURU FAVORITE 💗 〕━━⬣
┃
┃ EH?! DARLING!! 😳
┃
┃ Rimuru sangat merekomendasikan
┃ anime ini!!
┃
┃ 📺 Judul :
┃ ${anime}
┃
┃ Ini anime tentang
┃ *Rimuru* loh!! 💕
┃
┃ Darling wajib nonton!!
┃ SERIUS!! 😆✨
┃
┃ Nanti bilang ya
┃ Rimuru paling lucu 😏
┃
╰━━━━━━━━━━━━━━━━⬣`

} else {

m.react("✨")

text =
`╭━━━〔 🎌 REKOMENDASI ANIME 🎌 〕━━⬣
┃
┃ Rimuru punya
┃ rekomendasi anime nih~
┃
┃ 📺 Judul :
┃ ${anime}
┃
┃ Coba tonton ini ya
┃ darling 😋
┃
╰━━━━━━━━━━━━━━━━⬣`

}

m.reply(text)

}

export { pluginConfig as config, handler };
