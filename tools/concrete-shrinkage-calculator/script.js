
document.getElementById('shrinkage-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const waterCementRatio = parseFloat(document.getElementById('water-cement-ratio').value);
    const aggregateContent = parseFloat(document.getElementById('aggregate-content').value);
    const relativeHumidity = parseFloat(document.getElementById('relative-humidity').value);
    const concreteAge = parseFloat(document.getElementById('concrete-age').value);

    if (isNaN(waterCementRatio) || isNaN(aggregateContent) || isNaN(relativeHumidity) || isNaN(concreteAge) || waterCementRatio <= 0 || aggregateContent <= 0 || relativeHumidity <= 0 || concreteAge <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Base shrinkage value (typical ultimate drying shrinkage)
    const baseShrinkage = 600; // microstrain

    // Factors influencing shrinkage (simplified linear approximations)
    // Water-Cement Ratio Factor: Higher W/C increases shrinkage
    const wcFactor = 1 + (waterCementRatio - 0.5) * 2; // Adjust around 0.5 W/C

    // Aggregate Content Factor: Higher aggregate content reduces shrinkage
    const aggFactor = 1 + (70 - aggregateContent) * 0.01; // Adjust around 70% aggregate

    // Humidity Factor: Lower humidity increases shrinkage
    const humFactor = 1 + (70 - relativeHumidity) * 0.01; // Adjust around 70% RH

    // Age Factor: Shrinkage develops over time, reaching ultimate value around 1 year
    const ageFactor = 0.2 + (Math.min(concreteAge, 365) / 365) * 0.8; // Linear increase up to 1 year

    const estimatedShrinkageStrain = baseShrinkage * wcFactor * aggFactor * humFactor * ageFactor;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Drying Shrinkage Strain: ${estimatedShrinkageStrain.toFixed(2)} microstrain</p>
        <p class="note">Note: This is a highly simplified estimate. Actual concrete shrinkage is a complex phenomenon influenced by many factors including mix design, aggregate type, curing conditions, and environmental exposure. Always consult relevant codes (e.g., ACI 209R) and a structural engineer for precise calculations and design considerations.</p>
    `;
});
