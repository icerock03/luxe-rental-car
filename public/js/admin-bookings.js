// ✅ Protection de la page admin
if (sessionStorage.getItem("isAdmin") !== "true") {
  window.location.href = "login.html";
}

// ✅ Fonction pour récupérer les réservations
async function fetchBookings() {
  try {
    const response = await fetch('/api/bookings');
    const bookings = await response.json();

    const tableBody = document.querySelector('#bookingsTable tbody');
    tableBody.innerHTML = '';

    bookings.forEach((booking) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${booking.id}</td>
        <td>${booking.customer_name || 'N/A'}</td>
        <td>${booking.vehicle_name || booking.vehicle_id}</td>
        <td>${new Date(booking.start_date).toLocaleDateString()}</td>
        <td>${new Date(booking.end_date).toLocaleDateString()}</td>
        <td><button onclick="deleteBooking(${booking.id})">🗑️ Supprimer</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Erreur lors du chargement des réservations', err);
  }
}

// ✅ Fonction pour supprimer une réservation
async function deleteBooking(id) {
  if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

  try {
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Réservation supprimée avec succès !");
      fetchBookings(); // Recharge la liste
    } else {
      alert("Erreur lors de la suppression");
    }
  } catch (err) {
    console.error("Erreur de suppression :", err);
    alert("Erreur serveur");
  }
}

// ✅ Fonction de déconnexion
function logout() {
  sessionStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

// 🔁 Chargement initial
fetchBookings();
