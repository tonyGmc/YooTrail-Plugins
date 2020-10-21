import Vue from 'vue'
import App from './App.vue'

import './lib/scss/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './lib/scss/element-ui-reset.scss'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })

import yootrialPlugins from './lib/index.js'
Vue.use(yootrialPlugins)

new Vue({
  el: '#app',
  render: h => h(App)
})
