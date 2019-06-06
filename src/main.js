import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.scss'

import axios from 'axios'
import { post, get } from './api/http.js'

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.post = post
Vue.prototype.get = get

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(to.matched.some(record => record.meta.requireAuth))
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      if (to.name === 'login') {
        next()
        return
      }
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
