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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "pddikti",
  category: "search",
  description: "Cari data Mahasiswa, Dosen, PT, dan Prodi dari PDDIKTI",
  usage: ".pddikti <mode> <query>",
  example: ".pddikti all Gibran Khalil\n.pddikti detail <id_mahasiswa>",
  cooldown: 15,
  energi: 1,
  isEnabled: true,
};

const CORS_PROXY = "https://cors.rifkyshre.biz.id/";
const API_BASE = "https://api-pddikti.kemdiktisaintek.go.id";
const FRONTEND_ORIGIN = "https://pddikti.kemdiktisaintek.go.id";

async function pddiktiGet(path) {
  const res = await axios.get(`${CORS_PROXY}${API_BASE}${path}`, {
    timeout: 30000,
    validateStatus: () => true,
    headers: {
      Accept: "application/json",
      "X-Cors-Spoof-Origin": FRONTEND_ORIGIN,
    },
  });
  if (res.status !== 200) {
    throw new Error(`PDDIKTI HTTP ${res.status}: ${JSON.stringify(res.data).slice(0, 150)}`);
  }
  return res.data;
}

async function pddikti(input) {
  try {
    const mode = (input?.mode ?? "all").toLowerCase();
    const query = typeof input?.query === "string" ? input.query.trim() : "";

    if (mode === "detail") {
      const mhsId = typeof input?.mahasiswaId === "string" ? input.mahasiswaId.trim() : "";
      if (!mhsId) {
        return { Status: false, Code: 400, Input: input, Result: null,
          Error: "Field 'mahasiswaId' wajib untuk mode 'detail'. Ambil dari hasil search mhs (field 'id')." };
      }
      const data = await pddiktiGet(`/detail/mhs/${encodeURIComponent(mhsId)}`);
      const message = data?.nama
        ? `🎓 ${data.nama} — ${data.nim} | ${data.prodi} @ ${data.nama_pt}`
        : "🎓 Detail mahasiswa";
      return {
        Status: true, Code: 200, Input: input,
        Result: {
          message,
          nama: data.nama,
          nim: data.nim,
          jenisKelamin: data.jenis_kelamin === "L" ? "Laki-laki" : data.jenis_kelamin === "P" ? "Perempuan" : null,
          jenjang: data.jenjang,
          prodi: data.prodi,
          kodeProdi: data.kode_prodi,
          namaPt: data.nama_pt,
          kodePt: data.kode_pt?.trim(),
          tanggalMasuk: data.tanggal_masuk,
          jenisDaftar: data.jenis_daftar,
          statusSaatIni: data.status_saat_ini,
          idPt: data.id_pt,
          idProdi: data.id_sms,
          raw: data,
        },
      };
    }

    if (!query) {
      return { Status: false, Code: 400, Input: input, Result: null,
        Error: "Kata kunci pencarian wajib (nama, NIM, NIDN, dll)." };
    }
    if (query.length < 3) {
      return { Status: false, Code: 400, Input: input, Result: null,
        Error: "Query terlalu pendek (min 3 karakter)." };
    }

    let path;
    switch (mode) {
      case "all":   path = `/pencarian/all/${encodeURIComponent(query)}`; break;
      case "mhs":
      case "mahasiswa":
        path = `/pencarian/mhs/${encodeURIComponent(query)}`; break;
      case "dosen": path = `/pencarian/dosen/${encodeURIComponent(query)}`; break;
      case "pt":    path = `/pencarian/pt/${encodeURIComponent(query)}`; break;
      case "prodi": path = `/pencarian/prodi/${encodeURIComponent(query)}`; break;
      default:
        return { Status: false, Code: 400, Input: input, Result: null,
          Error: `Unknown mode '${mode}'. Pakai: all | mhs | dosen | pt | prodi | detail` };
    }

    const data = await pddiktiGet(path);

    if (mode === "all" && data && typeof data === "object" && !Array.isArray(data)) {
      const mhs = Array.isArray(data.mahasiswa) ? data.mahasiswa : [];
      const dosen = Array.isArray(data.dosen) ? data.dosen : [];
      const pt = Array.isArray(data.pt) ? data.pt : [];
      const prodi = Array.isArray(data.prodi) ? data.prodi : [];
      const total = mhs.length + dosen.length + pt.length + prodi.length;
      return {
        Status: true, Code: 200, Input: input,
        Result: {
          message: `🔍 ${total} hasil untuk "${query}" (${mhs.length} mhs, ${dosen.length} dosen, ${pt.length} pt, ${prodi.length} prodi)`,
          query,
          totalCount: total,
          mahasiswa: mhs,
          dosen,
          pt,
          prodi,
        },
      };
    }

    const items = Array.isArray(data) ? data : [];
    return {
      Status: true, Code: 200, Input: input,
      Result: {
        message: items.length > 0
          ? `🔍 ${items.length} hasil ${mode} untuk "${query}"`
          : `🔍 Gak ada hasil ${mode} untuk "${query}"`,
        query,
        mode,
        count: items.length,
        results: items,
      },
    };
  } catch (e) {
    return {
      Status: false,
      Code: e.response?.status ?? 500,
      Input: input,
      Result: null,
      Error: e.message ?? String(e),
    };
  }
}

async function handler(m, { args }) {
  if (args.length === 0) {
    return m.reply(
      `🎓 *PDDIKTI SEARCH*\n\n` +
      `> Mode pencarian:\n` +
      `- \`.pddikti all <query>\`\n` +
      `- \`.pddikti mhs <nama/NIM>\`\n` +
      `- \`.pddikti dosen <nama/NIDN>\`\n` +
      `- \`.pddikti pt <nama_kampus>\`\n` +
      `- \`.pddikti prodi <nama_prodi>\`\n` +
      `- \`.pddikti detail <id_mahasiswa>\`\n\n` +
      `*Contoh:* \`.pddikti mhs Gibran Rakabuming\``
    );
  }

  m.react("🕕");

  try {
    const mode = args[0].toLowerCase();
    
    if (mode === "detail") {
      if (args.length < 2) return m.reply("❌ Masukkan ID Mahasiswa!");
      const mhsId = args[1];
      const res = await pddikti({ mode: "detail", mahasiswaId: mhsId });
      
      if (!res.Status) {
        m.react("❌");
        return m.reply(`❌ ${res.Error}`);
      }
      
      const r = res.Result;
      let txt = `🎓 *DETAIL MAHASISWA*\n\n`;
      txt += `- 📝 Nama          : *${r.nama}*\n`;
      txt += `- 🆔 NIM           : *${r.nim}*\n`;
      txt += `- 👤 Jenis Kelamin : *${r.jenisKelamin ?? "-"}*\n`;
      txt += `- 🎓 Jenjang       : *${r.jenjang}*\n`;
      txt += `- 📚 Prodi         : *${r.prodi}*\n`;
      txt += `- 🏛️ Perguruan T.  : *${r.namaPt}*\n`;
      txt += `- 📅 Tgl Masuk     : *${r.tanggalMasuk}*\n`;
      txt += `- 📊 Status        : *${r.statusSaatIni}*\n`;
      txt += `- 💼 Jenis Daftar  : *${r.jenisDaftar}*\n`;
      
      m.react("✅");
      return m.reply(txt);
    }
    
    // For other modes
    const query = args.slice(1).join(" ");
    if (!query) return m.reply("❌ Masukkan kata kunci pencarian!");
    
    const res = await pddikti({ mode, query });
    if (!res.Status) {
      m.react("❌");
      return m.reply(`❌ ${res.Error}`);
    }
    
    const r = res.Result;
    let txt = `*${r.message}*\n\n`;
    
    if (mode === "all") {
      const mh = r.mahasiswa.slice(0, 3);
      const ds = r.dosen.slice(0, 3);
      const pt = r.pt.slice(0, 3);
      const pr = r.prodi.slice(0, 3);
      
      if (mh.length) {
        txt += `👨🎓 *MAHASISWA (top 3):*\n`;
        for (const m of mh) txt += `- ${m.nama} [${m.nim}] — ${m.nama_prodi}, ${m.nama_pt}\n`;
        txt += `\n`;
      }
      if (ds.length) {
        txt += `👨🏫 *DOSEN (top 3):*\n`;
        for (const d of ds) txt += `- ${d.nama} [NIDN ${d.nidn}] — ${d.nama_prodi}, ${d.nama_pt}\n`;
        txt += `\n`;
      }
      if (pt.length) {
        txt += `🏛️ *PERGURUAN TINGGI (top 3):*\n`;
        for (const p of pt) txt += `- ${p.nama} (${p.nama_singkat ?? p.sinkatan_pt ?? "-"})\n`;
        txt += `\n`;
      }
      if (pr.length) {
        txt += `📚 *PRODI (top 3):*\n`;
        for (const p of pr) txt += `- ${p.nama} @ ${p.nama_pt ?? "-"}\n`;
        txt += `\n`;
      }
    } else {
      const top = r.results.slice(0, 10);
      for (const [i, item] of top.entries()) {
        if (mode === "mhs" || mode === "mahasiswa") {
          txt += `*#${i + 1} ${item.nama} [NIM ${item.nim}]*\n`;
          txt += `- 📚 ${item.nama_prodi} @ ${item.nama_pt} (${item.sinkatan_pt || "-"})\n`;
          txt += `- 🆔 ID: \`${item.id}\`\n\n`;
        } else if (mode === "dosen") {
          txt += `*#${i + 1} ${item.nama} [NIDN ${item.nidn}]*\n`;
          txt += `- 📚 ${item.nama_prodi} @ ${item.nama_pt}\n\n`;
        } else if (mode === "pt") {
          txt += `*#${i + 1} ${item.nama} (${item.nama_singkat ?? "-"})*\n`;
          txt += `- Kode: ${item.kode ?? "-"}\n\n`;
        } else if (mode === "prodi") {
          txt += `*#${i + 1} ${item.nama}*\n`;
          txt += `- @ ${item.nama_pt ?? "-"}\n\n`;
        }
      }
      if (r.count > 10) txt += `> ... +${r.count - 10} hasil lainnya.\n`;
    }
    
    m.react("✅");
    return m.reply(txt.trim());
    
  } catch (err) {
    console.error("[PDDIKTI]", err.message);
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
