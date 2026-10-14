//

import axios from "axios";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "cosplayba",
  category: "random",
  description: "Random gambar cosplay Blue Archive",
  usage: ".cosba",
  example: ".cosba",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  await m.react("🕕");
  try {
    const res = await axios.get("https://api.ryuu-dev.offc.my.id/random/cosplay-ba", {
      responseType: "arraybuffer",
      timeout: 30000,
    });
    if (!res?.data?.length) throw new Error("API tidak mengembalikan gambar");
    await sock.sendMessage(m.chat, {
      image: Buffer.from(res.data),
      caption: "✅ *Random Blue Archive Cosplay*",
    }, { quoted: m });
    await m.react("✅");
  } catch (e) {
    console.error("[CosBA]", e?.message || e);
    await m.react("❌");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
