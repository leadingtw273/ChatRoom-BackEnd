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
      const data = {
        email: this.email,
        password: this.password
      };
      console.log(data);
      await authService.register(data);
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
