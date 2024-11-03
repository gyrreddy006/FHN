const apiKey = "pk.eccaf37675a2250712865ac32e979be2"; // Replace with your LocationIQ API key

function fetchNearbyHospitals(lat, lng) {
    const endpoint = `https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            displayHospitals(data);
        })
        .catch(error => {
            console.error("Error fetching nearby hospitals:", error);
            alert("Failed to fetch nearby hospitals.");
        });
}

function displayHospitals(hospitals) {
    const hospitalList = document.getElementById("hospitalList");
    hospitalList.innerHTML = ""; // Clear previous results

    hospitals.forEach(hospital => {
        const hospitalItem = document.createElement("div");
        hospitalItem.classList.add("hospital-item");

        hospitalItem.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="${hospital.name}"> <!-- Placeholder image, replace with actual URL if available -->
            <div>
                <h3>${hospital.name}</h3>
                <p>${hospital.address}</p>
                <p>Cost Range: $${Math.floor(Math.random() * 300) + 50} - $${Math.floor(Math.random() * 200) + 100}</p> <!-- Random cost range for example -->
                <button onclick="makeCall('${hospital.phone}')">Call Now</button>
            </div>
        `;

        hospitalList.appendChild(hospitalItem);
    });
}

function makeCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// Example function to initiate fetching from geolocation
function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            fetchNearbyHospitals(userLocation.lat, userLocation.lng);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Call the init function to start fetching hospitals when the page loads
window.onload = init;
