
document.getElementById('paint-cost-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const paintableArea = parseFloat(document.getElementById('paintable-area').value);
    const numCoats = parseFloat(document.getElementById('num-coats').value);
    const coveragePerGallon = parseFloat(document.getElementById('coverage-per-gallon').value);
    const costPerGallon = parseFloat(document.getElementById('cost-per-gallon').value);

    if (isNaN(paintableArea) || isNaN(numCoats) || isNaN(coveragePerGallon) || isNaN(costPerGallon) || paintableArea <= 0 || numCoats <= 0 || coveragePerGallon <= 0 || costPerGallon < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const totalPaintableAreaWithCoats = paintableArea * numCoats;
    const gallonsNeeded = totalPaintableAreaWithCoats / coveragePerGallon;
    const totalPaintCost = gallonsNeeded * costPerGallon;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Paintable Area (including coats): ${totalPaintableAreaWithCoats.toFixed(2)} sq ft</p>
        <p>Estimated Gallons of Paint Needed: ${gallonsNeeded.toFixed(2)} gallons</p>
        <p>Total Estimated Paint Cost: $${totalPaintCost.toFixed(2)}</p>
    `;
});
