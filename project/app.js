function fetchFloodData() {
    fetch('/api/flood-data')  // Request data from Flask backend
        .then(response => response.json())
        .then(data => {
            // Update flood risk level
            document.getElementById('riskLevel').textContent = data.flood_risk;

            // Update rainfall chart
            const ctx = document.getElementById('rainfallChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Rainfall (mm)'],
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
        })
        .catch(error => console.error("Error fetching flood data:", error));
}

// Refresh the dashboard every 5 seconds
setInterval(fetchFloodData, 5000);

// Initial load
fetchFloodData();