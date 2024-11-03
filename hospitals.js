document.addEventListener('DOMContentLoaded', () => {
    const hospitalsList = JSON.parse(localStorage.getItem('hospitals')) || [];
    displayHospitals(hospitalsList);
});

function displayHospitals(hospitals) {
    const hospitalsListElement = document.getElementById('hospitalsList');
    hospitalsListElement.innerHTML = '<h2>Nearby Hospitals</h2>';

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
        hospitalsListElement.appendChild(hospitalDiv);
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
