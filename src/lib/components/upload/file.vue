<template>
  <el-upload
    class="yoo-upload-file"
    :class="{ 'theme-box': theme === 'box' }"
    :drag="theme === 'box'"
    :action="Base_Url"
    :headers="headers"
    :show-file-list="theme === 'button'"
    multiple
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeUpload"
    :on-progress="progress"
    :disabled="percent > 0"
  >
    <el-button v-if="theme === 'button'" type="primary" size="small" icon="el-icon-upload">
      <template v-if="percent === 0">上传文件</template>
      <template v-else>上传中（{{ percent }}%）...</template>
    </el-button>
    <template v-else>
      <template v-if="percent === 0">
        <i class="el-icon-upload" size="20"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <div v-else><i class="el-icon-loading"></i> 上传中（{{ percent }}%）...</div>
    </template>
  </el-upload>
</template>
<script>
import { getToken } from '../../utils/token'
export default {
  props: {
    baseApi: {
      type: String,
      default: ''
    },
    types: {
      type: Array,
      default: () => []
    },
    // 主题 'button' 和 'box'
    theme: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {
      Base_Url: '',
      headers: {
        Authorization: getToken()
      },
      loading: false,
      imageUrl: '',
      fileCode: '',
      percent: 0,
      fileList: []
    }
  },
  created() {
    this.Base_Url = this.baseApi + '/base/Rest/file/upload'
  },
  methods: {
    handleAvatarSuccess(info, file, fileList) {
      this.percent = 0
      this.fileList = fileList
      if (info.code === 0) {
        this.imageUrl = this.$docIdToImg(info.data)
        this.fileCode = info.data
        this.$emit('change', file)
      }
    },
    handleAvatarError() {
      this.percent = 0
      this.$message.error(`上传失败`)
    },
    progress(e) {
      this.percent = Math.ceil(e.percent)
    },
    beforeUpload(file) {
      const arr = file.name.split('.')
      const type = arr[arr.length - 1].toLocaleLowerCase()
      console.log(type)
      // 如果未给定格式，那么可以接收所有格式文件
      if (this.types.length === 0) {
        return false
      } else {
        // 把类型全部转为小写后判断
        let isOk = false
        for (let i = 0; i < this.types.length; i++) {
          console.log(this.types[i].toLocaleLowerCase() === type)
          if (this.types[i].toLocaleLowerCase() === type) {
            isOk = true
            continue
          }
        }
        if (!isOk) {
          this.$message.error(`不支持的文件格式.${type}，请上传${this.types.join('、')}`)
        }
        return isOk
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';
.yoo-upload-file {
  &.theme-box .el-upload.el-upload--text {
    width: 100%;
    margin-top: 12px;
  }
  .el-upload-dragger {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon-upload {
      margin: 0;
      margin-right: 20px;
      font-size: 50px;
    }
    .progress-box {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #000;
        position: relative;
        z-index: 2;
        font-size: 18px;
      }
      .progress {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: $--color-danger;
        &.full {
          background: $--color-success;
        }
      }
    }
  }
}
</style>
