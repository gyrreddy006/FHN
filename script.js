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
            displayHospitalsPopup(data.slice(0, 3)); // Limit to 3 hospitals
        })
        .catch(error => {
            console.error("Error fetching nearby hospitals:", error);
            alert("Failed to fetch nearby hospitals.");
        });
}

function displayHospitalsPopup(hospitals) {
    const popup = document.getElementById("hospitalPopup");
    const popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = "<h2>Nearby Hospitals</h2>";
    hospitals.forEach(hospital => {
        const hospitalItem = document.createElement("div");
        hospitalItem.className = "hospital-item";
        hospitalItem.innerHTML = `
            <p><strong>${hospital.name}</strong></p>
            <p>${hospital.address}</p>
            <button onclick="makeCall('${hospital.phone}')">Call Now</button>
        `;
        popupContent.appendChild(hospitalItem);
    });

    popup.style.display = "block";
}

function makeCall(phoneNumber) {
    if (phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        alert("Phone number not available.");
    }
}

// Close popup when clicking outside it or on the close button
document.getElementById("popupClose").addEventListener("click", () => {
    document.getElementById("hospitalPopup").style.display = "none";
});
window.addEventListener("click", (event) => {
    const popup = document.getElementById("hospitalPopup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
