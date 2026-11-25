# LKP 4A — RESTful API dengan Express.js

## 1. Deskripsi Project

Project ini merupakan tugas praktikum Pertemuan 6: Back-End dengan Express.js.

Aplikasi ini merupakan RESTful API sederhana untuk mengelola data barang menggunakan Node.js dan Express.js.

API menyediakan operasi CRUD (Create, Read, Update, Delete) dengan penyimpanan data sementara menggunakan array in-memory.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- NPM
- Nodemon
- Postman

## 3. Struktur Project

```text
lpk-4a/
├── node_modules/
├── screenshots/
│   ├── 01-get-all.png
│   ├── 02-get-by-id.png
│   ├── 03-post-item.png
│   ├── 04-put-item.png
│   └── 05-delete-item.png
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## 4. Cara Menjalankan Project

Pastikan Node.js sudah terinstal.

Buka terminal di folder `lpk-4a`, kemudian jalankan:

```bash
npm install
```

Jalankan server dalam mode development:

```bash
npm run dev
```

Server berjalan pada:

```text
http://localhost:3000
```

## 5. Daftar Endpoint API

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /api/items | Mengambil semua barang |
| GET | /api/items/:id | Mengambil barang berdasarkan ID |
| POST | /api/items | Menambahkan barang baru |
| PUT | /api/items/:id | Memperbarui barang |
| DELETE | /api/items/:id | Menghapus barang |

## 6. Detail Pengujian API

### A. GET — Semua Barang

Endpoint:

```text
GET /api/items
```

Fungsi: Menampilkan seluruh data barang.

### B. GET — Barang Berdasarkan ID

Endpoint:

```text
GET /api/items/1
```

Fungsi: Menampilkan satu barang berdasarkan ID.

### C. POST — Menambahkan Barang

Endpoint:

```text
POST /api/items
```

Request Body:

```json
{
  "nama": "Keyboard",
  "harga": 300000
}
```

Fungsi: Menambahkan barang baru ke dalam array.

Status berhasil: `201 Created`.

### D. PUT — Memperbarui Barang

Endpoint:

```text
PUT /api/items/1
```

Request Body:

```json
{
  "harga": 7500000
}
```

Fungsi: Memperbarui harga barang dengan ID 1.

Status berhasil: `200 OK`.

### E. DELETE — Menghapus Barang

Endpoint:

```text
DELETE /api/items/2
```

Fungsi: Menghapus barang dengan ID 2.

Status berhasil: `200 OK`.

## 7. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request atau input tidak valid |
| 404 | Data tidak ditemukan |
| 500 | Internal Server Error |

## 8. Validasi Data

API memiliki validasi input untuk operasi POST dan PUT.

- Nama barang wajib diisi.
- Harga harus berupa angka yang valid.
- Harga tidak boleh negatif.
- ID harus berupa bilangan bulat positif.
- Data dengan ID yang tidak ditemukan menghasilkan status 404.

## 9. Penyimpanan Data

Data disimpan menggunakan array in-memory pada server Express.

Data tidak disimpan secara permanen ke database. Oleh karena itu, perubahan data akan hilang ketika server dimulai ulang.

## 10. Bukti Pengujian

Screenshot pengujian API menggunakan Postman tersedia di folder `screenshots/`.

Pengujian mencakup GET semua barang, GET berdasarkan ID, POST, PUT, dan DELETE.