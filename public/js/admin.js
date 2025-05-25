document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addVehicleForm");
  const message = document.getElementById("adminMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        message.style.color = "green";
        message.textContent = data.message;
        form.reset();
        fetchVehicles(); // rafraîchir la liste
      } else {
        message.style.color = "red";
        message.textContent = data.error || "Erreur";
      }
    } catch (err) {
      console.error("Erreur ajout véhicule :", err);
      message.style.color = "red";
      message.textContent = "Erreur de connexion au serveur.";
    }
  });

  // Liste les véhicules
  async function fetchVehicles() {
    try {
      const response = await fetch("/api/vehicles");
      const vehicles = await response.json();

      const container = document.getElementById("vehicleList");
      container.innerHTML = "";

      vehicles.forEach((v) => {
        const div = document.createElement("div");
        div.classList.add("vehicle-card");

        div.innerHTML = `
          <img src="/upload/${v.image}" alt="${v.name}" />
          <h3>${v.name}</h3>
          <p>Marque : ${v.brand}</p>
          <p>Prix : ${v.price_per_day} DH</p>
          <button onclick="deleteVehicle(${v.id})">🗑 Supprimer</button>
        `;

        container.appendChild(div);
      });
    } catch (err) {
      console.error("Erreur affichage véhicules admin :", err);
    }
  }

  window.deleteVehicle = async function (id) {
    if (!confirm("Supprimer ce véhicule ?")) return;

    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      fetchVehicles();
    } catch (err) {
      console.error("Erreur suppression véhicule :", err);
    }
  };

  fetchVehicles(); // au chargement
});

