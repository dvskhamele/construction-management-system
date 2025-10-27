
document.getElementById('report-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const reportDate = document.getElementById('report-date').value;
    const projectName = document.getElementById('project-name').value;
    const weather = document.getElementById('weather').value;
    const workPerformed = document.getElementById('work-performed').value;
    const issuesDelays = document.getElementById('issues-delays').value;
    const materialsReceived = document.getElementById('materials-received').value;
    const equipmentOnSite = document.getElementById('equipment-on-site').value;
    const personnelOnSite = parseFloat(document.getElementById('personnel-on-site').value);

    if (!reportDate || !projectName) {
        alert("Date and Project Name are required.");
        return;
    }

    const reportContent = `
Daily Site Report
--------------------------------------------------
Date: ${reportDate}
Project Name: ${projectName}
Weather Conditions: ${weather || 'N/A'}

Work Performed Today:
${workPerformed || 'No work reported.'}

Issues/Delays:
${issuesDelays || 'No issues or delays.'}

Materials Received:
${materialsReceived || 'No materials received.'}

Equipment On Site:
${equipmentOnSite || 'No equipment reported.'}

Personnel On Site: ${personnelOnSite || '0'}
--------------------------------------------------
    `;

    const reportOutputDiv = document.getElementById('report-output');
    reportOutputDiv.textContent = reportContent;
});
