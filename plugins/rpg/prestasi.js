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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import { getDatabase } from "../../src/lib/rimuru-database.js";

const pluginConfig = {
  name: 'prestasi',
  category: "rpg",
  description: "Achievement dan gelar RPG tambahan berbasis data Rimuru.",
  usage: ".achievement | .titles",
  example: ".achievement",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

const TITLES=[
  [1,"Pemula","Mulai perjalananmu."],
  [5,"Petualang","Mencapai level 5."],
  [10,"Veteran","Mencapai level 10."],
  [20,"Elite","Mencapai level 20."],
  [30,"Legenda","Mencapai level 30."],
  [50,"Master","Mencapai level 50."],
];

async function handler(m){
  const db=getDatabase(),u=db.getUser(m.sender)||{};
  const level=Number(u.level||u.rpg?.level||0),exp=Number(u.exp||0),money=Number(u.koin||u.money||0);
  const inv=u.inventory||{};
  const items=Object.values(inv).reduce((s,v)=>s+(Number(v)||0),0);
  if((m.command||"").toLowerCase()==="titles"){
    const unlocked=TITLES.filter(([lv])=>level>=lv);
    return m.reply(`🏷️ *GELAR*\n\n${TITLES.map(([lv,name,desc])=>`${level>=lv?"✅":"🔒"} ${name} — Lv.${lv} — ${desc}`).join("\n")}\n\nGelar tertinggi: *${unlocked.at(-1)?.[1]||"Pemula"}*`);
  }
  const ach=[
    [level>=5,"🌱","Naik level","Mencapai level 5"],
    [level>=10,"⚔️","Veteran","Mencapai level 10"],
    [level>=20,"👑","Elite","Mencapai level 20"],
    [exp>=100000,"✨","Seratus Ribu EXP","Mengumpulkan 100.000 EXP"],
    [money>=100000,"💰","Kaya","Memiliki 100.000 koin"],
    [items>=20,"🎒","Kolektor","Memiliki total 20 item"],
  ];
  return m.reply(`🏆 *ACHIEVEMENT*\n\n${ach.map(([ok,e,n,d])=>`${ok?"✅":"🔒"} ${e} *${n}*\n> ${d}`).join("\n\n")}`);
}
export { pluginConfig as config, handler };
