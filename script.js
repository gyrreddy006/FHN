// Existing functions here...

// Initialize the map when the window loads
window.onload = function () {
    initMap();

    // Event listener to close the popup when mapCloseBtn is clicked
    document.getElementById('mapCloseBtn').addEventListener('click', function() {
        document.getElementById('popup').classList.add('hidden');
    });

    // Existing location modal or other event listeners here...
};
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
            displayHospitals(hospitals);
        })
        .catch(error => console.error('Error fetching hospitals:', error));
}

function displayHospitals(hospitals) {
    const popupContent = document.querySelector('.popup-content');

    popupContent.innerHTML = '<span id="closePopup" class="close">&times;</span><h2>Nearby Hospitals</h2>';

    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.classList.add('hospital');
        hospitalDiv.innerHTML = `
            <div class="hospital-info">
                <h3>${hospital.display_name}</h3>
                <p>Address: ${hospital.display_name}</p>
                <p>Rating: ${hospital.rating || 'N/A'}</p>
                <p>Cost Range: ${hospital.cost || 'N/A'}</p>
            </div>
            <button class="callBtn" data-number="${hospital.phone || 'N/A'}">Call</button>
        `;
        popupContent.appendChild(hospitalDiv);
    });

    document.getElementById('popup').classList.remove('hidden');
    attachCallButtons();
}

function attachCallButtons() {
    const callButtons = document.querySelectorAll('.callBtn');
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = button.getAttribute('data-number');
            if (phoneNumber !== 'N/A') {
                window.location.href = `tel:${phoneNumber}`;
            } else {
                alert("Phone number not available.");
            }
        });
    });
}

// Event listeners for popup functionality
document.getElementById('findHospitalsBtn').addEventListener('click', function() {
    document.getElementById('popup').classList.remove('hidden');
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').classList.add('hidden');
});

// Initialize the map when the window loads
window.onload = initMap;
