function calculateWaste() {
    const totalMaterial = parseFloat(document.getElementById('total-material').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);

    if (isNaN(totalMaterial) || isNaN(wastePercentage) || totalMaterial <= 0 || wastePercentage < 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for total material and a non-negative waste percentage.';
        return;
    }

    const wasteFactor = 1 + (wastePercentage / 100);
    const materialToOrder = totalMaterial * wasteFactor;

    document.getElementById('result').innerText = `Total Material to Order: ${materialToOrder.toFixed(2)} units`;
}