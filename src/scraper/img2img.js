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
import FormData from "form-data";
import config from "../../config.js";

const FCSI_API = "https://fgsi.dpdns.org/api/ai/image/img2img";

async function Uguu(buffer, filename) {
  const form = new FormData();
  form.append("files[]", buffer, { filename, contentType: "image/png" });

  const res = await axios.post("https://uguu.se/upload.php", form, {
    headers: form.getHeaders(),
    timeout: 30000,
  });

  if (res.data?.files?.[0]?.url) {
    return res.data.files[0].url;
  }

  throw new Error("Upload ke Uguu gagal");
}

async function Img2Img(prompt, imageBuffer, filename = "upload.png") {
  const imageUrl = await Uguu(imageBuffer, filename);

  const apiKey = config.APIkey?.fgsi || "";
  const startUrl = `${FCSI_API}?apikey=${apiKey}&prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(imageUrl)}`;

  const start = await axios.get(startUrl, { timeout: 30000 });

  const pollUrl = start.data?.data?.pollUrl;
  if (!pollUrl) {
    return {
      status: false,
      error: start.data?.error || "Gagal memulai proses img2img",
    };
  }

  let result = null;
  const maxAttempts = 60;

  for (let i = 0; i < maxAttempts; i++) {
    const poll = await axios.get(pollUrl, { timeout: 30000 });

    if (!poll.data?.status) {
      return { status: false, error: "Polling gagal" };
    }

    if (poll.data.data?.status === "Success") {
      result = poll.data.data.result;
      break;
    }

    if (poll.data.data?.status === "Failed") {
      return { status: false, error: "Proses img2img gagal" };
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  if (!result) {
    return { status: false, error: "Timeout menunggu hasil" };
  }

  return { status: true, prompt, imageUrl, result };
}

export { Img2Img };
