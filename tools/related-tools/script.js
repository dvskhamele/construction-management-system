
document.getElementById('tool-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic will be added here
    console.log('Form submitted for related-tools');
    // Redirect to results page
    window.location.href = '/tools/results/related-tools-result.html';
});
