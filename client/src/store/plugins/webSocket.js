const createWebSocketPlugin = socket => store => {
  socket.on('data', data => {
    // store.commit('receiveData', data);
    console.log(data);
  });

  store.subscribe(mutation => {
    if (mutation.type === 'UPDATE_DATA') {
      // socket.emit('update', mutation.payload);
    }
  });
};

export default createWebSocketPlugin;
