document.addEventListener('DOMContentLoaded', async () => {
  const vehiclesContainer = document.getElementById('vehicles-container');

  try {
    const response = await fetch('/api/vehicles');
    const vehicles = await response.json();

    vehicles.forEach(vehicle => {
      const card = document.createElement('div');
      card.classList.add('vehicle-card');

      const img = document.createElement('img');
      img.src = `/upload/${vehicle.image}`;
      img.alt = vehicle.name;
      img.classList.add('vehicle-image');

      const name = document.createElement('h2');
      name.textContent = vehicle.name;

      const brand = document.createElement('p');
      brand.textContent = `Marque : ${vehicle.brand}`;

      const price = document.createElement('p');
      price.textContent = `Prix : ${vehicle.price_per_day} MAD / jour`;

      const button = document.createElement('a');
      button.href = `booking.html?vehicle=${vehicle.id}`;
      button.textContent = 'Réserver';
      button.classList.add('btn');

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(brand);
      card.appendChild(price);
      card.appendChild(button);

      vehiclesContainer.appendChild(card);
    });

  } catch (err) {
    console.error('Erreur lors du chargement des véhicules', err);
    vehiclesContainer.innerHTML = '<p>Erreur de chargement des véhicules.</p>';
  }
});
