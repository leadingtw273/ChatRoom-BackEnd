<script>
import io from 'socket.io-client';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://chaos-mod-sever.herokuapp.com/'
});

let socket = {};

export default {
  name: 'ChatRoom',
  data() {
    return {
      reLoadDisabled: true,
      messages: [],
      message: '',
      key: ''
    };
  },
  computed: {
    sortMessages() {
      const target = this.messages.slice();
      return target.sort((a, b) => a.id - b.id);
    }
  },
  props: ['roomid', 'username'],
  methods: {
    addMsg() {
      if (this.message !== '') {
        instance
          .post('/AES_encrypt', {
            key: this.key,
            data: this.message
          })
          .then(res => {
            return {
              roomId: this.roomid,
              message: {
                from: this.username,
                id: this.messages.length,
                message: res.data.encrypt_text,
                Um: res.data.Um
              }
            };
          })
          .then(data => {
            socket.emit('setMessage', data);
            this.messages.push({
              id: this.messages.length,
              message: this.message,
              from: this.username
            });
            this.message = '';
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    setKey() {
      if (this.key !== '') {
        this.reLoadDisabled = true;
        this.messages = [];
        socket.emit('getMessage', { id: this.roomid });
      }
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
      const forPromis = [];
      data.forEach(cryptData => {
        forPromis.push(
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
            .catch(err => console.log(err))
        );
      });
      Promise.all(forPromis)
        .then(() => {
          this.reLoadDisabled = false;
        })
        .catch(err => console.log(err));
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
