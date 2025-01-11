// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Retrieve tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all'; // Default filter is 'all'

// Render tasks based on filter
function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks;

    // Filter tasks based on the filter variable
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.name}</span>
            <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        renderTasks();
    }
}

// Toggle task completion (for strikethrough)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Complete task (via "Complete" button)
function completeTask(index) {
    tasks[index].completed = true;
    updateLocalStorage();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks based on completion status
function filterTasks(status) {
    filter = status;
    renderTasks();
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();
