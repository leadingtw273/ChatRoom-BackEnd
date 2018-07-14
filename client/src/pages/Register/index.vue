<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      username: ''
    };
  },
  methods: {
    ...mapActions(['USER_SET']),
    async register() {
      await this.USER_SET(this.username);
      this.$router.push({
        name: 'chatroomlist',
        params: { username: this.username }
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
