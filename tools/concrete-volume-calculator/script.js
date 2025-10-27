document.addEventListener('DOMContentLoaded', () => {
    const shapeSelect = document.getElementById('shape');
    const slabInputs = document.getElementById('slab-inputs');
    const columnInputs = document.getElementById('column-inputs');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    shapeSelect.addEventListener('change', () => {
        if (shapeSelect.value === 'slab') {
            slabInputs.style.display = 'block';
            columnInputs.style.display = 'none';
        } else {
            slabInputs.style.display = 'none';
            columnInputs.style.display = 'block';
        }
        resultDiv.style.display = 'none'; // Hide result when changing shape
    });

    calculateBtn.addEventListener('click', () => {
        let volume = 0;
        let isValid = true;

        if (shapeSelect.value === 'slab') {
            const length = parseFloat(document.getElementById('slab-length').value);
            const width = parseFloat(document.getElementById('slab-width').value);
            const thickness = parseFloat(document.getElementById('slab-thickness').value);

            if (isNaN(length) || isNaN(width) || isNaN(thickness) || length <= 0 || width <= 0 || thickness <= 0) {
                isValid = false;
            } else {
                volume = length * width * thickness;
            }
        } else { // column
            const diameter = parseFloat(document.getElementById('column-diameter').value);
            const height = parseFloat(document.getElementById('column-height').value);
            const numColumns = parseFloat(document.getElementById('num-columns').value);

            if (isNaN(diameter) || isNaN(height) || isNaN(numColumns) || diameter <= 0 || height <= 0 || numColumns <= 0) {
                isValid = false;
            } else {
                const radius = diameter / 2;
                volume = Math.PI * radius * radius * height * numColumns;
            }
        }

        if (!isValid) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
        } else {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#e9f7ef';
            resultDiv.style.borderColor = '#d4edda';
            resultDiv.style.color = '#155724';
            resultDiv.innerHTML = `You will need approximately <strong>${volume.toFixed(3)} cubic meters</strong> of concrete.`;
        }
    });
});
