
export default function TodoStats({ todos }) {
  const belum = todos.filter((t) => !t.selesai).length;
  const selesai = todos.filter((t) => t.selesai).length;

  return (
    <p className="stats">
      {belum} tugas belum selesai • {selesai} selesai dari {todos.length} tugas
    </p>
  );
}
