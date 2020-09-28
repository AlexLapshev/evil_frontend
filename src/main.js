import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import Axios from "axios";
import store from "./store/store";

import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.prototype.$axios = Axios.create({baseURL: process.env.VUE_APP_BASE_URL})


new Vue({
  router,
  render: h => h(App), store
}).$mount('#app')
