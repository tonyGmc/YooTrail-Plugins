import { Message } from 'element-ui'
import { setToken, setRefreshToken, getToken, getRefreshToken, removeToken } from '../utils/token'
import { getAppOrgId } from '../utils/index'
import { ReLogin } from '../utils/relogin'
import crypto from 'crypto'

window.isRefresh_yoo = false
window.refreshList_yoo = []

function resetToken(axios, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/oauth/token',
      method: 'post',
      params: data
    })
      .then(res => {
        setToken(res.access_token)
        setRefreshToken(res.refresh_token)
        resolve()
      })
      .catch(e => {
        reject(new Error('token刷新失败'))
      })
      .finally(() => {
        window.isRefresh_yoo = false
      })
  })
}

export default ({ $axios, redirect, route, store }) => {
  $axios.onRequest(config => {
    config.baseURL = process.env.BASE_API
    $axios.setHeader('Content-Type', 'application/json')

    const orgInfo = getAppOrgId(route.path, true)
    if (orgInfo) {
      try {
        // 账号凭证通过组织Id与应用Id进行加密生成
        const { orgId, appId } = orgInfo
        const accountToken = (orgId || '') + '' + (appId || '')
        if (accountToken) {
          const md5 = crypto.createHash('md5')
          md5.update(accountToken)
          const hexPass = md5.digest('hex')
          config.headers.AccountToken = hexPass
        }
      } catch (e) {
        console.log(e)
      }
    }
    const token = getToken()
    if (token && !config.url.includes('/oauth/token')) {
      config.headers.Authorization = token
    } else {
      config.headers.Authorization = 'Basic d2ViQXBwOjEyMzQ1Ng=='
    }
    // config.headers.Authorization = getToken()
  })

  $axios.onResponse(async (res, b) => {
    if (
      res.headers &&
      res.headers['content-type'] &&
      res.headers['content-type'].includes('application/octet-stream')
    ) {
      return res
    }

    // 返回数据逻辑处理
    // const old = res.config
    const config = res.config
    const code = res.data.code + ''
    // code 未10 时标识token已过期或者没有token
    if (code === '10' || code === 10) {
      let response = {}
      if (!res.config.url.includes('/oauth/token')) {
        if (!window.isRefresh_yoo) {
          window.isRefresh_yoo = true
          // 刷新token
          await resetToken($axios, {
            grant_type: 'refresh_token',
            refresh_token: getRefreshToken()
          }).then(async resRsetToekn => {
            config.headers.Authorization = getToken()
            await $axios(config).then(oldRes => {
              response = oldRes
            })
          })
          window.refreshList_yoo.forEach(el => el(getToken()))
          window.refreshList_yoo = []
          return response
        } else {
          let dt
          await new Promise(resolve => {
            window.refreshList_yoo.push(token => {
              config.baseURL = ''
              config.headers.Authorization = token
              $axios(config).then(rr => {
                resolve(rr)
              })
            })
          }).then(rr2 => {
            dt = rr2
          })
          return dt
        }
      } else {
        // removeToken()

        if (getRefreshToken() !== 'locked' && document.querySelector('.account-expire-login') == null) {
          ReLogin($axios)
        }
        // redirect('/login?href=' + encodeURIComponent(route.path))
      }
    } else if (code === '0' || res.data.access_token) {
      return res.data
    } else {
      Message({
        message: res.data.msg || '操作失败',
        type: 'error'
      })
      return Promise.reject(res.data)
    }
  })

  $axios.onError(error => {
    const err = error.response
    if (!err) return Promise.reject(error)
    // 刷新token失效了，去登录
    if (err && err.status === 400) {
      if (error.response.data.error_description.includes('Invalid refresh token')) {
        // removeToken()

        if (getRefreshToken() !== 'locked' && document.querySelector('.account-expire-login') == null) {
          ReLogin($axios)
        }
        // redirect('/login?href=' + encodeURIComponent(route.path))
        return false
      }
      Message({
        message: err.data && err.data.error_description ? err.data.error_description : '操作失败',
        type: 'error',
      })
      return false
    } else {
      if (error.message && error.message === 'Network Error') {
        Message({
          message: '网络错误，请检查网络',
          type: 'error'
        })
        return Promise.reject(error)
      }
      if (error.message && error.message.includes('timeout')) {
        Message({
          message: '请求超时，请检查网络',
          type: 'error'
        })
        return Promise.reject(error)
      }
      Message({
        message: '系统错误',
        type: 'error'
      })
      return Promise.reject(error)
    }
  })
}
