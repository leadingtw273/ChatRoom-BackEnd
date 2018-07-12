import vue from 'vue';
import vuex from 'vuex';
import { state, mutations } from './mutations';
import actions from './actions';
import getters from './getters';

vue.use(vuex);

export default new vuex.Store({
  strict: true,
  state,
  actions,
  mutations,
  getters
});
