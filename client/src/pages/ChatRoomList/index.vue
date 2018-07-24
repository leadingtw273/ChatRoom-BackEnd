<script>
import io from 'socket.io-client';

let socket = {};

export default {
  name: 'ChatRoomList',
  data() {
    return {
      roomName: '',
      rooms: []
    };
  },
  computed: {
    sortRooms() {
      const target = this.rooms.slice();
      return target.sort((a, b) => a.id - b.id);
    }
  },
  props: ['username'],
  methods: {
    clickLink(id) {
      this.$router.push({
        name: 'chatroom',
        params: { roomid: id, username: this.$route.params.username }
      });
    },
    addRoom() {
      if (this.roomName !== '') {
        const data = {
          id: this.rooms.length,
          roomName: this.roomName,
          createBy: this.username
        };
        socket.emit('setRoom', data);
        this.rooms.push(data);
        this.roomName = '';
      }
    }
  },
  created() {
    socket = io('http://localhost:3000/', { path: '/rooms' });
    socket.emit('getRooms');
    socket.on('rooms', data => {
      this.rooms = data;
    });
    socket.on('pushRoom', data => {
      this.rooms.push(data);
    });
  },
  beforeDestroy() {
    socket.close();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
