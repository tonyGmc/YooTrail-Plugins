<template>
  <div class="tn-table-con">
    <el-table
      ref="tableNode"
      v-if="test"
      v-loading="loading"
      :max-height="tableMaxHeight"
      :data="dataItem"
      :border="border"
      :header-cell-style="headerStyle"
      header-cell-class-name="tn-table-header"
      :empty-text="emptyText"
      :row-class-name="tableRowClassName"
      stripe
      @row-click="rowClick"
      @cell-click="cellClick"
      @expand-change="expandChange"
      @selection-change="handleSelectionChange"
      @current-change="currentChange"
    >
      <slot></slot>
      <div slot="empty">
        <div></div>
        <p :style="{ marginTop: '23px' }">
          {{ emptyText }}
          <slot name="empty"></slot>
        </p>
      </div>
    </el-table>
    <div v-if="needPagination" class="tn-paging">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        :current-page="query.pageNum"
        @current-change="currentPage"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    storeName: {
      // 表格数据请求地址
      type: String,
      default: ''
    },
    isParseParams: {
      // 是否转字符串
      type: Boolean,
      default: false
    },
    queryData: {
      // 查询检索字段
      type: Object,
      default: () => {}
    },
    border: {
      // 是否边框
      type: Boolean,
      default: false
    },
    needPagination: {
      // 是否需要分页
      type: Boolean,
      default: true
    },
    emptyText: {
      // 无数据提示文字
      type: String,
      default: '暂无数据'
    },
    headerStyle: {
      // 表头样式
      type: Object,
      default: () => {}
    },
    tableRowClassName: {
      type: Function,
      default: () => {}
    },
    isStartload: {
      type: Boolean,
      default: true
    },
    subHeight: {
      type: Number,
      default: 280
    }
  },
  data() {
    return {
      dataItem: [],
      totalCount: 0,
      loading: false,
      query: {
        pageSize: 10,
        pageNum: 1
      },
      test: false,
      tableMaxHeight: 500
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.initHeight, false)
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.test = true
      }, 100)
    })
  },
  created() {
    this.initHeight()
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.initHeight, false)
    this.query = this.extend(this.query, this.queryData)
    if (this.isStartload) {
      this.loadItem()
    }
  },
  methods: {
    clearData() {
      this.dataItem = []
      this.query.pageSize = 10
      this.query.pageNum = 1
      this.totalCount = 0
    },
    rowClick(row, column, event) {
      this.$emit('row-click', { row, column, event })
    },
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', { row, column, cell, event })
    },
    expandChange(row, expandedRows) {
      this.$emit('expand-change', { row, expandedRows })
    },
    handleSelectionChange(e) {
      this.$emit('selection-change', e)
    },
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', { currentRow, oldCurrentRow })
    },
    currentPage(e) {
      this.query.pageNum = e
      this.loadItem()
    },
    parseParams(param) {
      let paramStr = ''
      for (const key in param) {
        paramStr += '&' + key + '=' + param[key]
      }
      return paramStr.substr(1)
    },
    sizeChange(e) {
      this.query.pageNum = 1
      this.query.pageSize = e
      this.loadItem()
    },
    reload(isReset = true) {
      if (isReset) {
        this.query.pageNum = 1
      }
      this.query = this.extend(this.query, this.queryData)
      this.loadItem()
    },
    loadItem() {
      this.loading = true
      let query = this.query
      if (this.isParseParams) {
        query = this.parseParams(this.query)
      }
      this.$store.dispatch(this.storeName, query).then(res => {
        // let reDatas = response.rows
        // if (reDatas === undefined) {
        //   reDatas = response.data.datas.rows
        //   this.totalCount = response.data.datas.total
        // } else {
        //   this.totalCount = response.total
        // }
        const { total, list } = res.data
        this.totalCount = total * 1
        if (this.totalCount === 0) {
          this.$emit('noData')
        }
        this.$emit('getTableData', list)
        this.dataItem = list
        this.loading = false
      })
    },
    extend(old, newData) {
      for (const key in newData) {
        old[key] = newData[key]
      }
      return old
    },
    getIdx(idx) {
      return (this.query.pageNum - 1) * this.query.pageSize + 1 + idx
    },
    node() {
      return this.$refs.tableNode
    },
    initHeight() {
      const height = document.documentElement.clientHeight
      this.tableMaxHeight = height - this.subHeight
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables.scss';
.tn-table {
  height: 100%;
}
.tn-table-con {
  th .cell {
    color: #333;
  }
}
.tn-paging {
  width: 100%;
  overflow: hidden;
  .el-pagination {
    float: right;
    padding: 15px 0 10px;
  }
}
</style>
