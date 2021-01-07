<template>
  <div class="app-select">
    <ul>
      <template v-for="item in appList">
        <li :key="item.appId" :class="{ active: checked.appId === item.appId }" @click="change(item)">
          <YooImage :src="$yootrial.docIdToImg(item.iconFileId)" />
          {{ item.appName }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { APP_ID } from '../../utils/constant'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    showInnerApp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      appList: [],
      checked: {}
    }
  },
  created() {
    this.getApp()
  },
  methods: {
    isShow(item) {
      // 是否需要判断内部应用 比如 项目列表
      const notInsideArr = ['/config/project']
      // isNotinside为true 表示这个页面不需要显示内部应用
      const isNotinside = notInsideArr.includes(this.$route.path)

      if (isNotinside) {
        if (item.innerApplication) {
          return false
        }
        return true
      } else {
        // 特殊处理 配置中心角色管理不需要显示配置中心
        if (['/config/role', '/config/user/setting'].includes(this.$route.path) && item.appId === APP_ID.CONFIG) {
          return false
        }
        return true
      }
    },
    getApp() {
      const { orgId, appId } = this.$store.state.app.orgInfo
      let url = 'sysApp/sysAppQueryOnly'
      if (appId === APP_ID.CONFIG) {
        url = 'project/getAdminConfigAppList'
      }
      this.$store.dispatch(url, orgId).then(res => {
        const arr = []
        res.data.forEach(item => {
          if (this.isShow(item)) {
            arr.push(item)
          }
        })
        this.appList = arr
        if (arr.length > 0) {
          this.checked = arr[0]
          this.$emit('change', this.checked)
        }
      })
    },
    change(app) {
      if (app.appId === this.checked.appId) {
        return false
      }
      this.checked = app
      this.$emit('change', this.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
.app-select {
  width: $app-select-bar-width;
  background: $background-gray;
  position: absolute;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  ul {
    margin: 0;
    padding: 0;
    li {
      cursor: pointer;
      word-break: break-all;
      &.active {
        background: #e8e8e8;
      }
      img {
        width: 48px;
        height: 48px;
        display: block;
        margin: 0 auto 8px;
      }
      padding: 16px 0;
      text-align: center;
    }
  }
}
</style>
