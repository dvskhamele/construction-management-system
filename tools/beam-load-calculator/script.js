
document.getElementById('beam-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const beamSpan = parseFloat(document.getElementById('beam-span').value);
    const udl = parseFloat(document.getElementById('udl').value);

    if (isNaN(beamSpan) || isNaN(udl)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate Total Load
    const totalLoad = udl * beamSpan;

    // Calculate Reaction Forces at Supports (for simply supported beam)
    const reactionForce = totalLoad / 2;

    // Calculate Maximum Bending Moment (for simply supported beam with UDL)
    const maxBendingMoment = (udl * beamSpan * beamSpan) / 8;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Load on Beam: ${totalLoad.toFixed(2)} kips</p>
        <p>Reaction Force at each Support: ${reactionForce.toFixed(2)} kips</p>
        <p>Maximum Bending Moment: ${maxBendingMoment.toFixed(2)} kip-feet</p>
        <p class="note">Note: This calculation is for a simply supported beam with a uniformly distributed load.</p>
    `;
});
