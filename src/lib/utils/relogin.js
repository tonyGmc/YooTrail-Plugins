import crypto from 'crypto'
import { setToken, setRefreshToken, getRefreshToken, removeToken } from './token'
import { Message } from 'element-ui'

export function ReLogin(axios) {
  const refreshToken = getRefreshToken()

  const div1 = document.createElement('div')
  div1.className = 'account-expire-login'

  const div2 = document.createElement('div')
  div2.className = 'account-expire-login-in'

  const tips = document.createElement('div')
  if (refreshToken === 'locked') {
    tips.innerHTML =
      '<i class="el-icon-warning-outline" style="margin-right: 12px; color: #E6A23C; font-size: 20px; vertical-align: top;"></i>您已经长时间没有操作，请重新输入密码'
  } else {
    tips.innerHTML =
      '<i class="el-icon-warning-outline" style="margin-right: 12px; color: #E6A23C;  font-size: 20px;vertical-align: top;"></i>账号登录已过期，请重新输入密码登录'
  }
  tips.className = 'account-expire-login-header'
  div2.appendChild(tips)

  const account = document.createElement('div')
  let userInfo = sessionStorage.getItem('userInfo')

  if (!userInfo) {
    removeToken()
    window.location.href = '/login'
    return false
  } else {
    userInfo = JSON.parse(userInfo)
  }

  account.className = 'account el-input is-disabled'
  account.innerHTML =
    '帐号：<input type="text" value="' +
    userInfo.userName +
    '" disabled class="el-input__inner" placeholder="" style="width: 240px; margin: 10px 0;" />'

  const password = document.createElement('div')
  password.innerHTML = '密码：'
  const passwordInput = document.createElement('input')
  passwordInput.type = 'password'
  passwordInput.placeholder = '请输入密码'
  passwordInput.id = 'reLogin-password'
  passwordInput.className = 'el-input__inner'
  passwordInput.style.width = '240px'
  passwordInput.style.margin = '10px 0'
  password.appendChild(passwordInput)

  // <input type="password" class="el-input__inner" @click="'+loginSub+'" placeholder="请输入密码" id="reLogin-password" style="width: 240px; margin: 10px 0;" />

  div2.appendChild(account)
  div2.appendChild(password)

  const btnBox = document.createElement('div')
  btnBox.className = 'relogin-btn-box'
  const btn = document.createElement('button')
  btn.className = 'el-button el-button--primary'
  btn.innerHTML = '确认登录'
  const btn2 = document.createElement('button')
  btn2.className = 'el-button el-button--primary is-plain'
  btn2.innerHTML = '切换帐号'
  btnBox.appendChild(btn)
  btnBox.appendChild(btn2)
  div2.appendChild(btnBox)

  div1.appendChild(div2)
  document.body.appendChild(div1)

  passwordInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      loginSub()
    }
  })

  btn2.addEventListener('click', function() {
    removeToken()
    window.location.href = '/login'
    document.body.removeChild(div1)
  })

  btn.addEventListener('click', loginSub)

  btn.addEventListener('click', loginSub)

  function loginSub() {
    const formPassword = document.getElementById('reLogin-password').value
    if(!formPassword) {
      Message.error('请输入密码')
      return false
    }
    const md5 = crypto.createHash('md5')
    md5.update(formPassword)
    const hexPass = md5.digest('hex')
    axios({
      url: '/oauth/token',
      method: 'post',
      params: {
        username: userInfo.userName,
        password: hexPass,
        grant_type: 'password'
      }
    })
      .then(res => {
        setToken(res.access_token)
        setRefreshToken(res.refresh_token)
        document.body.removeChild(div1)
      })
      .catch(e => {})
  }
}
