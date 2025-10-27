
document.getElementById('countdown-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const deadlineDateInput = document.getElementById('deadline-date').value;
    const deadline = new Date(deadlineDateInput).getTime();

    if (isNaN(deadline)) {
        alert("Please enter a valid deadline date.");
        return;
    }

    const countdownDisplay = document.getElementById('countdown-display');

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = deadline - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownDisplay.innerHTML = "PROJECT OVERDUE!";
        } else {
            countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
});
