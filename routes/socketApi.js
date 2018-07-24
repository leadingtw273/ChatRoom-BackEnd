const socketApi = io => {

  const express = require('express');
  const router = express.Router();

  const fireDB = require('../models/firebaseDB');

  io.on('connection', socket => {

    // 房間獲取
    socket.on('getRooms', () => {
      console.log('getRooms');
      fireDB.readRooms()
        .then(data => socket.emit('rooms', data))
        .catch(err => console.log(err));
    });
    socket.on('setRoom', data => {
      console.log('setRoom');
      fireDB.addRoom(data)
        .then(() => socket.broadcast.emit('pushRoom', data))
        .catch(err => console.log(err));
    });

    // 訊息獲取
    socket.on('getMessage', data => {
      console.log('getMessage');
      fireDB.readMsg(data)
        .then(data => socket.emit('messages', data))
        .catch(err => console.log(err));
    });
    socket.on('setMessage', data => {
      console.log('setMessage');
      fireDB.addMsg(data)
        .then(() => socket.broadcast.emit('pushMessage', data.message))
        .catch(err => console.log(err));
    });

    socket.on('disconnect', () => {

    });
  });

  return router;

};

module.exports = socketApi; 