const apiKey = "pk.eccaf37675a2250712865ac32e979be2"; // Replace with your LocationIQ API key

document.getElementById("findHospitalsBtn").addEventListener("click", initMap);

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const map = L.map('map').setView([userLocation.lat, userLocation.lng], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([userLocation.lat, userLocation.lng]).addTo(map)
                .bindPopup("You are here!")
                .openPopup();

            fetchNearbyHospitals(userLocation.lat, userLocation.lng);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchNearbyHospitals(lat, lng) {
    const endpoint = `https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            // Save the top 3 hospitals to sessionStorage and navigate to hospitals.html
            sessionStorage.setItem("hospitals", JSON.stringify(data.slice(0, 3)));
            window.location.href = "hospitals.html";
        })
        .catch(error => {
            console.error("Error fetching nearby hospitals:", error);
            alert("Failed to fetch nearby hospitals.");
        });
}
