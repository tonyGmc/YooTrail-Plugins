<template>
  <div id="app">
    <Page>
      <template slot="title">应用管理</template>
    </Page>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log(this.$yootrail.nameShort('aaaa'))
  }
}
</script>
