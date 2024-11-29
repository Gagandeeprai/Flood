function fetchFloodData() {
    const regions = ["Bangalore", "Delhi", "Mumbai", "Kolkata"];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const randomRainfall = Math.floor(Math.random() * 201); // Random rainfall (0-200 mm)
    const floodRisk = randomRainfall > 150 ? "High" : randomRainfall > 75 ? "Medium" : "Low";

    return {
        region: randomRegion,
        rainfall_mm: randomRainfall,
        flood_risk: floodRisk
    };
}

// Update the dashboard with new data
function updateDashboard() {
    const data = fetchFloodData();

    // Update flood risk level
    document.getElementById('riskLevel').textContent = data.flood_risk;

    // Check if chart already exists, destroy it and recreate it
    if (window.chart) {
        window.chart.destroy();
    }

    // Create or update the rainfall chart
    const ctx = document.getElementById('rainfallChart').getContext('2d');
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [data.region],
            datasets: [{
                label: `Rainfall in ${data.region}`,
                data: [data.rainfall_mm],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Refresh the dashboard every 5 seconds
setInterval(updateDashboard, 5000);

// Initial load
updateDashboard();