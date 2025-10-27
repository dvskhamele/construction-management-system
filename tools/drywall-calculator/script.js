
document.getElementById('drywall-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const width = parseFloat(document.getElementById('room-width').value);
    const length = parseFloat(document.getElementById('room-length').value);
    const height = parseFloat(document.getElementById('room-height').value);
    const sheetSize = parseFloat(document.getElementById('sheet-size').value);

    if (isNaN(width) || isNaN(length) || isNaN(height)) {
        alert("Please enter valid numbers for room dimensions.");
        return;
    }

    const wallArea1 = width * height * 2;
    const wallArea2 = length * height * 2;
    const ceilingArea = width * length;
    const totalArea = wallArea1 + wallArea2 + ceilingArea;

    const sheetsNeeded = Math.ceil(totalArea / sheetSize);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Wall and Ceiling Area: ${totalArea.toFixed(2)} sq. ft.</p>
        <p>Drywall Sheets Needed: ${sheetsNeeded}</p>
    `;
});
