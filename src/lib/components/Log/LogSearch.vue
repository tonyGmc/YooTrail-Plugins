<template>
  <div class="page-search-box">
    <div class="page-search-left">
      <el-select
        v-if="bussinessType"
        v-model="query.bussinessType"
        placeholder="业务类型"
        clearable
        size="small"
        style="width: 150px"
        @change="getList"
      >
        <el-option v-for="item in bussinessType" :key="item.code" :label="item.desc" :value="item.code"> </el-option>
      </el-select>
      <el-select
        v-if="logType"
        v-model="query.logType"
        style="width: 150px"
        size="small"
        placeholder="日志类型"
        clearable
        @change="getList"
      >
        <el-option v-for="item in logType" :key="item.code" :label="item.desc" :value="item.code"> </el-option>
      </el-select>
      <el-select
        v-if="operationType"
        v-model="query.operationType"
        size="small"
        style="width: 150px"
        placeholder="操作类型"
        clearable
        @change="getList"
      >
        <el-option v-for="item in operationType" :key="item.code" :label="item.desc" :value="item.code"> </el-option>
      </el-select>
      <el-date-picker
        v-model="searchData"
        size="small"
        style="width: 240px"
        :editable="false"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator=""
        start-placeholder="操作时间"
        end-placeholder=""
        :picker-options="pickerOptions2"
        @change="pickTime"
      >
      </el-date-picker>
      <el-input
        v-model.trim="query.operationUser"
        size="small"
        max-lenght="60"
        style="width: 200px"
        placeholder="请输入操作人名称"
      ></el-input>
      <el-button type="primary" size="small" @click="getList">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      detailData: null,
      operationType: [],
      bussinessType: [],
      logType: [],
      searchData: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      query: {
        logId: null,
        operationTime: ''
      }
    }
  },
  created() {
    this.$store.dispatch('log/querySearchParam').then(res => {
      if (res.data) {
        this.operationType = res.data.operationType
        this.bussinessType = res.data.bussinessType
        this.operationUser = res.data.operationUser
        this.logType = res.data.logType
      }
    })
  },
  methods: {
    pickTime(val) {
      let editcreateTime = null
      if (val != null && val !== '') {
        editcreateTime = val[0] + ',' + val[1]
      }
      this.query.operationTime = editcreateTime
      this.getList()
    },
    getList() {
      this.$emit('queryList', this.query)
    }
  }
}
</script>

<style scoped></style>
