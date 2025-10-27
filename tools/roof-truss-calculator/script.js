
document.getElementById('calculateBtn').addEventListener('click', function() {
    const roofSpan = parseFloat(document.getElementById('roofSpan').value);
    const roofPitch = parseFloat(document.getElementById('roofPitch').value);
    const trussSpacing = parseFloat(document.getElementById('trussSpacing').value);

    if (isNaN(roofSpan) || isNaN(roofPitch) || isNaN(trussSpacing)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const run = roofSpan / 2;
    const rise = (roofPitch / 12) * run;
    const rafterLength = Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2));
    const totalRafters = Math.ceil(roofSpan / (trussSpacing / 12)) + 1;

    const resultHTML = `
        <h3>Truss Details:</h3>
        <p>Run: ${run.toFixed(2)} feet</p>
        <p>Rise: ${rise.toFixed(2)} feet</p>
        <p>Rafter Length: ${rafterLength.toFixed(2)} feet</p>
        <p>Total Rafters Needed: ${totalRafters}</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});
