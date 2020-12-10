import { Message } from 'element-ui'
import { setToken, setRefreshToken, getToken, getRefreshToken, removeToken } from '../utils/token'
import { getAppOrgId } from '../utils/index'
import crypto from 'crypto'

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
    // 返回数据逻辑处理
    const old = res.config
    const code = res.data.code + ''
    // code 未10 时标识token已过期或者没有token
    if (code === '10') {
      let response = {}
      if (!res.config.url.includes('/oauth/token')) {
        // 刷新token
        await resetToken($axios, {
          grant_type: 'refresh_token',
          refresh_token: getRefreshToken()
        })
          .then(async resRsetToekn => {
            old.headers.Authorization = getToken()
            await $axios(old).then(oldRes => {
              response = oldRes
            })
          })
          .catch(e => {})
        return response
      } else {
        Message.error({
          message: '登录已失效，请重新登录',
          type: 'error'
        })
        removeToken()
        redirect('/login?href=' + encodeURIComponent(route.path))
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
        Message({
          message: '登录凭证已过期，请重新登录',
          type: 'error'
        })
        removeToken()
        redirect('/login?href=' + encodeURIComponent(route.path))
        return false
      }
      Message({
        message: '操作失败',
        type: 'error'
      })
      return false
    } else {
      Message({
        message: '系统错误',
        type: 'error'
      })
      return Promise.reject(error)
    }
  })
}
