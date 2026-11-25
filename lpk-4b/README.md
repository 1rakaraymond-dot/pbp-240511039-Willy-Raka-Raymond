# LPK 4B — Integrasi REST API dengan MongoDB Atlas

## Deskripsi

Project ini merupakan implementasi REST API menggunakan Node.js, Express.js, dan MongoDB Atlas dengan bantuan Mongoose.

API digunakan untuk mengelola data barang melalui operasi CRUD (Create, Read, Update, Delete).

## Teknologi

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon
- Postman

## Struktur Folder

```text
lpk-4b/
├── models/
│   └── Item.js
├── routes/
│   └── items.js
├── screenshots/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Konfigurasi

1. Instal seluruh dependency:

   ```bash
   npm install
   ```

2. Buat file `.env` di folder utama.

3. Isi konfigurasi environment:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/pbp_db?retryWrites=true&w=majority
   ```

   Ganti placeholder dengan kredensial dan alamat cluster MongoDB Atlas milik sendiri. Jangan membagikan atau mengunggah file `.env`.

## Menjalankan Aplikasi

Mode development:

```bash
npm run dev
```

Mode production:

```bash
npm start
```

Server berjalan pada:

`http://localhost:3000`

## Daftar Endpoint API

Base URL: `http://localhost:3000/api/items`

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Mengambil seluruh barang |
| GET | `/:id` | Mengambil barang berdasarkan ID |
| POST | `/` | Menambahkan barang |
| PUT | `/:id` | Memperbarui barang berdasarkan ID |
| DELETE | `/:id` | Menghapus barang berdasarkan ID |

## Contoh Data

Request POST:

```json
{
  "nama": "Keyboard",
  "harga": 300000,
  "kategori": "periferal"
}
```

## Struktur Model Item

| Field | Tipe | Keterangan |
|---|---|---|
| nama | String | Wajib diisi |
| harga | Number | Wajib diisi, minimal 0 |
| kategori | String | Default: umum |
| createdAt | Date | Waktu pembuatan otomatis |
| updatedAt | Date | Waktu pembaruan otomatis |

## Hasil Pengujian

Pengujian dilakukan menggunakan Postman.

- POST: berhasil menambahkan data.
- GET: berhasil mengambil seluruh data.
- GET by ID: berhasil mengambil data berdasarkan ID.
- PUT: berhasil memperbarui data.
- DELETE: berhasil menghapus data.
- GET setelah DELETE: berhasil memastikan data sudah terhapus.
- MongoDB Atlas: database dan collection berhasil diverifikasi.

## Dokumentasi Screenshot

Seluruh bukti pengujian tersedia di folder `screenshots/`.

## Catatan

File `.env` dan folder `node_modules/` tidak disertakan dalam repository GitHub.