import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-slider-component/theme/antd.css'
import store from "./store"
import routes from './routes'
/* import the fontawesome core */

Vue.use(store);
Vue.use(VueRouter)

Vue.config.productionTip = false


const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
