const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button[type="submit"]');
const messageLog = document.querySelector('.message-log');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const messages = messageLog.querySelectorAll('.message');
  for (const message of messages) {
    const username = message.querySelector('.username').textContent.toLowerCase();
    const text = message.querySelector('.message-body p').textContent.toLowerCase();
    if (username.includes(searchTerm) || text.includes(searchTerm)) {
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  }
});