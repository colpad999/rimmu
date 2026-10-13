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

/*
Jangan Hapus Wm Bang 

*Credits Card Generator  Plugins Esm*

Ya Bgtu Lah Bisa Di Pake Jga GK tawu

*[Sumber]*
https://whatsapp.com/channel/RIMURU_CHANNEL

*[Sumber Scrape]*

Gaada 
*/

import axios from 'axios';

let handler = async (m, { text, args }) => {
  let [type, jumlah] = args;

  if (!type || !jumlah) {
    return m.reply(`Contoh penggunaan:\nccgen Visa 5\n\nPilihan type:\n1. Visa\n2. MasterCard\n3. American Express\n4. JCB\n\nJumlah: 5 - 20`);
  }

  let allowedTypes = ['Visa', 'MasterCard', 'American Express', 'JCB'];
  if (!allowedTypes.includes(type)) {
    return m.reply(`Tipe kartu tidak valid.\nGunakan salah satu dari:\n${allowedTypes.join('\n')}`);
  }

  let jumlahNum = parseInt(jumlah);
  if (isNaN(jumlahNum) || jumlahNum < 5 || jumlahNum > 20) {
    return m.reply(`Jumlah kartu harus antara 5 sampai 20.`);
  }

  let encodedType = encodeURIComponent(type);
  let url = `https://backend.lambdatest.com/api/dev-tools/credit-card-generator?type=${encodedType}&no-of-cards=${jumlahNum}`;

  try {
    let { data } = await axios.get(url);
    if (!Array.isArray(data) || data.length === 0) {
      return m.reply('Gagal Dapat Respon Nya');
    }

    let hasil = `*Generated ${type} Credit Cards (${jumlahNum}) :*\n\n`;
    data.forEach((card, i) => {
      hasil += `*${i + 1}.* ${card.name}\n• Number : ${card.number}\n• CVV : ${card.cvv}\n• Expired : ${card.expiry}\n\n`;
    });

    m.reply(hasil.trim());
  } catch (e) {
    console.error(e);
    m.reply('Error Cba Lagi Nanti');
  }
};

handler.help = ['ccgen <type> <jumlah>'];
handler.command = ['ccgen'];
handler.tags = ['tools']
export default handler;
