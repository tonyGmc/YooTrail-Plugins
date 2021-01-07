<template>
  <div class="file-preview">
    <div class="left">
      <slot name="extend"></slot>
      <el-tooltip class="item" effect="dark" :content="file.fileName" placement="top">
        <span>{{ file.fileName }}</span>
      </el-tooltip>
    </div>
    <div class="right" :style="{ width: showDel ? '130px' : '100px' }">
      <BtnA @click="preview()">预览</BtnA>
      <BtnA @click="download()">下载</BtnA>
      <BtnA v-if="showDel" type="error" @click="$emit('del-file', file)">删除</BtnA>
    </div>
  </div>
</template>

<script>
import { filePreview } from '../utils/index'
export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    showDel: {
      type: Boolean,
      default: false
    },
    baseApi: {
      type: String,
      default: ''
    },
    test: {
      type: String,
      default: ''
    },
    env: {
      type: String,
      default: 'test'
    }
  },
  methods: {
    preview() {
      filePreview(this.env, this.file)
    },
    download() {
      window.open(
        this.baseApi +
          `/base/Rest/file/download?docId=${this.file.filePath}&fileName=${encodeURIComponent(this.file.fileName)}`
      )
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
