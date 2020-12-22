<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="top">
    <i class="el-icon-question color-yellow" style="font-size: 18px; vertical-align: text-top"></i>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
