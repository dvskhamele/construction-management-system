document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const areaLength = parseFloat(document.getElementById('area-length').value);
        const areaWidth = parseFloat(document.getElementById('area-width').value);
        const areaDepth = parseFloat(document.getElementById('area-depth').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(areaLength) || isNaN(areaWidth) || isNaN(areaDepth) || isNaN(wasteFactor) ||
            areaLength <= 0 || areaWidth <= 0 || areaDepth <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        let volume = areaLength * areaWidth * areaDepth;

        // Add waste factor
        volume *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `You will need approximately <strong>${volume.toFixed(3)} cubic meters</strong> of gravel.`;
    });
});
