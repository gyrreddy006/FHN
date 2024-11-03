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
            <button class="moreBtn" data-hospital-id="${hospital.id}">More</button>
        `;
        hospitalsListElement.appendChild(hospitalDiv);
    });

    attachMoreButtons();
}

function attachMoreButtons() {
    const moreButtons = document.querySelectorAll('.moreBtn');
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hospitalId = button.getAttribute('data-hospital-id');
            // Redirect to the hospital detail page
            window.location.href = `hospital-details.html?id=${hospitalId}`; // Replace with your actual hospital detail page
        });
    });
}
