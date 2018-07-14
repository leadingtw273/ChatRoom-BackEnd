<script>
export default {
  name: 'PageHeader',
  methods: {
    goRegister() {
      this.$router.push({
        name: 'register'
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
