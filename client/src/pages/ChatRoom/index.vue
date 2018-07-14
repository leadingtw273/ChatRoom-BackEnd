<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChatRoom',
  data() {
    return {
      message: '',
      nd: true
    };
  },
  props: ['roomid'],
  computed: {
    ...mapGetters(['getMessage'])
  },
  methods: {
    ...mapActions(['MESSAGE_PUSH']),
    async addMsg() {
      if (this.message !== '') {
        await this.MESSAGE_PUSH({
          message: this.message,
          roomid: this.roomid,
          user: this.$route.params.username
        });
        this.message = '';
      }
    }
  },
  mounted() {},
  updated() {
    const scrollItem = this.$el.querySelector('.message-bar');
    scrollItem.scrollTop = scrollItem.scrollHeight;
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
