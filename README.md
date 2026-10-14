# Yalena MD

Bot WhatsApp multi-device berbasis Node.js dengan sistem plugin.

## Menjalankan di Armbian

### 1. Pasang kebutuhan sistem

Periksa arsitektur board:

```bash
uname -m
```

Pasang Git, FFmpeg, dan alat build yang mungkin dibutuhkan oleh dependency native:

```bash
sudo apt update
sudo apt install -y git curl ca-certificates ffmpeg build-essential python3
```

Bot memerlukan Node.js versi 22 atau lebih baru. Salah satu cara memasangnya adalah dengan nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

Pastikan Node.js dan npm tersedia:

```bash
node --version
npm --version
```

### 2. Ambil source code dan pasang dependency

```bash
git clone https://github.com/colpad999/rimmu.git
cd rimmu
npm ci
```

> **Catatan:** `package.json` merujuk ke dependency lokal `./tmp_caller`. Pastikan folder tersebut disertakan pada source/distribusi sebelum menjalankan `npm ci`. Jika folder tidak ada dan instalasi gagal dengan `ENOENT`, dependency lokal itu perlu disediakan atau diperbaiki oleh maintainer.

### 3. Atur nomor WhatsApp

Buka `config.js`, lalu sesuaikan:

- `owner.number`: nomor pemilik bot.
- `session.pairingNumber`: nomor WhatsApp yang akan ditautkan.

Gunakan format kode negara tanpa tanda `+` atau angka `0` di depan; misalnya `6281234567890`. Secara default bot menggunakan pairing code (`usePairingCode: true`).

Jangan bagikan folder sesi atau kredensial WhatsApp. Sesi disimpan secara lokal di `storage/session`.

### 4. Jalankan bot

Untuk penggunaan normal:

```bash
node index.js
```

Atau, untuk mengaktifkan fitur development seperti hot reload plugin:

```bash
NODE_ENV=development node index.js
```

Biarkan terminal tetap terbuka. Saat pairing code tampil, buka WhatsApp di ponsel dan pilih **Settings → Linked Devices → Link a Device**, lalu tautkan menggunakan nomor telepon dan masukkan kode yang ditampilkan.

Setelah koneksi berhasil, sesi tersimpan agar bot dapat tersambung kembali saat dijalankan ulang.

## Menghentikan bot

Tekan `Ctrl+C` pada terminal. Bot akan mencoba menyimpan database sebelum berhenti.

## Pemecahan masalah

- **Versi Node.js terlalu lama:** pastikan `node --version` menunjukkan versi 22 atau lebih baru.
- **Instalasi dependency gagal pada Armbian:** periksa arsitektur dengan `uname -m` dan lihat pesan error npm. Beberapa dependency native mungkin tidak menyediakan binary untuk semua arsitektur ARM.
- **`npm ci` melaporkan `ENOENT` untuk `tmp_caller`:** folder dependency lokal tersebut tidak tersedia; lihat catatan pada langkah instalasi.
- **Pairing gagal:** pastikan nomor di `config.js` benar, ponsel memiliki koneksi internet, dan coba jalankan bot kembali.
