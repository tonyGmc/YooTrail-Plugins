<template>
  <div id="page-configure">
    <AppSelect v-if="selectApp" @change="appChange" />
    <div class="relative-full" :class="{ 'page-select-app': selectApp }">
      <el-container class="page-configure relative-full">
        <el-header class="page-configure-header">
          <div class="left">
            <h3 v-if="paths.length === 1">{{ paths[0].fuceName }}</h3>
            <el-breadcrumb v-if="paths.length > 1" separator-class="el-icon-arrow-right">
              <template v-for="(item, index) in paths">
                <el-breadcrumb-item v-if="index === 0 || index === paths.length" :key="item.fuceId">
                  {{ item.fuceName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :key="item.fuceId" :to="{ path: item.fuceResource }">
                  {{ item.fuceName }}
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </div>
          <div v-if="orgName" class="right">{{ orgName }}</div>
        </el-header>
        <!-- 只有一块的布局 -->
        <el-main v-if="!lrConfig" class="page-configure-main">
          <slot />
        </el-main>
        <!-- 左右都有的布局，如: 菜单管理 -->
        <el-container v-else class="page-configure-in-container">
          <el-aside class="page-configure-in-aside" :width="lrConfig.leftWidth + 'px'">
            <slot name="lr-left" />
          </el-aside>
          <el-main class="page-configure-main">
            <slot name="lr-right" />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  // 是否需要选择App
  props: {
    selectApp: {
      type: Boolean,
      default: false
    },
    /**
     * 是否左右都有, 如果为null，则为只有一部分
     * 包含：
     * leftWidth 左侧宽度
     */
    lrConfig: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      orgName: '',
      checkedApp: '',
      paths: []
    }
  },
  mounted() {
    if (this.$store.state.app && this.$store.state.app.orgName) {
      this.orgName = this.$store.state.app.orgInfo.orgName
      this.getTitle()
    }
  },
  methods: {
    getTitle() {
      const path = this.$route.path
      const orgInfo = this.$store.getters['app/orgInfo']
      let paths = []
      const recursion = function(arr) {
        for (let i = 0; i < arr.length; i++) {
          paths.push(arr[i])
          if (arr[i].fuceResource === path) {
            break
          }
          if (arr[i].childrenList.length > 0) {
            recursion(arr[i].childrenList)
          } else {
            paths = []
          }
        }
      }
      recursion(orgInfo.functionList)
      this.paths = paths
    },
    appChange(e) {
      this.checkedApp = e
      this.$emit('appChange', e)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables.scss';
#page-configure {
  position: relative;
  height: 100%;
}

.page-configure {
  .page-configure-in-container {
    overflow: auto;
  }
  .page-configure-in-aside {
    background: $background-gray;
    padding: 30px 16px;
  }
  .page-configure-main {
    padding: 24px;
  }
}
.page-configure-header {
  padding: 0 28px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  h3 {
    font-size: 16px;
  }
}
</style>
