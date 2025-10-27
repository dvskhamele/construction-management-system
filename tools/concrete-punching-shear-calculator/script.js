
document.getElementById('punching-shear-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const slabThickness = parseFloat(document.getElementById('slab-thickness').value);
    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const columnDim1 = parseFloat(document.getElementById('column-dim1').value);
    const columnDim2 = parseFloat(document.getElementById('column-dim2').value);
    const factoredShearForce = parseFloat(document.getElementById('factored-shear-force').value);
    const effectiveDepth = parseFloat(document.getElementById('effective-depth').value);

    if (isNaN(slabThickness) || isNaN(compressiveStrength) || isNaN(columnDim1) || isNaN(columnDim2) || isNaN(factoredShearForce) || isNaN(effectiveDepth) || slabThickness <= 0 || compressiveStrength <= 0 || columnDim1 <= 0 || columnDim2 <= 0 || factoredShearForce <= 0 || effectiveDepth <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // ACI 318 simplified formulas for punching shear
    const phi = 0.75; // Strength reduction factor for shear
    const lambda = 1.0; // For normal weight concrete

    // Critical perimeter (bo) for a rectangular column
    const bo = 2 * (columnDim1 + effectiveDepth) + 2 * (columnDim2 + effectiveDepth);

    // Nominal shear strength of concrete (Vc) - simplified ACI formula
    // Vc = 4 * lambda * sqrt(f'c) * bo * d
    const Vc = 4 * lambda * Math.sqrt(compressiveStrength) * bo * effectiveDepth; // in lbs

    // Convert factored shear force from kips to lbs
    const factoredShearForceLbs = factoredShearForce * 1000;

    // Design shear strength of concrete (phiVc)
    const phiVc = phi * Vc;

    // Check for punching shear
    let checkResult = "";
    let checkStatus = "";
    if (factoredShearForceLbs <= phiVc) {
        checkResult = "PASS";
        checkStatus = "The slab is adequate for punching shear.";
    } else {
        checkResult = "FAIL";
        checkStatus = "The slab is NOT adequate for punching shear. Shear reinforcement or increased slab thickness may be required.";
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Critical Perimeter (bo): ${bo.toFixed(2)} inches</p>
        <p>Nominal Shear Strength of Concrete (Vc): ${Vc.toFixed(2)} lbs</p>
        <p>Design Shear Strength (phiVc): ${phiVc.toFixed(2)} lbs</p>
        <p>Factored Shear Force (Vu): ${factoredShearForceLbs.toFixed(2)} lbs</p>
        <p><strong>Punching Shear Check: ${checkResult}</strong></p>
        <p>${checkStatus}</p>
        <p class="note">Note: This calculation is based on simplified ACI 318 guidelines for punching shear in flat slabs. Always consult relevant codes and a structural engineer for critical design considerations.</p>
    `;
});
