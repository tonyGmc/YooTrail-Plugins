import Vue from 'vue'
import { hasPermision } from './utils/index'
import { Loading } from 'element-ui'
// 只能输入小数后两位限制
export function limitFloat(val, len) {
  var value = val
  value = value.replace(/[^\d.]/g, '')
  value = value.replace(/\.{2,}/g, '.')
  value = value
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  if (value.indexOf('.') < 0 && value !== '') {
    value = parseFloat(value)
  }
  return value
}

// 只能输入小数后两位限制 可为负数
export function limitZf(val, len) {
  var value = val
  var t = value.charAt(0)
  value = value.replace(/[^\d.]/g, '')
  value = value.replace(/\.{2,}/g, '.')
  value = value
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  if (value.indexOf('.') < 0 && value !== '' && value !== '-') {
    value = parseFloat(value)
  }
  if (t == '-') {
    value = '-' + value
  }
  return value
}

// 不能输入小数
export function limitNum(val) {
  var value = val
  value = value.replace(/[^\d]/g, '')
  // value = value.replace(/\.{2,}/g, ".");
  // value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  if (value.indexOf('.') < 0 && value !== '') {
    value = parseFloat(value)
  }
  return value
}
// 只能英文
export function limitEn(val) {
  var value = val
  value = value.replace(/[^A-z]/g, '')
  if (value.length > 6) {
    try {
      if (value) value = value.subStr(0, 6)
    } catch (e) {}
  }
  return value
}

let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

function setValueWithExpressionVue(option) {
  const expression = option.expression.split('.')
  expression.forEach(function(item, i) {
    if (i < expression.length - 1) {
      option.currObj = option.currObj[item]
    } else {
      if (option.key !== undefined) {
        option.currObj[option.key][item] = option.value
      } else {
        option.currObj[item] = option.value
      }
    }
  })
}

// 数字输入指令
export const numberOnly = {
  bind: function(el, options, vnode) {
    var $inp = findEle(el, 'input')
    el.$inp = $inp
    var arg = options.arg || 0
    $inp.handle = function() {
      if (arg == 'e') {
        $inp.value = limitEn(this.value)
      } else {
        if (arg == 0) {
          $inp.value = limitNum(this.value)
        } else {
          $inp.value = limitFloat(this.value, arg)
        }
      }
      setValueWithExpressionVue({
        expression: options.expression,
        value: $inp.value,
        key: vnode.key,
        currObj: vnode.context
      })
    }
    $inp.addEventListener('input', $inp.handle)
  },
  unbind: function(el) {
    el.$inp.removeEventListener('input', el.$inp.handle)
  }
}

// 可以输入负数 数字输入指令
export const numberZf = {
  bind: function(el, options, vnode) {
    var $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function() {
      $inp.value = limitZf(this.value)
      setValueWithExpressionVue({
        expression: options.expression,
        value: $inp.value,
        key: vnode.key,
        currObj: vnode.context
      })
    }
    $inp.handle = function() {
      $inp.value = limitZf(this.value)
      setValueWithExpressionVue({
        expression: options.expression,
        value: $inp.value,
        key: vnode.key,
        currObj: vnode.context
      })
    }
    $inp.Blurhandle = function() {
      if ($inp.value == '-') {
        $inp.value = ''
      }
      setValueWithExpressionVue({
        expression: options.expression,
        value: $inp.value,
        key: vnode.key,
        currObj: vnode.context
      })
    }
    $inp.addEventListener('input', $inp.handle)
    $inp.addEventListener('blur', $inp.Blurhandle)
  },
  unbind: function(el) {
    el.$inp.removeEventListener('input', el.$inp.handle)
    el.$inp.removeEventListener('blur', el.$inp.Blurhandle)
  }
}

//
// 设计为两种方式
/**
 * 防止连续点击
 * 接收一个参数 如： v-intervalclick="val"
 * val 可以不传v-intervalclick 可以是数字，和boolean类型
 * 当val是数字时，表示多少秒之后可以点击下一次，如果不传默认是2000(2秒)
 * 当val是boolean时，表示显示全屏loading
 */
let loadingInstance
export const intervalclick = {
  bind(el, binding, vnode) {
    if (!binding.value || typeof binding.value === 'string') {
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 2000)
        }
      })
    }
  },
  update(el, binding, vnode) {
    if (typeof binding.value === 'boolean') {
      if (binding.value) {
        loadingInstance = Loading.service({
          fullscreen: true,
          lock: true,
          text: '请 稍 等 ',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else if (loadingInstance) {
        loadingInstance.close()
      }
    }
  }
}

// 权限指令
export const auth = {
  bind(el, binding, vnode) {},
  inserted(el, binding, vnode) {
    // 传入字符串
    if (typeof binding.value === 'string') {
      if (!hasPermision(binding.value, vnode.context)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
    // 传入数组
    if (Array.isArray(binding.value)) {
      let yes = false
      for (let i = 0; i < binding.value.length; i++) {
        if (hasPermision(binding.value[i], vnode.context)) {
          yes = true
          break
        }
      }
      if (!yes) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  },
  unbind(el, binding) {}
}
