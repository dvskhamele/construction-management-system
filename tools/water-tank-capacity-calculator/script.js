document.addEventListener('DOMContentLoaded', function() {
    const tankTypeSelect = document.getElementById('tank-type');
    const dimensionUnitSelect = document.getElementById('dimension-unit');
    const rectangularInputs = document.getElementById('rectangular-inputs');
    const cylindricalInputs = document.getElementById('cylindrical-inputs');

    function toggleInputs() {
        if (tankTypeSelect.value === 'rectangular') {
            rectangularInputs.style.display = 'block';
            cylindricalInputs.style.display = 'none';
            document.getElementById('rect-length').setAttribute('required', 'true');
            document.getElementById('rect-width').setAttribute('required', 'true');
            document.getElementById('cyl-diameter').removeAttribute('required');
        } else {
            rectangularInputs.style.display = 'none';
            cylindricalInputs.style.display = 'block';
            document.getElementById('cyl-diameter').setAttribute('required', 'true');
            document.getElementById('rect-length').removeAttribute('required');
            document.getElementById('rect-width').removeAttribute('required');
        }
    }

    tankTypeSelect.addEventListener('change', toggleInputs);
    toggleInputs(); // Set initial state

    document.getElementById('tank-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const tankType = tankTypeSelect.value;
        const dimensionUnit = dimensionUnitSelect.value;
        const tankHeight = parseFloat(document.getElementById('tank-height').value);

        let volumeBaseUnit = 0; // Volume in cubic feet or cubic meters

        if (tankType === 'rectangular') {
            const length = parseFloat(document.getElementById('rect-length').value);
            const width = parseFloat(document.getElementById('rect-width').value);
            if (isNaN(length) || isNaN(width) || isNaN(tankHeight)) {
                alert("Please enter valid numbers for all dimensions.");
                return;
            }
            volumeBaseUnit = length * width * tankHeight;
        } else { // cylindrical
            const diameter = parseFloat(document.getElementById('cyl-diameter').value);
            if (isNaN(diameter) || isNaN(tankHeight)) {
                alert("Please enter valid numbers for all dimensions.");
                return;
            }
            const radius = diameter / 2;
            volumeBaseUnit = Math.PI * radius * radius * tankHeight;
        }

        let volumeGallons = 0;
        let volumeLiters = 0;

        if (dimensionUnit === 'feet') {
            volumeGallons = volumeBaseUnit * 7.48052; // 1 cubic foot = 7.48052 US gallons
            volumeLiters = volumeBaseUnit * 28.3168;  // 1 cubic foot = 28.3168 liters
        } else { // meters
            volumeGallons = volumeBaseUnit * 264.172; // 1 cubic meter = 264.172 US gallons
            volumeLiters = volumeBaseUnit * 1000;     // 1 cubic meter = 1000 liters
        }

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Results:</h3>
            <p>Volume: ${volumeBaseUnit.toFixed(2)} cubic ${dimensionUnit}</p>
            <p>Capacity: ${volumeGallons.toFixed(2)} US gallons</p>
            <p>Capacity: ${volumeLiters.toFixed(2)} liters</p>
        `;
    });
});