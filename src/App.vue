<template>
  <div id="diagramContainer">
    <div id="item_left" class="item"></div>
    <div id="item_right" class="item" style="margin-left: 50px"></div>
  </div>
</template>
<script>
import { jsPlumb } from 'jsplumb'
export default {
  data() {
    return {
      jp: null
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      jsPlumb.draggable('item_left')
      jsPlumb.draggable('item_right')
      try {
        jsPlumb.ready(() => {
          jsPlumb.connect({
            source: 'item_left',
            target: 'item_right'
          })
        })
      } catch (e) {}
    })
  }
}
</script>
<style scoped>
.item {
  position: absolute;
  height: 80px;
  width: 80px;
  border: 1px solid blue;
  float: left;
}
</style>
