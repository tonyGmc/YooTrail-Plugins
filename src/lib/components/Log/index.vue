<template>
  <Page>
    <LogSearch ref="searchTable" @queryList="getList" />
    <Mtable ref="Mtable" store-name="log/queryLogData" :query-data="queryInfo" :is-startload="false">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="logTypeDesc" label="日志类型" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="businessTypeDesc" label="业务类型" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createUserName" label="操作人" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="operationTypeDes" label="操作类型" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="description" label="描述" :show-overflow-tooltip="true"></el-table-column>
      <slot></slot>
      <el-table-column prop="createTime" label="操作时间" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="name" label="操作" width="80px" align="center">
        <template slot-scope="{ row }">
          <BtnA @click="showDetail(row)">详情</BtnA>
        </template>
      </el-table-column>
    </Mtable>
    <LogDetail ref="detailTable" />
  </Page>
</template>

<script>
import LogDetail from './LogDetail'
import LogSearch from './LogSearch'
export default {
  components: {
    LogDetail,
    LogSearch
  },
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      queryInfo: {
        logId: null,
        operationTime: ''
      }
    }
  },
  mounted() {
    this.queryInfo = Object.assign({}, this.queryInfo, this.query)
    this.$refs.Mtable.reload()
  },
  methods: {
    getList(query) {
      this.query = query
      this.$refs.Mtable.reload()
    },
    showDetail(row) {
      this.$refs.detailTable.show(row.id)
    }
  }
}
</script>

<style></style>
