
document.getElementById('slab-flexural-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const slabThickness = parseFloat(document.getElementById('slab-thickness').value);
    const effectiveDepth = parseFloat(document.getElementById('effective-depth').value);
    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const yieldStrengthSteel = parseFloat(document.getElementById('yield-strength-steel').value);
    const factoredMoment = parseFloat(document.getElementById('factored-moment').value);
    const rebarBarSizeArea = parseFloat(document.getElementById('rebar-bar-size').value);

    if (isNaN(slabThickness) || isNaN(effectiveDepth) || isNaN(compressiveStrength) || isNaN(yieldStrengthSteel) || isNaN(factoredMoment) || isNaN(rebarBarSizeArea) || slabThickness <= 0 || effectiveDepth <= 0 || compressiveStrength <= 0 || yieldStrengthSteel <= 0 || factoredMoment <= 0 || rebarBarSizeArea <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const phi = 0.90; // Strength reduction factor for flexure (ACI 318)

    // Convert factored moment from kip-ft/ft to lb-in/inch
    const Mu_lb_in_per_in = factoredMoment * 1000 * 12 / 12; // Mu in lb-in per inch width

    // Calculate beta1
    let beta1 = 0.85;
    if (compressiveStrength > 4000) {
        beta1 = 0.85 - 0.05 * ((compressiveStrength - 4000) / 1000);
        if (beta1 < 0.65) beta1 = 0.65;
    }

    // Calculate Rn (required nominal strength per unit area)
    const Rn = Mu_lb_in_per_in / (phi * 1 * effectiveDepth * effectiveDepth); // 1 inch width strip

    // Calculate required steel ratio (rho)
    const rho = (0.85 * compressiveStrength / yieldStrengthSteel) * (1 - Math.sqrt(1 - (2 * Rn / (0.85 * compressiveStrength))));

    // Calculate required area of steel reinforcement per foot width (As_req_per_ft)
    const As_req_per_ft = rho * 12 * effectiveDepth; // 12 inches width strip

    // Calculate minimum steel ratio (rho_min) for slabs (ACI 318 Table 7.6.1.1 for fy=60 ksi)
    const rho_min = 0.0018; // For fy=60 ksi

    // Calculate maximum steel ratio (rho_max) for tension-controlled section
    const rho_max = 0.85 * beta1 * compressiveStrength / yieldStrengthSteel * (0.003 / (0.003 + 0.005));

    let checkResult = "";
    let checkStatus = "";
    let recommendedSpacing = "N/A";

    if (rho < rho_min) {
        checkResult = "FAIL (Min Steel)";
        checkStatus = `Required steel ratio (${rho.toFixed(4)}) is less than minimum (${rho_min.toFixed(4)}). Provide minimum reinforcement.`;
        const As_min_per_ft = rho_min * 12 * effectiveDepth;
        recommendedSpacing = (rebarBarSizeArea / (As_min_per_ft / 12)).toFixed(2);
    } else if (rho > rho_max) {
        checkResult = "FAIL (Max Steel)";
        checkStatus = `Required steel ratio (${rho.toFixed(4)}) exceeds maximum (${rho_max.toFixed(4)}). Increase slab thickness or concrete strength.`;
    } else {
        checkResult = "PASS";
        checkStatus = "Slab design is adequate for flexure.";
        recommendedSpacing = (rebarBarSizeArea / (As_req_per_ft / 12)).toFixed(2);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Required Area of Steel Reinforcement per Foot (As_req): ${As_req_per_ft.toFixed(2)} in²/ft</p>
        <p>Recommended Spacing for ${document.getElementById('rebar-bar-size').options[document.getElementById('rebar-bar-size').selectedIndex].text} Bars: ${recommendedSpacing} inches</p>
        <p>Minimum Steel Ratio (rho_min): ${rho_min.toFixed(4)}</p>
        <p>Maximum Steel Ratio (rho_max): ${rho_max.toFixed(4)}</p>
        <p><strong>Flexural Design Check: ${checkResult}</strong></p>
        <p>${checkStatus}</p>
        <p class="note">Note: This calculation is based on simplified ACI 318 guidelines for one-way slabs. It does not account for two-way action, temperature and shrinkage reinforcement, or other complex conditions. Always consult relevant codes and a structural engineer for critical design considerations.</p>
    `;
});
