const logoutButton = document.querySelector('a[href="logout.html"]');

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.removeItem('user');
  window.location.href = 'index.html';
});