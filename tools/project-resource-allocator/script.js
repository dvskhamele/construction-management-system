
const allocations = [];

document.getElementById('addTaskResourceBtn').addEventListener('click', function() {
    const taskName = document.getElementById('taskName').value;
    const resourceName = document.getElementById('resourceName').value;

    if (!taskName || !resourceName) {
        alert('Please enter both task name and resource name.');
        return;
    }

    allocations.push({ taskName, resourceName });
    renderAllocationList();
    clearInputs();
});

function renderAllocationList() {
    const allocationListUl = document.getElementById('allocations');
    allocationListUl.innerHTML = '';
    allocations.forEach((allocation, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>Task:</strong> ${allocation.taskName} - <strong>Resource:</strong> ${allocation.resourceName}</span>
            <button onclick="removeAllocation(${index})">Remove</button>
        `;
        allocationListUl.appendChild(li);
    });
}

function removeAllocation(index) {
    allocations.splice(index, 1);
    renderAllocationList();
}

function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('resourceName').value = '';
}
