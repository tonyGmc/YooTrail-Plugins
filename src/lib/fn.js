import { getToken } from './utils/token'
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

export default function(options) {
  let BASE_API = ''
  if (options) {
    BASE_API = options.BASE_API
  }
  return {
    newData,
    nameShort,
    /**
     * 图片预览地址生成
     */
    docIdToImg: function(docId) {
      let token = getToken()
      token = token.replace('Bearer', '')
      return BASE_API + '/base/Rest/file/preview' + '?docId=' + docId + '&access_token=' + token
    }
  }
}
