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
  name:'gojoquote',
  category:"fun",
  description:"Fitur tema Gojo sederhana yang tidak tersedia di Rimuru.",
  usage:".gquote",
  example:".gquote",
  isOwner:false,isPremium:false,isGroup:false,isPrivate:false,cooldown:3,energi:0,isEnabled:true
};

const DATA={
 gquote:[
  "Percaya diri boleh, tapi tetap belajar dari kesalahan.",
  "Kekuatan terbaik adalah kemampuan untuk tetap tenang saat keadaan kacau.",
  "Jangan menunggu sempurna untuk mulai menjadi lebih baik."
 ],
 gfact:[
  "Satoru Gojo adalah karakter dari Jujutsu Kaisen.",
  "Gojo dikenal sebagai penyihir jujutsu yang sangat kuat.",
  "Six Eyes dan Limitless adalah bagian penting dari kemampuan Gojo."
 ],
 ghype:[
  "⚡ Fokus. Tenang. Jangan panik.",
  "🔥 Saatnya naik level, bukan menyerah.",
  "🌀 Mode serius aktif. Tetap santai, tetap tajam."
 ],
 gpower:[
  "🔵 Limitless — manipulasi ruang.",
  "🟣 Hollow Purple — teknik gabungan Blue dan Red.",
  "👁️ Six Eyes — kemampuan mata khusus Gojo."
 ],
 gtech:[
  "🔵 Blue — teknik tarik berbasis Limitless.",
  "🔴 Red — teknik dorong berbasis Limitless.",
  "🟣 Purple — serangan gabungan Blue dan Red."
 ]
};

async function handler(m){
 const c=(m.command||"").toLowerCase();
 const list=DATA[c]||DATA.gquote;
 return m.reply(list[Math.floor(Math.random()*list.length)]);
}
export {pluginConfig as config,handler};
