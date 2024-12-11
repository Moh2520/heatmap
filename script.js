// DOM Elements
const taskInput = document.getElementById('task');
const valueInput = document.getElementById('value');
const daysInput = document.getElementById('days');
const addTaskButton = document.getElementById('addTask');
const generateCalendarButton = document.getElementById('generateCalendar');
const heatmapGrid = document.getElementById('heatmapGrid');

// Event Listeners
addTaskButton.addEventListener('click', handleAddTask);
generateCalendarButton.addEventListener('click', handleGenerateCalendar);

// Add Task Handler
function handleAddTask() {
    const taskName = taskInput.value.trim();
    const taskValue = parseInt(valueInput.value);

    if (isValidTask(taskName, taskValue)) {
        createHeatmapItem(taskName, taskValue);
        clearInputs(taskInput, valueInput);
    } else {
        alert('Please enter a valid task name and value between 0 and 100.');
    }
}

// Generate Calendar Handler
function handleGenerateCalendar() {
    const days = parseInt(daysInput.value);

    if (isValidDays(days)) {
        generateHeatmapCalendar(days);
        clearInputs(daysInput);
    } else {
        alert('Please enter a valid number of days.');
    }
}

// Utility Functions
function isValidTask(name, value) {
    return name && !isNaN(value) && value >= 0 && value <= 100;
}

function isValidDays(days) {
    return !isNaN(days) && days > 0;
}

function clearInputs(...inputs) {
    inputs.forEach(input => input.value = '');
}

// Create Heatmap Item
function createHeatmapItem(name, value) {
    const item = document.createElement('div');
    item.classList.add('heatmap-item');
    item.textContent = name;
    item.style.backgroundColor = getColor(value);
    heatmapGrid.appendChild(item);
}

// Generate Heatmap Calendar
function generateHeatmapCalendar(days) {
    heatmapGrid.innerHTML = ''; // Clear existing grid
    addDayHeaders();

    for (let i = 0; i < days; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-item');
        day.textContent = `Day ${i + 1}`;

        const randomValue = getRandomValue(0, 100);
        day.style.backgroundColor = getColor(randomValue);

        day.addEventListener('click', () => editDayValue(day, i + 1, randomValue));

        heatmapGrid.appendChild(day);
    }
}

// Add Day Headers
function addDayHeaders() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.classList.add('calendar-header');
        header.textContent = day;
        heatmapGrid.appendChild(header);
    });
}

// Edit Day Value
function editDayValue(dayElement, dayNumber, currentValue) {
    const newValue = prompt(`Enter value for Day ${dayNumber} (0-100):`, currentValue);

    if (newValue !== null && !isNaN(newValue) && newValue >= 0 && newValue <= 100) {
        dayElement.style.backgroundColor = getColor(parseInt(newValue));
    } else {
        alert('Please enter a valid number between 0 and 100.');
    }
}

// Get Random Value
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate Color Based on Value
function getColor(value) {
    if (value < 1 || value > 10) {
        return 'grey'; // Grey for invalid values
    }

    // Map the value (1-10) to green intensity (e.g., light to dark green)
    const greenIntensity = Math.floor((value / 10) * 255); // Scale to 0-255
    return `rgb(0, ${greenIntensity}, 0)`; // Shades of green
}