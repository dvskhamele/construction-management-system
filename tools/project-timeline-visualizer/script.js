
document.addEventListener('DOMContentLoaded', () => {
    const phaseNameInput = document.getElementById('phase-name');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const addPhaseButton = document.getElementById('add-phase');
    const timelineCanvas = document.getElementById('timeline-canvas');

    const timelineData = {
        labels: [],
        datasets: []
    };

    const timelineConfig = {
        type: 'bar',
        data: timelineData,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    min: new Date().toISOString(),
                    max: new Date().toISOString()
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const timelineChart = new Chart(timelineCanvas, timelineConfig);

    addPhaseButton.addEventListener('click', () => {
        const phaseName = phaseNameInput.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (!phaseName || !startDate || !endDate) {
            alert('Please fill in all fields for the project phase.');
            return;
        }

        const newPhase = {
            label: phaseName,
            data: [{
                x: [startDate, endDate],
                y: phaseName
            }],
            backgroundColor: getRandomColor()
        };

        timelineData.labels.push(phaseName);
        timelineData.datasets.push(newPhase);

        updateTimeline();
        phaseNameInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
    });

    function updateTimeline() {
        const allDates = timelineData.datasets.flatMap(dataset => dataset.data[0].x);
        if (allDates.length > 0) {
            timelineConfig.options.scales.x.min = allDates.reduce((a, b) => a < b ? a : b);
            timelineConfig.options.scales.x.max = allDates.reduce((a, b) => a > b ? a : b);
        }
        timelineChart.update();
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
