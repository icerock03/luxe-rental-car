document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('vehicle_id');
  const form = document.getElementById('reservationForm');
  const message = document.getElementById('message');

  try {
    const response = await fetch('/api/vehicles');
    const vehicles = await response.json();

    vehicles.forEach(vehicle => {
      const option = document.createElement('option');
      option.value = vehicle.id;
      option.textContent = `${vehicle.name} (${vehicle.brand})`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur chargement véhicules:', error);
    message.textContent = "Erreur de chargement des véhicules.";
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      vehicle_id: select.value,
      start_date: document.getElementById('start_date').value,
      end_date: document.getElementById('end_date').value
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        message.textContent = result.message;
        message.style.color = 'green';
        form.reset();
      } else {
        message.textContent = result.error || 'Erreur de réservation.';
        message.style.color = 'red';
      }
    } catch (error) {
      console.error('Erreur réservation:', error);
      message.textContent = "Erreur lors de l'envoi de la réservation.";
      message.style.color = 'red';
    }
  });
});
