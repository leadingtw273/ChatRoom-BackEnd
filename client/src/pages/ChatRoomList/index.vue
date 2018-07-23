<script>
import { mapGetters, mapActions } from 'vuex';
import * as types from '../../store/mutations_type';

export default {
  name: 'ChatRoomList',
  data() {
    return {
      roomName: ''
    };
  },
  computed: {
    ...mapGetters({
      rooms: 'getRooms'
    })
  },
  methods: {
    ...mapActions(['ROOM_NEW']),
    async clickLink(id) {
      this.$router.push({
        name: 'chatroom',
        params: { roomid: id, username: this.$route.params.username }
      });
    },
    async addRoom() {
      await this.ROOM_NEW({
        id: this.rooms.length,
        roomName: this.roomName,
        createBy: this.$route.params.username
      });
      this.roomName = '';
    }
  },
  created() {
    this.$store.commit(`${[types.openRoomSocket]}`);
  },
  beforeDestroy() {
    this.$store.commit(`${[types.closeRoomSocket]}`);
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
