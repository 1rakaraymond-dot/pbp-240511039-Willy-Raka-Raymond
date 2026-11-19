
// Mengambil elemen HTML
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskSummary = document.querySelector("#task-summary");
const emptyState = document.querySelector("#empty-state");

// Mengambil data dari localStorage
let tasks = loadTasks();

// Mengambil data tugas dari localStorage
function loadTasks() {
    try {
        const savedTasks = JSON.parse(
            localStorage.getItem("todo-tasks") ?? "[]"
        );

        if (!Array.isArray(savedTasks)) {
            return [];
        }

        return savedTasks.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        );

    } catch (error) {
        console.error("Gagal membaca data:", error);
        return [];
    }
}


// Menyimpan tugas ke localStorage
function saveTasks() {
    localStorage.setItem(
        "todo-tasks",
        JSON.stringify(tasks)
    );
}

const user = {
    nama: "Budi",
    umur: 20
};

localStorage.setItem("user", JSON.stringify(user));


// Menampilkan daftar tugas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(({ id, text, completed }) => {
        // Membuat elemen list
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = id;

        // Membuat label
        const label = document.createElement("label");
        label.className = "task-label";

        if (completed) {
            label.classList.add("completed");
        }

        // Membuat checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = completed;

        // Membuat teks tugas
        const span = document.createElement("span");
        span.textContent = text;

        label.appendChild(checkbox);
        label.appendChild(span);

        // Membuat tombol hapus
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Hapus";

        // Menggabungkan elemen
        li.appendChild(label);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    // Menghitung tugas yang selesai
    const completedCount = tasks.filter(
        task => task.completed
    ).length;

    taskSummary.textContent =
        `${completedCount} dari ${tasks.length} tugas selesai`;

    // Menampilkan pesan jika belum ada tugas
    emptyState.hidden = tasks.length > 0;
}


// Event ketika form dikirim
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const newTask = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});


// Event ketika checkbox berubah
taskList.addEventListener("change", (event) => {
    if (!event.target.matches(".task-checkbox")) {
        return;
    }

    const li = event.target.closest(".task-item");
    const taskId = li.dataset.id;

    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: event.target.checked }
            : task
    );

    saveTasks();
    renderTasks();
});


// Event ketika tombol hapus diklik
taskList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-button");

    if (!deleteButton) {
        return;
    }

    const li = deleteButton.closest(".task-item");
    const taskId = li.dataset.id;

    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks();
    renderTasks();
});

// Menampilkan data saat halaman pertama kali dibuka
renderTasks();



