<template>
  <div id="app">
    <PageHeader/>
    <div class="container">
    <router-view style="margin:40px 20px 20px 30px"/>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader/';

export default {
  name: 'App',
  components: { PageHeader }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
