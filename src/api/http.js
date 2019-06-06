import axios from 'axios' // 引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到
import router from '../router/index'

// 请求超时时间10S
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 封装get方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      if (response.data.code === '2222222') {
        router.push({path: 'login'})
      }
      resolve(response.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * 封装post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
 */

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(response => {
        if (response.data.code === '2222222') {
          router.push({path: 'login'})
        }
        resolve(response.data)
      }).catch(err => {
        reject(err.data)
      })
  })
}
