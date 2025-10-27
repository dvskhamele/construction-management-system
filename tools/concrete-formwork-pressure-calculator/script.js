
document.getElementById('formwork-pressure-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const placementRate = parseFloat(document.getElementById('placement-rate').value);
    const concreteTemperature = parseFloat(document.getElementById('concrete-temperature').value);
    const concreteDensity = parseFloat(document.getElementById('concrete-density').value);
    const slump = parseFloat(document.getElementById('slump').value);
    const concreteHeight = parseFloat(document.getElementById('concrete-height').value);

    if (isNaN(placementRate) || isNaN(concreteTemperature) || isNaN(concreteDensity) || isNaN(slump) || isNaN(concreteHeight) || placementRate <= 0 || concreteTemperature <= 0 || concreteDensity <= 0 || concreteHeight <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    let warnings = [];

    // ACI 347R-14 simplified formula for walls and columns (normal weight concrete, slump <= 4 inches)
    // P = min( (150 + 9000 * R / T), (gamma_c * H) )
    // Where P is pressure in psf, R is rate of placement in ft/hr, T is concrete temperature in °F
    // gamma_c is concrete density in pcf, H is height of concrete in ft

    const calculatedPressure = (concreteDensity / 150) * (150 + (9000 * placementRate / concreteTemperature));
    const hydrostaticPressure = concreteDensity * concreteHeight;

    const maxLateralPressure = Math.min(calculatedPressure, hydrostaticPressure);

    if (slump > 4) {
        warnings.push("Warning: This formula is most accurate for concrete with a slump of 4 inches or less. Higher slumps may result in higher pressures.");
    }
    if (placementRate > 7) {
        warnings.push("Warning: This simplified formula is typically for placement rates up to 7 ft/hr. Higher rates may require more complex calculations.");
    }
    if (concreteHeight > 14) {
        warnings.push("Warning: This simplified formula is typically for concrete heights up to 14 ft. Greater heights may require more complex calculations.");
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Maximum Lateral Pressure: ${maxLateralPressure.toFixed(2)} psf (pounds per square foot)</p>
        ${warnings.length > 0 ? '<div class="warnings">' + warnings.join('<br>') + '</div>' : ''}
        <p class="note">Note: This calculation is based on simplified ACI guidelines for normal weight concrete. Always consult ACI 347R and a structural engineer for critical formwork design.</p>
    `;
});
