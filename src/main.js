import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.scss'

import axios from 'axios'
import { post, get } from './api/http.js'
import { wxUserInfo } from '@/api/httpList'

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.post = post
Vue.prototype.get = get

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let url = window.location.search
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (url) {
    let str = url.substr(url.indexOf('openid') + 7)
    let code = url.substr(url.indexOf('=') + 1, url.indexOf('openid') - 7)
    let token = url.substr(url.lastIndexOf('=') + 1)
    let openid = str.substr(0, str.indexOf('&token'))
    sessionStorage.setItem('openid', openid)
      if (code === '11') { // 需要手机号绑定
        if (to.name === 'wxPhone') {
          next()
          return
        } else {
          next({
            path: '/wxPhone'
          })
        }
      } else if (code === '0000000') { // 手机号已绑定
        wxUserInfo({
          openid: openid
        }).then(res => {
          localStorage.setItem('token', token)
          localStorage.setItem('userInfo', JSON.stringify(res.data.list[0]))
          localStorage.setItem('href', 'personal')
          window.location.href = 'http://ntmove.com/static/gym/index.html#/personal'
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    }
    // 这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.getItem('token')) { // 判断当前的token是否存在
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
