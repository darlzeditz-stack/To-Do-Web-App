const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div class="task-info">
        <strong>${task.text}</strong>
        ${task.dateTime ? `<small>${new Date(task.dateTime).toLocaleString()}</small>` : ""}
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "✔️"}</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const dateTime = taskDateTime.value;
  if (text === "") return alert("Please enter a task!");

  const newTask = { text, dateTime, completed: false };
  tasks.push(newTask);
  saveTasks();
  displayTasks();

  taskInput.value = "";
  taskDateTime.value = "";
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    displayTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
