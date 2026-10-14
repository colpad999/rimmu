//

import te from "../../src/lib/rimuru-error.js";
import axios from "axios";
import FormData from "form-data";

const pluginConfig = {
  name: "codesnap",
  category: "canvas",
  description: "Bikin gambar cuplikan code",
  usage: ".codesnap <code>",
  example: ".codesnap console.log('hello')",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const code = m.text?.trim() || m.quoted?.text?.trim();

  if (!code) {
    return m.reply(`⚠️ Harap masukkan kodenya!\nContoh: \`${m.prefix}${m.command} console.log('hello')\``);
  }

  await m.react("🕕");
  
  try {
    const form = new FormData();
    form.append("code", code);

    const img = await axios.post(
      "https://carbonara.solopov.dev/api/cook",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Accept: "image/png"
        },
        responseType: "arraybuffer"
      }
    );

    const buffer = Buffer.from(img.data);
    await sock.sendMessage(m.chat, { image: buffer, caption: "💻 *CodeSnap*" }, { quoted: m });
    await m.react("✅");

  } catch (err) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
