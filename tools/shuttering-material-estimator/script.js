document.getElementById('shuttering-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const slabLength = parseFloat(document.getElementById('slab-length').value);
    const slabWidth = parseFloat(document.getElementById('slab-width').value);
    const slabThickness = parseFloat(document.getElementById('slab-thickness').value);

    if (isNaN(slabLength) || isNaN(slabWidth) || isNaN(slabThickness)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Convert slab thickness from inches to feet for height of shuttering
    const shutteringHeight = slabThickness / 12;

    // Calculate perimeter of the slab for side shuttering
    const slabPerimeter = 2 * (slabLength + slabWidth);

    // Calculate area of side shuttering
    const sideShutteringArea = slabPerimeter * shutteringHeight;

    // Calculate area of bottom shuttering (same as slab area)
    const bottomShutteringArea = slabLength * slabWidth;

    const totalShutteringArea = sideShutteringArea + bottomShutteringArea;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Shuttering Area for Sides: ${sideShutteringArea.toFixed(2)} sq ft</p>
        <p>Shuttering Area for Bottom: ${bottomShutteringArea.toFixed(2)} sq ft</p>
        <p>Total Shuttering Area Needed: ${totalShutteringArea.toFixed(2)} sq ft</p>
        <p class="note">Note: This estimate is for a simple rectangular slab. Complex shapes or beam/column shuttering will require different calculations.</p>
    `;
});