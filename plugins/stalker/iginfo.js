import axios from "axios";
import { randomUUID } from "node:crypto";
import config from "../../config.js";

const pluginConfig = {
  name: "iginfo",
  category: "stalker",
  description: "Menampilkan informasi profil Instagram dalam HTML Rich View 9:16",
  usage: ".iginfo <username|url>",
  example: ".iginfo instagram",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 5,
  isEnabled: true,
};

const UA = "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/138 Mobile Safari/537.36";
const ANITA_TELEGRAM = "https://t.me/anitaputri";
const INSTAGRAM_API = "https://firefly.maiku.my.id/api/stalk-instagram";

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsEsc(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function safeUrl(value = "") {
  try {
    const url = new URL(String(value).trim());
    if (!["http:", "https:"].includes(url.protocol)) return "";
    return url.href;
  } catch {
    return "";
  }
}

function normalizeUsername(input = "") {
  let value = String(input).trim();
  if (!value) return "";

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.hostname.toLowerCase().replace(/^www\./, "") === "instagram.com") {
      value = url.pathname.split("/").filter(Boolean)[0] || "";
    }
  } catch {
    value = value.replace(/^@/, "").split(/[/?#]/)[0];
  }

  return value.replace(/^@/, "").trim();
}

function shortNum(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(Math.trunc(num));
}

function makeHtml(data) {
  const username = esc(data.username || "-");
  const fullName = esc(data.full_name || "-");
  const bio = esc(data.bio || "Tidak ada bio.").replace(/\r?\n/g, "<br>");
  const profilePic = safeUrl(data.profile_pic);
  const profile = esc(profilePic || "");
  const followers = esc(shortNum(data.stats?.followers));
  const following = esc(shortNum(data.stats?.following));
  const posts = esc(shortNum(data.stats?.posts));
  const verified = Boolean(data.is_verified);
  const privateAccount = Boolean(data.is_private);
  const igUrl = safeUrl(`https://www.instagram.com/${encodeURIComponent(data.username || "")}`);
  const ig = esc(igUrl);
  const telegram = esc(ANITA_TELEGRAM);
  const responseId = jsEsc(randomUUID());

  return `<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none}
html,body{margin:0;width:100%;min-height:100%;background:#07080c;color:#fff;font-family:Arial,Helvetica,sans-serif}
body{padding:0;display:flex;justify-content:center;align-items:flex-start}
.screen{position:relative;width:min(100vw,440px);height:min(100dvh,calc(min(100vw,440px)*16/9));aspect-ratio:9/16;min-height:560px;overflow:hidden;background:#0d0f15}
.bg{position:absolute;inset:-32px;background:center/cover no-repeat url('${profile}');filter:blur(34px);opacity:.32;transform:scale(1.15)}
.overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,7,11,.30),rgba(6,7,11,.72) 44%,#07080c 100%)}
.content{position:relative;z-index:2;height:100%;padding:18px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.brand{font-size:12px;font-weight:800;letter-spacing:1.3px}.credit{font-size:10px;opacity:.55;margin-top:4px}
.avatarWrap{display:flex;justify-content:center;margin-top:8%}.avatar{width:31%;max-width:128px;aspect-ratio:1;border-radius:50%;padding:4px;background:rgba(255,255,255,.14);box-shadow:0 12px 40px rgba(0,0,0,.45)}
.avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:#151821}
.name{text-align:center;margin-top:15px;font-size:23px;font-weight:800;word-break:break-word}.handle{text-align:center;margin-top:5px;font-size:13px;opacity:.62}
.badges{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;margin-top:12px}.badge{padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.10);font-size:10px;font-weight:700}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:24px}.stat{padding:13px 8px;text-align:center;border-radius:15px;background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.09)}.num{font-size:17px;font-weight:800}.label{font-size:9px;opacity:.52;margin-top:4px;text-transform:uppercase;letter-spacing:.6px}
.bio{margin-top:14px;padding:13px 14px;border-radius:15px;background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.08);font-size:11px;line-height:1.55;max-height:96px;overflow:hidden}.bioTitle{font-size:9px;letter-spacing:.8px;opacity:.45;margin-bottom:5px;font-weight:800}
.actions{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:9px}.btn{display:flex;align-items:center;justify-content:center;text-decoration:none;color:#fff;min-height:43px;border-radius:14px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.11);font-size:11px;font-weight:800}.btn.primary{background:#fff;color:#090a0f}
.footer{text-align:center;font-size:9px;opacity:.4;margin-top:10px}.footer a{color:inherit;text-decoration:none}
@media(max-height:620px){.content{padding:13px}.avatarWrap{margin-top:3%}.name{font-size:20px}.stats{margin-top:13px}.bio{margin-top:9px;padding:9px 11px}.btn{min-height:38px}}
</style>
<div class="screen" data-response-id="${esc(responseId)}">
  <div class="bg"></div><div class="overlay"></div>
  <div class="content">
    <div class="top"><div><div class="brand">INSTAGRAM INFO</div><div class="credit">By Anita</div></div><div class="badge">RIMURU MD</div></div>
    <div class="avatarWrap"><div class="avatar">${profile ? `<img src="${profile}" alt="Instagram profile">` : ""}</div></div>
    <div class="name">${fullName}</div>
    <div class="handle">@${username}</div>
    <div class="badges"><div class="badge">${verified ? "✓ Verified" : "○ Not Verified"}</div><div class="badge">${privateAccount ? "🔒 Private" : "🌐 Public"}</div></div>
    <div class="stats"><div class="stat"><div class="num">${followers}</div><div class="label">Followers</div></div><div class="stat"><div class="num">${following}</div><div class="label">Following</div></div><div class="stat"><div class="num">${posts}</div><div class="label">Posts</div></div></div>
    <div class="bio"><div class="bioTitle">BIO</div>${bio}</div>
    <div class="actions"><a class="btn primary" href="${ig}" target="_blank" rel="noopener">Open Instagram</a><a class="btn" href="${telegram}" target="_blank" rel="noopener">Telegram • Anita</a></div>
    <div class="footer">Fitur by Anita Putri Azzahra • <a href="${telegram}" target="_blank" rel="noopener">t.me/anitaputri</a></div>
  </div>
</div>`;
}

async function sendHTMLRichMessage(sock, chatId, username, html, fallbackText) {
  const responseId = randomUUID();
  const imageUrl = "https://files.catbox.moe/h87kyf.png";
  try {
    return await sock.relayMessage(
      chatId,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: { messageDisclaimerText: "", botResponseId: responseId },
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{ messageType: 2, messageText: "Instagram Info • By Anita" }],
              unifiedResponse: {
                data: Buffer.from(JSON.stringify({
                  response_id: responseId,
                  sections: [
                    {
                      view_model: {
                        primitives: [{
                          title: "Instagram Info",
                          subtitle: "By Anita",
                          secondary_subtitle: "",
                          image: { url: imageUrl, mime_type: "image/png" },
                          entity_id: "123456",
                          entity_url: "t.me/anitaputri",
                          entity_type: "WEBSITE",
                          action_type: "OPEN_URL",
                          is_verified: true,
                          __typename: "GenAICompactEntityPrimitive",
                        }],
                        __typename: "GenAIActionRowLayoutViewModel",
                      },
                    },
                    {
                      view_model: {
                        primitives: [{ type: "HORIZONTAL_LINE", __typename: "GenAIDividerPrimitive" }],
                        __typename: "GenAIVStackLayoutViewModel",
                      },
                    },
                    {
                      view_model: {
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          trusted_sources: [],
                        },
                        __typename: "GenAISingleLayoutViewModel",
                      },
                    },
                    {
                      view_model: {
                        primitives: [{
                          text: `# {{social_entity_1}}@${String(username).replace(/[\r\n]/g, "")}\0{{/social_entity_1}}`,
                          inline_entities: [{
                            key: "social_entity_1",
                            metadata: {
                              __typename: "GenAISocialEntityItem",
                              entity_id: String(username),
                              entity_name: String(username),
                              entity_full_name: String(username),
                              entity_picture_url: imageUrl,
                              entity_url: `https://www.instagram.com/${encodeURIComponent(username)}`,
                              entity_type: "IG_PROFILE",
                              is_verified: false,
                            },
                          }],
                          __typename: "GenAIMarkdownTextUXPrimitive",
                        }],
                        __typename: "GenAIActionRowLayoutViewModel",
                      },
                    },
                  ],
                })).toString("base64"),
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "867051314767696@bot" },
                forwardOrigin: 4,
              },
            },
          },
        },
      },
      { messageId: responseId },
    );
  } catch (error) {
    if (fallbackText && typeof sock?.sendMessage === "function") {
      return sock.sendMessage(chatId, { text: fallbackText });
    }
    throw error;
  }
}

async function handler(m, { sock }) {
  const username = normalizeUsername(m.args?.[0] || "");
  if (!username) {
    return m.reply(
      `📸 *INSTAGRAM INFO*\n\n` +
      `Masukkan username atau URL Instagram.\n\n` +
      `Contoh: \`${m.prefix}iginfo cristiano\`\n` +
      `Contoh: \`${m.prefix}iginfo https://instagram.com/cristiano\``
    );
  }

  if (!/^[A-Za-z0-9._]{1,30}$/.test(username)) {
    return m.reply("❌ Username Instagram tidak valid.");
  }

  const apiKey = config.APIkey?.firefly;
  if (!apiKey) {
    return m.reply("❌ API key Firefly belum tersedia di config.");
  }

  await m.react("🔍");

  try {
    const response = await axios.get(INSTAGRAM_API, {
      params: { apikey: apiKey, username },
      timeout: 30000,
      headers: { "user-agent": UA, accept: "application/json" },
    });

    const data = response.data?.data;
    if (!response.data?.status || !data?.username) {
      await m.react("❌");
      return m.reply(`❌ Akun Instagram *@${username}* tidak ditemukan atau tidak dapat diambil.`);
    }

    const html = makeHtml(data);
    const fallback =
      `📸 *INSTAGRAM INFO*\n\n` +
      `👤 Username: @${data.username}\n` +
      `📛 Nama: ${data.full_name || "-"}\n` +
      `✅ Verified: ${data.is_verified ? "Ya" : "Tidak"}\n` +
      `🔒 Private: ${data.is_private ? "Ya" : "Tidak"}\n\n` +
      `👥 Followers: ${shortNum(data.stats?.followers)}\n` +
      `👤 Following: ${shortNum(data.stats?.following)}\n` +
      `📷 Posts: ${shortNum(data.stats?.posts)}\n\n` +
      `📝 Bio: ${data.bio || "-"}\n\n` +
      `🔗 https://instagram.com/${data.username}`;

    await sendHTMLRichMessage(sock, m.chat, data.username, html, fallback);
    await m.react("✅");
  } catch (error) {
    console.error("[IGINFO]", error?.stack || error?.message || error);
    await m.react("❌");
    return m.reply(`❌ Gagal mengambil data Instagram: ${error?.response?.data?.message || error?.message || "Unknown error"}`);
  }
}

export default { config: pluginConfig, handler };
