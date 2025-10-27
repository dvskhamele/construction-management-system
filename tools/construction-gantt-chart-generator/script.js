
const tasks = [];

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!taskName || !startDate || !endDate) {
        alert('Please fill in all task details.');
        return;
    }

    tasks.push({ taskName, startDate, endDate });
    renderTaskList();
    clearTaskInputs();
});

document.getElementById('generateChartBtn').addEventListener('click', function() {
    if (tasks.length === 0) {
        alert('Please add some tasks first.');
        return;
    }
    renderGanttChart();
});

function renderTaskList() {
    const taskListUl = document.getElementById('tasks');
    taskListUl.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.taskName} (${task.startDate} to ${task.endDate})</span>
            <button onclick="removeTask(${index})">Remove</button>
        `;
        taskListUl.appendChild(li);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
    renderGanttChart(); // Re-render chart after task removal
}

function clearTaskInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}

function renderGanttChart() {
    const canvas = document.getElementById('ganttChart');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (tasks.length === 0) return;

    // Determine chart dimensions and scale
    const dates = tasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
    const pixelsPerDay = canvas.width / (totalDays + 5); // Add some padding

    const rowHeight = 40;
    canvas.height = tasks.length * rowHeight + 50; // Adjust canvas height based on tasks

    // Draw tasks
    tasks.forEach((task, index) => {
        const startX = (new Date(task.startDate) - minDate) / (1000 * 60 * 60 * 24) * pixelsPerDay;
        const endX = (new Date(task.endDate) - minDate) / (1000 * 60 * 60 * 24) * pixelsPerDay;
        const y = index * rowHeight + 20;

        ctx.fillStyle = '#007bff';
        ctx.fillRect(startX, y, endX - startX, rowHeight - 10);

        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(task.taskName, startX + 5, y + rowHeight / 2 + 4);
    });

    // Draw date axis (simplified)
    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    for (let i = 0; i <= totalDays; i += 7) { // Mark every 7 days
        const date = new Date(minDate);
        date.setDate(minDate.getDate() + i);
        const x = i * pixelsPerDay;
        ctx.fillText(date.toLocaleDateString(), x, canvas.height - 10);
    }
}
