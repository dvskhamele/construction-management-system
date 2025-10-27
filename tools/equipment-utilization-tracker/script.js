
document.addEventListener('DOMContentLoaded', () => {
    const equipmentNameInput = document.getElementById('equipment-name');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const addUsageButton = document.getElementById('add-usage');
    const utilizationTableBody = document.querySelector('#utilization-table tbody');

    // Load data from local storage
    let utilizationData = JSON.parse(localStorage.getItem('utilizationData')) || [];

    const renderTable = () => {
        utilizationTableBody.innerHTML = '';
        utilizationData.forEach(data => {
            const row = document.createElement('tr');
            const duration = (new Date(data.end) - new Date(data.start)) / (1000 * 60 * 60); // in hours
            row.innerHTML = `
                <td>${data.equipment}</td>
                <td>${new Date(data.start).toLocaleString()}</td>
                <td>${new Date(data.end).toLocaleString()}</td>
                <td>${duration.toFixed(2)}</td>
            `;
            utilizationTableBody.appendChild(row);
        });
    };

    addUsageButton.addEventListener('click', () => {
        const equipmentName = equipmentNameInput.value;
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        if (!equipmentName || !startTime || !endTime) {
            alert('Please fill in all fields.');
            return;
        }

        if (new Date(endTime) < new Date(startTime)) {
            alert('End time cannot be before start time.');
            return;
        }

        utilizationData.push({ equipment: equipmentName, start: startTime, end: endTime });
        localStorage.setItem('utilizationData', JSON.stringify(utilizationData));
        renderTable();

        equipmentNameInput.value = '';
        startTimeInput.value = '';
        endTimeInput.value = '';
    });

    renderTable();
});
