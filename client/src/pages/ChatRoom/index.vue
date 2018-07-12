<script>
export default {
  name: 'ChatRoom',
  data() {
    return {
      username: 'leadingtw',
      text: '',
      messages: [
        {
          id: 1,
          username: 'leadingtw',
          text: '安安'
        },
        {
          id: 2,
          username: 'andy',
          text: '你好?'
        },
        {
          id: 3,
          username: 'leadingtw',
          text: '晚餐吃啥?'
        },
        {
          id: 4,
          username: 'andy',
          text: '吃大便'
        },
        {
          id: 5,
          username: 'andy',
          text: '你好?'
        },
        {
          id: 6,
          username: 'leadingtw',
          text: '晚餐吃啥?'
        },
        {
          id: 7,
          username: 'andy',
          text: '吃大便'
        }
      ]
    };
  },
  methods: {
    addMsg(id) {
      if (this.text === '') return false;
      this.messages.push({
        id,
        username: this.username,
        text: this.text
      });
      this.text = '';
      return true;
    }
  },
  mounted() {
    const scrollItem = this.$el.querySelector('.message-bar');
    scrollItem.scrollTop = scrollItem.scrollHeight;
  },
  updated() {
    const scrollItem = this.$el.querySelector('.message-bar');
    scrollItem.scrollTop = scrollItem.scrollHeight;
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
