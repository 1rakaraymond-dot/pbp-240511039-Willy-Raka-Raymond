
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Data barang sementara (in-memory)
let items = [
  { id: 1, nama: "Laptop", harga: 8000000 },
  { id: 2, nama: "Mouse", harga: 150000 }
];

let nextId = 3;

// GET: Mengambil seluruh data barang
app.get("/api/items", (req, res) => {
  res.status(200).json({
    sukses: true,
    data: items
  });
});

// GET: Mengambil barang berdasarkan ID
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find((i) => i.id === id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      sukses: false,
      pesan: "ID tidak valid"
    });
  }

  if (!item) {
    return res.status(404).json({
      sukses: false,
      pesan: "Item tidak ditemukan"
    });
  }

  res.status(200).json({
    sukses: true,
    data: item
  });
});

// POST: Menambahkan barang baru
app.post("/api/items", (req, res) => {
  const { nama, harga } = req.body;

  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    harga === undefined ||
    !Number.isFinite(Number(harga)) ||
    Number(harga) < 0
  ) {
    return res.status(400).json({
      sukses: false,
      pesan: "Nama dan harga wajib diisi dengan benar"
    });
  }

  const baru = {
    id: nextId++,
    nama: nama.trim(),
    harga: Number(harga)
  };

  items.push(baru);

  res.status(201).json({
    sukses: true,
    data: baru
  });
});

// PUT: Memperbarui barang berdasarkan ID
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      sukses: false,
      pesan: "ID tidak valid"
    });
  }

  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      sukses: false,
      pesan: "Item tidak ditemukan"
    });
  }

  const { nama, harga } = req.body;

  if (
    nama === undefined &&
    harga === undefined
  ) {
    return res.status(400).json({
      sukses: false,
      pesan: "Tidak ada data yang diperbarui"
    });
  }

  if (
    nama !== undefined &&
    (typeof nama !== "string" || nama.trim() === "")
  ) {
    return res.status(400).json({
      sukses: false,
      pesan: "Nama tidak valid"
    });
  }

  if (
    harga !== undefined &&
    (!Number.isFinite(Number(harga)) || Number(harga) < 0)
  ) {
    return res.status(400).json({
      sukses: false,
      pesan: "Harga tidak valid"
    });
  }

  if (nama !== undefined) {
    item.nama = nama.trim();
  }

  if (harga !== undefined) {
    item.harga = Number(harga);
  }

  res.status(200).json({
    sukses: true,
    data: item
  });
});

// DELETE: Menghapus barang berdasarkan ID
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      sukses: false,
      pesan: "ID tidak valid"
    });
  }

  const exists = items.some((i) => i.id === id);

  if (!exists) {
    return res.status(404).json({
      sukses: false,
      pesan: "Item tidak ditemukan"
    });
  }

  items = items.filter((i) => i.id !== id);

  res.status(200).json({
    sukses: true,
    pesan: "Item berhasil dihapus"
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
