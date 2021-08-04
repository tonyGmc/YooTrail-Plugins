import BtnA from './components/BtnA.vue'
import DelBtn from './components/DelBtn.vue'
import SystemLog from './components/Log/index.vue'
import YooImage from './components/YooImage.vue'
import YooTitle from './components/YooTitle.vue'
import Page from './components/Page/index.vue'
import Mtable from './components/Mtable/index.vue'
import File from './components/upload/file.vue'
import UploadImg from './components/upload/img.vue'
import YooTips from './components/YooTips.vue'
import FilePreview from './components/FilePreview.vue'
import { numberOnly, numberZf, intervalclick, auth, capLocked } from './directive'
// 全局函数
import fn from './fn'
const yootrialPlugins = {
  install(Vue, options) {
    // a标签按钮
    Vue.component('BtnA', BtnA)
    // 带确认取消的删除按钮
    Vue.component('DelBtn', DelBtn)
    // 系统日志
    Vue.component('SystemLog', SystemLog)
    // img组件，加载失败显示默认图片
    Vue.component('YooImage', YooImage)
    // 上传文件
    Vue.component('YooUploadFile', File)
    // 上传文件
    Vue.component('YooUploadImg', UploadImg)
    // 标题
    Vue.component('YooTitle', YooTitle)
    // 页面框框
    Vue.component('Page', Page)
    // 表格
    Vue.component('Mtable', Mtable)
    // 文件预览
    Vue.component('FilePreview', FilePreview)
    // 问号文字提醒
    Vue.component('YooTips', YooTips)
    // 数字
    Vue.directive('numberOnly', numberOnly)
    // 可以输入负数 数字输入指令
    Vue.directive('numberZf', numberZf)
    // 连续点击
    Vue.directive('intervalclick', intervalclick)
    // 权限
    Vue.directive('auth', auth)
    // 大写监听
    Vue.directive('capLocked', capLocked)

    // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    Vue.prototype.$yootrial = fn(options)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(yootrialPlugins)
}
export default yootrialPlugins // 导出..
