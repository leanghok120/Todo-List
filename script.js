let totalTask = 0;
let taskList = [];
let completedTask = 0;
const totalTaskElement = document.getElementById("total-task");
const parentListElement = document.getElementById("list");
const completedTaskElement = document.getElementById("completed-task");


class Task {
    constructor(task) {
        this.taskName = task;
    }
}

const totalTaskStorage = localStorage.getItem("totalTask");
if (totalTaskStorage !== null) {
    totalTask = totalTaskStorage;
}

const taskListStorage = localStorage.getItem("tasks");
if (taskListStorage !== null) {
    taskList = JSON.parse(taskListStorage).map((task) => {
        return new Task(task.taskName);
    });
}

const completedTaskStorage = localStorage.getItem("completedTask");
if (completedTaskStorage !== null) {
    completedTask = completedTaskStorage;
}

refreshUI();

function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("totalTask", totalTask);
    localStorage.setItem("completedTask", completedTask);
}

function addTask(form) {
    const taskName = form.task.value;

    totalTask += 1;
    const task = new Task(taskName);
    taskList.push(task);

    updateStorage();
    refreshUI();

    return false;
}


function refreshUI() {
    totalTaskElement.innerText = `Total Tasks: ${totalTask}`;
    completedTaskElement.innerText = `Completed Tasks: ${completedTask}`;

    // List of tasks
    parentListElement.innerHTML = "";
    taskList.forEach((task, index) => {
        const listElement = document.createElement("li");
        const textNode = document.createTextNode(task.taskName);
        listElement.appendChild(textNode);
        parentListElement.appendChild(listElement);
        listElement.classList.add("list-group-item", "d-flex", "justify-content-between");
    
        // Remove task button
        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.innerText = "Remove";
        listElement.appendChild(removeButton);
    
        removeButton.addEventListener("click", () => {
            taskList.splice(index, 1);
            totalTask -= 1;
            updateStorage();
            refreshUI();
        });
        // Done task button
        const doneButton = document.createElement("button");
        doneButton.classList.add("btn", "btn-success");
        doneButton.innerText = "Done";
        listElement.appendChild(doneButton);
    
        doneButton.addEventListener("click", () => {
            taskList.splice(index, 1);
            totalTask -= 1;
            completedTask += 1;

            updateStorage();
            refreshUI();
        });
    });
}