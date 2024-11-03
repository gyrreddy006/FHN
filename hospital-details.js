document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');

    const hospitalsList = JSON.parse(localStorage.getItem('hospitals')) || [];
    const hospital = hospitalsList.find(h => h.id === hospitalId);

    displayHospitalDetails(hospital);
});

function displayHospitalDetails(hospital) {
    const hospitalDetailsElement = document.getElementById('hospitalDetails');
    
    if (hospital) {
        hospitalDetailsElement.innerHTML = `
            <h2>${hospital.display_name}</h2>
            <p>Address: ${hospital.display_name}</p>
            <p>Rating: ${hospital.rating || 'N/A'}</p>
            <p>Cost Range: ${hospital.cost || 'N/A'}</p>
            <p>Phone: ${hospital.phone || 'N/A'}</p>
        `;
    } else {
        hospitalDetailsElement.innerHTML = `<p>Hospital not found.</p>`;
    }
}
