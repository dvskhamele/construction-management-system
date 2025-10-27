
document.getElementById('fence-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fenceLength = parseFloat(document.getElementById('fence-length').value);
    const postSpacing = parseFloat(document.getElementById('post-spacing').value);
    const gateWidth = parseFloat(document.getElementById('gate-width').value);

    if (isNaN(fenceLength) || isNaN(postSpacing) || isNaN(gateWidth)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate posts needed
    const effectiveLength = fenceLength - gateWidth;
    const postsNeeded = Math.ceil(effectiveLength / postSpacing) + 1; // +1 for the end post

    // Assuming 3 rails per section for simplicity
    const railsNeeded = (postsNeeded - 1) * 3; 

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Fence Length: ${fenceLength.toFixed(2)} feet</p>
        <p>Fence Posts Needed: ${postsNeeded}</p>
        <p>Fence Rails Needed (assuming 3 per section): ${railsNeeded}</p>
    `;
});
