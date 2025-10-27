document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const diameter = parseFloat(document.getElementById('column-diameter').value);
        const height = parseFloat(document.getElementById('column-height').value);
        const numColumns = parseFloat(document.getElementById('num-columns').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(diameter) || isNaN(height) || isNaN(numColumns) || isNaN(wasteFactor) ||
            diameter <= 0 || height <= 0 || numColumns <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        const radius = diameter / 2;
        let volumePerColumn = Math.PI * radius * radius * height;
        let totalVolume = volumePerColumn * numColumns;

        // Add waste factor
        totalVolume *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `You will need approximately <strong>${totalVolume.toFixed(3)} cubic meters</strong> of concrete.`;
    });
});