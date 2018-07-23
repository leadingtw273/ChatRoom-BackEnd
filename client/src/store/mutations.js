// import vue from 'vue';
import * as types from './mutations_type';

const mutations = {
  [types.commitUser](state, payload) {
    state.user = payload;
  },
  [types.pullMessages](state, payload) {
    state.chatrooms[payload.id].messages = payload.data;
  },
  [types.newMessage](state, payload) {
    const target = state.history.find(msg => msg.id === payload.roomid).messages;
    const data = {
      id: target.length,
      message: payload.message,
      user: payload.user
    };

    target.push(data);
  },
  [types.pullRooms](state, payload) {
    payload.forEach(element => {
      element.messages = [];
    });
    state.chatrooms = payload;
  },
  [types.newRoom](state, payload) {
    state.chatrooms.push(payload);
  },
  [types.openRoomSocket]() { },
  [types.closeRoomSocket]() { },
};

export default mutations;
