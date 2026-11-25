
const express = require("express");
const router = express.Router();

const Item = require("../models/Item");

// GET: Mengambil semua barang
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      sukses: true,
      jumlah: items.length,
      data: items
    });
  } catch (err) {
    res.status(500).json({
      sukses: false,
      pesan: err.message
    });
  }
});

// GET: Mengambil barang berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

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
  } catch (err) {
    res.status(400).json({
      sukses: false,
      pesan: "ID tidak valid"
    });
  }
});

// POST: Menambahkan barang baru
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      sukses: true,
      data: item
    });
  } catch (err) {
    res.status(400).json({
      sukses: false,
      pesan: err.message
    });
  }
});

// PUT: Memperbarui barang berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

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
  } catch (err) {
    res.status(400).json({
      sukses: false,
      pesan: err.message
    });
  }
});

// DELETE: Menghapus barang berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        sukses: false,
        pesan: "Item tidak ditemukan"
      });
    }

    res.status(200).json({
      sukses: true,
      pesan: "Berhasil dihapus"
    });
  } catch (err) {
    res.status(400).json({
      sukses: false,
      pesan: "ID tidak valid"
    });
  }
});

module.exports = router;
