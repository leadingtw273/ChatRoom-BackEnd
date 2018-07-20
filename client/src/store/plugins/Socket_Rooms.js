import * as types from '../mutations_type';

const socketPlugin = socket => store => {
  socket.on('rooms', data => {
    store.commit(`${[types.pullRooms]}`, data);
  });

  store.subscribe(mutation => {
    if (mutation.type === `${[types.openRoomSocket]}`) {
      socket.open();
    } else if (mutation.type === `${[types.closeRoomSocket]}`) {
      socket.close();
    } else if (mutation.type === `${[types.newRoom]}`) {
      socket.emit('setRoom', mutation.payload);
    }
  });
};

export default socketPlugin;
