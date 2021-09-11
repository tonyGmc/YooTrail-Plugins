<template>
  <div class="tn-search-input" :style="{ width: width + 'px' }">
    <el-input
      v-model="val"
      :placeholder="placeholder"
      :size="size"
      :class="{ active: val && val.length > 0 }"
      clearable
      @input="inputFn"
      @clear="search"
      @keydown.enter.native="search"
    >
      <div v-if="val && val.length > 0" slot="append" class="seachButton" @click="search"><i class="el-icon-search"></i></div>
      <i v-else slot="suffix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  model: 'input',
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
    },
    width: {
      type: [String, Number],
      default: 240,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  data() {
    return {
      val: '',
    }
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.val = val
      }
    },
  },
  methods: {
    inputFn() {
      this.$emit('input', this.val)
    },
    search() {
      this.$emit('search')
    },
  },
}
</script>

<style lang="scss">
@import '../scss/variables.scss';
.tn-search-input {
  display: inline-block;
  .el-input.active {
    .el-input-group__append {
      padding: 0;
      background: $--color-primary;
      border-color: $--color-primary;
    }
    .el-input__inner {
      border-color: $--color-primary;
    }
  }
  .el-icon-search {
    font-size: 16px;
  }
  .seachButton {
    cursor: pointer;
    padding: 8px 12px;
    color: #fff;
  }
}
</style>
