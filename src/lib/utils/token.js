import Cookies from 'js-cookie'
// import { getInfo, getRoles } from '@/api/user'

const TokenKey = 'Admin-Token'
const RefreshKey = 'Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, 'Bearer' + token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshKey, token)
}

export function removeToken() {
  Cookies.remove(RefreshKey)
  Cookies.remove(TokenKey)
}

export function getCache(type) {
  try {
    return JSON.parse(sessionStorage.getItem(type))
  } catch (e) {
    return sessionStorage.getItem(type)
  }
}

export function setCache(type, info) {
  info = typeof info === 'object' ? JSON.stringify(info) : info
  return sessionStorage.setItem(type, info)
}

export function removeCache(type) {
  if (type) {
    sessionStorage.removeItem(type)
  } else {
    // 如果type没有值，清除全部
    sessionStorage.clear()
  }
}

// // 获取用户详情和权限
// export function getuserInfo() {
//   return new Promise((resolve, reject) => {
//     // 获取用户信息
//     getInfo()
//       .then((response) => {
//         setCache('userInfo', response)
//         // 获取权限
//         getRoles(response)
//           .then((res) => {
//             setCache('roles', res)
//             resolve(res)
//           })
//           .catch((error) => {
//             reject(error)
//           })
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }
