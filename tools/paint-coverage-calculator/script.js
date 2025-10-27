
document.getElementById('paint-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('room-length').value);
    const width = parseFloat(document.getElementById('room-width').value);
    const height = parseFloat(document.getElementById('room-height').value);
    const coats = parseFloat(document.getElementById('coats').value);
    const coveragePerGallon = parseFloat(document.getElementById('coverage-per-gallon').value);

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(coats) || isNaN(coveragePerGallon)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const wallArea = 2 * (length + width) * height;
    const ceilingArea = length * width;
    const totalPaintableArea = (wallArea + ceilingArea) * coats;

    const gallonsNeeded = totalPaintableArea / coveragePerGallon;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Paintable Area (for all coats): ${totalPaintableArea.toFixed(2)} sq ft</p>
        <p>Estimated Gallons of Paint Needed: ${gallonsNeeded.toFixed(2)} gallons</p>
        <p class="note">Note: This estimate does not account for doors, windows, or other unpaintable areas.</p>
    `;
});
