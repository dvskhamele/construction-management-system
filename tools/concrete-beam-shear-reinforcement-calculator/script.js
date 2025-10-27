
document.getElementById('shear-reinforcement-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const beamWidth = parseFloat(document.getElementById('beam-width').value);
    const effectiveDepth = parseFloat(document.getElementById('effective-depth').value);
    const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
    const yieldStrengthRebar = parseFloat(document.getElementById('yield-strength-rebar').value);
    const factoredShearForce = parseFloat(document.getElementById('factored-shear-force').value);

    if (isNaN(beamWidth) || isNaN(effectiveDepth) || isNaN(compressiveStrength) || isNaN(yieldStrengthRebar) || isNaN(factoredShearForce) || beamWidth <= 0 || effectiveDepth <= 0 || compressiveStrength <= 0 || yieldStrengthRebar <= 0 || factoredShearForce < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const phi = 0.75; // Strength reduction factor for shear (ACI 318)
    const lambda = 1.0; // For normal weight concrete

    // Nominal shear strength provided by concrete (Vc) in lbs
    const Vc = 2 * lambda * Math.sqrt(compressiveStrength) * beamWidth * effectiveDepth;

    // Convert factored shear force from kips to lbs
    const Vu_design = factoredShearForce * 1000;

    // Required shear strength to be provided by shear reinforcement (Vs_required) in lbs
    let Vs_required = (Vu_design / phi) - Vc;

    let resultsHtml = "<h3>Results:</h3>";
    let warnings = [];

    resultsHtml += `<p>Nominal Shear Strength of Concrete (Vc): ${Vc.toFixed(2)} lbs</p>`;

    if (Vu_design <= 0.5 * phi * Vc) {
        resultsHtml += `<p>No shear reinforcement theoretically required (Vu <= 0.5 * phi * Vc).</p>`;
        resultsHtml += `<p class="note">Minimum shear reinforcement may still be required by code depending on specific conditions.</p>`;
    } else if (Vs_required <= 0) {
        resultsHtml += `<p>No shear reinforcement theoretically required (Vu <= phi * Vc).</p>`;
        resultsHtml += `<p class="note">Minimum shear reinforcement may still be required by code depending on specific conditions.</p>`;
    } else {
        resultsHtml += `<p>Required Shear Reinforcement (Vs_req): ${Vs_required.toFixed(2)} lbs</p>`;

        // Required Area of Shear Reinforcement per unit length (Av/s) in in²/inch
        const Av_s_required = Vs_required / (yieldStrengthRebar * effectiveDepth);
        resultsHtml += `<p>Required Av/s: ${Av_s_required.toFixed(4)} in²/inch</p>`;

        // Assuming #3 stirrup (2 legs) for calculation example
        const Av_stirrup = 2 * 0.11; // Area of #3 bar = 0.11 in²
        resultsHtml += `<p>Assuming #3 stirrup (2 legs, Av = ${Av_stirrup.toFixed(2)} in²):</p>`;

        const recommendedSpacing = (Av_stirrup * yieldStrengthRebar * effectiveDepth) / Vs_required;
        resultsHtml += `<p>Recommended Stirrup Spacing (s): ${recommendedSpacing.toFixed(2)} inches</p>`;

        // Check maximum spacing requirements (ACI 318)
        let s_max;
        const Vc_limit = 4 * Math.sqrt(compressiveStrength) * beamWidth * effectiveDepth; // 4*sqrt(f'c)*b*d

        if (Vs_required <= Vc_limit) {
            s_max = Math.min(effectiveDepth / 2, 24);
        } else {
            s_max = Math.min(effectiveDepth / 4, 12);
        }

        if (recommendedSpacing > s_max) {
            warnings.push(`Warning: Calculated spacing (${recommendedSpacing.toFixed(2)} in) exceeds maximum allowed spacing of ${s_max.toFixed(2)} in. Reduce spacing or increase stirrup size.`);
        }
    }

    if (warnings.length > 0) {
        resultsHtml += '<div class="warnings">' + warnings.join('<br>') + '</div>';
    }
    resultsHtml += `<p class="note">Note: This calculation is based on simplified ACI 318 guidelines for shear design. Always consult relevant codes and a structural engineer for critical design considerations, including minimum reinforcement requirements, detailing, and torsion.</p>`;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = resultsHtml;
});
