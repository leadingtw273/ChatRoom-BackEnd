import vue from 'vue';
import mutations from './mutations';
import * as types from './mutations_type';

// export const CHATROOM_GET = ({ commit }) => {
//   console.log('call CHATROOM_GET');
//   // do someThing
//   commit(types.pullChatroom);
// };
// export const MESSAGE_PUSH = ({ commit }) => {
//   console.log('call MESSAGE_PUSH');
//   // do someThing
//   commit(types.pushMessage);
// };

export default {
  CHATROOM_GET: ({ commit }) => {
    console.log('call CHATROOM_GET');
    // do someThing
    commit(types.pullChatroom);
  },
  MESSAGE_PUSH: ({ commit }) => {
    console.log('call MESSAGE_PUSH');
    // do someThing
    commit(types.pushMessage);
  }
};
