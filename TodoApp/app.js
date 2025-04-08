const todoInput = document.getElementById("todoInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

const goalInput = document.getElementById("goalInput");
const daySelect = document.getElementById("daySelect");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");

const todoSection = document.getElementById("todo-section");
const goalsSection = document.getElementById("goals-section");

const todoTab = document.getElementById("todo-tab");
const goalsTab = document.getElementById("goals-tab");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="${item.done ? "completed" : ""}">${item.text}</td>
          <td>${item.priority}</td>
          <td>
            <input type="checkbox" ${
              item.done ? "checked" : ""
            } onchange="toggleTodo(${index})">
          </td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">Sil</button>
          </td>
        `;
    todoList.appendChild(row);
  });
}

function renderGoals() {
  goalList.innerHTML = "";
  goals.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="${item.done ? "completed" : ""}">${item.text}</td>
          <td>${item.day}</td>
          <td>
            <input type="checkbox" ${
              item.done ? "checked" : ""
            } onchange="toggleGoal(${index})">
          </td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteGoal(${index})">Sil</button>
          </td>
        `;
    goalList.appendChild(row);
  });
}

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  const priority = prioritySelect.value;
  if (text !== "") {
    todos.push({ text, priority, done: false });
    saveData();
    renderTodos();
    todoInput.value = "";
  }
});

addGoalBtn.addEventListener("click", () => {
  const text = goalInput.value.trim();
  const day = daySelect.value;
  if (text !== "") {
    goals.push({ text, day, done: false });
    saveData();
    renderGoals();
    goalInput.value = "";
  }
});

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  saveData();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveData();
  renderTodos();
}

function toggleGoal(index) {
  goals[index].done = !goals[index].done;
  saveData();
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  saveData();
  renderGoals();
}

todoTab.addEventListener("click", () => {
  todoSection.classList.remove("d-none");
  goalsSection.classList.add("d-none");
  todoTab.classList.add("active");
  goalsTab.classList.remove("active");
});

goalsTab.addEventListener("click", () => {
  todoSection.classList.add("d-none");
  goalsSection.classList.remove("d-none");
  todoTab.classList.remove("active");
  goalsTab.classList.add("active");
});

renderTodos();
renderGoals();
