<template>
  <img :src="src" :onerror="defaultImg" />
</template>

<script>
import defaultImg from '../images/default_img.png'
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultImg: 'this.src="' + defaultImg + '"'
    }
  }
}
</script>

<style></style>
