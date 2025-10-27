document.getElementById('gst-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const gstRate = parseFloat(document.getElementById('gst-rate').value);
    const calculationType = document.getElementById('calculation-type').value;

    if (isNaN(amount) || isNaN(gstRate) || amount < 0 || gstRate < 0) {
        alert("Please enter valid non-negative numbers for amount and GST rate.");
        return;
    }

    let gstAmount = 0;
    let finalAmount = 0;
    let originalAmount = 0;

    if (calculationType === 'add-gst') {
        gstAmount = amount * (gstRate / 100);
        finalAmount = amount + gstAmount;
        originalAmount = amount;
    } else { // remove-gst
        originalAmount = amount / (1 + gstRate / 100);
        gstAmount = amount - originalAmount;
        finalAmount = amount;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        ${calculationType === 'add-gst' ? `<p>Original Amount: $${originalAmount.toFixed(2)}</p>` : `<p>Amount Excluding GST: $${originalAmount.toFixed(2)}</p>`}
        <p>GST Amount (${gstRate.toFixed(2)}%): $${gstAmount.toFixed(2)}</p>
        <p>Total Amount: $${finalAmount.toFixed(2)}</p>
    `;
});