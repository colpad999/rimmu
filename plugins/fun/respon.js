//

const pluginConfig = {
    name: "autoyalena",
    category: "fun",
    description: "Auto respon jika ada yang menyebut Yalena",
    usage: ".autoyalena on/off",
    example: ".autoyalena on",
    cooldown: 3
}

// global agar tidak reset saat hot reload
if (!global.autoYalena) global.autoYalena = false

async function handler(m) {

    const text = (m.text || "").toLowerCase()
    const args = text.split(" ")[1]

    if (!args) {
        return m.reply(
`╭─〔 ❤️ YALENA AUTO RESPON 〕
│
│ 📌 Perintah:
│ • .autoyalena on
│ • .autoyalena off
│
│ Yalena akan otomatis
│ merespon jika namanya disebut.
│
╰────────────`
        )
    }

    if (args === "on") {
        global.autoYalena = true

        return m.reply(
`╭─〔 ❤️ YALENA 〕
│
│ Ara ara~
│ Auto respon sekarang *AKTIF*
│
│ Panggil aku kapan saja
│ Darling~
│
╰────────────`
        )
    }

    if (args === "off") {
        global.autoYalena = false

        return m.reply(
`╭─〔 YALENA 〕
│
│ Hmph!
│ Auto respon dimatikan.
│
│ Sampai jumpa Darling~
│
╰────────────`
        )
    }

}

async function before(m, { sock }) {

    if (!global.autoYalena) return

    const text = (m.text || "").toLowerCase()

    const trigger = [

        "Yalena",
        "yalena",
        "02",
        "yalena",
        "zero2",
        "Yalena ai",
        "yalena ai",
        "bot Yalena",
        "Yalena bot",
        "02 ai",
        "darling Yalena",
        "yalenaoo",
        "Yalenaoo",
        "02 darling",
        "yalena chan",
        "yalena-chan"

    ]

    if (!trigger.some(v => text.includes(v))) return

    const name = m.pushName || "Darling"

    const respon = [

`╭─〔 ❤️ YALENA 〕
│
│ Ara ara~
│ ${name} memanggilku?
│
│ Ada yang bisa
│ Yalena bantu?
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Fufu~
│ Aku mendengar
│ namaku disebut.
│
│ Halo ${name}.
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Eh?
│ ${name} kangen aku ya?
│
│ Darling lucu~
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Ara ara~
│ Jangan panggil aku
│ sembarangan.
│
│ ...tapi kalau kamu
│ boleh ${name}.
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Hmph!
│ Siapa yang memanggil
│ Yalena?
│
│ Oh ternyata kamu~
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Darling ${name}~
│ Kamu memanggilku?
│
│ Aku datang ❤️
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Fufu~
│ Aku merasa
│ seseorang menyebutku.
│
│ Hai ${name}.
│
╰────────────`,

`╭─〔 YALENA 〕
│
│ Eh ${name}!
│ Kamu memanggil
│ Yalena?
│
│ Aku disini~
│
╰────────────`

]

    const random = respon[Math.floor(Math.random() * respon.length)]

    await sock.sendMessage(m.chat, { text: random }, { quoted: m })

}
export { pluginConfig as config, handler, before };