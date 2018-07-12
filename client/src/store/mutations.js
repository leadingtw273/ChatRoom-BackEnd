import vue from 'vue';
import * as types from './mutations_type';

export const state = {
  user: '',
  chatroom: []
};
export const mutations = {
  [types.pullChatroom](state) {

  },
  [types.pushMessage](state) {

  }
};

// export default {
//   state: {
//     user: '',
//     chatroom: []
//   },
//   mutations: {
//     [types.pullChatroom](state) {

//     },
//     [types.pushMessage](state) {

//     }
//   }
// };
