
document.getElementById('flexural-reinforcement-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const beamWidth = parseFloat(document.getElementById('beam-width').value);
    const effectiveDepth = parseFloat(document.getElementById('effective-depth').value);
    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const yieldStrengthSteel = parseFloat(document.getElementById('yield-strength-steel').value);
    const factoredMoment = parseFloat(document.getElementById('factored-moment').value);
    const rebarBarSizeArea = parseFloat(document.getElementById('rebar-bar-size').value);

    if (isNaN(beamWidth) || isNaN(effectiveDepth) || isNaN(compressiveStrength) || isNaN(yieldStrengthSteel) || isNaN(factoredMoment) || isNaN(rebarBarSizeArea) || beamWidth <= 0 || effectiveDepth <= 0 || compressiveStrength <= 0 || yieldStrengthSteel <= 0 || factoredMoment <= 0 || rebarBarSizeArea <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const phi = 0.90; // Strength reduction factor for flexure (ACI 318)

    // Convert factored moment from kip-ft to lb-in
    const Mu_lbs_in = factoredMoment * 12000;

    // Calculate beta1 (factor relating depth of equivalent rectangular stress block to neutral axis depth)
    let beta1 = 0.85;
    if (compressiveStrength > 4000) {
        beta1 = 0.85 - 0.05 * ((compressiveStrength - 4000) / 1000);
        if (beta1 < 0.65) beta1 = 0.65;
    }

    // Calculate Rn (required nominal strength per unit area)
    const Rn = Mu_lbs_in / (phi * beamWidth * effectiveDepth * effectiveDepth);

    // Calculate required steel ratio (rho)
    const rho = (0.85 * compressiveStrength / yieldStrengthSteel) * (1 - Math.sqrt(1 - (2 * Rn / (0.85 * compressiveStrength))));

    // Calculate required area of steel reinforcement (As_req)
    const As_req = rho * beamWidth * effectiveDepth;

    // Calculate minimum steel ratio (rho_min)
    const rho_min1 = (3 * Math.sqrt(compressiveStrength)) / yieldStrengthSteel;
    const rho_min2 = 200 / yieldStrengthSteel;
    const rho_min = Math.max(rho_min1, rho_min2);

    // Calculate maximum steel ratio (rho_max) for tension-controlled section
    const rho_max = 0.85 * beta1 * compressiveStrength / yieldStrengthSteel * (0.003 / (0.003 + 0.005));

    let checkResult = "";
    let checkStatus = "";
    let numRebarBars = 0;

    if (As_req < rho_min * beamWidth * effectiveDepth) {
        checkResult = "FAIL (Min Steel)";
        checkStatus = "Required steel area is less than minimum. Provide minimum reinforcement.";
        numRebarBars = Math.ceil((rho_min * beamWidth * effectiveDepth) / rebarBarSizeArea);
    } else if (As_req > rho_max * beamWidth * effectiveDepth) {
        checkResult = "FAIL (Max Steel)";
        checkStatus = "Required steel area exceeds maximum. Increase beam dimensions or concrete strength.";
    } else {
        checkResult = "PASS";
        checkStatus = "Beam design is adequate for flexure.";
        numRebarBars = Math.ceil(As_req / rebarBarSizeArea);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Required Area of Steel Reinforcement (As_req): ${As_req.toFixed(2)} in²</p>
        <p>Number of ${document.getElementById('rebar-bar-size').options[document.getElementById('rebar-bar-size').selectedIndex].text} Bars Needed: ${numRebarBars}</p>
        <p>Minimum Steel Ratio (rho_min): ${rho_min.toFixed(4)}</p>
        <p>Maximum Steel Ratio (rho_max): ${rho_max.toFixed(4)}</p>
        <p><strong>Flexural Design Check: ${checkResult}</strong></p>
        <p>${checkStatus}</p>
        <p class="note">Note: This calculation is based on simplified ACI 318 guidelines for singly reinforced rectangular beams. It does not account for compression reinforcement, T-beams, or other complex conditions. Always consult relevant codes and a structural engineer for critical design considerations.</p>
    `;
});
