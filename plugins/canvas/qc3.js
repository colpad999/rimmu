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
    name: "qc3",
    category: "canvas",
    description: "Membuat Fake Quote iOS style dengan informasi baterai dan provider.",
    usage: ".iqc2 [text/reply]",
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 2,
    isEnabled: true,
};

async function getImageBuffer(apiUrl) {
    const response = await fetch(apiUrl, {
        headers: { Accept: "image/*,application/json,text/plain;q=0.9,*/*;q=0.8" },
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) {
        throw new Error(`API IQC2 gagal (${response.status})`);
    }

    if (contentType.includes("image")) {
        return Buffer.from(await response.arrayBuffer());
    }

    const raw = await response.text();
    let data;
    try {
        data = JSON.parse(raw);
    } catch {
        throw new Error("API IQC2 mengembalikan respons yang tidak valid");
    }

    const imageUrl =
        (typeof data?.result === "string" && data.result) ||
        data?.result?.url ||
        data?.result?.image ||
        data?.url ||
        data?.image;

    if (!imageUrl) {
        throw new Error(data?.message || "Hasil gambar IQC2 tidak ditemukan");
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Gambar hasil IQC2 gagal diambil");
    return Buffer.from(await imageResponse.arrayBuffer());
}

async function handler(m, { sock, text }) {
    try {
        const targetText = text || (m.quoted && m.quoted.text ? m.quoted.text : "");

        if (!targetText) {
            return m.reply(
                `Halo *${m.pushName}*, sepertinya kamu belum memasukkan teksnya.\n\n` +
                `Silakan gunakan perintah dengan format:\n` +
                `- .iqc2 <teks kamu>\n` +
                `- Atau balas (reply) pesan orang lain dengan .iqc2`
            );
        }

        await m.react("🕕");

        const providers = ["INDOSAT", "TELKOMSEL", "XL", "TRI", "SMARTFREN", "WIFI"];
        const randomProvider = providers[Math.floor(Math.random() * providers.length)];
        const now = new Date();
        const jam = now
            .toLocaleTimeString("id-ID", {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace('.', ':');
        const randomBaterai = Math.floor(Math.random() * 91) + 10;

        // Fetch server-side first; WhatsApp no longer has to dereference the API URL itself.
        const apiUrl =
            `https://api.nexray.eu.cc/maker/v1/iqc?text=${encodeURIComponent(targetText)}` +
            `&provider=${encodeURIComponent(randomProvider)}` +
            `&jam=${encodeURIComponent(jam)}` +
            `&baterai=${randomBaterai}`;

        const imageBuffer = await getImageBuffer(apiUrl);

        await sock.sendMessage(
            m.chat,
            { image: imageBuffer, caption: "✨ *Fake Quote iOS v1 Generated!*" },
            { quoted: m }
        );

        await m.react("✅");
    } catch (error) {
        console.error("[IQC2 Plugin Error]", error);
        await m.react("❌");
        await m.reply(
            `Maaf *${m.pushName}*, terjadi kesalahan saat mencoba membuat gambar quote.\n\n> ${error?.message || "Silakan coba lagi beberapa saat."}`
        );
    }
}

export { pluginConfig as config, handler };
