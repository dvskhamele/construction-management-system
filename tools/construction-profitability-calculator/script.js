
document.getElementById('profitability-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const projectRevenue = parseFloat(document.getElementById('project-revenue').value);
    const materialCosts = parseFloat(document.getElementById('material-costs').value);
    const laborCosts = parseFloat(document.getElementById('labor-costs').value);
    const equipmentCosts = parseFloat(document.getElementById('equipment-costs').value);
    const overheadCosts = parseFloat(document.getElementById('overhead-costs').value);
    const otherCosts = parseFloat(document.getElementById('other-costs').value);

    if (isNaN(projectRevenue) || isNaN(materialCosts) || isNaN(laborCosts) || isNaN(equipmentCosts) || isNaN(overheadCosts) || isNaN(otherCosts)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const totalCosts = materialCosts + laborCosts + equipmentCosts + overheadCosts + otherCosts;
    const grossProfit = projectRevenue - totalCosts;
    const netProfit = grossProfit; // For simplicity, assuming gross profit is net profit here

    let profitMargin = 0;
    if (projectRevenue > 0) {
        profitMargin = (grossProfit / projectRevenue) * 100;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Project Revenue: $${projectRevenue.toFixed(2)}</p>
        <p>Total Costs: $${totalCosts.toFixed(2)}</p>
        <p>Gross Profit: $${grossProfit.toFixed(2)}</p>
        <p>Net Profit: $${netProfit.toFixed(2)}</p>
        <p>Profit Margin: ${profitMargin.toFixed(2)}%</p>
    `;
});
