<script>
import io from 'socket.io-client';
import { mapGetters } from 'vuex';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://chaos-mod-sever.herokuapp.com/'
});

let socket = {};

export default {
  name: 'ChatRoom',
  data() {
    return {
      messages: [],
      message: '',
      key: ''
    };
  },
  computed: {
    ...mapGetters(['getRooms', 'getUser']),
    getRoomName() {
      return this.getRooms.find(data => data.id === this.roomid).roomName;
    },
    sortMessages() {
      const target = this.messages.slice();
      return target.sort((a, b) => a.id - b.id);
    }
  },
  props: ['roomid'],
  methods: {
    async addMsg() {
      if (this.message !== '') {
        let data = {};
        await instance
          .post('/AES_encrypt', {
            key: this.key,
            data: this.message
          })
          .then(res => {
            data = {
              roomId: this.roomid,
              message: {
                from: this.getUser,
                id: this.messages.length,
                message: res.data.encrypt_text,
                Um: res.data.Um
              }
            };
          })
          .catch(err => {
            console.log(err);
          });

        socket.emit('setMessage', data);
        this.messages.push({
          message: this.message,
          id: this.messages.length,
          from: this.getUser
        });
        this.message = '';
      }
    },
    setKey() {
      this.messages = [];
      socket.emit('getMessage', { id: this.roomid });
    }
  },
  updated() {
    const scrollItem = this.$el.querySelector('.message-bar');
    scrollItem.scrollTop = scrollItem.scrollHeight;
  },
  created() {
    socket = io('http://localhost:3000/', { path: '/messages' });
    socket.emit('getMessage', { id: this.roomid });
    socket.on('messages', data => {
      data.forEach(cryptData => {
        instance
          .post('/AES_decrypt', {
            data: cryptData.message,
            Um: cryptData.Um,
            key: this.key
          })
          .then(res => {
            this.messages.push({
              from: cryptData.from,
              id: cryptData.id,
              message: res.data.decrypt_text
            });
          })
          .catch(err => console.log(err));
      });
    });
    socket.on('pushMessage', data => {
      instance
        .post('/AES_decrypt', {
          data: data.message,
          Um: data.Um,
          key: this.key
        })
        .then(res => {
          this.messages.push({
            from: data.from,
            id: data.id,
            message: res.data.decrypt_text
          });
        })
        .catch(err => console.log(err));
    });
  },
  beforeDestroy() {
    socket.close();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
