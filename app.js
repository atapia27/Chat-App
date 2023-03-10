const username = document.getElementById('username');
const chatForm = document.querySelector('form');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = username.value;
  sessionStorage.setItem('user', user);
  window.location.href = 'chat.html';
});

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
});

socket.addEventListener('message', (event) => {
  console.log('Message received:', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed');
});