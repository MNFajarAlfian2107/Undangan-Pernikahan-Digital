# Undangan Pernikahan Digital: Wahyu & Mita

Website undangan pernikahan digital untuk **Wahyu & Mita**, dibuat sebagai Tugas Mandiri mata kuliah Pemrograman Berbasis Platform (PBP).

**Demo:** https://undangan-pernikahan-digitalfajaralf.vercel.app/

## Fitur

- **Halaman sampul** dengan nama tamu dan tombol "Buka Undangan"
- **Nama tamu dinamis** lewat parameter link, contoh: `?to=Nama%20Tamu`
- **Navbar responsif** dengan penanda menu aktif saat scroll (Bootstrap ScrollSpy)
- **Profil mempelai** beserta keluarga
- **Detail acara** (Akad Nikah dan Resepsi) dengan tautan Google Maps
- **Hitung mundur** menuju hari pernikahan (18 Januari 2027)
- **Kisah kami** dalam bentuk linimasa
- **Galeri foto** dengan pratinjau (lightbox)
- **Hadiah pernikahan** dengan tombol salin nomor rekening
- **RSVP dan ucapan** dengan validasi form dan penghitung karakter
- **Buku ucapan online** (`ucapan.html`): ucapan tersimpan di database dan dapat dilihat oleh semua orang yang membuka link
- **Musik latar** dengan tombol putar/jeda

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [Supabase](https://supabase.com/) (database PostgreSQL) untuk menyimpan ucapan
- [Vercel](https://vercel.com/) untuk hosting

## Struktur Folder

```
.
├── assets/          # gambar dan musik
├── css/
│   └── style.css    # gaya kustom
├── js/
│   └── script.js    # logika halaman dan koneksi Supabase
├── index.html       # halaman utama undangan
├── ucapan.html      # halaman buku ucapan
└── README.md
```

## Cara Menjalankan

1. Clone repository ini:
   ```bash
   git clone https://github.com/MNFajarAlfian2107/Undangan-Pernikahan-Digital.git
   ```
2. Buka folder proyek.
3. Isi konfigurasi Supabase di `js/script.js` (lihat bagian di bawah).
4. Buka `index.html` di browser, atau gunakan ekstensi **Live Server** di VS Code.

Bootstrap dan library Supabase dimuat lewat CDN, jadi tidak perlu instalasi tambahan.

## Konfigurasi Supabase

1. Buat proyek di [supabase.com](https://supabase.com/).
2. Buka **SQL Editor**, lalu jalankan:

   ```sql
   create table public.wishes (
     id bigint generated always as identity primary key,
     name text not null check (char_length(name) between 1 and 60),
     attendance text not null check (attendance in ('Hadir', 'Belum dapat hadir')),
     message text not null check (char_length(message) between 1 and 300),
     created_at timestamptz not null default now()
   );

   alter table public.wishes enable row level security;

   create policy "Semua orang boleh membaca ucapan"
     on public.wishes for select to anon using (true);

   create policy "Semua orang boleh mengirim ucapan"
     on public.wishes for insert to anon with check (true);
   ```

3. Buka **Project Settings → API Keys**, lalu salin **Project URL** dan **Publishable key**.
4. Isi keduanya di `js/script.js`:

   ```js
   const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
   const SUPABASE_KEY = "sb_publishable_xxxxxxxx";
   ```

Pengunjung hanya bisa **membaca** dan **menambah** ucapan. Mengubah dan menghapus tidak diizinkan lewat Row Level Security.

> Gunakan hanya **Publishable key** (atau *anon public*). Jangan pernah menaruh **Secret key** atau *service_role* di kode website.

## Deploy

Proyek ini di-deploy dengan **Vercel** yang terhubung ke repository GitHub. Setiap perubahan yang di-push ke branch `main` otomatis diterbitkan ulang.

## Pembuat

**Moh Nur Fajar Alfian**
NIM: *(isi NIM kamu)*
Kelas: *(isi kelas kamu)*
