// JavaScript for fetching and displaying hospitals on the hospitals page

function displayHospitals(hospitals) {
    const hospitalsList = document.getElementById('hospitalsList');
    hospitalsList.innerHTML = ''; // Clear existing hospitals

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
        hospitalsList.appendChild(hospitalDiv);
    });

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

// Fetch hospitals based on latitude and longitude from URL parameters
function fetchHospitalsData(lat, lng) {
    const apiKey = 'pk.eccaf37675a2250712865ac32e979be2';

    fetch(`https://us1.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`)
        .then(response => response.json())
        .then(data => displayHospitals(data.slice(0, 5))) // Limit to 5 hospitals for better UX
        .catch(error => {
            console.error('Error fetching hospitals:', error);
            document.getElementById('hospitalsList').innerHTML = "<p>Error fetching hospitals. Please try again later.</p>";
        });
}

// On page load, get location parameters and fetch hospitals
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lng = urlParams.get('lng');

    if (lat && lng) {
        fetchHospitalsData(lat, lng);
    } else {
        document.getElementById('hospitalsList').innerHTML = "<p>Location not provided.</p>";
    }
};
