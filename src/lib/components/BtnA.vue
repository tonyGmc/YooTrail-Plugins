<template>
  <a class="btn-a" :class="type + (disabled ? 'disabled' : '')" @click="ck"><slot /></a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ck(e) {
      if (this.disabled) return false
      this.$emit('click', e)
    }
  }
}
</script>

<style>
.btn-a.disabled {
  cursor: not-allowed;
  color: #ccc;
}
</style>
