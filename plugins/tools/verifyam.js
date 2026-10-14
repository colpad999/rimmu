//

/** Digabung ke .amprem */
const pluginConfig = {
  name: "verifyam",
  category: "tools",
  description: "Alias: verifikasi AM (pakai .amprem)",
  usage: ".amverif → gunakan .amprem",
  isOwner: false,
  isPremium: false,
  isEnabled: true,
  cooldown: 5,
};

async function handler(m, { prefix }) {
  return m.reply(
    `ℹ️ Verifikasi digabung ke *${prefix || "."}amprem*\n` +
      `Reply magic link pada sesi amprem, atau ikuti instruksi bot.`
  );
}
export const config = pluginConfig;
export { handler };
export default { config: pluginConfig, handler };
