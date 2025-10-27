document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const totalRise = parseFloat(document.getElementById('total-rise').value);
        const totalRun = parseFloat(document.getElementById('total-run').value);
        const stairWidth = parseFloat(document.getElementById('stair-width').value);
        const treadThickness = parseFloat(document.getElementById('tread-thickness').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(totalRise) || isNaN(totalRun) || isNaN(stairWidth) || isNaN(treadThickness) || isNaN(wasteFactor) ||
            totalRise <= 0 || totalRun <= 0 || stairWidth <= 0 || treadThickness <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Calculate the volume of the main slab part of the stairs (soffit)
        // This is a right-angled triangle prism
        const volumeSoffit = 0.5 * totalRise * totalRun * stairWidth;

        // Calculate the volume of the treads (steps)
        // This is approximated as a rectangular prism with length = totalRun, width = stairWidth, height = treadThickness
        // A more accurate calculation would involve number of steps, individual tread/riser dimensions.
        // For simplicity, we'll assume a uniform tread thickness over the total run.
        const volumeTreads = totalRun * stairWidth * treadThickness;

        // Total volume is the sum of soffit and treads
        let totalVolume = volumeSoffit + volumeTreads;

        // Add waste factor
        totalVolume *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `You will need approximately <strong>${totalVolume.toFixed(3)} cubic meters</strong> of concrete.`;
    });
});