// import vue from 'vue';
import * as types from './mutations_type';

const mutations = {
  [types.pushMessage](state, payload) {
    const target = state.history.find(msg => {
      return msg.id === payload.roomid;
    }).messages;
    const data = {
      id: target.length,
      message: payload.message,
      user: payload.user
    };

    target.push(data);
  },
  [types.setRoomId](state, payload) {
    state.roomid = payload;
  },
  [types.setUser](state, payload) {
    state.user = payload;
  },
  [types.createRoom](state, payload) {
    const target = state.chatrooms;
    const data = {
      roomname: payload.roomname,
      creatuser: payload.creatuser,
      id: target.length,
    };

    target.push(data);
  },
  [types.createMessage](state, payload) {
    const target = state.history;
    const data = {
      id: target.length,
      messages: [
        {
          id: 0,
          user: 'SYSTEM_MESSAGE',
          message: `Room '${payload.roomname}' create by '${payload.creatuser}'`
        }
      ]
    };

    target.push(data);
  },
};

export default mutations;
