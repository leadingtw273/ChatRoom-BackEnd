const socketApi = io => {

  const express = require('express');
  const router = express.Router();
  const db = require('../models/firebaseDB');

  /* GET home page. */
  router.get('/', function (req, res) {
    res.send('test');
  });

  router.get('/rooms', (req, res) => {
    db.readRooms().then(read => res.send(read));
  });

  router.get('/rooms/:roomId', (req, res) => {
    db.readRoom(Number(req.params.roomId)).then(read => res.send(read));
  });

  router.get('/rooms/:roomId/messages', (req, res) => {
    db.readMsg(Number(req.params.roomId)).then(read => res.send(read));
  });

  router.post('/rooms', (req, res) => {
    db.addRoom(req.body)
      .then(id => res.send({ state: true, id }))
      .catch(err => res.send({ state: false, err }));
  });

  router.post('/rooms/:roomId/messages', (req, res) => {
    db.addMsg(Number(req.params.roomId), req.body)
      .then(id => res.send({ state: true, id }))
      .catch(err => res.send({ state: false, err }));
  });

  io.on('connection', socket => {

    setTimeout(() => {
      socket.emit('data', 'socket');
    }, 3000);

    socket.on('disconnect', () => {
      console.log('a user go out');
    });

  });

  return router;

};

module.exports = socketApi; 