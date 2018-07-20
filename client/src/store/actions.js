import * as types from './mutations_type';

export default {
  USER_COMMIT({ commit }, user) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.commitUser, user);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  MESSAGE_PUSH({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.pushMessage, data);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  ROOM_NEW({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.newRoom, data);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
};
