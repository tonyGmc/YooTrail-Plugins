/**
 * 在数组中，根据某一个值匹配另外一个值
 * @param {Ayyay} arr 需要取值的素组
 * @param {String} val 现取得的值
 * @param {String} key 需要判断的key
 * @param {String} name 需要取得值
 */
export const getKeyToName = function(arr, val, key, name) {
  const obj = arr.find(item => item[key] === val)
  if (obj) {
    return obj[name]
  } else {
    return ''
  }
}

/**
 * 把数据字典的值改成 value:name
 */
export const dictValueToName = function(arr) {
  if (!arr) return {}
  const obj = {}
  arr.forEach(item => {
    obj[item.value] = item.name
  })
  return obj
}

/**
 * 平台进入应用后获取应用所属的组织ID， 应用地址设置逻辑  /{appCode}/***
 * 逻辑： 平台应用点击 -> 获取应用appCode -> localStorage缓存组织ID -> 进入应用根据获取path的第一截 -> 去localStorage获取组织Id
 * @param {*} path
 */
export const getAppOrgId = function(_this, isInfo) {
  let type
  if (typeof _this === 'string') {
    type = _this.split('/')[1]
  } else {
    type = _this.$route.path.split('/')[1]
  }

  if (type) {
    type = type.toLocaleUpperCase()
  }
  const org = JSON.parse(sessionStorage.getItem(type))
  if (!isInfo) {
    return org.orgId
  } else {
    return org
  }
}

export const hasPermision = function(val, _this) {
  // 查找用户权限
  const userAuth = getAppOrgId(_this === 'menu' ? val : _this, true)
  // 在权限里面寻找是否有符合的fuceResource
  if (userAuth && userAuth.functionList) {
    const isOk = userAuth.functionList.find(item => {
      if (_this === 'menu') {
        return item.fuceResource === val
      } else {
        return item.fuceCode === val
      }
    })
    if (isOk) {
      return true
    } else {
      // eslint-disable-next-line no-console
      console.log(val, '无权限')
      return false
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(val, '无权限')
    return false
  }
}
