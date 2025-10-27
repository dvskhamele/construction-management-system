
document.getElementById('slab-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('slab-length').value);
    const width = parseFloat(document.getElementById('slab-width').value);
    const thickness = parseFloat(document.getElementById('slab-thickness').value);

    if (isNaN(length) || isNaN(width) || isNaN(thickness)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Convert thickness from inches to feet
    const thicknessFt = thickness / 12;

    // Calculate volume in cubic feet
    const volumeCubicFeet = length * width * thicknessFt;

    // Convert cubic feet to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCubicYards = volumeCubicFeet / 27;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Volume of Concrete Needed: ${volumeCubicFeet.toFixed(2)} cubic feet</p>
        <p>Volume of Concrete Needed: ${volumeCubicYards.toFixed(2)} cubic yards</p>
    `;
});
