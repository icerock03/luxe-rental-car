document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('vehicle');

  document.getElementById('vehicle_id').value = vehicleId;

  document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customer_name = document.getElementById('customer_name').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;

    if (!vehicleId || !customer_name || !start_date || !end_date) {
      document.getElementById('message').textContent = '🚨 Tous les champs sont obligatoires.';
      return;
    }

    try {
      const response = await fetch('https://luxe-rental-car-backend.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicle_id: vehicleId, customer_name, start_date, end_date })
      });

      const result = await response.json();
      const msg = document.getElementById('message');

      if (response.ok) {
        msg.style.color = 'lightgreen';
        msg.textContent = '✅ Réservation confirmée !';
      } else {
        msg.style.color = 'red';
        msg.textContent = result.error || '❌ Erreur lors de la réservation.';
      }

    } catch (error) {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').textContent = '❌ Erreur serveur.';
      console.error(error);
    }
  });
});
