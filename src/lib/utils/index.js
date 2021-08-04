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
  if (!userAuth) {
    // console.log(val, '无权限')
    return false
  }

  const auths = _this === 'menu' ? userAuth.allAuthUrl : userAuth.allAuthCode

  if (!auths) {
    // console.log(val, '无权限')
    return false
  }

  // 在权限里面匹配，看是否能匹配到
  if (auths.includes(val)) {
    return true
  } else {
    // console.log(val, '无权限')
    return false
  }
}

/**
 * 身份证校验
 * @param {idCard} idCard
 */
export function isIdNumber(idCard) {
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
      var idCardWiSum = 0
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11
      var idCardLast = idCard.substring(17)

      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
        } else {
          return false
        }
      } else {
        if (idCardLast == idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}

/**
 * 根据身份证获取身份证，年龄，出生日期，性别
 * @param {idCard} identityCard
 */
export function GetIdCardMessage(identityCard) {
  var len = (identityCard + '').length
  var strBirthday = ''
  var sex = ''
  if (len === 18) {
    // 处理18位的身份证号码从号码中得到生日和性别代码
    sex = identityCard.charAt(16) % 2 === 0 ? '2' : '1'
    strBirthday = identityCard.substr(6, 4) + '-' + identityCard.substr(10, 2) + '-' + identityCard.substr(12, 2)
  }
  if (len === 15) {
    sex = identityCard.charAt(15) % 2 === 0 ? '2' : '1'
    var birthdayValue = ''
    birthdayValue = identityCard.charAt(6) + identityCard.charAt(7)
    if (parseInt(birthdayValue) < 10) {
      strBirthday =
        '20' + identityCard.substr(6, 2) + '-' + identityCard.substr(8, 2) + '-' + identityCard.substr(10, 2)
    } else {
      strBirthday =
        '19' + identityCard.substr(6, 2) + '-' + identityCard.substr(8, 2) + '-' + identityCard.substr(10, 2)
    }
  }
  // 时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday)
  var nowDateTime = new Date()
  var age = nowDateTime.getFullYear() - birthDate.getFullYear()
  // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (
    nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return {
    strBirthday,
    sex,
    age
  }
}

// 文件预览
export function filePreview(env, file) {
  if (env === 'development') env = 'dev'
  if (env === 'production') env = 'prod'
  const fileUrl = `https://ethics.tonoinfo.com/doc/yootrial/${env}/file/download?docId=${file.filePath}&fileName=${
    file.filePath
  }-${new Date() * 1}-${encodeURIComponent(file.fileName)}`
  window.open('https://ow365.cn/?i=17462&ssl=1&furl=' + fileUrl, '_blank')
}
