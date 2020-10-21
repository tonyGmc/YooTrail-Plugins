<template>
  <el-popconfirm :title="title" @onConfirm="$emit('confirm')">
    <a slot="reference" class="btn-a error">
      <slot />
    </a>
  </el-popconfirm>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '是否确认删除?'
    }
  }
}
</script>

<style></style>
