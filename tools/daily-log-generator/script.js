document.addEventListener('DOMContentLoaded', () => {
    logAnalyticsEvent('ToolOpened', { toolName: 'DailyLogGenerator' });

    const logForm = document.getElementById('logForm');
    const logDisplay = document.getElementById('logDisplay');
    const generatedLogContent = document.getElementById('generatedLogContent');
    const shareableLink = document.getElementById('shareableLink');
    const leadForm = document.getElementById('leadForm');

    const urlParams = new URLSearchParams(window.location.search);
    const logData_url = urlParams.get('log');

    if (logData_url) {
        try {
            const decodedLog = JSON.parse(decodeURIComponent(logData_url));
            document.getElementById('logDate').value = decodedLog.logDate;
            document.getElementById('project').value = decodedLog.project;
            document.getElementById('weather').value = decodedLog.weather;
            document.getElementById('personnel').value = decodedLog.personnel;
            document.getElementById('activities').value = decodedLog.activities;
            generateLogContent(decodedLog);
            logDisplay.classList.remove('hidden');
            logForm.classList.add('hidden');
            shareableLink.href = window.location.href;
            logAnalyticsEvent('ToolResultViewed', { toolName: 'DailyLogGenerator', source: 'sharedLink' });
        } catch (e) {
            console.error("Failed to parse log from URL", e);
        }
    }

    logForm.addEventListener('submit', (e) => {
        e.preventDefault();
        logAnalyticsEvent('ToolSubmitted', { toolName: 'DailyLogGenerator' });

        const logDate = document.getElementById('logDate').value;
        const project = document.getElementById('project').value;
        const weather = document.getElementById('weather').value;
        const personnel = document.getElementById('personnel').value;
        const activities = document.getElementById('activities').value;

        if (logDate && project && weather && activities) {
            const logData = { logDate, project, weather, personnel, activities, timestamp: new Date().toISOString() };
            generateLogContent(logData);
            logDisplay.classList.remove('hidden');
            logForm.classList.add('hidden');
            saveLog(logData);

            const shareUrl = `${window.location.pathname}?log=${encodeURIComponent(JSON.stringify(logData))}`;
            shareableLink.href = shareUrl;

            logAnalyticsEvent('ToolResultViewed', { toolName: 'DailyLogGenerator', result: 'logGenerated' });
        } else {
            alert('Please fill in all required fields (Date, Project Name, Weather, Activities).');
        }
    });

    function generateLogContent(data) {
        generatedLogContent.innerHTML = `
            <p class="text-xl font-bold mb-2">Daily Construction Log - ${data.logDate}</p>
            <p><span class="font-semibold">Project:</span> ${data.project}</p>
            <p><span class="font-semibold">Weather:</span> ${data.weather}</p>
            <p><span class="font-semibold">Personnel:</span> ${data.personnel || 'N/A'}</p>
            <p class="font-semibold mt-4">Activities Performed:</p>
            <p>${data.activities}</p>
        `;
    }

    function saveLog(logData) {
        try {
            let logs = JSON.parse(localStorage.getItem('dailyConstructionLogs')) || [];
            logs.push(logData);
            localStorage.setItem('dailyConstructionLogs', JSON.stringify(logs));
        } catch (e) {
            console.error("Failed to save log to local storage", e);
        }
    }

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (email) {
            logAnalyticsEvent('LeadCaptured', { toolName: 'DailyLogGenerator', email });
            alert(`Thank you for subscribing! Daily reports will be sent to ${email}.`);
            leadForm.reset();
            saveLead(email);
        }
    });

    function saveLead(email) {
        try {
            let leads = JSON.parse(localStorage.getItem('toolLeads')) || [];
            if (!leads.includes(email)) {
                leads.push(email);
                localStorage.setItem('toolLeads', JSON.stringify(leads));
            }
        } catch (e) {
            console.error("Failed to save lead to local storage", e);
        }
    }

    function logAnalyticsEvent(eventName, data) {
        console.log(`Analytics Event: ${eventName}`, data);
    }
});