document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const serialNumber = document.getElementById('serialNumber').value;
    searchBikeBySerial(serialNumber)
        .then(data => displayResults(data))
        .catch(error => {
            console.error('Error fetching data: ', error);
            document.getElementById('results').innerHTML = '<p>Error loading data.</p>';
        });
});

function searchBikeBySerial(serialNumber) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://bikeindex.org/api/v3/search?page=1&per_page=25&serial=${encodeURIComponent(serialNumber)}`;

        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    if (data.bikes.length > 0) {
        let html = '<h3>Results:</h3>';
        data.bikes.forEach(bike => {
            html += `<p><strong>${bike.title}</strong> (${bike.manufacturer_name}) - ${bike.year}</p>`;
        });
        resultsContainer.innerHTML = html;
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}