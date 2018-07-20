<script>
import { mapGetters } from 'vuex';
import io from 'socket.io-client';

let socket = {};

export default {
  name: 'ChatRoom',
  data() {
    return {
      messages: [],
      message: ''
    };
  },
  props: ['roomid'],
  computed: {
    ...mapGetters(['getMessage'])
  },
  methods: {
    addMsg() {
      if (this.message !== '') {
        const data = {
          roomId: this.$route.params.roomid,
          message: {
            from: this.$route.params.username,
            id: this.messages.length,
            message: this.message
          }
        };
        socket.emit('setMessage', data);
        this.messages.push(data.message);
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
    socket.on('messages', data => {
      this.messages = data.sort((a, b) => a.id - b.id);
    });
  },
  beforeDestroy() {
    socket.close();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
