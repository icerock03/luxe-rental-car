document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('vehicles-container');

  try {
    const response = await fetch('/api/vehicles');
    const vehicles = await response.json();

    if (!Array.isArray(vehicles)) {
      container.innerHTML = '<p>Aucune voiture disponible.</p>';
      return;
    }

    container.innerHTML = vehicles.map(vehicle => `
      <div class="vehicle-card">
        <img src="/upload/${vehicle.image}" alt="${vehicle.name}" />
        <h2>${vehicle.name}</h2>
        <p>Marque : ${vehicle.brand}</p>
        <p>Prix : ${vehicle.price_per_day} DH</p>
        <a href="booking.html?vehicle=${vehicle.id}" class="btn">Réserver</a>
      </div>
    `).join('');
  } catch (error) {
    console.error("Erreur lors de l'affichage des véhicules :", error);
    container.innerHTML = '<p>Erreur de chargement des véhicules.</p>';
  }
});

