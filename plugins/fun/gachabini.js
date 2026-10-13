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

import fs from 'fs';
import path from 'path';
const pluginConfig = {
    name: "gachabini",
    category: "fun",
    description: "Gacha bini waifu random 300+ karakter",
    usage: ".gachabini",
    isEnabled: true
}

let cachedThumb = null
try {

const thumbPath = path.join(process.cwd(),"assets","images","rimuru-gachabini.jpg")

if(fs.existsSync(thumbPath)){
cachedThumb = fs.readFileSync(thumbPath)
}

} catch(e){
console.log(e)
}

const waifuList = [

"Rimuru","Rem","Ram","Emilia","Satella","Echidna","Beatrice","Priscilla","Crusch",
"Kurisu Makise","Mayuri Shiina","Suzuha Amane",
"Mikasa Ackerman","Annie Leonhart","Historia Reiss","Sasha Blouse","Pieck Finger",
"Hinata Hyuga","Sakura Haruno","Ino Yamanaka","Tsunade","Kushina Uzumaki",
"Asuna Yuuki","Sinon","Leafa","Alice Zuberg",
"Rias Gremory","Akeno Himejima","Koneko Toujou","Asia Argento","Xenovia",
"Yor Forger","Anya Forger","Fiona Frost",
"Mitsuri Kanroji","Shinobu Kocho","Kanao Tsuyuri","Nezuko Kamado","Daki",
"Power","Makima","Himeno","Kobeni","Reze",
"Kaguya Shinomiya","Chika Fujiwara","Ai Hayasaka","Miko Iino",
"Ichika Nakano","Nino Nakano","Miku Nakano","Yotsuba Nakano","Itsuki Nakano",
"Mai Sakurajima","Tomoe Koga","Rio Futaba",
"Lucy Heartfilia","Erza Scarlet","Juvia Lockser","Mirajane Strauss",
"Taiga Aisaka","Minori Kushieda","Ami Kawashima",
"Marin Kitagawa","Sajuna Inui","Shinju Inui",
"Shikimori","Izumi's Mom",
"Nagatoro","Gamo","Yoshi","Sakura Nagatoro",
"Uzaki Hana","Tsuki Uzaki",
"Nazuna Nanakusa","Akira Asai",
"Frieren","Fern","Serie","Ubel",
"Maomao","Gyokuyou",
"Ai Hoshino","Kana Arima","Akane Kurokawa","Ruby Hoshino","Memcho",
"Raphtalia","Filo","Melty",
"Roxy Migurdia","Sylphiette","Eris Boreas",
"Aqua","Darkness","Megumin",
"Hestia","Ais Wallenstein",
"Holo",
"Tohru","Kanna Kamui","Lucoa","Elma",
"Mikoto Misaka","Misaki Shokuhou","Kuroko Shirai",
"Yukino Yukinoshita","Yui Yuigahama","Iroha Isshiki","Shizuka Hiratsuka",
"Rikka Takarada","Akane Shinjo",
"Rukia Kuchiki","Orihime Inoue","Yoruichi",
"Boa Hancock","Nami","Robin","Vivi","Yamato","Uta",
"Bulma","Android 18","Videl",
"Esdeath","Akame","Chelsea","Mine","Leone",
"Shinoa Hiiragi","Krul Tepes",
"Illyasviel","Saber","Rin Tohsaka","Sakura Matou",
"Yuno Gasai","Yuki Amano's Mom",
"Medusa Gorgon",
"Albedo","Shalltear","Aura Bella Fiora",
"Delta","Alpha","Beta","Gamma","Epsilon","Zeta",
"Chisato Nishikigi","Takina Inoue",
"Rebecca (Cyberpunk)","Lucy (Cyberpunk)",
"Anju Emma","Lena (86)",
"Vladilena Milize",
"Vivy",
"Shiraori",
"Anisphia Wynn Palletia","Euphyllia Magenta",
"Akari Watanabe",
"Alya","Yuki Suou",
"Aharen Reina",
"Tomoko Kuroki",
"Menma",
"Haruhi Suzumiya",
"Misato Katsuragi","Asuka Langley","Rei Ayanami",
"Matoi Ryuko","Satsuki Kiryuin",
"Akari Mizunashi",
"Chika Takami","Riko Sakurauchi",
"Honoka Kosaka","Kotori Minami","Umi Sonoda",
"Nico Yazawa","Maki Nishikino","Eli Ayase",
"Hanayo Koizumi","Nozomi Tojo","Rin Hoshizora"

]

async function handler(m,{ sock }){

const name = m.pushName || "Darling"
const waifu = waifuList[Math.floor(Math.random() * waifuList.length)]
const love = Math.floor(Math.random() * 101)

const statusList = [
"💖 Cinta Sejati",
"💘 Pasangan Serasi",
"💕 Jodoh Anime",
"💞 Relationship Goals",
"💓 Bucin Maksimal",
"💔 Hubungan Toxic 🗿"
]

const status = statusList[Math.floor(Math.random()*statusList.length)]

const responses = [

`╔═══『 💍 *GACHA BINI* 』═══╗
┃
┃ 👤 Suami : *${name}*
┃ 👰 Istri : *${waifu}*
┃
┃ 💖 Love Meter : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Omedetou atas pernikahan kalian!
┃ Semoga langgeng selamanya ❤️
┃
╚════════════════════╝`,

`┏━━━〔 👰 *WAIFU FOUND* 〕━━━┓
┃
┃ 🎉 Selamat!!
┃
┃ 👤 *${name}*
┃ ❤️ *${waifu}*
┃
┃ 💘 Kecocokan : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Jangan disia-siakan ya 😉
┃
┗━━━━━━━━━━━━━━━━━━┛`,

`╭────〔 💞 *MATCHMAKING* 〕────╮
│
│ 👤 Player : *${name}*
│ 💖 Waifu : *${waifu}*
│
│ 💓 Love Level : *${love}%*
│ 📊 Status : *${status}*
│
│ Sistem telah menjodohkan kalian
│ secara random 🗿
│
╰────────────────────╯`

]

const reply = responses[Math.floor(Math.random()*responses.length)]

await sock.sendMessage(m.chat,{
image: cachedThumb,
caption: reply
},{quoted:m})

}
export { pluginConfig as config, handler };