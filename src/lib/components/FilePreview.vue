<template>
  <div class="file-preview">
    <div class="left">
      <slot name="extend"></slot>
      <el-tooltip class="item" effect="dark" :content="file.fileName" placement="top">
        <span>{{ file.fileName }}</span>
      </el-tooltip>
    </div>
    <div class="right" :style="{ width: showDel ? '130px' : '100px' }">
      <BtnA>预览</BtnA>
      <BtnA>下载</BtnA>
      <BtnA v-if="showDel" type="error" @click="$emit('del-file', file)">删除</BtnA>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    showDel: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.file-preview {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  .left {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .right {
    width: 100px;
    text-align: right;
  }
}
</style>
