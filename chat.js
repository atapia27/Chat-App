const chatLog = document.querySelector('.chat-log');
const messageField = document.querySelector('.message-field');
const messageInput = document.querySelector('input[type="text"]');
const sendButton = document.querySelector('button[type="submit"]');

const user = sessionStorage.getItem('user');

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
  socket.send(JSON.stringify({ type: 'join', user }));
});

socket.addEventListener('message', (event) => {
  console.log('Message received:', event.data);
  const message = JSON.parse(event.data);
  if (message.type === 'chat') {
    displayMessage(message);
  } else if (message.type === 'users') {
    updateUsers(message.users);
  }
});

socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed');
});

sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  const text = messageInput.value;
  if (text.trim() !== '') {
    const message = { type: 'chat', user, text };
    socket.send(JSON.stringify(message));
    displayMessage(message);
    messageInput.value = '';
    insertMessage(message); // Add this line to insert message into database
  }
});

function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (message.user === user) {
    messageElement.classList.add('own-message');
  }
  messageElement.innerHTML = `
    <div class="message-header">
      <span class="username">${message.user}</span>
      <span class="time">${new Date().toLocaleTimeString()}</span>
    </div>
    <div class="message-body">
      <p>${message.text}</p>
    </div>
  `;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function updateUsers(users) {
  const userList = document.createElement('ul');
  for (const user of users) {
    const userItem = document.createElement('li');
    userItem.textContent = user;
    userList.appendChild(userItem);
  }
  const onlineUsers = document.querySelector('.online-users');
  onlineUsers.innerHTML = '';
  onlineUsers.appendChild(userList);
}