// This JavaScript file will handle fetching and displaying hospitals on the hospitals page
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

// You may want to call a function to fetch hospitals data on page load
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lng = urlParams.get('lng');

    if (lat && lng) {
        fetch(`https://us1.locationiq.com/v1/nearby.php?key=YOUR_API_KEY&lat=${lat}&lon=${lng}&tag=hospital&radius=5000&format=json`)
            .then(response => response.json())
            .then(data => displayHospitals(data))
            .catch(error => console.error('Error fetching hospitals:', error));
    }
};
