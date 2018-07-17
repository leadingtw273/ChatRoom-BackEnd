import vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

vue.use(vuex);

const state = {
  user: null,
  chatrooms: [
    {
      id: 0,
      roomname: '晚餐房間',
      creatuser: 'leadingtw'
    },
    {
      id: 1,
      roomname: '下周旅遊',
      creatuser: 'andy'
    }
  ],
  history: [
    {
      id: 0,
      messages: [
        {
          id: 0,
          user: 'leadingtw',
          message: '安安'
        },
        {
          id: 1,
          user: 'john',
          message: '所以吃？'
        },
        {
          id: 2,
          user: 'maray',
          message: '安安'
        },
        {
          id: 3,
          user: 'andy',
          message: '不知道'
        },
        {
          id: 4,
          user: 'john',
          message: '所以吃？'
        },
        {
          id: 5,
          user: 'maray',
          message: '安安'
        },
        {
          id: 6,
          user: 'andy',
          message: '不知道'
        }
      ]
    },
    {
      id: 1,
      messages: [
        {
          id: 0,
          user: 'andy',
          message: '下周去哪玩'
        },
        {
          id: 1,
          user: 'leadingtw',
          message: '推台北　＋１'
        },
        {
          id: 2,
          user: 'maray',
          message: '高雄旗津也不錯'
        },
        {
          id: 3,
          user: 'leadingtw',
          message: '恩．．．都可拉！'
        }
      ]
    }
  ]
};

export default new vuex.Store({
  strict: true,
  state,
  actions,
  mutations,
  getters
});
