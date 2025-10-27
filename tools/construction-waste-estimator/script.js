
document.getElementById('calculateBtn').addEventListener('click', function() {
    const projectArea = parseFloat(document.getElementById('projectArea').value);
    const wasteFactor = parseFloat(document.getElementById('wasteFactor').value);

    if (isNaN(projectArea) || isNaN(wasteFactor)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const estimatedWaste = projectArea * wasteFactor;

    const resultHTML = `
        <h3>Estimated Construction Waste:</h3>
        <p>${estimatedWaste.toFixed(2)} cubic feet</p>
        <p style="font-size: 14px; color: #888;">Note: This is an estimation. Actual waste may vary based on project specifics and waste management practices.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});
