import vue from 'vue';
import vuex from 'vuex';
import io from 'socket.io-client';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import socketRoom from './plugins/Socket_Rooms';

const socket = io('http://localhost:3000/', { autoConnect: false, path: '/rooms' });

vue.use(vuex);

const state = {
  user: null,
  chatrooms: []
};

export default new vuex.Store({
  strict: true,
  state,
  actions,
  mutations,
  getters,
  plugins: [socketRoom(socket)]
});
