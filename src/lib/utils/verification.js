// 常用的正则表达式
const regs = {
  mobile: /^1[3456789]\d{9}$/, // 手机
  phone: /^(0\d{2,3})(\d{7,8})$/, // 固定电话
  email: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
  socialCode: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, // 社会信用代码
  fax: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/ // 传真
}

// 常规的校验方法 统一由正则校验
const validReg = (name, reg) => {
  return (rule, value, callback) => {
    if (value && !reg.test(value)) {
      // eslint-disable-next-line standard/no-callback-literal
      callback(`${name}格式不正确`)
    } else {
      callback()
    }
  }
}

// 特殊校验
const validFn = {
  mobileAndPhone() {
    return (rule, value, callback) => {
      if (!regs.mobile.test(value) && !regs.phone.test(value)) {
        callback(`手机号码或固定号码格式不正确`)
      } else {
        callback()
      }
    }
  }
}

/**
 * @param {String} type 校验类型 如： mobile、emial
 * @param {Boolean} require  是否必填
 * @param {String} name  校验字段的中文名称 如果"手机号不能空"，只需要传手机号
 * @param {String} validType 校验类型，reg(正则表达式校验) 和 fn(函数校验) 默认reg
 */
export default function(type, require, name = '', validType = 'reg') {
  const validator = validType === 'reg' ? validReg(name, regs[type]) : validFn[type](name)
  const arr = [{ validator, trigger: 'blur' }]
  if (require) {
    arr.push({ required: true, message: `${name}不能为空`, trigger: 'blur' })
  }
  return arr
}
