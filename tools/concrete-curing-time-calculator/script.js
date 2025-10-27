
document.getElementById('curing-time-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const desiredStrength = parseFloat(document.getElementById('desired-strength').value);
    const ambientTemperature = parseFloat(document.getElementById('ambient-temperature').value);
    const cementType = document.getElementById('cement-type').value;

    if (isNaN(desiredStrength) || isNaN(ambientTemperature) || desiredStrength <= 0 || desiredStrength > 100) {
        alert("Please enter valid numbers for desired strength (1-100%) and ambient temperature.");
        return;
    }

    let baseDays = 0;
    if (desiredStrength <= 70) {
        baseDays = (cementType === 'type-i-ii') ? 7 : 3; // Days to reach ~70% strength
    } else {
        baseDays = (cementType === 'type-i-ii') ? 28 : 14; // Days to reach ~100% strength
    }

    // Adjust for temperature (simplified linear model)
    const standardTemp = 20; // Celsius
    let tempAdjustmentFactor = 1;

    if (ambientTemperature > standardTemp) {
        // For every 10C above standard, reduce time by 20%
        tempAdjustmentFactor = 1 - ((ambientTemperature - standardTemp) / 10) * 0.20;
        if (tempAdjustmentFactor < 0.2) tempAdjustmentFactor = 0.2; // Cap reduction
    } else if (ambientTemperature < standardTemp) {
        // For every 10C below standard, increase time by 30%
        tempAdjustmentFactor = 1 + ((standardTemp - ambientTemperature) / 10) * 0.30;
        if (tempAdjustmentFactor > 3) tempAdjustmentFactor = 3; // Cap increase
    }

    const estimatedCuringTime = baseDays * tempAdjustmentFactor;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Curing Time: ${estimatedCuringTime.toFixed(1)} days</p>
        <p class="note">Note: This is a simplified estimate. Actual concrete curing time depends on many factors including mix design, humidity, and specific admixtures. Always consult project specifications and local codes.</p>
    `;
});
