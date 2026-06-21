# Portfolio — Alvien Ridho

Personal portfolio website untuk Alvien Ridho, UI/UX Designer & Frontend Developer.
Dibangun dengan React + Vite + Tailwind CSS, dengan konten dikelola melalui admin dashboard berbasis Firebase.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Content & Auth**: Firebase Firestore + Firebase Authentication
- **Deployment**: Vercel / Netlify / Firebase Hosting (semua free tier)

---

## 1. Setup Firebase (wajib sebelum admin dashboard bisa dipakai)

Website publik tetap bisa dibuka tanpa Firebase (menggunakan data contoh bawaan), tapi admin dashboard butuh Firebase aktif.

### Langkah-langkah:

1. **Buat project Firebase**
   - Buka console.firebase.google.com
   - Klik **Add project** -> beri nama (misal: `portfolio-alvien`) -> ikuti wizard sampai selesai.

2. **Aktifkan Firestore Database**
   - Di sidebar, pilih **Build -> Firestore Database**
   - Klik **Create database**
   - Pilih **Start in production mode** (kita akan pasang rules sendiri)
   - Pilih lokasi server terdekat (misal `asia-southeast2`)

3. **Pasang Firestore Security Rules**
   - Di tab **Rules** pada Firestore, salin isi file `firestore.rules` dari project ini, paste, lalu **Publish**.
   - Rules ini membuat: semua orang bisa **membaca** data projects/certifications/experiences, tapi hanya user yang **login** yang bisa menambah/edit/hapus.

4. **Aktifkan Authentication**
   - Di sidebar, pilih **Build -> Authentication**
   - Klik **Get started**
   - Pilih metode **Email/Password** -> aktifkan (toggle "Enable") -> **Save**

5. **Buat akun admin**
   - Masih di Authentication, tab **Users** -> **Add user**
   - Masukkan email dan password yang akan dipakai untuk login ke `/admin/login`
   - Catat kredensial ini baik-baik, ini satu-satunya cara masuk ke dashboard.

6. **Daftarkan Web App & ambil config**
   - Buka **Project Settings** (ikon gear di sidebar) -> scroll ke **Your apps**
   - Klik ikon **Web** (`</>`) -> beri nickname (misal: `portfolio-web`) -> **Register app**
   - Firebase akan menampilkan objek `firebaseConfig` — salin semua value-nya.

7. **Isi file `.env`**
   - Copy `.env.example` menjadi `.env` (kalau belum ada)
   - Isi setiap value sesuai `firebaseConfig` dari langkah 6:
     ```
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     ```
   - File `.env` **tidak boleh** di-commit ke Git (sudah otomatis di `.gitignore`).

Setelah langkah ini selesai, jalankan ulang `npm run dev` — admin dashboard di `/admin/login` sudah bisa dipakai.

---

## 2. Menjalankan Project Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` untuk halaman publik.
Buka `http://localhost:5173/admin/login` untuk masuk ke dashboard admin.

---

## 3. Struktur Konten & Gambar

- Semua field gambar (`coverImage`, `certificateImage`) diisi dengan **URL gambar eksternal**
  (misalnya dari Imgur, Cloudinary, atau Google Drive yang link-nya sudah di-share public).
  Project ini **tidak menggunakan Firebase Storage** agar tetap 100% gratis tanpa upgrade plan.
- Setiap konten (project, sertifikasi, experience) **wajib diisi dalam dua bahasa**
  (Inggris & Indonesia) melalui tab di form admin. Jika salah satu bahasa kosong saat submit,
  form akan menampilkan peringatan dan menolak menyimpan.

---

## 4. Build untuk Produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`.

---

## 5. Deploy (pilih salah satu, semua gratis)

### Vercel
1. Push project ke GitHub.
2. Import repo di vercel.com.
3. Tambahkan environment variables (sama seperti isi `.env`) di Vercel dashboard -> Settings -> Environment Variables.
4. Deploy.

### Netlify
1. Push project ke GitHub.
2. Import repo di app.netlify.com.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Tambahkan environment variables di Site Settings -> Environment Variables.

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**Penting**: di semua platform, pastikan environment variables (`VITE_FIREBASE_*`) diisi
di dashboard hosting masing-masing — file `.env` lokal tidak ikut terupload ke Git/hosting.

---

## 6. Catatan Keamanan

- Jangan bagikan kredensial admin (email + password) ke siapa pun selain Anda.
- Firestore rules sudah membatasi akses tulis hanya untuk user yang login — jangan ubah rules ini menjadi lebih permisif kecuali Anda memahami risikonya.
- Field `apiKey` Firebase memang bersifat publik (terlihat di browser) — ini normal dan aman selama Firestore rules sudah benar.
