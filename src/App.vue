<template>
  <div id="app">
    <Page>
      <template slot="title">应用管理</template>
      <YooImage :src="123123" />
    </Page>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log(this.$yootrail.newData)
  }
}
</script>
