import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import routes from './router';
import '../node_modules/bulma/css/bulma.min.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: routes,
}).$mount('#app');
