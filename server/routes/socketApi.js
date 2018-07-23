const socketApi = io => {

  const express = require('express');
  const router = express.Router();

  const admin = require('firebase-admin');
  const db = admin.firestore().collection('chatroom');

  io.on('connection', socket => {

    // 房間獲取
    socket.on('getRooms', () => {
      console.log('getRooms');
      let data = [];
      db.onSnapshot(snapshot => {
        snapshot.forEach((doc) => data.push(doc.data()));
        socket.emit('rooms', data);
        data = [];
      });
    });
    socket.on('setRoom', data => {
      console.log('setRoom');
      db.add(data);
    });

    // 訊息獲取
    socket.on('getMessage', data => {
      console.log('getMessage');
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
      console.log('setMessage');
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

    });
  });

  return router;

};

module.exports = socketApi; 