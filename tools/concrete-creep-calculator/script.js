
document.getElementById('creep-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const ageOfLoading = parseFloat(document.getElementById('age-of-loading').value);
    const durationOfLoading = parseFloat(document.getElementById('duration-of-loading').value);
    const relativeHumidity = parseFloat(document.getElementById('relative-humidity').value);
    const effectiveThickness = parseFloat(document.getElementById('effective-thickness').value);

    if (isNaN(compressiveStrength) || isNaN(ageOfLoading) || isNaN(durationOfLoading) || isNaN(relativeHumidity) || isNaN(effectiveThickness) || compressiveStrength <= 0 || ageOfLoading <= 0 || durationOfLoading <= 0 || relativeHumidity <= 0 || effectiveThickness <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Base creep coefficient (conceptual ultimate value)
    const baseCreep = 2.0;

    // --- Factors influencing creep (simplified linear approximations) ---

    // Strength Factor: Higher strength reduces creep
    // Assuming 4000 psi as base, 1000 psi change = 0.1 factor change
    const strengthFactor = 1 - ((compressiveStrength - 4000) / 1000) * 0.1;

    // Age of Loading Factor: Older age of loading reduces creep
    // Assuming 28 days as base, 7 days -> 1.2, 90 days -> 0.8
    let ageFactor;
    if (ageOfLoading <= 28) {
        ageFactor = 1 + ((28 - ageOfLoading) / 21) * 0.2; // Linear from 1.2 at 7 days to 1.0 at 28 days
    } else {
        ageFactor = 1 - ((ageOfLoading - 28) / 62) * 0.2; // Linear from 1.0 at 28 days to 0.8 at 90 days
    }
    ageFactor = Math.max(0.5, Math.min(1.5, ageFactor)); // Cap factor

    // Duration of Loading Factor: Creep increases with duration
    // Assuming 365 days as base, 30 days -> 0.5, 1825 days (5 years) -> 1.5
    let durationFactor;
    if (durationOfLoading <= 365) {
        durationFactor = 0.5 + (durationOfLoading / 365) * 0.5; // Linear from 0.5 at 30 days to 1.0 at 365 days
    } else {
        durationFactor = 1 + ((durationOfLoading - 365) / (1825 - 365)) * 0.5; // Linear from 1.0 at 365 days to 1.5 at 1825 days
    }
    durationFactor = Math.max(0.2, Math.min(2.0, durationFactor)); // Cap factor

    // Humidity Factor: Lower humidity increases creep
    // Assuming 70% RH as base, 50% -> 1.1, 90% -> 0.9
    const humidityFactor = 1 + ((70 - relativeHumidity) / 20) * 0.1;

    // Size Factor (Effective Thickness): Smaller effective thickness increases creep
    // Assuming 6 inches as base, 4 inches -> 1.1, 8 inches -> 0.9
    const sizeFactor = 1 + ((6 - effectiveThickness) / 2) * 0.1;

    const estimatedCreepCoefficient = baseCreep * strengthFactor * ageFactor * durationFactor * humidityFactor * sizeFactor;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Creep Coefficient: ${estimatedCreepCoefficient.toFixed(2)}</p>
        <p class="note">Note: This is a highly simplified estimate. Actual concrete creep is a complex phenomenon influenced by many factors and requires advanced models (e.g., ACI 209R, Eurocode 2) for precise calculations. Always consult a structural engineer for critical design considerations.</p>
    `;
});
