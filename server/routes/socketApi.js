const socketApi = io => {

  const express = require('express');
  const router = express.Router();
  const admin = require('firebase-admin');

  let db = admin.firestore().collection('chatroom');

  io.on('connection', socket => {
    console.log(`${socket.id} connect~`);

    let data = [];
    db.onSnapshot(snapshot => {
      snapshot.forEach((doc) => data.push(doc.data()));
      socket.emit('rooms', data);
      data = [];
    });

    socket.on('setRoom', data => {
      db.add(data);
    });

    socket.on('getMessage', data => {
      let read = [];
      db.where('id', '==', data.id).get()
        .then(snapshot => {
          let id = 0;
          snapshot.forEach(doc => id = doc.id);
          return id;
        })
        .then(id => {
          db.doc(id).collection('messages').onSnapshot(snapshot => {
            snapshot.forEach(doc => read.push(doc.data()));
            socket.emit('messages', read);
            read = [];
          });
        })
        .catch(err => {
          return err;
        });
    });

    socket.on('setMessage', data => {
      db.where('id', '==', data.roomId).get()
        .then(snapshot => {
          let id = 0;
          snapshot.forEach(doc => id = doc.id);
          return id;
        })
        .then(id => db.doc(id).collection('messages').add(data.message))
        .catch(err => {
          return err;
        });
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnect~`);
    });

  });

  return router;

};

module.exports = socketApi; 