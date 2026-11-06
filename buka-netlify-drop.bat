@echo off
title Buka Netlify Drop - Upload 5 Detik Gratis
echo ===================================================================
echo   UPLOAD GRATIS DALAM 5 DETIK VIA NETLIFY DROP
echo ===================================================================
echo.
echo Sedang menyiapkan file aplikasi terbaru...
call npm run build
echo.
echo Membuka halaman Netlify Drop dan folder aplikasi Anda...
start https://app.netlify.com/drop
explorer dist
echo.
echo ===================================================================
echo  PETUNJUK SANGAT MUDAH:
echo  1. Halaman web Netlify Drop sudah terbuka di browser Anda.
echo  2. Jendela folder 'dist' juga sudah terbuka di layar Anda.
echo  3. Tarik (Drag & Drop) isi folder tersebut ke dalam kotak di web.
echo  4. Dalam 5 detik, Anda langsung mendapatkan link web aktif 24 jam!
echo ===================================================================
echo.
pause
