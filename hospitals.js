function displayHospitals(hospitals) {
    const hospitalsList = document.getElementById('hospitalsList');
    hospitalsList.innerHTML = ''; // Clear previous entries

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
            <button class="infoBtn" onclick="openHospitalInfo('${hospital.website || `https://www.google.com/maps/search/?api=1&query=${hospital.display_name}`}')">Info</button>
        `;
        hospitalsList.appendChild(hospitalDiv);
    });
}

function openHospitalInfo(url) {
    window.open(url, '_blank'); // Open in a new tab
}
