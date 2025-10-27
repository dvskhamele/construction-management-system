
document.getElementById('pavement-volume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const pavementLength = parseFloat(document.getElementById('pavement-length').value);
    const pavementWidth = parseFloat(document.getElementById('pavement-width').value);
    const pavementThickness = parseFloat(document.getElementById('pavement-thickness').value);

    if (isNaN(pavementLength) || isNaN(pavementWidth) || isNaN(pavementThickness) || pavementLength <= 0 || pavementWidth <= 0 || pavementThickness <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Convert pavement thickness from inches to feet
    const pavementThicknessFt = pavementThickness / 12;

    // Calculate volume in cubic feet
    const volumeCubicFeet = pavementLength * pavementWidth * pavementThicknessFt;

    // Convert cubic feet to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCubicYards = volumeCubicFeet / 27;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Volume of Concrete Needed: ${volumeCubicFeet.toFixed(2)} cubic feet</p>
        <p>Volume of Concrete Needed: ${volumeCubicYards.toFixed(2)} cubic yards</p>
    `;
});
