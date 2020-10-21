import BtnA from './components/BtnA.vue'
import DelBtn from './components/DelBtn.vue'
import YooImage from './components/YooImage.vue'
import Page from './components/Page/index.vue'
// 全局函数
import fn from './fn'
const yootrialPlugins = {
  install(Vue, options) {
    // a标签按钮
    Vue.component('BtnA', BtnA)
    // 带确认取消的删除按钮
    Vue.component('DelBtn', DelBtn)
    // img组件，加载失败显示默认图片
    Vue.component('YooImage', YooImage)
    // 页面框框
    Vue.component('Page', Page)

    // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    Vue.prototype.$yootrail = fn(options)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(yootrialPlugins)
}
export default yootrialPlugins // 导出..
