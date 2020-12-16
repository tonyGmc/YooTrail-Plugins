<template>
  <el-dialog title="日志详情" :visible.sync="visibleDetail" width="500px" @close="closeDetail">
    <div v-if="detailData">
      <div v-for="item in detailData.details" :key="item" style="margin-bottom: 5px">
        <el-tag>{{ item }}</el-tag>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      visibleDetail: false,
      detailData: null,
      query: {},
    }
  },
  methods: {
    show(logId) {
      this.query.logId = logId
      this.$store.dispatch('log/queryDetailLogData', this.query).then((res) => {
        this.visibleDetail = true
        if (res.data) {
          this.detailData = res.data
        }
      })
    },
    closeDetail() {
      this.visibleDetail = false
    },
  },
}
</script>

<style scoped></style>
