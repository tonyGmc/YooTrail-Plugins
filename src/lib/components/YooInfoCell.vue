<template>
  <div class="icp-info-cell">
    <label>
      {{ label }}
      <slot name="label"></slot>
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
}
</script>

<style></style>
