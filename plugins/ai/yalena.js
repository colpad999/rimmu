//

import { UnlimitedAI } from "../../src/scraper/unlimitedai.js";
import te from "../../src/lib/yalena-error.js";

const pluginConfig = {
  name: "yalena",
  category: "ai",
  description: "Chat dengan Yalena AI — Asisten bot cerdas",
  usage: ".yalena-ai <pertanyaan>",
  example: ".yalena-ai Apa itu Node.js?",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");
  if (!text) {
    return m.reply(
      `🤖 *Yalena AI*\n\n` +
        `> Asisten cerdas siap membantu\n\n` +
        `*PENGGUNAAN:*\n` +
        `> *${m.prefix}yalena-ai <pertanyaan>*\n\n` +
        `*CONTOH:*\n` +
        `> *${m.prefix}yalena-ai Apa itu Node.js?*`
    );
  }

  await m.react("🕕");

  try {
    const result = await UnlimitedAI(text, "yalena-ai");

    if (!result.status) {
      await m.react("☢");
      return m.reply(`❌ *Yalena AI Error*\n\n> ${result.error || "Gagal mendapatkan respons"}`);
    }

    await m.react("✅");
    const reply = result.answer;
    await m.reply(reply.length > 4096 ? reply.slice(0, 4096) + "..." : reply);
  } catch (e) {
    console.error(e);
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };