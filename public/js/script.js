document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/vehicles')
    .then(response => response.json())
    .then(vehicles => {
      const container = document.getElementById('vehicles-container');
      container.innerHTML = '';

      vehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.classList.add('vehicle-card');

        const img = document.createElement('img');
        img.src = `/upload/${vehicle.image}`;
        img.alt = vehicle.name;

        const title = document.createElement('h3');
        title.textContent = vehicle.name;

        const brand = document.createElement('p');
        brand.textContent = `Marque : ${vehicle.brand}`;

        const price = document.createElement('p');
        price.textContent = `Prix : ${vehicle.price_per_day} DH`;

        const reserveBtn = document.createElement('a');
        reserveBtn.textContent = 'Réserver';
        reserveBtn.href = `booking.html?vehicle=${vehicle.id}`;
        reserveBtn.classList.add('reserve-button');

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(brand);
        card.appendChild(price);
        card.appendChild(reserveBtn);

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des véhicules', error);
    });
});

