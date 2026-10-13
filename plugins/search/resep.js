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

import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";
import { getDatabase } from "../../src/lib/rimuru-database.js";

const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";

const pluginConfig = {
    name: "resep",
    category: "search",
    description: "Cari resep makanan yang lengkap dan enak",
    usage: ".resep <nama makanan>",
    example: ".resep ayam geprek",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true,
};

async function handler(m, { sock, text }) {
    if (!text) {
        return m.reply(`🍳 *PENCARIAN RESEP*\n\nKetik nama makanan yang mau dicari resepnya.\n*Contoh:* ${m.prefix}resep Nasi Goreng`);
    }

    await m.react("🕕");

    try {
        const query = encodeURIComponent(text.trim());
        const searchUrl = `https://api.neoxr.eu/api/resep-search?q=${query}&apikey=${NEOXR_APIKEY}`;

        const response = await axios.get(searchUrl, { timeout: 30000 });
        const data = response.data;

        if (!data || !data.status || !data.data || data.data.length === 0) {
            await m.react("❌");
            return m.reply(`Maaf, resep untuk "${text}" tidak ditemukan. Coba kata kunci lain.`);
        }

        const maxResults = Math.min(data.data.length, 10);
        let listTxt = `🍳 *HASIL PENCARIAN RESEP: ${text.toUpperCase()}*\n\n`;
        listTxt += `Ditemukan beberapa resep nih, pilih salah satu ya:\n\n`;

        const searchResults = [];

        for (let i = 0; i < maxResults; i++) {
            const item = data.data[i];
            searchResults.push({
                name: item.name,
                url: item.url
            });
            listTxt += `*${i + 1}.* ${item.name}\n`;
        }

        listTxt += `\n> 💡 *Kirim angka (contoh: 1)* untuk melihat detail resepnya, atau ketik \`batal\` untuk membatalkan pencarian.`;
        const db = getDatabase();
        const user = db.getUser(m.sender);

        user.resep_session = {
            results: searchResults,
            time: Date.now()
        };
        db.save();

        await m.react("✅");
        await m.reply(listTxt);

    } catch (error) {
        console.error("[RESEP Plugin Error]", error);
        await m.react("☢");
        m.reply(te(m.prefix, m.command, m.pushName));
    }
}

async function resepAnswerHandler(m, sock) {
    if (!m.body || m.isCommand) return false;
    const db = getDatabase();
    const user = db.getUser(m.sender);
    if (!user || !user.resep_session) return false;

    const session = user.resep_session;
    const SESSION_TIMEOUT = 5 * 60 * 1000;

    if (Date.now() - session.time > SESSION_TIMEOUT) {
        delete user.resep_session;
        db.save();
        await m.reply(`⏰ *SESI KEDALUWARSA*\n\nSesi pencarian resep sudah berakhir karena lebih dari 5 menit. Silakan ketik perintah .resep lagi.`);
        return true;
    }

    const text = m.body.trim().toLowerCase();

    if (text === "batal" || text === "cancel") {
        delete user.resep_session;
        db.save();
        await m.reply(`🚪 Pencarian resep dibatalkan.`);
        return true;
    }

    const choice = parseInt(text);
    if (isNaN(choice) || choice < 1 || choice > session.results.length) {
        return false;
    }

    const selectedRecipe = session.results[choice - 1];
    delete user.resep_session;
    db.save();

    await m.react("🕕");

    try {
        const detailUrl = `https://api.neoxr.eu/api/resep?url=${encodeURIComponent(selectedRecipe.url)}&apikey=${NEOXR_APIKEY}`;
        const detailResponse = await axios.get(detailUrl, { timeout: 30000 });
        const resData = detailResponse.data;

        if (!resData || !resData.status || !resData.data) {
            await m.react("❌");
            return m.reply(`Maaf, gagal mengambil detail resep untuk "${selectedRecipe.name}".`);
        }

        const recipe = resData.data;
        let recipeTxt = `👨‍🍳 *${recipe.title.toUpperCase()}* 👩‍🍳\n\n`;
        recipeTxt += `⏱️ *Waktu:* ${recipe.timeout || "-"}\n`;
        recipeTxt += `🍽️ *Porsi:* ${recipe.portion || "-"}\n\n`;

        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipeTxt += `*🥬 BAHAN-BAHAN:*\n`;
            recipe.ingredients.forEach(bahan => {
                recipeTxt += `- ${bahan}\n`;
            });
            recipeTxt += `\n`;
        }

        if (recipe.steps && recipe.steps.length > 0) {
            recipeTxt += `*🍳 CARA MEMBUAT:*\n`;
            recipe.steps.forEach((step, index) => {
                recipeTxt += `*${index + 1}.* ${step}\n\n`;
            });
        }

        await m.react("✅");

        if (recipe.thumbnail) {
            await sock.sendMessage(m.chat, {
                image: { url: recipe.thumbnail },
                caption: recipeTxt
            }, { quoted: m });
        } else {
            await m.reply(recipeTxt);
        }

    } catch (error) {
        console.error("[RESEP Detail Error]", error);
        await m.react("☢");
        await m.reply(`Terjadi kesalahan saat memuat resep. Silakan coba lagi.`);
    }

    return true;
}

export { pluginConfig as config, handler, resepAnswerHandler };
