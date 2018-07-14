// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import verify from 'vue-verify-plugin';
import 'bootstrap';
import App from './App';
import router from './router';
import store from './store';
import './assets/all.scss';

Vue.config.productionTip = false;

Vue.use(verify, {
  blur: false
});

router.beforeResolve((to, from, next) => {
  console.log(to.path);
  console.log(to.params);
  if (!store.getters.getUser && to.name !== 'register') {
    next({ name: 'register' });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
