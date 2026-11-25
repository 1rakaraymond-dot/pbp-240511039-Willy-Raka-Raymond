import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [sudahMemuat, setSudahMemuat] = useState(false);

  // Membaca data dari localStorage saat aplikasi pertama dibuka
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos") || "[]");
      setTodos(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error("Gagal membaca data:", error);
      setTodos([]);
    }

    setSudahMemuat(true);
  }, []);

  // Menyimpan data ketika todos mengalami perubahan
  useEffect(() => {
    if (!sudahMemuat) return;

    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  }, [todos, sudahMemuat]);

  const tambah = (teks) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), teks, selesai: false },
    ]);
  };

  const hapus = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
      )
    );
  };

  return (
    <main className="app">
      <h1 className="judul">
        <span aria-hidden="true">📝</span>
        <span>To-Do List React</span>
      </h1>

      <p className="subtitle">Kelola daftar tugas harian kamu.</p>

      <TodoForm onTambah={tambah} />
      <TodoStats todos={todos} />
      <TodoList todos={todos} onHapus={hapus} onToggle={toggle} />
    </main>
  );
}
