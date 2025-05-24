document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        message.style.color = 'green';
        message.textContent = data.message;
        sessionStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin.html';
      } else {
        message.style.color = 'red';
        message.textContent = data.error || 'Identifiants incorrects';
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      message.style.color = 'red';
      message.textContent = 'Erreur de connexion au serveur.';
    }
  });
});
