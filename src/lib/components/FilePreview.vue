<template>
  <div class="file-preview">
    <div class="left">
      <slot name="extend"></slot>
      <el-tooltip
        class="item"
        effect="dark"
        content="文件名称文件名称文件名称文件名称文件名称文件名称文件名称文件名称"
        placement="top"
      >
        <span>文件名称文件名称文件名称文件名称文件名称文件名称文件名称文件名称</span>
      </el-tooltip>
    </div>
    <div class="right">
      <BtnA>预览</BtnA>
      <BtnA>下载</BtnA>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
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
