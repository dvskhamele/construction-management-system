
document.getElementById('generateReportBtn').addEventListener('click', function() {
    const projectName = document.getElementById('projectName').value;
    const date = document.getElementById('date').value;
    const weather = document.getElementById('weather').value;
    const workSummary = document.getElementById('workSummary').value;
    const materialsUsed = document.getElementById('materialsUsed').value;
    const equipmentUsed = document.getElementById('equipmentUsed').value;
    const issues = document.getElementById('issues').value;

    if (!projectName || !date || !weather || !workSummary) {
        alert('Please fill in all required fields.');
        return;
    }

    const reportHTML = `
        <h2>Daily Construction Report</h2>
        <p><strong>Project:</strong> ${projectName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Weather:</strong> ${weather}</p>
        <h3>Work Summary</h3>
        <p>${workSummary.replace(/\n/g, '<br>')}</p>
        <h3>Materials Used</h3>
        <p>${materialsUsed.replace(/\n/g, '<br>')}</p>
        <h3>Equipment Used</h3>
        <p>${equipmentUsed.replace(/\n/g, '<br>')}</p>
        <h3>Issues or Delays</h3>
        <p>${issues.replace(/\n/g, '<br>')}</p>
    `;

    const reportOutput = document.getElementById('reportOutput');
    reportOutput.innerHTML = reportHTML;

    const printButton = document.createElement('button');
    printButton.textContent = 'Print Report';
    printButton.style.marginTop = '10px';
    printButton.addEventListener('click', function() {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Report</title>');
        printWindow.document.write('<link rel="stylesheet" href="style.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write(reportHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    reportOutput.appendChild(printButton);
});
