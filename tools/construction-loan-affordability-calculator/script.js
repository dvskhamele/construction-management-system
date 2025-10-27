
document.getElementById('calculateBtn').addEventListener('click', function() {
    const income = parseFloat(document.getElementById('income').value);
    const debt = parseFloat(document.getElementById('debt').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);

    if (isNaN(income) || isNaN(debt) || isNaN(interestRate) || isNaN(loanTerm)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const monthlyIncome = income / 12;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    // Simplified affordability calculation (Debt-to-Income ratio)
    const dtiRatio = (debt / monthlyIncome) * 100;

    // A very simplified maximum affordable loan amount (not a real mortgage calculation)
    // This is just for demonstration and assumes a certain percentage of income can go to housing
    const maxMonthlyPayment = monthlyIncome * 0.36 - debt; // 36% DTI rule of thumb
    let maxLoanAmount = 0;
    if (maxMonthlyPayment > 0) {
        maxLoanAmount = maxMonthlyPayment * ((Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)));
    }

    const resultHTML = `
        <h3>Affordability Results:</h3>
        <p>Monthly Income: $${monthlyIncome.toFixed(2)}</p>
        <p>Debt-to-Income Ratio: ${dtiRatio.toFixed(2)}%</p>
        <p>Maximum Affordable Monthly Payment: $${maxMonthlyPayment.toFixed(2)}</p>
        <p>Estimated Maximum Loan Amount: $${maxLoanAmount.toFixed(2)}</p>
        <p style="font-size: 14px; color: #888;">Note: This is a simplified estimation. Consult a financial advisor for accurate loan affordability.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});
