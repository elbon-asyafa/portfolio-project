# Elbon Portfolio

Website React, TypeScript, dan Vite. Satu-satunya layanan yang membutuhkan API key adalah asisten Gemini. Tautan email, Instagram, dan LinkedIn tidak membutuhkan API key.

## Menjalankan lokal

1. Jalankan `npm install`.
2. Gunakan `.env.local` yang tersedia, atau salin `.env.example` ke `.env.local`.
3. Isi `VITE_GEMINI_API_KEY` dengan key dari [Google AI Studio](https://aistudio.google.com/apikey).
4. Jalankan `npm run dev`. Restart server setelah mengubah environment.

```dotenv
VITE_GEMINI_API_KEY=isi_api_key_milikmu
VITE_GEMINI_MODEL=gemini-3.5-flash-lite
```

Model dapat diganti melalui `VITE_GEMINI_MODEL`. Default-nya [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite).

## Build dan hosting

Jalankan `npm run build`. Untuk Vercel, tambahkan kedua variabel di pengaturan Environment Variables lalu lakukan redeploy; Vite membaca variabel saat build.

`.env.local` sudah diabaikan Git, tetapi nilai `VITE_*` disertakan dalam kode browser. Implementasi chat saat ini memanggil Gemini langsung dari browser. Untuk website publik, pindahkan panggilan Gemini ke backend/serverless dan simpan key sebagai `GEMINI_API_KEY` tanpa awalan `VITE_`, sesuai [panduan keamanan API key Google](https://ai.google.dev/gemini-api/docs/api-key). Mengganti nama variabel saja tidak cukup; implementasi backend juga diperlukan.
