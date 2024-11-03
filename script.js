let map;
let userMarker;

function initMap() {
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
    map = L.map('map').setView(defaultLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                userMarker = L.marker(pos).addTo(map).bindPopup("You are here!").openPopup();
                map.setView(pos, 15);
                findNearbyHospitals(pos);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = L.popup()
        .setLatLng(pos)
        .setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.")
        .openOn(map);
}

function findNearbyHospitals(location) {
    const lat = location.lat;
    const lng = location.lng;
    const apiKey = 'pk.eccaf37675a2250712865ac32e979be2'; // Your LocationIQ API key

    fetch(`https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`)
        .then(response => response.json())
        .then(data => {
            const hospitals = data.slice(0, 3); // Limit to 3 hospitals
            localStorage.setItem('hospitals', JSON.stringify(hospitals));
        })
        .catch(error => console.error('Error fetching hospitals:', error));
}

// Initialize the map when the window loads
window.onload = initMap;
