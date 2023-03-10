const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'chatapp';

function connect(callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log('Error connecting to MongoDB:', err);
    } else {
      console.log('Connected to MongoDB');
      const db = client.db(dbName);
      callback(db);
    }
  });
}

function insertMessage(message) {
  connect((db) => {
    const collection = db.collection('messages');
    collection.insertOne(message, (err, result) => {
      if (err) {
        console.log('Error inserting message:', err);
      } else {
        console.log('Message inserted:', result.ops[0]);
      }
    });
  });
}

function getMessages(callback) {
  connect((db) => {
    const collection = db.collection('messages');
    collection.find().toArray((err, messages) => {
      if (err) {
        console.log('Error getting messages:', err);
      } else {
        console.log('Messages retrieved:', messages);
        callback(messages);
      }
    });
  });
}

module.exports = {
  insertMessage,
  getMessages,
};