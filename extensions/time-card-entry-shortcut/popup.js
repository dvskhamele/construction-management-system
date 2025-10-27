
document.addEventListener('DOMContentLoaded', () => {
    const projectNameInput = document.getElementById('project-name');
    const hoursWorkedInput = document.getElementById('hours-worked');
    const logHoursButton = document.getElementById('log-hours');
    const logDisplay = document.getElementById('log-display');
    const clearLogButton = document.getElementById('clear-log');

    let timeLogs = [];

    // Load logs from storage
    chrome.storage.sync.get(['timeLogs'], (result) => {
        if (result.timeLogs) {
            timeLogs = result.timeLogs;
            renderLogs();
        }
    });

    logHoursButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        const hoursWorked = parseFloat(hoursWorkedInput.value);

        if (projectName && !isNaN(hoursWorked) && hoursWorked > 0) {
            const timestamp = new Date().toLocaleString();
            timeLogs.push({ projectName, hoursWorked, timestamp });
            chrome.storage.sync.set({ timeLogs: timeLogs }, () => {
                projectNameInput.value = '';
                hoursWorkedInput.value = '';
                renderLogs();
            });
        }
    });

    clearLogButton.addEventListener('click', () => {
        chrome.storage.sync.clear(() => {
            timeLogs = [];
            renderLogs();
        });
    });

    function renderLogs() {
        logDisplay.innerHTML = '';
        if (timeLogs.length === 0) {
            logDisplay.innerHTML = '<p>No hours logged yet.</p>';
            return;
        }
        timeLogs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `${log.timestamp} - ${log.projectName}: ${log.hoursWorked} hours`;
            logDisplay.appendChild(logEntry);
        });
    }
});
