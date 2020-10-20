import Vue from 'vue'
import App from './App.vue'
import yootrialPlugins from './lib/index.js'

Vue.use(yootrialPlugins)

new Vue({
  el: '#app',
  render: h => h(App)
})
