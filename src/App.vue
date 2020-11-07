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
  created() {
    console.log(jsPlumb)
  },
  mounted() {
    console.log(1)
    this.$nextTick(() => {
      console.log(3)
      jsPlumb.draggable('item_left')
      jsPlumb.draggable('item_right')
      console.log(document.getElementById('item_left'))
      try {
        jsPlumb.ready(() => {
          jsPlumb.connect({
            source: 'item_left',
            target: 'item_right'
          })
        })
      } catch (e) {
        console.log(e)
      }
    })
    console.log(5)
    console.log(2)
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
