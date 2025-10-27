function calculateMixDesign() {
    const strength = parseFloat(document.getElementById('strength').value);
    const slump = parseFloat(document.getElementById('slump').value);
    const aggregateSize = parseFloat(document.getElementById('aggregate-size').value);

    if (isNaN(strength) || isNaN(slump) || isNaN(aggregateSize) || strength <= 0 || slump <= 0 || aggregateSize <= 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for all fields.';
        return;
    }

    let cementRatio, sandRatio, gravelRatio, waterCementRatio;

    // Simplified logic based on common practices (not for actual engineering design)
    if (strength >= 2500 && strength <= 3000) {
        cementRatio = 1;
        sandRatio = 2;
        gravelRatio = 3;
        waterCementRatio = 0.5;
    } else if (strength > 3000 && strength <= 4000) {
        cementRatio = 1;
        sandRatio = 1.75;
        gravelRatio = 2.75;
        waterCementRatio = 0.45;
    } else if (strength > 4000) {
        cementRatio = 1;
        sandRatio = 1.5;
        gravelRatio = 2.5;
        waterCementRatio = 0.4;
    } else {
        document.getElementById('result').innerText = 'Strength out of typical range for this simplified calculator.';
        return;
    }

    // Adjust for slump (very simplified)
    if (slump > 5) {
        waterCementRatio += 0.05; // More water for higher slump
    } else if (slump < 3) {
        waterCementRatio -= 0.05; // Less water for lower slump
    }

    // Aggregate size can influence workability and strength, but for this simplified model, we'll just acknowledge it.

    document.getElementById('result').innerText = `Estimated Mix Proportions (by volume):
    Cement: ${cementRatio} part(s)
    Sand: ${sandRatio} part(s)
    Gravel: ${gravelRatio} part(s)
    Approx. Water-Cement Ratio: ${waterCementRatio.toFixed(2)}`;
}