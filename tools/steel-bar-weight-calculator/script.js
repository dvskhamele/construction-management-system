
document.getElementById('tool-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic will be added here
    console.log('Form submitted for steel-bar-weight-calculator');
    // Redirect to results page
    window.location.href = '/tools/results/steel-bar-weight-calculator-result.html';
});
