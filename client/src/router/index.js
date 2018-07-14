import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/pages/Register/';
import ChatRoomList from '@/pages/ChatRoomList/';
import ChatRoom from '@/pages/ChatRoom/';
import NotFound404 from '@/pages/NotFound404/';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'register' }
    },
    {
      path: '/user',
      name: 'register',
      component: Register
    },
    {
      path: '/user/:username/chatroomlist',
      name: 'chatroomlist',
      component: ChatRoomList
    },
    {
      path: '/user/:username/chatroomlist/:roomid',
      name: 'chatroom',
      component: ChatRoom,
      props: true
    },
    {
      path: '*',
      name: '404',
      component: NotFound404
    }
  ]
});
