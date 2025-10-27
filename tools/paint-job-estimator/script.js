
document.addEventListener('DOMContentLoaded', () => {
    const wallAreaInput = document.getElementById('wall-area');
    const coatsInput = document.getElementById('coats');
    const paintPriceInput = document.getElementById('paint-price');
    const estimateButton = document.getElementById('estimate-paint');
    const resultDiv = document.getElementById('result');

    const paintCoveragePerGallon = 350; // square feet

    estimateButton.addEventListener('click', () => {
        const wallArea = parseFloat(wallAreaInput.value);
        const coats = parseInt(coatsInput.value);
        const paintPrice = parseFloat(paintPriceInput.value);

        if (isNaN(wallArea) || wallArea <= 0) {
            resultDiv.textContent = 'Please enter a valid wall area.';
            return;
        }

        if (isNaN(coats) || coats <= 0) {
            resultDiv.textContent = 'Please enter a valid number of coats.';
            return;
        }

        if (isNaN(paintPrice) || paintPrice < 0) {
            resultDiv.textContent = 'Please enter a valid paint price.';
            return;
        }

        const totalAreaToPaint = wallArea * coats;
        const gallonsNeeded = Math.ceil(totalAreaToPaint / paintCoveragePerGallon);
        const totalCost = gallonsNeeded * paintPrice;

        resultDiv.innerHTML = `
            <p>Gallons of paint needed: ${gallonsNeeded}</p>
            <p>Estimated cost: $${totalCost.toFixed(2)}</p>
        `;
    });
});
