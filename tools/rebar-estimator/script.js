document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const elementLength = parseFloat(document.getElementById('element-length').value);
        const elementWidth = parseFloat(document.getElementById('element-width').value);
        const rebarSpacingCm = parseFloat(document.getElementById('rebar-spacing').value);
        const rebarOverlapCm = parseFloat(document.getElementById('rebar-overlap').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(elementLength) || isNaN(elementWidth) || isNaN(rebarSpacingCm) || isNaN(rebarOverlapCm) || isNaN(wasteFactor) ||
            elementLength <= 0 || elementWidth <= 0 || rebarSpacingCm <= 0 || rebarOverlapCm < 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Convert spacing and overlap to meters
        const rebarSpacingM = rebarSpacingCm / 100;
        const rebarOverlapM = rebarOverlapCm / 100;

        // Calculate number of rebar pieces in one direction (length)
        const numRebarLength = Math.ceil(elementWidth / rebarSpacingM) + 1; // +1 for the first bar

        // Calculate number of rebar pieces in the other direction (width)
        const numRebarWidth = Math.ceil(elementLength / rebarSpacingM) + 1; // +1 for the first bar

        // Total length of rebar needed (without waste factor)
        let totalRebarLength = (numRebarLength * elementLength) + (numRebarWidth * elementWidth);

        // Add overlap length for each bar (excluding the first one in each direction)
        totalRebarLength += (numRebarLength - 1) * rebarOverlapM;
        totalRebarLength += (numRebarWidth - 1) * rebarOverlapM;

        // Add waste factor
        totalRebarLength *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Total Rebar Length: <strong>${totalRebarLength.toFixed(2)} meters</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});
