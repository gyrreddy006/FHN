document.addEventListener("DOMContentLoaded", () => {
    const hospitalList = document.getElementById("hospitalList");
    const hospitals = JSON.parse(sessionStorage.getItem("hospitals"));

    if (hospitals && hospitals.length > 0) {
        hospitals.forEach(hospital => {
            // Generate a random cost range
            const costRange = ["$", "$$", "$$$"][Math.floor(Math.random() * 3)];

            const hospitalItem = document.createElement("div");
            hospitalItem.className = "hospital-item";
            hospitalItem.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="Hospital Image">
                <div>
                    <p><strong>${hospital.name}</strong></p>
                    <p>${hospital.address}</p>
                    <p>Cost: <strong>${costRange}</strong></p>
                    <button onclick="makeCall('${hospital.phone}')">Call Now</button>
                </div>
            `;
            hospitalList.appendChild(hospitalItem);
        });
    } else {
        hospitalList.innerHTML = "<p>No nearby hospitals found.</p>";
    }
});

function makeCall(phoneNumber) {
    if (phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        alert("Phone number not available.");
    }
}
