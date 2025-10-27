
document.addEventListener('DOMContentLoaded', () => {
    const shapeSelect = document.getElementById('shape-select');
    const slabInputs = document.getElementById('slab-inputs');
    const columnInputs = document.getElementById('column-inputs');
    const circularSlabInputs = document.getElementById('circular-slab-inputs');
    const calculateButton = document.getElementById('calculate-volume');
    const resultDiv = document.getElementById('result');

    const slabLengthInput = document.getElementById('slab-length');
    const slabWidthInput = document.getElementById('slab-width');
    const slabThicknessInput = document.getElementById('slab-thickness');

    const columnLengthInput = document.getElementById('column-length');
    const columnWidthInput = document.getElementById('column-width');
    const columnHeightInput = document.getElementById('column-height');

    const circularSlabRadiusInput = document.getElementById('circular-slab-radius');
    const circularSlabThicknessInput = document.getElementById('circular-slab-thickness');

    const showShapeInputs = (selectedShape) => {
        slabInputs.classList.add('hidden');
        columnInputs.classList.add('hidden');
        circularSlabInputs.classList.add('hidden');

        if (selectedShape === 'slab') {
            slabInputs.classList.remove('hidden');
        } else if (selectedShape === 'column') {
            columnInputs.classList.remove('hidden');
        }
        else if (selectedShape === 'circular-slab') {
            circularSlabInputs.classList.remove('hidden');
        }
    };

    shapeSelect.addEventListener('change', (event) => {
        showShapeInputs(event.target.value);
    });

    calculateButton.addEventListener('click', () => {
        const selectedShape = shapeSelect.value;
        let volume = 0;
        let isValid = true;

        if (selectedShape === 'slab') {
            const length = parseFloat(slabLengthInput.value);
            const width = parseFloat(slabWidthInput.value);
            const thickness = parseFloat(slabThicknessInput.value);
            if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0 || isNaN(thickness) || thickness <= 0) {
                isValid = false;
            } else {
                volume = length * width * thickness;
            }
        } else if (selectedShape === 'column') {
            const length = parseFloat(columnLengthInput.value);
            const width = parseFloat(columnWidthInput.value);
            const height = parseFloat(columnHeightInput.value);
            if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
                isValid = false;
            } else {
                volume = length * width * height;
            }
        } else if (selectedShape === 'circular-slab') {
            const radius = parseFloat(circularSlabRadiusInput.value);
            const thickness = parseFloat(circularSlabThicknessInput.value);
            if (isNaN(radius) || radius <= 0 || isNaN(thickness) || thickness <= 0) {
                isValid = false;
            } else {
                volume = Math.PI * radius * radius * thickness;
            }
        }

        if (!isValid) {
            resultDiv.textContent = 'Please enter valid positive dimensions.';
        } else {
            resultDiv.textContent = `Concrete Volume: ${volume.toFixed(2)} cubic meters`;
        }
    });

    // Initialize with slab inputs visible
    showShapeInputs(shapeSelect.value);
});
