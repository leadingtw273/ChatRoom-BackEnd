<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChatRoomList',
  data() {
    return {
      roomName: '',
      roomKey: ''
    };
  },
  computed: {
    ...mapGetters({
      rooms: 'getRooms'
    })
  },
  methods: {
    ...mapActions(['ROOMID_SET', 'ROOM_CREAT']),
    async clickLink(id) {
      this.$router.push({
        name: 'chatroom',
        params: { roomid: id, username: this.$route.params.username }
      });
    },
    async addRoom() {
      await this.ROOM_CREAT({
        roomname: this.roomName,
        key: this.roomKey,
        creatuser: this.$route.params.username
      });
      this.roomName = '';
      this.roomKey = '';
    }
  },
  mounted() {
    console.log('123123');
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
