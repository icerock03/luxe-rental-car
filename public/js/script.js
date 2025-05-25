
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('vehicles-container');

  try {
    const response = await fetch('https://luxe-rental-car-backend.onrender.com/api/vehicles');
    const vehicles = await response.json();

    vehicles.forEach(vehicle => {
      const card = document.createElement('div');
      card.classList.add('vehicle-card');

      const img = document.createElement('img');
      img.src = `https://luxe-rental-car-backend.onrender.com/upload/${vehicle.image}`;
      img.alt = vehicle.name;
      img.classList.add('vehicle-image'); // pour le style

      const name = document.createElement('h3');
      name.textContent = vehicle.name;

      const brand = document.createElement('p');
      brand.textContent = `Marque : ${vehicle.brand}`;

      const price = document.createElement('p');
      price.textContent = `Prix : ${vehicle.price_per_day} DH`;

      const button = document.createElement('a');
      button.href = `booking.html?vehicle=${vehicle.id}`;
      button.textContent = 'Réserver';
      button.classList.add('btn');

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(brand);
      card.appendChild(price);
      card.appendChild(button);

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des véhicules :', error);
    container.innerHTML = `<p style="color:red">Erreur de chargement des véhicules.</p>`;
  }
});

