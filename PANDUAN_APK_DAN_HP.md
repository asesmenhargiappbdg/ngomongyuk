# 📱 Panduan Lengkap: Cara Pasang di HP & Solusi Komputer Mati

Dokumen ini menjawab pertanyaan:
> *"Bagaimana kalau komputer ini mati? Khawatir aplikasinya tidak bisa dipakai lagi di HP."*
> *"Bagaimana cara membuat file APK murni?"*

---

## 💡 Mengapa HP Tidak Bisa Konek Kalau Komputer Mati?

Saat ini aplikasi berjalan di laptop Anda sebagai **server lokal** (`http://10.201.133.121:5173`).
Oleh karena itu, jika laptop mati, koneksi Wi-Fi lokal ke laptop tentu terputus.

---

## 🛡️ 2 Solusi Pasti Agar Aplikasi Bisa Terus Dipakai di HP Kapan Saja:

### Solusi 1: Sudah Dipasangi "Offline Cache" (Paling Cepat & Praktis)

Aplikasi ini sudah dipasangi sistem **PWA Offline Service Worker**:
1. Hubungkan HP ke laptop (Wi-Fi sama) satu kali saja.
2. Buka di Chrome HP: `http://10.201.133.121:5173`.
3. Ketuk titik tiga (⋮) di Chrome, pilih **"Tambahkan ke Layar Utama" / "Instal Aplikasi"**.
4. Seluruh kode aplikasi (tampilan, teks, audio, skenario) akan otomatis **disimpan di memori internal HP Anda**.
5. Setelah itu, **komputer laptop boleh dimatikan**. Aplikasi di HP Anda akan tetap bisa dibuka dan dipakai kapan pun tanpa butuh laptop lagi!

---

### Solusi 2: Proyek APK Android Murni (Sudah Dibuatkan)

Proyek Android native murni sudah kami buatkan lengkap di folder:
👉 `D:\Aplikasi Bahasa Inggris\android\`

Seluruh kode aplikasi web sudah dibungkus rapi di dalam:
👉 `D:\Aplikasi Bahasa Inggris\android\app\src\main\assets\public\`

#### Cara Meng-compile Menjadi File `.apk`:

#### Pilihan A: Menggunakan Android Studio (Di Komputer)
1. Buka software **Android Studio**.
2. Pilih **Open**, lalu arahkan ke folder: `D:\Aplikasi Bahasa Inggris\android`.
3. Tunggu Gradle sync selesai.
4. Klik menu atas: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
5. File APK murni akan langsung tersimpan di:
   `android\app\build\outputs\apk\debug\app-debug.apk`
6. Tinggal kirim file `app-debug.apk` tersebut ke HP Anda via kabel USB atau WhatsApp!

#### Pilihan B: Menggunakan GitHub Actions Otomatis (Tanpa Perlu Android Studio)
Kami sudah menyertakan file workflow di `.github/workflows/build-apk.yml`.
1. Upload folder proyek ini ke akun GitHub pribadi Anda.
2. Buka tab **Actions** di GitHub.
3. Server GitHub akan otomatis meng-compile file APK Android dalam 2 menit.
4. Anda tinggal mendownload file APK-nya langsung ke HP!

---

### Solusi 3: Upload ke Hosting Gratis (Online 24 Jam Nonstop)
Jika Anda ingin aplikasinya memiliki alamat permanen di internet (seperti `https://ngomongyuk.vercel.app`):
1. Buat akun gratis di [Vercel](https://vercel.com) atau [Netlify](https://netlify.com).
2. Hubungkan proyek ini.
3. Aplikasi akan aktif online 24 jam tanpa perlu komputer laptop menyala sama sekali!
