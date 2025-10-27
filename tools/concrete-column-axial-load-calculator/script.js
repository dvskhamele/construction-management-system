
document.getElementById('axial-load-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const columnType = document.getElementById('column-type').value;
    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const yieldStrengthSteel = parseFloat(document.getElementById('yield-strength-steel').value);
    const grossArea = parseFloat(document.getElementById('gross-area').value);
    const steelArea = parseFloat(document.getElementById('steel-area').value);

    if (isNaN(compressiveStrength) || isNaN(yieldStrengthSteel) || isNaN(grossArea) || isNaN(steelArea) || compressiveStrength <= 0 || yieldStrengthSteel <= 0 || grossArea <= 0 || steelArea < 0) {
        alert("Please enter valid positive numbers for all fields. Steel area can be zero.");
        return;
    }

    if (steelArea >= grossArea) {
        alert("Area of steel reinforcement cannot be greater than or equal to gross area of column.");
        return;
    }

    let Pn_lbs = 0; // Nominal axial load capacity in lbs
    let phi = 0;    // Strength reduction factor

    if (columnType === 'tied') {
        // ACI 318 formula for Tied Columns
        Pn_lbs = 0.80 * (0.85 * compressiveStrength * (grossArea - steelArea) + yieldStrengthSteel * steelArea);
        phi = 0.65;
    } else { // spiral
        // ACI 318 formula for Spiral Columns
        Pn_lbs = 0.85 * (0.85 * compressiveStrength * (grossArea - steelArea) + yieldStrengthSteel * steelArea);
        phi = 0.75;
    }

    const phiPn_lbs = phi * Pn_lbs; // Design axial load capacity in lbs

    // Convert to kips for output
    const Pn_kips = Pn_lbs / 1000;
    const phiPn_kips = phiPn_lbs / 1000;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Nominal Axial Load Capacity (Pn): ${Pn_kips.toFixed(2)} kips</p>
        <p>Design Axial Load Capacity (phiPn): ${phiPn_kips.toFixed(2)} kips</p>
        <p class="note">Note: This calculation is based on simplified ACI 318 guidelines for short, concentrically loaded columns. It does not account for slenderness effects, eccentricity, or biaxial bending. Always consult relevant codes and a structural engineer for critical design considerations.</p>
    `;
});
