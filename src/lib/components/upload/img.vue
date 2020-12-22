<template>
  <el-upload
    class="avatar-uploader"
    :action="Base_Url"
    :show-file-list="false"
    :headers="headers"
    :data="{
      domain
    }"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" width="100%" height="100%" class="avatar" />
    <template v-else>
      <i v-if="loading" class="el-icon-loading"></i>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
    }
  },
  data() {
    return {
      Base_Url: '',
      Preview_Url: '',
      headers: {
        Authorization: getToken()
      },
      loading: false,
      imageUrl: '',
      fileCode: '',
      domain: ''
    }
  },
  created() {
    const orginfo = getAppOrgId(this, true)
    if (orginfo) {
      this.domain = orginfo.appCode.toLocaleLowerCase()
      if (this.domain === 'config') this.domain = 'platform'
      if (this.domain === 'ctmsmaintain') this.domain = 'ctms'
      if (this.domain === 'capturemaintain') this.domain = 'capture'
    } else {
      this.domain = 'platform'
    }
    this.Base_Url = this.baseApi + '/base/Rest/file/upload'
    this.Preview_Url = this.baseApi + '/base/Rest/file/preview'
  },
  methods: {
    initImg(fileId) {
      if (!fileId) {
        this.imageUrl = ''
        this.fileCode = ''
      } else {
        this.imageUrl = this.$yootrial.docIdToImg(fileId)
        this.fileCode = fileId
      }
    },
    handleAvatarSuccess(info) {
      this.loading = false
      if (info.code === 0) {
        this.imageUrl = this.$yootrial.docIdToImg(info.data)
        this.fileCode = info.data
        this.$emit('change', this.fileCode)
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传jpg或者png类型的图片')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('图片不能超过 10MB!')
        return false
      }
      this.loading = true
      return isJpgOrPng && isLt2M
    }
  }
}
</script>
<style lang="scss">
.avatar-uploader {
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: #eee;
  .avatar {
    vertical-align: top;
  }
}
</style>
