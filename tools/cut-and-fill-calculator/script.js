
function calculateCutAndFill() {
    const area = parseFloat(document.getElementById('area').value);
    const existingElevation = parseFloat(document.getElementById('existing-elevation').value);
    const proposedElevation = parseFloat(document.getElementById('proposed-elevation').value);

    if (isNaN(area) || isNaN(existingElevation) || isNaN(proposedElevation) || area <= 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for all fields.';
        return;
    }

    const elevationDifference = proposedElevation - existingElevation;
    const volumeCubicFeet = area * Math.abs(elevationDifference);
    const volumeCubicYards = volumeCubicFeet / 27;

    let resultText;
    if (elevationDifference > 0) {
        resultText = `Fill needed: ${volumeCubicFeet.toFixed(2)} cubic feet (${volumeCubicYards.toFixed(2)} cubic yards)`;
    } else if (elevationDifference < 0) {
        resultText = `Cut needed: ${volumeCubicFeet.toFixed(2)} cubic feet (${volumeCubicYards.toFixed(2)} cubic yards)`;
    } else {
        resultText = 'The site is balanced. No cut or fill needed.';
    }

    document.getElementById('result').innerText = resultText;
}
