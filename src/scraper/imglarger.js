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
import fs from "fs";
import path from "path";

class ImgUpscaler {
  constructor() {
    this.baseUrl = "https://get1.imglarger.com";
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      Origin: "https://imgupscaler.com",
      Referer: "https://imgupscaler.com/",
    };
  }

  async uploadImage(imagePath) {
    const form = new FormData();
    const filename = path.basename(imagePath);
    form.append("myfile", fs.createReadStream(imagePath), filename);
    form.append("scaleRadio", "2");

    const response = await axios.post(
      `${this.baseUrl}/api/UpscalerNew/UploadNew`,
      form,
      {
        headers: {
          ...this.headers,
          ...form.getHeaders(),
        },
        timeout: 120000,
      },
    );

    return response.data;
  }

  async checkStatus(code) {
    const response = await axios.post(
      `${this.baseUrl}/api/UpscalerNew/CheckStatusNew`,
      {
        code,
        scaleRadio: 2,
      },
      {
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      },
    );

    return response.data;
  }

  async waitForResult(code) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const result = await this.checkStatus(code);
      const data = result?.data || {};
      const hasDownload = Array.isArray(data.downloadUrls)
        ? Boolean(data.downloadUrls[0])
        : Boolean(data.download_url || data.img_url);
      const isSuccess = data.status === "success" || hasDownload;

      if (result?.code === 200 && isSuccess) {
        return result;
      }

      attempts += 1;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    throw new Error(`Timeout after ${maxAttempts} attempts`);
  }

  async process(imagePath) {
    const upload = await this.uploadImage(imagePath);
    const code = upload?.data?.code;

    if (!code) {
      throw new Error("ImgLarger upload failed to return code");
    }

    const result = await this.waitForResult(code);

    return {
      upload,
      result,
    };
  }
}

export default ImgUpscaler;
