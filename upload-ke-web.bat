@echo off
title Upload NgomongYuk! ke Web Gratis (24 Jam Nonstop)
color 0b
echo ===================================================================
echo   UPLOAD APLIKASI KE WEB GRATIS (ONLINE 24 JAM NONSTOP)
echo ===================================================================
echo.
echo Langkah ini akan mempublikasikan aplikasi ke internet secara GRATIS.
echo Setelah online, aplikasi bisa diakses dan diinstal di HP selamanya
echo meskipun komputer/laptop ini dimatikan total!
echo.
echo Sedang menyiapkan file terbaru...
call npm run build

echo.
echo ===================================================================
echo  PETUNJUK CEPAT:
echo  1. Jika muncul pertanyaan 'email', ketik email Anda lalu Enter.
echo  2. Jika muncul pertanyaan 'password', ketik password bebas lalu Enter.
echo  3. Tekan Enter terus sampai proses upload selesai (100%%).
echo ===================================================================
echo.
call npx surge dist --domain ngomongyuk-%RANDOM%.surge.sh
echo.
echo ===================================================================
echo  Selesai! Link di atas adalah link permanen aplikasi Anda.
echo  Simpan alamat tersebut dan buka di HP Anda kapan saja!
echo ===================================================================
echo.
pause
