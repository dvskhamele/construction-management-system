
document.getElementById('analyzeBtn').addEventListener('click', function() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
    const projectDuration = parseFloat(document.getElementById('projectDuration').value);

    if (isNaN(initialInvestment) || isNaN(monthlyIncome) || isNaN(monthlyExpenses) || isNaN(projectDuration)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    const cashFlowData = [];
    const labels = [];
    let cumulativeCashFlow = -initialInvestment;

    cashFlowData.push(cumulativeCashFlow);
    labels.push('Month 0 (Investment)');

    for (let i = 1; i <= projectDuration; i++) {
        cumulativeCashFlow += (monthlyIncome - monthlyExpenses);
        cashFlowData.push(cumulativeCashFlow);
        labels.push(`Month ${i}`);
    }

    renderChart(labels, cashFlowData);
    renderSummary(initialInvestment, monthlyIncome, monthlyExpenses, projectDuration, cumulativeCashFlow);
});

let cashFlowChartInstance = null; // To store the Chart.js instance

function renderChart(labels, data) {
    const ctx = document.getElementById('cashFlowChart').getContext('2d');

    if (cashFlowChartInstance) {
        cashFlowChartInstance.destroy(); // Destroy existing chart before creating a new one
    }

    cashFlowChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cumulative Cash Flow',
                data: data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cash Flow ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time (Months)'
                    }
                }
            }
        }
    });
}

function renderSummary(initialInvestment, monthlyIncome, monthlyExpenses, projectDuration, finalCashFlow) {
    const summaryDiv = document.getElementById('summary');
    let summaryHTML = `
        <p><strong>Initial Investment:</strong> $${initialInvestment.toFixed(2)}</p>
        <p><strong>Average Monthly Net Cash Flow:</strong> $${(monthlyIncome - monthlyExpenses).toFixed(2)}</p>
        <p><strong>Project Duration:</strong> ${projectDuration} months</p>
        <p><strong>Final Cumulative Cash Flow:</strong> $${finalCashFlow.toFixed(2)}</p>
    `;

    if (finalCashFlow > 0) {
        summaryHTML += '<p style="color: green;">The project is projected to be profitable.</p>';
    } else if (finalCashFlow < 0) {
        summaryHTML += '<p style="color: red;">The project is projected to incur a loss.</p>';
    } else {
        summaryHTML += '<p>The project is projected to break even.</p>';
    }

    summaryDiv.innerHTML = summaryHTML;
}
