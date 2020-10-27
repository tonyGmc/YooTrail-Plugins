<template>
  <el-upload
    class="avatar-uploader"
    :action="Base_Url"
    :show-file-list="false"
    :headers="headers"
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
export default {
  data() {
    return {
      Base_Url: process.env.BASE_API + '/base/Rest/file/upload',
      Preview_Url: process.env.BASE_API + '/base/Rest/file/preview',
      headers: {
        Authorization: getToken()
      },
      loading: false,
      imageUrl: '',
      fileCode: ''
    }
  },
  methods: {
    initImg(fileId) {
      if (!fileId) {
        this.imageUrl = ''
        this.fileCode = ''
      } else {
        this.imageUrl = this.$docIdToImg(fileId)
        this.fileCode = fileId
      }
    },
    handleAvatarSuccess(info) {
      this.loading = false
      if (info.code === 0) {
        this.imageUrl = this.$docIdToImg(info.data)
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
