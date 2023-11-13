// Variables
const inputTaskBox = document.getElementById("input-task-box");
const createTaskButton = document.getElementById("create-task");
const deleteTaskButton = document.getElementById("delete-task");
const selectAllCheckbox = document.getElementById("select-all");
const taskList = document.getElementById("task-list");

// Create Task
function createTask() {
  const taskText = inputTaskBox.value;

  if (taskText !== "") {
    const newTask = new Task(taskText);
    const taskElement = newTask.createTaskElement();
    taskList.appendChild(taskElement);

    inputTaskBox.value = "";
    updateDeleteButtonState();
  }
}

// Delete Tasks
function deleteSelectedTasks() {
  const checkedTasks = document.querySelectorAll(
    ".task-item input[type='checkbox']:checked"
  );

  checkedTasks.forEach((task) => {
    task.closest(".task-item").remove();
  });

  updateDeleteButtonState();
}

// update delete button state
function updateDeleteButtonState() {
  const numberOfTasks = taskList.childElementCount;
  deleteTaskButton.disabled = numberOfTasks === 0;

  if (numberOfTasks === 0) {
    deleteTaskButton.classList.add("disabled");
  } else {
    deleteTaskButton.classList.remove("disabled");
  }

  deleteTaskButton.textContent =
    numberOfTasks > 1 ? "Delete tasks" : "Delete task";
}

// Add task with enter
function handleKeyPress(event) {
  if (event.key === "Enter") {
    createTask();
    event.preventDefault();
  }
}

// Select All Tasks
function selectAllTasks() {
  const checkboxes = document.querySelectorAll(
    ".task-item input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });

  updateDeleteButtonState();
}

// Event Listeners
createTaskButton.addEventListener("click", createTask);
deleteTaskButton.addEventListener("click", deleteSelectedTasks);
inputTaskBox.addEventListener("keydown", handleKeyPress);
selectAllCheckbox.addEventListener("change", selectAllTasks);

// Classes
class Task {
  constructor(text) {
    this.text = text;
  }

  createTaskElement() {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const taskText = document.createElement("label");
    taskText.className = "task-text";
    taskText.textContent = this.text;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);

    this.taskElement = taskItem;

    return taskItem;
  }
}
