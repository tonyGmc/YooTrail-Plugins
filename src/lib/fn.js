import { getToken } from './utils/token'
import { getAppOrgId } from './utils/index'
/**
 * 重置数据，放置双向绑定污染
 */
const newData = function(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 获取名字简称
 */
const nameShort = function(name) {
  if (name.length > 2) {
    return name.substr(name.length - 2, 2)
  } else {
    return name
  }
}

const isNull = function(obj) {
  const objType = getObjectType(obj)
  if (objType === 'undefined' || objType === 'null') {
    return true
  }
  if (objType === 'String') {
    return obj.trim() === ''
  }
  if (objType === 'Number') {
    return false
  }
  return !obj
}

// 生成随机数
const generateMixed = function(n) {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res = ''
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}

/**
 * 获取对象类型
 * @param obj 传入对象
 * @return String | Number | Array | Date | Function | RegExp | Object | Set | Map
 */
const getObjectType = function(obj) {
  const type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1]
  if (type === 'string' && typeof obj === 'object') {
    return 'object' // Let "new String('')" return 'object'
  }
  if (obj === null) {
    return 'null' // PhantomJS has type "DOMWindow" for null
  }
  if (obj === undefined) {
    return 'undefined' // PhantomJS has type "DOMWindow" for undefined
  }
  return type
}

export default function(options) {
  let BASE_API = ''
  if (options) {
    BASE_API = options.BASE_API
  }
  return {
    newData,
    isNull,
    nameShort,
    getObjectType,
    getAppOrgId, // 获取组织id或组织信息
    generateMixed,
    /**
     * 图片预览地址生成
     */
    docIdToImg: function(docId) {
      let token = getToken()
      if (!token) return ''
      token = token.replace('Bearer', '')
      return BASE_API + '/base/Rest/file/preview' + '?docId=' + docId + '&access_token=' + token
    }
  }
}
