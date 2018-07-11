<script>
import authService from '@/services/AuthService';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      await authService.register({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
