import { Message } from 'element-ui'
import { getToken, getRefreshToken, removeToken } from '../utils/token'

export default ({ $axios, redirect, route, store }) => {
  $axios.onRequest(config => {
    config.baseURL = process.env.BASE_API
    $axios.setHeader('Content-Type', 'application/json')
    config.headers.Authorization = getToken()
  })

  $axios.onResponse(async (res, b) => {
    // 返回数据逻辑处理
    const old = res.config
    // code 未10 时标识token已过期或者没有token
    if (res.data.code === 10) {
      let response = {}
      if (!res.config.url.includes('/oauth/token')) {
        await store
          .dispatch('sign/REFRESH_TOKEN', {
            grant_type: 'refresh_token',
            refresh_token: getRefreshToken()
          })
          .then(async resRsetToekn => {
            old.headers.Authorization = getToken()
            await $axios(old).then(oldRes => {
              response = oldRes
            })
          })
        return response
      } else {
        Notification.error({
          title: '失败',
          message: '登录已失效，请重新登录'
        })
        removeToken()
        redirect('/sign/signin?href=' + encodeURIComponent(route.path))
      }
    } else if (res.data.code === '0' || res.data.access_token) {
      return res.data
    } else {
      Message({
        message: '操作失败',
        type: 'error'
      })
      return Promise.reject(new Error(''))
    }
  })

  $axios.onError(error => {
    const err = error.response
    if (!err) return Promise.reject(new Error(''))

    if (err.status === 400) {
      if (error.response.data.error_description.includes('Invalid refresh token')) {
        Message({
          message: '登录凭证已过期，请重新登录',
          type: 'error'
        })
        // removeToken()
        // redirect('/sign/signin?href=' + encodeURIComponent(route.path))
        return false
      }

      Message({
        message: '操作失败',
        type: 'error'
      })
      return false
    }
    Message({
      message: '系统错误',
      type: 'error'
    })
    return Promise.reject(new Error(''))
  })
}
