import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/pages/Register/';
import ChatRoomList from '@/pages/ChatRoomList/';
import ChatRoom from '@/pages/ChatRoom/';
import NotFound404 from '@/pages/NotFound404/';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'register' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/chatroomlist',
      name: 'chatroomlist',
      component: ChatRoomList
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: ChatRoom
    },
    {
      path: '*',
      name: '404',
      component: NotFound404
    }
  ]
});
