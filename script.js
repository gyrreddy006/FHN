const apiKey = "pk.eccaf37675a2250712865ac32e979be2"; // Replace with your LocationIQ API key

document.getElementById("findHospitalsBtn").addEventListener("click", initMap);

function initMap() {
    // Check if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Initialize the map with Leaflet
            const map = L.map('map').setView([userLocation.lat, userLocation.lng], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add a marker for the user's location
            L.marker([userLocation.lat, userLocation.lng]).addTo(map)
                .bindPopup("You are here!")
                .openPopup();

            // Fetch and display nearby hospitals on the map
            fetchNearbyHospitals(userLocation.lat, userLocation.lng, map);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchNearbyHospitals(lat, lng, map) {
    const endpoint = `https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            displayHospitals(data, map);
        })
        .catch(error => {
            console.error("Error fetching nearby hospitals:", error);
            alert("Failed to fetch nearby hospitals.");
        });
}

function displayHospitals(hospitals, map) {
    hospitals.forEach((hospital) => {
        // Add hospital marker to the map
        L.marker([hospital.lat, hospital.lon]).addTo(map)
            .bindPopup(hospital.name);
    });
}
