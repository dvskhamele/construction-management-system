
document.getElementById('insulation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const width = parseFloat(document.getElementById('area-width').value);
    const length = parseFloat(document.getElementById('area-length').value);
    const rValue = parseFloat(document.getElementById('r-value').value);
    const insulationType = parseFloat(document.getElementById('insulation-type').value);

    if (isNaN(width) || isNaN(length) || isNaN(rValue)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const totalArea = width * length;
    const requiredThickness = rValue / insulationType;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Area: ${totalArea.toFixed(2)} sq. ft.</p>
        <p>Required Insulation Thickness: ${requiredThickness.toFixed(2)} inches</p>
    `;
});
