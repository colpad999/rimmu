import { config as autobackupConfig, handler } from "./autobackup.js";

const pluginConfig = { ...autobackupConfig, name: "ab" };

export { pluginConfig as config, handler };
