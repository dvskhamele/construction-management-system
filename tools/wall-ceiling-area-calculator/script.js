document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const roomLength = parseFloat(document.getElementById('room-length').value);
        const roomWidth = parseFloat(document.getElementById('room-width').value);
        const roomHeight = parseFloat(document.getElementById('room-height').value);
        const numWindows = parseFloat(document.getElementById('num-windows').value);
        const windowLength = parseFloat(document.getElementById('window-length').value);
        const windowHeight = parseFloat(document.getElementById('window-height').value);
        const numDoors = parseFloat(document.getElementById('num-doors').value);
        const doorLength = parseFloat(document.getElementById('door-length').value);
        const doorHeight = parseFloat(document.getElementById('door-height').value);

        if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(roomHeight) ||
            isNaN(numWindows) || isNaN(windowLength) || isNaN(windowHeight) ||
            isNaN(numDoors) || isNaN(doorLength) || isNaN(doorHeight) ||
            roomLength <= 0 || roomWidth <= 0 || roomHeight <= 0 ||
            numWindows < 0 || windowLength < 0 || windowHeight < 0 ||
            numDoors < 0 || doorLength < 0 || doorHeight < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for room dimensions and non-negative numbers for openings.';
            return;
        }

        // Calculate total wall area (perimeter * height)
        const totalWallArea = (2 * (roomLength + roomWidth)) * roomHeight;

        // Calculate ceiling area
        const ceilingArea = roomLength * roomWidth;

        // Calculate total area of windows to subtract
        const totalWindowArea = numWindows * windowLength * windowHeight;

        // Calculate total area of doors to subtract
        const totalDoorArea = numDoors * doorLength * doorHeight;

        // Calculate net wall area
        let netWallArea = totalWallArea - totalWindowArea - totalDoorArea;
        if (netWallArea < 0) netWallArea = 0; // Ensure area is not negative

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Total Wall Area (Gross): <strong>${totalWallArea.toFixed(2)} sq meters</strong></p>
            <p>Total Area of Openings (Windows & Doors): <strong>${(totalWindowArea + totalDoorArea).toFixed(2)} sq meters</strong></p>
            <p><strong>Net Wall Area: ${netWallArea.toFixed(2)} sq meters</strong></p>
            <p><strong>Ceiling Area: ${ceilingArea.toFixed(2)} sq meters</strong></p>
        `;
    });
});
