document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const roofLength = parseFloat(document.getElementById('roof-length').value);
        const roofWidth = parseFloat(document.getElementById('roof-width').value);
        const roofPitch = parseFloat(document.getElementById('roof-pitch').value);
        const shingleCoverage = parseFloat(document.getElementById('shingle-coverage').value);
        const underlaymentCoverage = parseFloat(document.getElementById('underlayment-coverage').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(roofLength) || isNaN(roofWidth) || isNaN(roofPitch) || isNaN(shingleCoverage) || isNaN(underlaymentCoverage) || isNaN(wasteFactor) ||
            roofLength <= 0 || roofWidth <= 0 || roofPitch < 0 || shingleCoverage <= 0 || underlaymentCoverage <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Calculate roof area based on pitch
        // For a simple gable roof, we calculate the area of one side and multiply by 2
        // The formula for the slope factor is sqrt(run^2 + rise^2) / run
        // Here, run is 100cm, rise is roofPitch cm
        const slopeFactor = Math.sqrt(Math.pow(100, 2) + Math.pow(roofPitch, 2)) / 100;

        const flatRoofArea = roofLength * roofWidth;
        const actualRoofArea = flatRoofArea * slopeFactor;

        // Calculate shingles needed
        let shinglesNeededBundles = actualRoofArea / shingleCoverage;
        shinglesNeededBundles *= (1 + (wasteFactor / 100));

        // Calculate underlayment needed
        let underlaymentNeededRolls = actualRoofArea / underlaymentCoverage;
        underlaymentNeededRolls *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Roof Area (Sloped): <strong>${actualRoofArea.toFixed(2)} sq meters</strong></p>
            <p>Estimated Shingle Bundles: <strong>${Math.ceil(shinglesNeededBundles)} bundles</strong></p>
            <p>Estimated Underlayment Rolls: <strong>${Math.ceil(underlaymentNeededRolls)} rolls</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});
