const express = require("express");
const router = express.Router();
const fireDB = require("../models/firebaseDB");

const roomInfo = {};

const socketApi = io => {
  io.on("connection", socket => {

    const url = socket.request.headers.referer;
    const splited = url.split('/');
    const roomID = splited[splited.length - 1];   // 获取房间ID
    let user = '';


    socket.on('join', (userName) => {
      user = userName;

      if (!roomInfo[roomID]) {
        roomInfo[roomID] = [];
      }
      roomInfo[roomID].push(user);

      socket.join(roomID);
      io.to(roomID).emit('system', `${user} 加入房間`);
      fireDB
        .readMsg(roomID)
        .then(msg => {
          socket.emit("messages", msg);
        })
        .catch(err => console.log(err));
      console.log('**************************************');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log(`${user} 加入房間`);
      console.log('**************************************');
    });

    socket.on('leave', () => {
      const index = roomInfo[roomID].indexOf(user);
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1);
      }

      socket.leave(roomID);
      io.to(roomID).emit('system', `${user} 退出房間`);
      console.log('**************************************');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log(`${user} 退出房間`);
      console.log('**************************************');
    });

    socket.on("getMessage", () => {
      console.log('-------------------------------------------------------------------');
      console.log('EVENT: getMessage');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log('-------------------------------------------------------------------');
      
      fireDB
        .readMsg(roomID)
        .then(msg => {
          socket.emit("messages", msg);
        })
        .catch(err => console.log(err));
    });

    socket.on("setMessage", (data) => {
      console.log('-------------------------------------------------------------------');
      console.log('EVENT: setMessage');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log('DATA: ', data);
      console.log('-------------------------------------------------------------------');
      
      fireDB
        .addMsg(roomID,data)
        .then(message => {
          io.to(roomID).emit("pushMessage", message);
        })
        .catch(err => console.log(err));
    });

    socket.on("disconnect", () => {});
  });

  return router;
};

module.exports = socketApi;
