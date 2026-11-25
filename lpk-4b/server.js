
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON
app.use(express.json());

// Menghubungkan route items
app.use("/api/items", itemsRouter);

// Route utama untuk mengecek server
app.get("/", (req, res) => {
  res.json({
    sukses: true,
    pesan: "Server Express dan MongoDB API berjalan"
  });
});

// Menghubungkan MongoDB dan menjalankan server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI belum diatur di file .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB terhubung");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Gagal koneksi MongoDB:", err.message);
    process.exit(1);
  }
}

startServer();
