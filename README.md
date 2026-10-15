<!--
  Yalena MD — WhatsApp Multi-Device Bot
  Crafted with ⚡ by Colpad
-->

<div align="center">

# ⚡ Yalena MD

### WhatsApp Multi-Device Bot • Modular Plugin System

Bot WhatsApp berbasis **Node.js** dengan arsitektur plugin modular, pengelolaan data lokal, scheduler, dan berbagai kategori fitur untuk kebutuhan sehari-hari.

**By Colpad ⚡**

[Repository](https://github.com/colpad999/rimmu) · [Laporkan Bug](https://github.com/colpad999/rimmu/issues)

</div>

---

## ✨ Tentang Project

**Yalena MD** adalah project bot WhatsApp multi-device yang dikembangkan menggunakan JavaScript (ES Modules) dan Node.js. Kode utama dipisahkan ke dalam modul koneksi, handler pesan, database, scheduler, dan loader plugin supaya lebih mudah dikembangkan serta dirawat.

> Project ini masih dapat mengalami bug. Uji terlebih dahulu di lingkungan yang aman dan gunakan akun WhatsApp yang memang kamu berhak kelola.

## 🚀 Fitur dan Struktur

Fitur yang tersedia bergantung pada plugin dan konfigurasi di versi yang sedang digunakan.

- **Plugin modular** — fitur bot dikelompokkan ke folder plugin berdasarkan kategori.
- **Hot reload saat development** — watcher dapat memuat ulang plugin ketika file plugin berubah jika mode development dan pengaturannya aktif.
- **Database lokal** — menyimpan pengaturan dan data bot secara lokal.
- **Penjadwalan** — modul scheduler untuk tugas terjadwal, termasuk pesan terjadwal dan beberapa otomasi.
- **Manajemen koneksi WhatsApp** — pengelolaan koneksi dan event pesan melalui modul koneksi.
- **Pemantauan dan perawatan** — tersedia modul pemantauan memori, pembersihan file sementara, dan pemangkasan data.
- **Kategori plugin beragam** — direktori plugin mencakup antara lain AI, downloader, grup, musik, owner, premium, religi, pencarian, stiker, tools, TTS, dan utilitas.

## 🧰 Teknologi

- Node.js **22 atau lebih baru**
- JavaScript dengan ES Modules
- WhatsApp multi-device melalui dependency Baileys yang digunakan project
- Database lokal berbasis dependency yang tercantum di `package.json`
- FFmpeg untuk fitur media tertentu
- Plugin JavaScript

## 📋 Persyaratan

- Linux, Armbian, atau lingkungan lain yang mendukung Node.js 22+
- Git dan npm
- Koneksi internet
- FFmpeg dan build tools untuk dependency yang membutuhkannya
- Akun WhatsApp untuk menautkan sesi bot

Arsitektur ARM tertentu mungkin membutuhkan penyesuaian dependency native.

## 📥 Instalasi

### 1. Pasang kebutuhan sistem (Debian/Ubuntu/Armbian)

```bash
sudo apt update
sudo apt install -y git curl ca-certificates ffmpeg build-essential python3
```

### 2. Pasang Node.js 22+

Jika menggunakan `nvm`, jalankan:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

Verifikasi instalasi:

```bash
node --version
npm --version
```

### 3. Clone repository

```bash
git clone https://github.com/colpad999/rimmu.git
cd rimmu
```

### 4. Pasang dependency

```bash
npm ci
```

**Catatan penting:** `package.json` saat ini memiliki dependency lokal `baileys-caller` dengan referensi `file:./tmp_caller`. Pastikan folder `tmp_caller` tersedia di source yang kamu gunakan. Jika folder tersebut tidak disertakan, proses instalasi dapat gagal dengan error `ENOENT`; maintainer perlu menyertakan atau memperbaiki referensi dependency tersebut.

## ⚙️ Konfigurasi

Sebelum menjalankan bot, periksa `config.js`. Sesuaikan nilai konfigurasi yang relevan dengan kebutuhanmu, khususnya:

- `owner.number` — nomor pemilik bot.
- `session.pairingNumber` — nomor WhatsApp yang akan ditautkan.
- Pengaturan mode bot, database, aset, dan development jika diperlukan.

Gunakan format nomor internasional tanpa tanda `+`, misalnya `6281234567890`, sesuai format yang diharapkan konfigurasi.

**Keamanan sesi:** jangan unggah atau membagikan file autentikasi, kredensial, token API, maupun folder sesi ke repository publik. Pastikan file sensitif dikecualikan dari Git.

## ▶️ Menjalankan Bot

Jalankan dari direktori project:

```bash
node index.js
```

Untuk menjalankan dengan environment development di Linux:

```bash
NODE_ENV=development node index.js
```

Saat kode pairing muncul, buka WhatsApp di ponsel:

**Settings → Linked Devices → Link a Device**

Ikuti instruksi pairing yang ditampilkan oleh bot. Setelah berhasil, koneksi dapat menggunakan data sesi lokal saat bot dijalankan kembali.

> Di Linux/Armbian, gunakan perintah `node index.js` di atas. Script `start` pada `package.json` saat ini memakai sintaks environment Windows (`set NODE_ENV=development&& ...`), sehingga belum portabel untuk shell Linux.

### Menghentikan bot

Tekan `Ctrl+C pada terminal. Handler penghentian pada aplikasi mencoba menyimpan database sebelum proses berakhir.

## 🧩 Mengelola Plugin

Plugin disimpan di direktori `plugins/` dan dikelompokkan berdasarkan kategori. Sebelum menambah atau mengubah plugin:

1. Pelajari pola handler dan struktur plugin yang sudah ada.
2. Gunakan nama file yang jelas dan konsisten.
3. Tangani error pada operasi asynchronous.
4. Uji perubahan di lingkungan development terlebih dahulu.
5. Jangan memasukkan token atau data pribadi ke source code.

Hot reload plugin dapat diaktifkan melalui konfigurasi development yang tersedia. Perubahan pada modul inti di `src/` perlu diuji dan biasanya memerlukan restart untuk memastikan semua perubahan benar-benar diterapkan.

## 🗂️ Struktur Project

```text
rimmu/
├── assets/       # Aset lokal
├── case/         # Data atau resource pendukung
├── config.js     # Konfigurasi bot
├── data/         # Data aplikasi
├── database/     # Penyimpanan database
├── index.js      # Entry point dan inisialisasi aplikasi
├── media/        # Resource media
├── plugins/      # Fitur bot berbasis plugin
├── src/
│   ├── connection.js  # Koneksi WhatsApp
│   ├── handler.js     # Handler event dan pesan
│   ├── database/      # Modul database
│   ├── lib/           # Scheduler dan utilitas inti
│   ├── scraper/       # Modul scraper
│   └── data/          # Data pendukung
└── package.json  # Metadata dan dependency Node.js
```

Struktur di atas merupakan ringkasan direktori utama; isi folder dapat berubah mengikuti perkembangan project.

## 🛠️ Troubleshooting

| Masalah | Langkah pemeriksaan |
|---|---|
| Node.js terlalu lama | Jalankan `node --version`; gunakan Node.js 22 atau lebih baru. |
| `npm ci` gagal dengan `ENOENT` | Pastikan dependency lokal `./tmp_caller` benar-benar tersedia. |
| Dependency native gagal dipasang | Periksa arsitektur dengan `uname -m`, versi Node.js, dan pesan error npm. |
| Pairing tidak berhasil | Periksa nomor di `config.js`, koneksi internet, dan instruksi pairing yang tampil. |
| Plugin tidak terbaca | Periksa lokasi plugin, ekstensi `.js`, sintaks, dan log terminal. |
| Bot berhenti atau error | Baca stack trace dan log terkait; hindari mengabaikan error tanpa mencari penyebabnya. |

## 🔐 Catatan Keamanan dan Penggunaan

- Gunakan bot secara bertanggung jawab dan patuhi ketentuan WhatsApp.
- Hindari spam, pesan massal tanpa izin, atau aktivitas yang mengganggu pengguna lain.
- Lindungi sesi WhatsApp dan semua API key.
- Jangan menjalankan kode plugin yang tidak kamu percaya.
- Buat cadangan data penting sebelum melakukan perubahan besar.

## 🤝 Kontribusi

Kontribusi berupa laporan bug, saran fitur, dokumentasi, dan perbaikan kode sangat dihargai.

1. Fork repository.
2. Buat branch untuk perubahanmu.
3. Uji perubahan secara lokal.
4. Kirim Pull Request dengan penjelasan yang jelas.

Untuk bug atau ide, gunakan [GitHub Issues](https://github.com/colpad999/rimmu/issues).

## 📄 Lisensi

Metadata `package.json` menyebutkan lisensi **ISC**. Pastikan ketentuan lisensi dan hak penggunaan dependency pihak ketiga dipahami sebelum mendistribusikan ulang project.

---

<div align="center">

**Crafted by Colpad ⚡**

*Build • Test • Improve*

</div>
