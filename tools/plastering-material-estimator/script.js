document.getElementById('plastering-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wallArea = parseFloat(document.getElementById('wall-area').value);
    const plasterThickness = parseFloat(document.getElementById('plaster-thickness').value);
    const mixRatio = document.getElementById('mix-ratio').value;

    if (isNaN(wallArea) || isNaN(plasterThickness) || wallArea <= 0 || plasterThickness <= 0) {
        alert("Please enter valid positive numbers for wall area and plaster thickness.");
        return;
    }

    // Convert plaster thickness from inches to feet
    const plasterThicknessFt = plasterThickness / 12;

    // Calculate total wet volume of plaster needed in cubic feet
    const wetPlasterVolume = wallArea * plasterThicknessFt;

    // Dry volume of materials is typically 1.3 times the wet volume of plaster
    const dryMaterialVolume = wetPlasterVolume * 1.3;

    let cementRatio, sandRatio;
    let sumOfRatios;

    switch (mixRatio) {
        case '1:3': cementRatio = 1; sandRatio = 3; sumOfRatios = 4; break;
        case '1:4': cementRatio = 1; sandRatio = 4; sumOfRatios = 5; break;
        case '1:5': cementRatio = 1; sandRatio = 5; sumOfRatios = 6; break;
        case '1:6': cementRatio = 1; sandRatio = 6; sumOfRatios = 7; break;
        default: alert("Invalid mix ratio selected."); return;
    }

    const cementVolume = (cementRatio / sumOfRatios) * dryMaterialVolume;
    const sandVolume = (sandRatio / sumOfRatios) * dryMaterialVolume;

    // Assuming 1 cubic foot of cement is roughly 1 bag (approx. 94 lbs)
    const cementBags = cementVolume;

    // Water calculation: Assuming a water-cement ratio of 0.55 by weight
    // 1 cubic foot of cement is approx 94 lbs
    const waterCementRatio = 0.55;
    const waterWeightLbs = cementBags * 94 * waterCementRatio;
    const waterGallons = waterWeightLbs / 8.34; // 1 gallon of water = 8.34 lbs

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Cement Needed: ${cementBags.toFixed(2)} bags</p>
        <p>Estimated Sand Needed: ${sandVolume.toFixed(2)} cubic feet</p>
        <p>Estimated Water Needed: ${waterGallons.toFixed(2)} gallons</p>
        <p class="note">Note: This is an approximate calculation. Actual quantities may vary based on material properties, waste, and specific application techniques. Always consult with a professional.</p>
    `;
});