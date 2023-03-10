const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/chat.html') {
    fs.readFile('chat.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading chat.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/history.html') {
    fs.readFile('history.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading history.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/style.css') {
    fs.readFile('style.css', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading style.css');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (req.url === '/app.js') {
    fs.readFile('app.js', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading app.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else if (req.url === '/chat.js') {
    fs.readFile('chat.js', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading chat.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else if (req.url === '/history.js') {
    fs.readFile('history.js', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading history.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else if (req.url === '/logout.js') {
    fs.readFile('logout.js', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading logout.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

const wss = new WebSocket.Server({ port: 3000 });

const users = new Set();

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  ws.on('message', (message) => {
    console.log('Message received:', message);
    const data = JSON.parse(message);
    if (data.type === 'join') {
      users.add(data.user);
      broadcastUsers();
    } else if (data.type === 'chat') {
      broadcastMessage(data);
    }
  });
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    broadcastUsers();
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastUsers() {
  const userArray = Array.from(users);
  const message = { type: 'users', users: userArray };
  broadcastMessage(message);
}

server.listen(3000, () => {
  console.log('Server running on port 3000');
});