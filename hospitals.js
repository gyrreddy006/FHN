document.addEventListener('DOMContentLoaded', () => {
    const hospitalList = document.getElementById('hospitalList');
    const apiKey = 'pk.eccaf37675a2250712865ac32e979be2'; // Your LocationIQ API key
    const userLocation = JSON.parse(localStorage.getItem('userLocation')); // Assuming you store user's location

    if (userLocation) {
        findNearbyHospitals(userLocation.lat, userLocation.lng);
    } else {
        hospitalList.innerHTML = '<p>Error: No location data available.</p>';
    }

    function findNearbyHospitals(lat, lng) {
        fetch(`https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`)
            .then(response => response.json())
            .then(data => {
                displayHospitals(data);
            })
            .catch(error => {
                console.error('Error fetching hospitals:', error);
                hospitalList.innerHTML = '<p>Could not retrieve hospital data. Please try again later.</p>';
            });
    }

    function displayHospitals(hospitals) {
        if (hospitals.length === 0) {
            hospitalList.innerHTML = '<p>No hospitals found nearby.</p>';
            return;
        }

        hospitals.forEach(hospital => {
            const hospitalDiv = document.createElement('div');
            hospitalDiv.classList.add('hospital');
            hospitalDiv.innerHTML = `
                <h3>${hospital.display_name}</h3>
                <p>Address: ${hospital.display_name}</p>
                <p>Rating: ${hospital.rating || 'N/A'}</p>
                <p>Cost Range: ${hospital.cost || 'N/A'}</p>
                <button class="callBtn" data-number="${hospital.phone || 'N/A'}">Call</button>
            `;
            hospitalList.appendChild(hospitalDiv);
        });

        attachCallButtons();
    }

    function attachCallButtons() {
        const callButtons = document.querySelectorAll('.callBtn');
        callButtons.forEach(button => {
            button.addEventListener('click', function() {
                const phoneNumber = button.getAttribute('data-number');
                if (phoneNumber !== 'N/A') {
                    const sanitizedNumber = phoneNumber.replace(/[^0-9]/g, ''); // Sanitize phone number
                    window.location.href = `tel:${sanitizedNumber}`;
                } else {
                    alert("Phone number not available.");
                }
            });
        });
    }

    // Back button functionality
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
});
