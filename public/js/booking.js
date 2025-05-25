document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('reservationForm');
  const vehicleSelect = document.getElementById('vehicle_id');
  const message = document.getElementById('bookingMessage');

  // ✅ Charger les véhicules dans la liste déroulante
  try {
    const res = await fetch('/api/vehicles');
    const vehicles = await res.json();

    vehicles.forEach(vehicle => {
      const option = document.createElement('option');
      option.value = vehicle.id;
      option.textContent = `${vehicle.name} (${vehicle.brand})`;
      vehicleSelect.appendChild(option);
    });

    // ✅ Pré-remplir si un ID est passé dans l'URL
    const params = new URLSearchParams(window.location.search);
    const vehicleIdFromURL = params.get('vehicle');
    if (vehicleIdFromURL) {
      vehicleSelect.value = vehicleIdFromURL;
    }

  } catch (err) {
    console.error("Erreur chargement véhicules :", err);
  }

  // ✅ Soumission de la réservation
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      customer_name: document.getElementById('customer_name').value,
      vehicle_id: vehicleSelect.value,
      start_date: document.getElementById('start_date').value,
      end_date: document.getElementById('end_date').value,
    };

    if (!data.customer_name || !data.vehicle_id || !data.start_date || !data.end_date) {
      message.style.color = 'red';
      message.textContent = 'Tous les champs sont obligatoires.';
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        message.style.color = 'green';
        message.textContent = result.message;
        form.reset();
      } else {
        message.style.color = 'red';
        message.textContent = result.error || 'Erreur';
      }

    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      message.style.color = 'red';
      message.textContent = 'Erreur de connexion au serveur.';
    }
  });
});
