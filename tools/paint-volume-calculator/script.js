document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const coats = parseFloat(document.getElementById('coats').value);
        const coverage = parseFloat(document.getElementById('coverage').value);

        if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(coats) || isNaN(coverage) || length <= 0 || width <= 0 || height <= 0 || coats <= 0 || coverage <= 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Calculate wall area (perimeter * height)
        const wallArea = (2 * (length + width)) * height;

        // Assuming a standard room, we might also consider ceiling area
        // For simplicity, let's just calculate walls for now, as it's a common request.
        // If ceiling is also to be painted, add (length * width) to wallArea

        const totalAreaToPaint = wallArea * coats;
        const paintNeededLiters = totalAreaToPaint / coverage;

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `You will need approximately <strong>${paintNeededLiters.toFixed(2)} liters</strong> of paint.`;
    });
});
