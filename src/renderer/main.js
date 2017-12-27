import Vue from 'vue'

import App from './App'

import './assets/css/font-awesome.min.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import router from './router'
import store from './store'

Vue.use(mavonEditor)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  data: {
    bus: new Vue()
  },
  components: { App },
  // router,
  store,
  template: '<App/>'
}).$mount('#app')
