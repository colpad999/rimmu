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

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  if (user.money == null) user.money = 0;

  if (!user.cafe) {
    user.cafe = {
      name: "Kafe Lezat",
      level: 1,
      capacity: 10,
      stock: 50,
      maxStock: 50,
      customers: 0,
      revenue: 0,
      popularity: 5,
      upgradeCost: 1000000,
      menu: [{ item: "Kopi Hitam", price: 30000 }],
      facilities: ["Meja Kayu"],
      openHours: { start: 8, end: 22 },
      rating: 4.2,
    };
  }

  const cafeStatus = () => `
☕ *Status Kafe - ${user.cafe.name}*
📈 Level: ${user.cafe.level}
👥 Kapasitas: ${user.cafe.capacity}
📦 Stok: ${user.cafe.stock}/${user.cafe.maxStock}
✨ Popularitas: ${user.cafe.popularity}%
⭐ Rating: ${user.cafe.rating}/5
💰 Pendapatan: Rp${user.cafe.revenue.toLocaleString()}
💵 Uang Anda: Rp${user.money.toLocaleString()}

*Perintah Kafe*
• ${usedPrefix}cafemenu
• ${usedPrefix}cafeupgrade
• ${usedPrefix}cafeopen
• ${usedPrefix}cafestock <jumlah>
• ${usedPrefix}cafeadd <nama> <harga>
• ${usedPrefix}caferename <nama>
• ${usedPrefix}cafelist
`;

  const serveCustomers = () => {
    if (user.cafe.stock < user.cafe.capacity)
      return m.reply(`Stok tidak cukup. Beli dulu dengan *${usedPrefix}cafestock*`);

    let maxCustomers = Math.min(
      user.cafe.capacity,
      Math.floor(user.cafe.popularity / 10) + Math.floor(Math.random() * 5)
    );

    let totalIncome = 0;
    for (let i = 0; i < maxCustomers; i++) {
      let menuItem = user.cafe.menu[Math.floor(Math.random() * user.cafe.menu.length)];
      totalIncome += Math.floor(menuItem.price * ((user.cafe.rating / 5) + Math.random() * 0.2));
    }

    user.cafe.stock -= maxCustomers;
    user.cafe.revenue += totalIncome;
    user.money += totalIncome;
    user.cafe.popularity += Math.floor(Math.random() * 3);

    m.reply(`🍽️ Melayani ${maxCustomers} pelanggan\n💰 Rp${totalIncome.toLocaleString()}`);
  };

  const upgradeCafe = () => {
    if (user.money < user.cafe.upgradeCost)
      return m.reply(`Uang tidak cukup! Butuh Rp${user.cafe.upgradeCost.toLocaleString()}`);

    user.money -= user.cafe.upgradeCost;
    user.cafe.level++;
    user.cafe.capacity += 10;
    user.cafe.maxStock *= 2;
    user.cafe.stock *= 2;
    user.cafe.popularity += 5;
    user.cafe.upgradeCost = Math.floor(user.cafe.upgradeCost * 1.8);

    m.reply(`☕ Kafe naik ke Level ${user.cafe.level}`);
  };

  const buyStock = (amount) => {
    const maxBuy = user.cafe.maxStock - user.cafe.stock;
    if (amount > maxBuy) amount = maxBuy;

    const cost = amount * 15000;
    if (user.money < cost) return m.reply(`Uang tidak cukup`);

    user.money -= cost;
    user.cafe.stock += amount;

    m.reply(`📦 Beli ${amount} stok`);
  };

  const addMenu = (text) => {
    let args = text.trim().split(/\s+/);
    let price = parseInt(args.pop());
    let item = args.join(" ");

    if (!item || isNaN(price))
      return m.reply(`Format: ${usedPrefix}cafeadd <nama> <harga>`);

    user.cafe.menu.push({ item, price });
    m.reply(`Menu ditambahkan: ${item}`);
  };

  const showMenu = () => {
    let list = user.cafe.menu
      .map((v, i) => `${i + 1}. ${v.item} (Rp${v.price})`)
      .join("\n");
    m.reply(`☕ *Daftar Menu*\n${list}`);
  };

  switch (command) {
    case 'cafemenu':
      m.reply(cafeStatus());
      break;
    case 'cafeopen':
      serveCustomers();
      break;
    case 'cafeupgrade':
      upgradeCafe();
      break;
    case 'cafestock':
      buyStock(parseInt(text));
      break;
    case 'cafeadd':
      addMenu(text);
      break;
    case 'caferename':
      user.cafe.name = text.trim();
      m.reply('Nama kafe diganti');
      break;
    case 'cafelist':
      showMenu();
      break;
  }
};

handler.help = [
  'cafemenu',
  'cafeopen',
  'cafeupgrade',
  'cafestock',
  'cafeadd',
  'caferename',
  'cafelist'
];
handler.tags = ['rpg'];
handler.command = /^(cafemenu|cafeopen|cafeupgrade|cafestock|cafeadd|caferename|cafelist)$/i;
handler.register = true;
handler.limit = true;

export default handler;
