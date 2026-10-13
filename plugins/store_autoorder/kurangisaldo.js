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

import { getDatabase } from "../../src/lib/rimuru-database.js";

const pluginConfig = {
    name: "kurangisaldo",
    category: "store_autoorder",
    description: "💰 Mengurangi saldo pengguna secara manual",
    usage: ".kurangisaldo @user <nominal>",
    example: ".kurangisaldo @user 10000",
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 0,
    energi: 0,
    isEnabled: true,
};

function formatPrice(n) {
    return "Rp " + n.toLocaleString("id-ID");
}

async function handler(m, { sock }) {
    const db = getDatabase();
    
    let targetUser = null;
    if (m.quoted) {
        targetUser = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        targetUser = m.mentionedJid[0];
    }
    
    const args = m.text?.replace(/@\d+/g, '').trim().split(/\s+/) || [];
    const amount = parseInt(args[0] || args[1]);

    if (!targetUser || isNaN(amount) || amount <= 0) {
        return m.reply(
            `⚠️ *Format Salah*\n\n` +
            `Gunakan: \`${m.prefix}kurangisaldo @user <nominal>\`\n` +
            `Atau reply pesan user lalu ketik: \`${m.prefix}kurangisaldo <nominal>\`\n\n` +
            `Contoh: \`${m.prefix}kurangisaldo @user 50000\``
        );
    }

    await m.react("🕕");
    
    const user = db.getUser(targetUser) || db.setUser(targetUser);
    if (user.saldo < amount) {
        return m.reply(`❌ *Saldo Tidak Cukup*\n\nUser *@${targetUser.split('@')[0]}* hanya memiliki saldo *${formatPrice(user.saldo || 0)}*.`, { mentions: [targetUser] });
    }
    
    const newSaldo = db.updateSaldo(targetUser, -amount);
    const targetName = targetUser.split('@')[0];
    
    await m.reply(
        `✅ *BERHASIL MENGURANGI SALDO*\n\n` +
        `👤 User: *@${targetName}*\n` +
        `➖ Dikurangi: *${formatPrice(amount)}*\n` +
        `💰 Saldo Sekarang: *${formatPrice(newSaldo)}*`,
        { mentions: [targetUser] }
    );
}

export { pluginConfig as config, handler };
