const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    if (taskInput.value.trim() === "") {
        alert("You must write something!");
        return; // Stop the function if input is empty
    }

    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);

    // Create a delete span (X icon)
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for multiplication sign (looks like 'x')
    li.appendChild(span);

    // Clear the input field
    taskInput.value = "";
    saveData(); // Save the updated list to localStorage
}

// Function to handle task clicks (toggle complete or delete)
taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save state after toggling
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the parent LI element
        saveData(); // Save state after deleting
    }
}, false); // 'false' is the default and can often be omitted

// Function to save data to Local Storage
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

// Function to show tasks from Local Storage when the page loads
function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
}

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

// Allows adding task by pressing Enter key
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load tasks when the script starts
showTask();