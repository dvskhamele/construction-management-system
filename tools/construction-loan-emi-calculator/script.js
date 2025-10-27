
document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');
    const calculateButton = document.getElementById('calculate-emi');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', () => {
        const P = parseFloat(loanAmountInput.value); // Principal Loan Amount
        const R_annual = parseFloat(interestRateInput.value); // Annual Interest Rate in %
        const N_years = parseFloat(loanTenureInput.value); // Loan Tenure in years

        if (isNaN(P) || P <= 0) {
            resultDiv.textContent = 'Please enter a valid loan amount.';
            return;
        }

        if (isNaN(R_annual) || R_annual <= 0) {
            resultDiv.textContent = 'Please enter a valid annual interest rate.';
            return;
        }

        if (isNaN(N_years) || N_years <= 0) {
            resultDiv.textContent = 'Please enter a valid loan tenure.';
            return;
        }

        // Convert annual interest rate to monthly interest rate
        const R_monthly = R_annual / (12 * 100);
        // Convert loan tenure from years to months
        const N_months = N_years * 12;

        // EMI Formula: EMI = P * R * (1 + R)^N / ((1 + R)^N - 1)
        const emi = P * R_monthly * Math.pow((1 + R_monthly), N_months) / (Math.pow((1 + R_monthly), N_months) - 1);

        if (isNaN(emi)) {
            resultDiv.textContent = 'Could not calculate EMI. Please check your inputs.';
        } else {
            resultDiv.textContent = `Estimated EMI: ₹${emi.toFixed(2)}`;
        }
    });
});
