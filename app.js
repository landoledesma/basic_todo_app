import { saveTaskToLocalStorage,loadTask,updateLocalStorage,removeFromLocalStorage } from './localStorage-utils.js';
// Ejemplo de uso
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

loadTask(taskList,createTaskElement);

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskValue = taskInput.value;
    console.log(taskValue);

    if (taskValue){
        taskList.append(createTaskElement(taskValue));
        saveTaskToLocalStorage(taskValue);
        taskInput.value = "";
    }

});

function createTaskElement(taskValue) {
    const li = document.createElement("li");
    li.textContent = taskValue;
    li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn"));
    return li;
}

function createButton(text,className) {
    const btn = document.createElement("span");
    btn.textContent = text;
    btn.className = className;
    return btn;
}

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const taskElement = event.target.parentElement;
        if (confirm("Are you sure you want to delete this task?")) {
                taskElement.remove();
                removeFromLocalStorage(taskElement.firstChild.textContent);
            
        }
    } else if (event.target.classList.contains("edit-btn")) {
        const taskElement = event.target.parentElement;
        const taskText = taskElement.firstChild;
        const newTaskText = prompt("Edit the task", taskText.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskText.textContent = newTaskText.trim();
            updateLocalStorage();
        }
    }
});

const themeToggleButton = document.getElementById("toggle-theme-btn");
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}