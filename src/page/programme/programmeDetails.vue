<template>
  <div class="bg">
    <div class="title">方案名称</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/programme' }">方案列表</el-breadcrumb-item>
      <el-breadcrumb-item>方案名称</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="模块ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="模块名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="所属类别">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">基础</span>
          <span v-else-if="scope.row.type == 1">特色</span>
          <span v-else-if="scope.row.type == 2">维密</span>
          <span v-else>大众</span>
        </template>
      </el-table-column>
        <el-table-column
        prop="status"
        label="查看权限状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">可用</span>
          <span v-else>不可用</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        @current-change="current_change"
        :page-size="pagesize"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectProgrammeDetails } from '@/api/httpList'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    let id = this.$route.query.id
    selectProgrammeDetails({
      token: localStorage.getItem('token'),
      moduleIds: id
    }).then(res => {
      this.tableData = res.data.moduleList
    })
  },
  methods: {
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
