
function calculateDiagonal() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for length and width.';
        return;
    }

    const diagonal = Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2));

    document.getElementById('result').innerText = `Diagonal Length: ${diagonal.toFixed(2)} feet`;
}
