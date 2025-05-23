document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('vehicles-container');

  try {
    const response = await fetch('/api/vehicles');
    const vehicles = await response.json();

    if (vehicles.length === 0) {
      container.innerHTML = "<p>Aucun véhicule disponible pour le moment.</p>";
      return;
    }

    vehicles.forEach(vehicle => {
      const vehicleCard = document.createElement('div');
      vehicleCard.classList.add('vehicle-card');

      vehicleCard.innerHTML = `
        <img src="/upload/${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
        <h3>${vehicle.name}</h3>
        <p>Marque : ${vehicle.brand}</p>
        <p>Prix par jour : ${vehicle.price_per_day} DH</p>
        <a href="booking.html?vehicle=${vehicle.id}" class="btn">Réserver</a>
      `;

      container.appendChild(vehicleCard);
    });
  } catch (err) {
    container.innerHTML = "<p>Erreur de chargement des véhicules.</p>";
    console.error('Erreur :', err);
  }
});
