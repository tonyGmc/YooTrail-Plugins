<template>
  <el-upload
    class="yoo-upload-file"
    :class="{ 'theme-box': theme === 'box' }"
    :drag="theme === 'box'"
    :action="Base_Url"
    :headers="headers"
    :data="{
      domain
    }"
    :show-file-list="theme === 'button' && showFileList"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeUpload"
    :on-progress="progress"
    :on-remove="remove"
    :file-list="files"
    :disabled="percent > 0"
  >
    <template v-if="$slots.default">
      <slot v-if="percent === 0"></slot>
      <span v-else>{{ percent }}%</span>
    </template>
    <template v-if="!$slots.default">
      <el-button :disabled="disabled" v-if="theme === 'button'" type="primary" size="small" icon="el-icon-upload">
        <template v-if="percent === 0">{{ btnName }}</template>
        <template v-else>上传中（{{ percent }}%）</template>
      </el-button>
      <template v-else>
        <template v-if="percent === 0">
          <i class="el-icon-upload" size="20"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </template>
        <div v-else><i class="el-icon-loading"></i> 上传中（{{ percent }}%）</div>
      </template>
    </template>
  </el-upload>
</template>
<script>
import { getToken } from '../../utils/token'
import { getAppOrgId } from '../../utils/index'
export default {
  props: {
    baseApi: {
      type: String,
      default: process.env.BASE_API
    },
    fileList: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    types: {
      type: Array,
      default: () => []
    },
    btnName: {
      type: String,
      default: '上传文件'
    },
    // 文件大小限制， 单位Mb
    size: {
      type: Number,
      default: 200
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
      files: [],
      domain: ''
    }
  },
  watch: {
    fileList(val) {
      const arr = []
      for (let i = 0; i < this.fileList.length; i++) {
        arr.push({
          name: this.fileList[i].fileName,
          response: {
            code: 0,
            data: this.fileList[i].filePath
          }
        })
      }
      this.files = arr
    }
  },
  created() {
    this.Base_Url = this.baseApi + '/base/Rest/file/upload'
    const orginfo = getAppOrgId(this, true)
    if (orginfo) {
      this.domain = orginfo.appCode.toLocaleLowerCase()
      if (this.domain === 'config') this.domain = 'platform'
      if (this.domain === 'ctmsmaintain') this.domain = 'ctms'
      if (this.domain === 'capturemaintain') this.domain = 'capture'
    } else {
      this.domain = 'platform'
    }
  },
  methods: {
    handleAvatarSuccess(info, file, fileList) {
      this.percent = 0
      this.files = fileList
      if (info.code === 0) {
        this.fileCode = info.data
        this.$emit('change', file)
        this.$emit('fileChange', this.getFileLObj())
      }
    },
    remove(file, fileList) {
      this.files = fileList
      this.$emit('removeFile', file)
      this.$emit('fileChange', this.getFileLObj())
    },
    getFileLObj() {
      const arr = []
      this.files.forEach(item => {
        const a = item.name.split('.')
        const type = a[a.length - 1]
        arr.push({
          fileName: item.name,
          fileSize: item.size,
          fileType: '.' + type,
          filePath: item.response.data
        })
      })
      return arr
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
      if (type === 'sh' || type === 'exe' || type === 'bat') {
        this.$message({
          message: '禁止上传exe、bat和sh文件!',
          type: 'warning'
        })
        return false
      }

      // 文件大小限制
      // 把文件大小转为b
      const limitSizeB = this.size * 1024 * 1024
      if (file.size > limitSizeB) {
        this.$message({
          message: '文件大小不能超过' + this.size + 'Mb',
          type: 'warning'
        })
        return false
      }

      // 如果未给定格式，那么可以接收所有格式文件
      if (this.types.length === 0) {
        return true
      } else {
        // 把类型全部转为小写后判断
        let isOk = false
        for (let i = 0; i < this.types.length; i++) {
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
