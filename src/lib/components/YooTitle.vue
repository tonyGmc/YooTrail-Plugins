<template>
  <div class="yoo-title">
    <div class="left">
      <h3>{{ title }}</h3>
      <div class="second-title">
        <slot name="secondTitle"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables.scss';
.el-card__body {
  .yoo-title {
    margin-top: -16px;
  }
}
.yoo-title {
  font-size: 14px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid $--border-color-base;
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  h4 {
    margin: 0;
  }
  .left {
    display: flex;
    align-items: center;
    .second-title {
      margin-left: 12px;
    }
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 4px;
    height: 14px;
    background: $--color-primary;
  }
}
</style>
