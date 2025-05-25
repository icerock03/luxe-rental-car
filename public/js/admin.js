document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addVehicleForm');
  const listContainer = document.getElementById('vehicleList');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch('/api/vehicles', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          form.reset();
          loadVehicles();
        } else {
          alert(result.error || 'Erreur lors de l’ajout');
        }
      } catch (err) {
        console.error('Erreur ajout véhicule', err);
        alert('Erreur serveur');
      }
    });
  }

  async function loadVehicles() {
    try {
      const res = await fetch('/api/vehicles');
      const vehicles = await res.json();
      listContainer.innerHTML = '';

      vehicles.forEach((vehicle) => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
          <h3>${vehicle.name}</h3>
          <img src="/upload/${vehicle.image}" alt="${vehicle.name}" width="200" />
          <p>Marque : ${vehicle.brand}</p>
          <p>Prix : ${vehicle.price_per_day} DH</p>
          <button onclick="deleteVehicle(${vehicle.id})">🗑 Supprimer</button>
        `;
        listContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Erreur chargement véhicules', err);
    }
  }

  window.deleteVehicle = async function (id) {
    if (!confirm('Supprimer ce véhicule ?')) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message);
      loadVehicles();
    } catch (err) {
      console.error('Erreur suppression', err);
    }
  };

  window.logout = function () {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
  };

  // Charger la liste au démarrage
  loadVehicles();
});
