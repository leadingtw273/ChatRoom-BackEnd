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
      message: ''
    };
  },
  computed: {
    ...mapGetters(['getRooms']),
    getRoomName() {
      return this.getRooms.find(data => data.id === this.roomid).roomName;
    },
    getRoomKey() {
      return this.getRooms.find(data => data.id === this.roomid).key;
    }
  },
  props: ['roomid'],
  methods: {
    async addMsg() {
      if (this.message !== '') {
        let data = {};
        await instance
          .post('/AES_encrypt', {
            key: this.getRoomKey,
            data: this.message
          })
          .then(res => {
            data = {
              roomId: this.$route.params.roomid,
              message: {
                from: this.$route.params.username,
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
        this.messages.push(this.message);
        this.message = '';
      }
    }
  },
  updated() {
    const scrollItem = this.$el.querySelector('.message-bar');
    scrollItem.scrollTop = scrollItem.scrollHeight;
  },
  created() {
    socket = io('http://localhost:3000/', { path: '/messages' });
    socket.emit('getMessage', { id: this.$route.params.roomid });
    socket.on('messages', async data => {
      data.sort((a, b) => a.id - b.id);
      // this.messages = data;

      const enDatas = [];
      await data.forEach(async cryptData => {
        console.log(cryptData.id);

        let enData = '';
        await instance
          .post('/AES_decrypt', {
            data: cryptData.message,
            Um: cryptData.Um,
            key: this.getRoomKey
          })
          .then(res => {
            // console.log(res.data.decrypt_text);
            enData = res.data.decrypt_text;
          })
          .catch(err => {
            console.log(err);
          });
        await enDatas.push({
          from: cryptData.from,
          id: cryptData.id,
          message: enData
        });
      });
      // console.log(enDatas.sort((a, b) => a.id - b.id));
      this.messages = enDatas.sort((a, b) => a.id - b.id);
    });
  },
  beforeDestroy() {
    socket.close();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
