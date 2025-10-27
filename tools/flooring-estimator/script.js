document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const roomLength = parseFloat(document.getElementById('room-length').value);
        const roomWidth = parseFloat(document.getElementById('room-width').value);
        const materialLength = parseFloat(document.getElementById('material-length').value);
        const materialWidth = parseFloat(document.getElementById('material-width').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(materialLength) || isNaN(materialWidth) || isNaN(wasteFactor) ||
            roomLength <= 0 || roomWidth <= 0 || materialLength <= 0 || materialWidth <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Calculate room area
        const roomArea = roomLength * roomWidth;

        // Calculate area of one material piece
        const materialArea = materialLength * materialWidth;

        // Number of pieces needed (without waste factor)
        let numberOfPieces = roomArea / materialArea;

        // Add waste factor
        numberOfPieces *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Flooring Pieces Needed: <strong>${Math.ceil(numberOfPieces)} pieces</strong></p>
            <p>Total Area to Cover: <strong>${roomArea.toFixed(2)} sq meters</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});
