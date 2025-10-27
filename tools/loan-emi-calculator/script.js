
document.getElementById('emi-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTenureYears = parseFloat(document.getElementById('loan-tenure').value);

    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTenureYears) || loanAmount <= 0 || annualInterestRate < 0 || loanTenureYears <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Convert annual interest rate to monthly and percentage to decimal
    const monthlyInterestRate = (annualInterestRate / 12) / 100;
    // Convert loan tenure from years to months
    const loanTenureMonths = loanTenureYears * 12;

    let emi = 0;
    if (monthlyInterestRate === 0) {
        emi = loanAmount / loanTenureMonths;
    } else {
        emi = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), loanTenureMonths) /
              (Math.pow((1 + monthlyInterestRate), loanTenureMonths) - 1);
    }

    const totalPayment = emi * loanTenureMonths;
    const totalInterest = totalPayment - loanAmount;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Monthly EMI: $${emi.toFixed(2)}</p>
        <p>Total Interest Payable: $${totalInterest.toFixed(2)}</p>
        <p>Total Payment (Principal + Interest): $${totalPayment.toFixed(2)}</p>
    `;
});
