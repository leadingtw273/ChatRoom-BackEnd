<script>
import authService from '@/services/AuthService';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      await authService.register({
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
