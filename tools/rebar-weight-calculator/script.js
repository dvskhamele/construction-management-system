
document.getElementById('rebar-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rebarSizeWeight = parseFloat(document.getElementById('rebar-size').value);
    const rebarLength = parseFloat(document.getElementById('rebar-length').value);
    const rebarQuantity = parseFloat(document.getElementById('rebar-quantity').value);

    if (isNaN(rebarSizeWeight) || isNaN(rebarLength) || isNaN(rebarQuantity)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const totalWeight = rebarSizeWeight * rebarLength * rebarQuantity;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Estimated Rebar Weight: ${totalWeight.toFixed(2)} lbs</p>
    `;
});
