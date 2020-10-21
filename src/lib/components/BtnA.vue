<template>
  <a class="btn-a" :class="type" @click="$emit('click', $event)"><slot /></a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
