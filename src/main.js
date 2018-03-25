import Vue from 'vue'
import router from './router'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'
import initPage from './assets/js/functions.js'

Vue.use(iView)
initPage($);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

