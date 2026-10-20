# Tutorial Mengubah Branding Bot

Panduan ini menjelaskan cara mengganti nama atau identitas yang tampil di fitur bot. Contoh di bawah memakai nama `Colpad`; ganti dengan nama yang kamu inginkan.

## Lokasi branding

- `src/lib/yalena-logger.js`: banner dan nama yang muncul saat bot mulai.
- `plugins/main/credits.js`, `credits2.js`, `kredit.js`, `kredit2.js`, `thanksto.js`, `thanksto2.js`, `tqto.js`, dan `tqto2.js`: nama dalam daftar kredit.
- `plugins/main/hargabot.js` dan `sethargabot.js`: nama pada teks daftar harga.
- `plugins/canvas/djfake.js`, `fakedj.js`, dan `plugins/elaina/fakediscord.js`: contoh nama dalam bantuan perintah.
- `plugins/stalker/iginfo.js`: nama atribusi, tautan Telegram, dan metadata kartu info Instagram.
- `src/data/family100.json`: data jawaban permainan Family100. Ubah entri hanya jika memang ingin mengubah jawaban permainan, bukan untuk mengganti branding global.

## Langkah mengubah nama

1. Cari nama lama di file terkait dan pastikan setiap hasil memang teks branding, bukan data atau nama pengguna yang harus dipertahankan.
2. Perbarui teks yang tampil di banner, kredit, daftar harga, contoh perintah, dan kartu fitur sesuai kebutuhan.
3. Jika mengganti tautan Telegram atau media sosial, perbarui URL yang dipakai sebagai tujuan tautan serta teks labelnya. Pastikan alamatnya benar dan dapat diakses.
4. Periksa konsistensi ejaan dan kapitalisasi di semua tampilan.
5. Jalankan pemeriksaan sintaks untuk file JavaScript yang diubah dan validasi JSON untuk file data. Coba jalankan bot di lingkungan development sebelum merilis perubahan.

## Pemeriksaan lokal

Contoh pemeriksaan JSON untuk Family100:

```bash
node -e "JSON.parse(require('node:fs').readFileSync('src/data/family100.json', 'utf8')); console.log('JSON valid')"
```

Untuk file JavaScript, gunakan pemeriksaan sintaks Node.js, misalnya:

```bash
node --check src/lib/yalena-logger.js
node --check plugins/stalker/iginfo.js
```

Sebelum membagikan perubahan, tinjau `git diff` dan pastikan tidak ada kredensial, data sesi, atau perubahan data permainan yang tidak disengaja.