
document.getElementById('mix-ratio-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const concreteVolume = parseFloat(document.getElementById('concrete-volume').value);
    const cementRatio = parseFloat(document.getElementById('cement-ratio').value);
    const sandRatio = parseFloat(document.getElementById('sand-ratio').value);
    const aggregateRatio = parseFloat(document.getElementById('aggregate-ratio').value);

    if (isNaN(concreteVolume) || isNaN(cementRatio) || isNaN(sandRatio) || isNaN(aggregateRatio) || concreteVolume <= 0 || cementRatio <= 0 || sandRatio <= 0 || aggregateRatio <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const sumOfRatios = cementRatio + sandRatio + aggregateRatio;

    // Dry volume of materials is typically 1.54 times the wet volume of concrete
    const totalDryVolume = concreteVolume * 1.54;

    const cementVolume = (cementRatio / sumOfRatios) * totalDryVolume;
    const sandVolume = (sandRatio / sumOfRatios) * totalDryVolume;
    const aggregateVolume = (aggregateRatio / sumOfRatios) * totalDryVolume;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Cement Needed: ${cementVolume.toFixed(2)} cubic feet</p>
        <p>Estimated Sand Needed: ${sandVolume.toFixed(2)} cubic feet</p>
        <p>Estimated Aggregate Needed: ${aggregateVolume.toFixed(2)} cubic feet</p>
        <p class="note">Note: This is an approximate calculation based on volumetric ratios and a bulking factor of 1.54. Actual quantities may vary based on material properties, moisture content, and specific project requirements. Always consult with a professional.</p>
    `;
});
