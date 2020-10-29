<template>
  <div class="del-btn">
    <el-popconfirm v-if="!disabled" :title="title" @onConfirm="$emit('confirm')">
      <a slot="reference" class="btn-a error">
        <slot />
      </a>
    </el-popconfirm>
    <BtnA v-else :disabled="true"><slot /></BtnA>
  </div>
</template>

<script>
import BtnA from './BtnA'
export default {
  props: {
    title: {
      type: String,
      default: '是否确认删除?'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BtnA
  },
  methods: {
    confirm() {
      this
    }
  }
}
</script>

<style scoped>
.del-btn {
  display: inline;
}
</style>
