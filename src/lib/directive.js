import Vue from 'vue'
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

// 防止连续点击
export const intervalclick = function(el, binding) {
  let openDelay = false
  el.onclick = function(e) {
    if (openDelay) return
    openDelay = !openDelay
    if (!binding.value) {
      alert('未传入Value数据！')
      return
    }
    const func = binding.value['func']
    const time = binding.value['time']
    if (typeof time !== 'number') {
      alert('传入等待时间错误')
      return
    }
    const args = []
    for (const key in binding.value) {
      if (binding.value.hasOwnProperty(key)) {
        if (key === 'func' || key === 'time') continue
        args.push(binding.value[key])
      }
    }
    setTimeout(() => {
      openDelay = !openDelay
    }, time)
    func(...args)
  }
}
