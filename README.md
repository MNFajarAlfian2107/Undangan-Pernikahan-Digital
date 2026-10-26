# Undangan Pernikahan Digital: Wahyu & Mita

Website undangan pernikahan digital untuk **Wahyu & Mita**, dibuat sebagai Tugas Mandiri mata kuliah Pemrograman Berbasis Platform (PBP).

**Link Vercel:** https://undangan-pernikahan-digitalfajaralf.vercel.app/

## Fitur

- **Halaman sampul** dengan nama tamu dan tombol "Buka Undangan"
- **Navbar responsif** dengan penanda menu aktif saat scroll (Bootstrap ScrollSpy)
- **Profil mempelai** beserta keluarga
- **Detail acara** (Akad Nikah dan Resepsi) dengan tautan Google Maps
- **Hitung mundur** menuju hari pernikahan (18 Januari 2027)
- **Kisah kami** dalam bentuk linimasa
- **Galeri foto** dengan pratinjau (lightbox)
- **Hadiah pernikahan** dengan tombol salin nomor rekening
- **RSVP dan ucapan** dengan validasi form dan penghitung karakter
- **Halaman buku ucapan** (`ucapan.html`) untuk melihat semua ucapan
- **Musik latar** dengan tombol putar/jeda

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Bootstrap 5.3.3](https://getbootstrap.com/)
- localStorage untuk menyimpan ucapan di browser

## Struktur Folder

```
.
├── assets/          
├── css/
│   └── style.css    
├── js/
│   └── script.js    
├── index.html       
├── ucapan.html      
└── README.md
```

## Cara Menjalankan

1. Unduh atau clone repository ini:
   ```bash
   git clone https://github.com/MNFajarAlfian2107/Undangan-Pernikahan-Digital.git
   ```
2. Buka folder proyek.
3. Buka `index.html` di browser, atau gunakan ekstensi **Live Server** di VS Code.

Tidak perlu instalasi tambahan karena Bootstrap dimuat lewat CDN.

## Deploy

Proyek ini di-deploy menggunakan **Vercel** yang terhubung ke repository GitHub. Setiap perubahan yang di-push ke branch `main` akan otomatis diterbitkan ulang.

## Catatan

Ucapan disimpan di `localStorage`, sehingga hanya terlihat di browser yang digunakan untuk mengirimnya. Untuk buku ucapan yang bisa dilihat semua tamu, diperlukan backend atau database (misalnya Firebase atau Supabase).

## Pembuat

**Moh Nur Fajar Alfian**
NIM: *25051204180*
Kelas: *TI 2025E*
