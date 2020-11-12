<template>
  <div class="app-select">
    <ul>
      <template v-for="item in appList">
        <li
          v-if="(showInnerApp && !item.innerApplication) || !showInnerApp"
          :key="item.appId"
          :class="{ active: checked === item.appId }"
          @click="change(item.appId)"
        >
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
      checked: ''
    }
  },
  created() {
    this.getApp()
  },
  methods: {
    getApp() {
      const { orgId, appId } = this.$store.state.app.orgInfo
      let url = 'sysApp/sysAppQueryOnly'
      if (appId === APP_ID.CONFIG) {
        url = 'project/getOrgAppByOrgId'
      }
      this.$store.dispatch(url, orgId).then(res => {
        this.appList = res.data
        if (this.showInnerApp) {
          // 如果只显示内部应用
          const obj = this.appList.find(item => !item.innerApplication)
          if (obj) this.checked = obj.appId
        } else {
          this.checked = this.appList[0].appId
        }
        this.$emit('change', this.checked)
      })
    },
    change(e) {
      if (e === this.checked) {
        return false
      }
      this.checked = e
      this.$emit('change', e)
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
        background: #fff;
      }
      padding: 16px 0;
      text-align: center;
    }
  }
}
</style>
