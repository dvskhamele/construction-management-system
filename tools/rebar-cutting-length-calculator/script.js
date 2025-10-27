
document.getElementById('tool-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic will be added here
    console.log('Form submitted for rebar-cutting-length-calculator');
    // Redirect to results page
    window.location.href = '/tools/results/rebar-cutting-length-calculator-result.html';
});
