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
  verify: {
    roomName: [
      'required',
      {
        maxLength: 10,
        message: '不能超過10字'
      }
    ],
    roomKey: [
      'required',
      {
        maxLength: 10,
        message: '不能超過10字'
      }
    ]
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
      if (this.$verify.check()) {
        await this.ROOM_CREAT({
          roomname: this.roomName,
          key: this.roomKey,
          creatuser: this.$route.params.username
        });
        this.roomName = '';
        this.roomKey = '';
      } else {
        console.log('roomName: ', this.$verify.$errors.roomName[0]);
        console.log('roomKey: ', this.$verify.$errors.roomKey[0]);
      }
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
