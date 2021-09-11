<template>
  <div class="tn-null-tips">

    <img v-if="type === 'nulldefault'" src="../assets/null-default.png" alt="" />
    <img v-else-if="type === 'null404'" src="../assets/null-404.png" alt="" />
    <img v-else-if="type === 'nullmessage'" src="../assets/null-message.png" alt="" />
    <img v-else-if="type === 'nullproject'" src="../assets/null-project.png" alt="" />
    <img v-else-if="type === 'nullupload'" src="../assets/null-upload.png" alt="" />
    <span :style="{ fontSize: size + 'px' }">{{ labelStr }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'nulldefault',
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 18,
    },
  },
  data() {
    return {
      img: null,
      labelStr: '',
    }
  },
  created() {
    switch (this.type) {
      case 'nulldefault':
        this.labelStr = '暂无数据'
        break
      case 'null404':
        this.labelStr = '404'
        break
      case 'nullmessage':
        this.labelStr = '暂无信息'
        break
      case 'nullproject':
        this.labelStr = '暂无项目'
        break
      case 'nullupload':
        this.labelStr = '上传失败'
        break
    }
    if (this.label) this.labelStr = this.label
  },
}
</script>

<style lang="scss" scoped>
.tn-null-tips {
  width: 80%;
  margin: auto;
  padding: 40px 0;
  max-width: 300px;
  text-align: center;
  img {
    width: 100%;
  }
  span {
    font-size: 18px;
    color: #999;
    display: inline-block;
    margin-top: 8px;
  }
}
</style>
