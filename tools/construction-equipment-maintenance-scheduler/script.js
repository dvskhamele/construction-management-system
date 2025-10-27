
const equipment = [];

document.getElementById('addEquipmentBtn').addEventListener('click', function() {
    const equipmentName = document.getElementById('equipmentName').value;
    const lastMaintenanceDate = document.getElementById('lastMaintenanceDate').value;
    const maintenanceInterval = parseFloat(document.getElementById('maintenanceInterval').value);

    if (!equipmentName || !lastMaintenanceDate || isNaN(maintenanceInterval)) {
        alert('Please fill in all equipment details.');
        return;
    }

    equipment.push({ equipmentName, lastMaintenanceDate, maintenanceInterval });
    renderEquipmentList();
    clearInputs();
});

function renderEquipmentList() {
    const equipmentListUl = document.getElementById('equipmentList');
    equipmentListUl.innerHTML = '';
    const today = new Date();

    equipment.forEach((item, index) => {
        const lastDate = new Date(item.lastMaintenanceDate);
        const nextMaintenance = new Date(lastDate);
        nextMaintenance.setDate(lastDate.getDate() + item.maintenanceInterval);

        let statusClass = '';
        let statusText = `Due: ${nextMaintenance.toDateString()}`;

        const diffTime = nextMaintenance - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7 && diffDays >= 0) {
            statusClass = 'due-soon';
            statusText += ' (Due Soon)';
        } else if (diffDays < 0) {
            statusClass = 'overdue';
            statusText += ' (OVERDUE)';
        }

        const li = document.createElement('li');
        li.className = statusClass;
        li.innerHTML = `
            <span><strong>${item.equipmentName}</strong> - ${statusText}</span>
            <button onclick="removeEquipment(${index})">Remove</button>
        `;
        equipmentListUl.appendChild(li);
    });
}

function removeEquipment(index) {
    equipment.splice(index, 1);
    renderEquipmentList();
}

function clearInputs() {
    document.getElementById('equipmentName').value = '';
    document.getElementById('lastMaintenanceDate').value = '';
    document.getElementById('maintenanceInterval').value = '';
}
