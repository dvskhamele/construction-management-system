
document.getElementById('wall-volume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wallLength = parseFloat(document.getElementById('wall-length').value);
    const wallHeight = parseFloat(document.getElementById('wall-height').value);
    const wallThickness = parseFloat(document.getElementById('wall-thickness').value);

    if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(wallThickness) || wallLength <= 0 || wallHeight <= 0 || wallThickness <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Convert wall thickness from inches to feet
    const wallThicknessFt = wallThickness / 12;

    // Calculate volume in cubic feet
    const volumeCubicFeet = wallLength * wallHeight * wallThicknessFt;

    // Convert cubic feet to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCubicYards = volumeCubicFeet / 27;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Volume of Concrete Needed: ${volumeCubicFeet.toFixed(2)} cubic feet</p>
        <p>Volume of Concrete Needed: ${volumeCubicYards.toFixed(2)} cubic yards</p>
    `;
});
