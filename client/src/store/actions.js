// import vue from 'vue';
// import mutations from './mutations';
import * as types from './mutations_type';

export default {
  USER_SET({ commit }, user) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.setUser, user);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  ROOMID_SET({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.setRoomId, id);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  MESSAGE_PUSH({ commit }, { message, roomid, user }) {
    return new Promise((resolve, reject) => {
      try {
        const data = {
          message,
          roomid,
          user
        };

        commit(types.pushMessage, data);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  ROOM_CREAT({ dispatch, commit }, { roomname, key, creatuser }) {
    return new Promise((resolve, reject) => {
      try {
        const data = {
          roomname,
          key,
          creatuser,
        };

        dispatch('ROOM_MESSAGE', data).then(() => {
          commit(types.createRoom, data);
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  ROOM_MESSAGE({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.createMessage, data);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
};
