// localStorage-utils.js

export function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
export function loadTask(taskList,createTaskElement) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      taskList.appendChild(createTaskElement(task));
    });

  }
  
export function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map(
      (li) => li.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
export function removeFromLocalStorage(taskContent) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  
    const updateTasks = tasks.filter((task) => task !== taskContent);
  
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }