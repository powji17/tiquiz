# TIQuiz

Platform kuis interaktif untuk belajar ilmu komputer — lengkap dengan pembahasan, progress tracking, leaderboard, dan panel admin.

🌐 **Live Demo:** [tiquiz.vercel.app](https://tiquiz.vercel.app)

---

## Fitur

### Untuk Pengguna
- **Kuis Interaktif** — navigasi soal bebas, progress tracker, stopwatch, modal konfirmasi sebelum submit dan keluar
- **Pembahasan Lengkap** — setiap soal dilengkapi penjelasan jawaban benar setelah submit
- **Leaderboard per Kuis** — peringkat berdasarkan skor tertinggi dan durasi tercepat, hanya menghitung attempt pertama
- **Progress Tracking** — pantau skor terbaik, kuis tuntas, dan rata-rata skor per topik di halaman profil
- **Riwayat Pengerjaan** — seluruh riwayat attempt dengan badge warna berdasarkan skor
- **Search & Filter** — cari dan filter topik/kuis berdasarkan status pengerjaan
- **Dark Mode** — toggle tema gelap/terang dengan transisi mulus, tersimpan di localStorage
- **Responsif** — tampilan optimal di desktop maupun mobile

### Untuk Admin
- **Panel Admin** — kelola topik, kuis, soal, dan pengguna (CRUD lengkap)
- **Cascade Delete** — hapus topik/kuis otomatis menghapus seluruh data di bawahnya termasuk riwayat
- **Reset Otomatis Leaderboard** — perubahan soal otomatis mereset attempt dan leaderboard kuis terkait
- **Modal Konfirmasi** — konfirmasi custom sebelum setiap aksi hapus maupun perubahan soal
- **Kelola Pengguna** — ubah role, reset password, tambah/hapus akun
- **Proteksi Self-Downgrade** — admin tidak bisa menurunkan role akunnya sendiri

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Auth | NextAuth.js (JWT) |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Tema | next-themes |
| Notifikasi | react-hot-toast |
| Deploy | Vercel |

---

## Struktur Database

```
User (role: USER | ADMIN)

Topic
└── Quiz
    ├── Question
    └── QuizAttempt
         ├── userId (→ User, onDelete: Cascade)
         ├── score
         ├── total
         ├── durationSeconds
         └── isFirstAttempt
```

---

## Memulai (Development)

### Prasyarat
- Node.js 18+
- PostgreSQL

### Instalasi

```bash
# Clone repository
git clone https://github.com/USERNAME/tiquiz.git
cd tiquiz

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate
```

### Konfigurasi Environment

Buat file `.env` di root project:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tiquiz?schema=public"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### Setup Database

```bash
# Jalankan migrasi
npx prisma migrate dev

# Isi data awal (10 topik, 24 kuis, 120 soal)
npx prisma db seed
```

### Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Membuat Akun Admin

Setelah mendaftar, ubah role akun lewat Prisma Studio:

```bash
npx prisma studio
```

Buka tabel `User`, temukan akun yang ingin dijadikan admin, ubah kolom `role` dari `USER` menjadi `ADMIN`.

Atau jalankan SQL langsung:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'email@kamu.com';
```

---

## Deploy ke Vercel

### 1. Buat Database di Neon

Buka [Vercel Dashboard](https://vercel.com) → **Storage** → **Create Database** → pilih **Neon**, lalu hubungkan ke project kamu.

### 2. Environment Variables

Tambahkan di Vercel → **Settings** → **Environment Variables**:

| Key | Value |
|---|---|
| `NEXTAUTH_SECRET` | String random minimal 32 karakter |
| `NEXTAUTH_URL` | `https://nama-project.vercel.app` |

> `DATABASE_URL` dan `DATABASE_URL_UNPOOLED` otomatis ditambahkan saat menghubungkan Neon.

### 3. Migrasi & Seed Database Production

```bash
# Migrasi schema (PowerShell)
$env:DATABASE_URL_UNPOOLED="<connection-string>"; npx prisma migrate deploy

# Seed data awal
$env:DATABASE_URL="<connection-string>"; npx prisma db seed
```

### 4. Deploy

Push ke branch `main` — Vercel otomatis men-deploy setiap ada commit baru.

---

## Struktur Project

```
tiquiz/
├── app/
│   ├── dashboard/
│   ├── quiz/[id]/
│   │   ├── page.js
│   │   ├── quiz-client.js
│   │   └── leaderboard.js
│   ├── topic/[id]/
│   ├── profile/
│   ├── history/
│   ├── login/
│   ├── register/
│   ├── admin/
│   │   ├── topics/
│   │   ├── quizzes/
│   │   └── users/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── register/
│   │   ├── quiz/
│   │   │   ├── submit/
│   │   │   └── [id]/leaderboard/
│   │   └── admin/
│   │       ├── topics/
│   │       ├── quizzes/
│   │       ├── questions/
│   │       └── users/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── LandingNavbar.js
│   │   ├── ThemeToggle.js
│   │   └── ConfirmModal.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── landing-client.js
│   └── providers.js
├── lib/
│   ├── auth.js
│   └── prisma.js
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── middleware.js
└── prisma.config.ts
```

---

## Konten Tersedia

| Topik | Kuis | Soal |
|---|---|---|
| Struktur Data | 4 | 20 |
| Algoritma | 3 | 15 |
| Basis Data | 3 | 15 |
| Jaringan Komputer | 2 | 10 |
| Sistem Operasi | 2 | 10 |
| Pemrograman Web | 2 | 10 |
| Pemrograman Berorientasi Objek | 2 | 10 |
| Matematika Diskrit | 2 | 10 |
| Kecerdasan Buatan | 2 | 10 |
| Rekayasa Perangkat Lunak | 2 | 10 |
| **Total** | **24** | **120** |

---

## Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

Dibuat selama libur semester oleh [Muhammad Fauzi](https://github.com/powji17) — Informatika, Universitas Tanjungpura.
