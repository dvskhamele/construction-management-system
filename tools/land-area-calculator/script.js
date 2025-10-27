
document.getElementById('land-area-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('land-length').value);
    const width = parseFloat(document.getElementById('land-width').value);

    if (isNaN(length) || isNaN(width)) {
        alert("Please enter valid numbers for length and width.");
        return;
    }

    // Calculate area in square feet
    const areaSqFt = length * width;

    // Convert to acres (1 acre = 43560 sq ft)
    const areaAcres = areaSqFt / 43560;

    // Convert to square meters (1 sq ft = 0.092903 sq m)
    const areaSqMeters = areaSqFt * 0.092903;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Area: ${areaSqFt.toFixed(2)} square feet</p>
        <p>Area: ${areaAcres.toFixed(4)} acres</p>
        <p>Area: ${areaSqMeters.toFixed(2)} square meters</p>
    `;
});
