
document.addEventListener('DOMContentLoaded', function() {
    const milestoneForm = document.getElementById('milestone-form');
    const milestoneList = document.getElementById('milestone-list');
    let milestones = JSON.parse(localStorage.getItem('projectMilestones')) || [];

    function renderMilestones() {
        milestoneList.innerHTML = '';
        milestones.forEach((milestone, index) => {
            const listItem = document.createElement('li');
            listItem.className = milestone.status === 'Completed' ? 'completed' : '';
            listItem.innerHTML = `
                <div class="milestone-details">
                    <span><strong>Milestone:</strong> ${milestone.name}</span>
                    <span><strong>Due Date:</strong> ${milestone.dueDate}</span>
                </div>
                <select class="status-select ${milestone.status.replace(/ /g, '-')}" data-index="${index}">
                    <option value="Not Started" ${milestone.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${milestone.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${milestone.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            `;
            milestoneList.appendChild(listItem);
        });
    }

    function addMilestone(name, dueDate, status) {
        milestones.push({ name, dueDate, status });
        localStorage.setItem('projectMilestones', JSON.stringify(milestones));
        renderMilestones();
    }

    function updateMilestoneStatus(index, newStatus) {
        milestones[index].status = newStatus;
        localStorage.setItem('projectMilestones', JSON.stringify(milestones));
        renderMilestones();
    }

    milestoneForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('milestone-name').value;
        const dueDate = document.getElementById('due-date').value;
        const status = document.getElementById('status').value;
        addMilestone(name, dueDate, status);
        milestoneForm.reset();
    });

    milestoneList.addEventListener('change', function(event) {
        if (event.target.classList.contains('status-select')) {
            const index = parseInt(event.target.dataset.index);
            const newStatus = event.target.value;
            updateMilestoneStatus(index, newStatus);
        }
    });

    renderMilestones();
});
