
document.getElementById('roi-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const projectCost = parseFloat(document.getElementById('project-cost').value);
    const projectRevenue = parseFloat(document.getElementById('project-revenue').value);

    if (isNaN(projectCost) || isNaN(projectRevenue) || projectCost <= 0) {
        alert("Please enter valid positive numbers for project cost and revenue. Project cost cannot be zero.");
        return;
    }

    const roi = ((projectRevenue - projectCost) / projectCost) * 100;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Project Cost: $${projectCost.toFixed(2)}</p>
        <p>Total Project Revenue: $${projectRevenue.toFixed(2)}</p>
        <p>Return on Investment (ROI): ${roi.toFixed(2)}%</p>
    `;
});
