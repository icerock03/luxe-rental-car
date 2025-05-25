document.addEventListener('DOMContentLoaded', async () => {
  const vehicleSelect = document.getElementById('vehicle_id');
  const message = document.getElementById('message');

  // Charger les véhicules dans la liste déroulante
  try {
    const res = await fetch('https://luxe-rental-car-backend.onrender.com/api/vehicles');
    const vehicles = await res.json();

    vehicles.forEach(vehicle => {
      const option = document.createElement('option');
      option.value = vehicle.id;
      option.textContent = `${vehicle.name} - ${vehicle.brand}`;
      vehicleSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Erreur chargement véhicules:', err);
    message.textContent = 'Erreur lors du chargement des véhicules.';
    message.style.color = 'red';
  }

  // Gestion du formulaire
  document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customer_name = document.getElementById('customer_name').value;
    const vehicle_id = document.getElementById('vehicle_id').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;

    if (!vehicle_id || !customer_name || !start_date || !end_date) {
      message.textContent = '🚨 Tous les champs sont obligatoires.';
      message.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('https://luxe-rental-car-backend.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicle_id, customer_name, start_date, end_date })
      });

      const result = await response.json();

      if (response.ok) {
        message.style.color = 'lightgreen';
        message.textContent = '✅ Réservation enregistrée avec succès.';
      } else {
        message.style.color = 'red';
        message.textContent = result.error || 'Erreur de réservation.';
      }

    } catch (error) {
      console.error(error);
      message.style.color = 'red';
      message.textContent = 'Erreur serveur.';
    }
  });
});
