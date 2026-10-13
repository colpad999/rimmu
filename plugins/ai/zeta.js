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

/* 
Zeta Voice Audio Effect 
Type : Plugins ESM 
*/
import WebSocket from "ws";
import fs from "fs";

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || q.mediaType || "";
	if (/audio|video/.test(mime)) {
		let media = await q.download?.();
		m.reply(wait);
		let wss = "wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join";

		function generateRandomLetters(length) {
			let result = "";
			const alphabetLength = 26;

			for (let i = 0; i < length; i++) {
				const randomValue = Math.floor(Math.random() * alphabetLength);
				const randomLetter = String.fromCharCode(
					"a".charCodeAt(0) + randomValue,
				);
				result += randomLetter;
			}

			return result;
		}

		const zeta = async (audio) => {
			return new Promise(async (resolve, reject) => {
				let name =
					Math.floor(Math.random() * 100000000000000000) +
					(await generateRandomLetters()) +
					".mp4";
				let result = {};
				let send_has_payload = {
					fn_index: 0,
					session_hash: "xyuk2cf684b",
				};
				let send_data_payload = {
					fn_index: 0,
					data: [
						{
							data: "data:audio/mpeg;base64," + audio.toString("base64"),
							name: name,
						},
						10,
						"pm",
						0.6,
						false,
						"",
						"en-US-AnaNeural-Female",
					],
					event_data: null,
					session_hash: "xyuk2cf684b",
				};
				const ws = new WebSocket(wss);
				ws.onopen = function () {
					console.log("Connected to websocket");
				};

				ws.onmessage = async function (event) {
					let message = JSON.parse(event.data);

					switch (message.msg) {
						case "send_hash":
							ws.send(JSON.stringify(send_has_payload));
							break;

						case "send_data":
							console.log("Processing your audio....");
							ws.send(JSON.stringify(send_data_payload));
							break;
						case "process_completed":
							result.base64 =
								"https://yanzbotz-waifu-yanzbotz.hf.space/file=" +
								message.output.data[1].name;
							break;
					}
				};

				ws.onclose = function (event) {
					if (event.code === 1000) {
						console.log("Process completed️");
					} else {
						msg.reply("Err : WebSocket Connection Error:\n");
					}
					resolve(result);
				};
			});
		};
		let abcd = await zeta(await media);

		conn.sendFile(m.chat, abcd.base64, "", "", m);
	} else throw `Reply video/audio with caption *${usedPrefix + command}*`;
};

handler.help = ["zetavoice"];
handler.command = ["zetavoice"];
handler.tags = ["audio"];
handler.premium = false;

export default handler;
