document.addEventListener('DOMContentLoaded', () => {
    const coordinatesInput = document.getElementById('coordinates');
    const calculateButton = document.getElementById('calculate-area');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', () => {
        const coordinates = coordinatesInput.value.trim().split('\n').map(line => {
            const parts = line.split(',');
            return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
        });

        if (coordinates.length < 3) {
            resultDiv.textContent = 'Please enter at least 3 coordinates.';
            return;
        }

        for (const coord of coordinates) {
            if (isNaN(coord.x) || isNaN(coord.y)) {
                resultDiv.textContent = 'Invalid coordinate format. Please use x,y pairs.';
                return;
            }
        }

        const area = calculateShoelaceArea(coordinates);
        resultDiv.textContent = `Area: ${area.toFixed(2)} square units`;
    });

    function calculateShoelaceArea(vertices) {
        let area = 0;
        for (let i = 0; i < vertices.length; i++) {
            const j = (i + 1) % vertices.length;
            area += vertices[i].x * vertices[j].y;
            area -= vertices[j].x * vertices[i].y;
        }
        return Math.abs(area / 2);
    }
});
