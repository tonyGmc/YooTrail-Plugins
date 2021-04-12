import { getToken } from './utils/token'
import { getAppOrgId, filePreview } from './utils/index'
import { Loading } from 'element-ui'
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

// 文件下载
const fileDownload = function(baseApi) {
  return function(file) {
    window.open(
      baseApi + `/base/Rest/file/download?docId=${file.filePath}&fileName=${encodeURIComponent(file.fileName)}`
    )
  }
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

let loadingInstance
export function loading_start(msg) {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: msg || '请 稍 等 ',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.3)'
  })
}

export function loading_end() {
  loadingInstance.close()
}


export function loading_diy_start(str) {
  str = str || '请稍等...'
  const tnLoadingBox = document.createElement('div')
  tnLoadingBox.className = 'tn-loading-box'
  tnLoadingBox.innerHTML = `<i class="el-icon-loading"></i><div>${str}</div>`
  document.body.appendChild(tnLoadingBox)
}

export function loading_diy_end() {
  document.querySelectorAll('.tn-loading-box').forEach((item) => {
    document.body.removeChild(item)
  })
}

export default function(options) {
  let BASE_API = ''
  if (options) {
    BASE_API = options.BASE_API
  }
  return {
    newData,
    isNull,
    fileDownload: fileDownload(BASE_API),
    filePreview,
    nameShort,
    getObjectType,
    getAppOrgId, // 获取组织id或组织信息
    generateMixed,
    loading_start,
    loading_end,
    loading_diy_start,
    loading_diy_end,
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
