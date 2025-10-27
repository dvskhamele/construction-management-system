document.addEventListener('DOMContentLoaded', () => {
    const taskNameInput = document.getElementById('task-name');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const statusSelect = document.getElementById('status');
    const addTaskButton = document.getElementById('add-task');
    const progressTableBody = document.querySelector('#progress-table tbody');

    let tasks = JSON.parse(localStorage.getItem('projectTasks')) || [];

    const renderTasks = () => {
        progressTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.startDate}</td>
                <td>${task.endDate}</td>
                <td class="status-${task.status}">${task.status.replace('-', ' ').toUpperCase()}</td>
                <td>
                    <select class="status-changer" data-index="${index}">
                        <option value="not-started" ${task.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                        <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                    <button class="delete-task" data-index="${index}">Delete</button>
                </td>
            `;
            progressTableBody.appendChild(row);
        });

        document.querySelectorAll('.status-changer').forEach(select => {
            select.addEventListener('change', (event) => {
                const index = event.target.dataset.index;
                tasks[index].status = event.target.value;
                localStorage.setItem('projectTasks', JSON.stringify(tasks));
                renderTasks();
            });
        });

        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                tasks.splice(index, 1);
                localStorage.setItem('projectTasks', JSON.stringify(tasks));
                renderTasks();
            });
        });
    };

    addTaskButton.addEventListener('click', () => {
        const name = taskNameInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const status = statusSelect.value;

        if (!name || !startDate || !endDate) {
            alert('Please fill in all task details.');
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            alert('End date cannot be before start date.');
            return;
        }

        tasks.push({ name, startDate, endDate, status });
        localStorage.setItem('projectTasks', JSON.stringify(tasks));
        renderTasks();

        taskNameInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        statusSelect.value = 'not-started';
    });

    renderTasks();
});