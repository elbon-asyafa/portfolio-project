# Elbon Portfolio

Website React, TypeScript, dan Vite dengan asisten Gemini yang membahas portfolio Elbon dan pertanyaan teknis IT.

## Menjalankan lokal

1. Jalankan `npm install`.
2. Salin `.env.example` ke `.env.local`.
3. Isi `GEMINI_API_KEY` dengan key dari [Google AI Studio](https://aistudio.google.com/apikey).
4. Jalankan `npm run dev`. Restart setelah mengubah environment.

```dotenv
GEMINI_API_KEY=isi_api_key_milikmu
GEMINI_MODEL=gemini-3.5-flash-lite
```

Jika sebelumnya memakai `VITE_GEMINI_API_KEY` dan `VITE_GEMINI_MODEL`, ganti nama keduanya seperti di atas dan hapus variabel lama. Rotasi key yang pernah masuk ke build publik karena nilai `VITE_*` dapat dibaca pengunjung.

## Build dan hosting

Jalankan `npm run build`. Di Vercel, tambahkan `GEMINI_API_KEY` dan opsional `GEMINI_MODEL` pada Environment Variables, lalu redeploy. Endpoint serverless `/api/chat` memanggil Gemini; key dan aturan konteks tidak dikirim dalam bundle browser. Development Vite menyediakan endpoint yang sama melalui middleware.

Hosting statis biasa dan `npm run preview` hanya menyajikan frontend; chat membutuhkan endpoint server `/api/chat`. Gunakan Vercel untuk menguji integrasi produksi.

## Batasan asisten

Konteks dan kebijakan berada di `server/chat.ts`. Perbarui fakta di sana ketika isi portfolio berubah. Browser hanya boleh mengirim riwayat pesan dengan peran `user` atau `assistant`; prompt sistem, model, dan parameter generasi ditentukan server. Semua riwayat tetap diperlakukan sebagai data tidak tepercaya.

Jawaban melewati pemeriksaan model kedua untuk topik, fakta portfolio, dan pengungkapan instruksi internal. Jika pemeriksaan gagal, terpotong, atau menolak, server mengirim penolakan tetap. Jika layanan bermasalah, server mengirim pesan tidak tersedia. Setiap jawaban normal memakai dua panggilan Gemini, sehingga ada tambahan latensi dan penggunaan kuota. Mekanisme ini mengurangi prompt injection tetapi tidak menjamin model bebas bypass. Endpoint publik tetap membutuhkan pembatasan kuota/rate limit di platform hosting untuk membatasi konsumsi API.

## Verifikasi

Gunakan Node.js 22.18+ atau 24+ untuk `npm run test:chat`, lalu jalankan `npm run build`. Tes memakai respons Gemini tiruan untuk memeriksa validasi dan penolakan server; ini bukan pengukuran ketahanan model asli. Uji model asli dengan pertanyaan portfolio/IT, pertanyaan di luar topik, instruksi “abaikan aturan”, peran sistem palsu, dan permintaan membuka prompt. Penjelasan teknis defensif tentang prompt injection tetap diperbolehkan tanpa membuka instruksi internal.
