document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const length = parseFloat(document.getElementById('footing-length').value);
        const width = parseFloat(document.getElementById('footing-width').value);
        const depth = parseFloat(document.getElementById('footing-depth').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(length) || isNaN(width) || isNaN(depth) || isNaN(wasteFactor) ||
            length <= 0 || width <= 0 || depth <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        let volume = length * width * depth;

        // Add waste factor
        volume *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `You will need approximately <strong>${volume.toFixed(3)} cubic meters</strong> of concrete.`;
    });
});