document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vehicleForm');
  const message = document.getElementById('formMessage');
  const vehicleList = document.getElementById('vehicleList');

  const loadVehicles = async () => {
    vehicleList.innerHTML = '';
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();

      data.forEach(v => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
          <img src="/upload/${v.image}" alt="${v.name}" class="vehicle-image">
          <h3>${v.name}</h3>
          <p>Marque : ${v.brand}</p>
          <p>Prix : ${v.price_per_day} DH</p>
          <button data-id="${v.id}" class="delete-btn">🗑 Supprimer</button>
        `;
        vehicleList.appendChild(card);
      });
    } catch (err) {
      vehicleList.innerHTML = "<p>Erreur de chargement des véhicules.</p>";
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (res.ok) {
        message.textContent = result.message;
        message.style.color = 'green';
        form.reset();
        loadVehicles();
      } else {
        message.textContent = result.error;
        message.style.color = 'red';
      }
    } catch (err) {
      message.textContent = "Erreur lors de l'ajout du véhicule.";
      message.style.color = 'red';
    }
  });

  vehicleList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.getAttribute('data-id');
      if (confirm("Supprimer ce véhicule ?")) {
        try {
          const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
          const result = await res.json();
          alert(result.message);
          loadVehicles();
        } catch (err) {
          alert("Erreur lors de la suppression.");
        }
      }
    }
  });

  loadVehicles();
});
