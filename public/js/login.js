document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('loginMessage');
if (res.ok) {
  message.style.color = 'green';
  message.textContent = data.message;

  // ✅ Marquer l'utilisateur comme connecté
  sessionStorage.setItem('isAdmin', 'true');

  // Redirection vers admin
  window.location.href = 'admin.html';
}

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    
  } catch (error) {
    message.style.color = 'red';
    message.textContent = "Erreur de connexion au serveur.";
  }
});
