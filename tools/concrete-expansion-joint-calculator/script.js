
document.getElementById('expansion-joint-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const slabLength = parseFloat(document.getElementById('slab-length').value);
    const slabWidth = parseFloat(document.getElementById('slab-width').value);
    const thermalExpansionCoeff = parseFloat(document.getElementById('thermal-expansion-coeff').value);
    const tempChange = parseFloat(document.getElementById('temp-change').value);
    const maxJointMovement = parseFloat(document.getElementById('max-joint-movement').value);

    if (isNaN(slabLength) || isNaN(slabWidth) || isNaN(thermalExpansionCoeff) || isNaN(tempChange) || isNaN(maxJointMovement) || slabLength <= 0 || slabWidth <= 0 || thermalExpansionCoeff <= 0 || tempChange <= 0 || maxJointMovement <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Convert maxJointMovement from inches to feet
    const maxJointMovementFt = maxJointMovement / 12;

    // Calculate recommended expansion joint spacing (L_max) in feet
    // Formula: Delta L = alpha * L * Delta T
    // L = Delta L / (alpha * Delta T)
    let recommendedSpacingFt = maxJointMovementFt / (thermalExpansionCoeff * tempChange);

    // The required joint width is simply the maximum allowable joint movement
    const requiredJointWidthInches = maxJointMovement;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Recommended Expansion Joint Spacing: ${recommendedSpacingFt.toFixed(2)} feet</p>
        <p>Required Joint Width: ${requiredJointWidthInches.toFixed(2)} inches</p>
        <p class="note">Note: This calculation is based on simplified thermal expansion principles. Always consult local building codes, engineering standards (e.g., ACI), and a structural engineer for critical concrete flatwork design.</p>
    `;
});
