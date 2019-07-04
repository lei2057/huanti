<template>
  <div class="bg">
    <div class="title">已授权模块列表</div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="模块名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="模块ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="所属类别">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">基础</span>
          <span v-else-if="scope.row.status == 1">特色</span>
          <span v-else-if="scope.row.status == 2">维密</span>
          <span v-else>大众</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-link type="success" :underline="false" @click="handleEdit(scope.$index, scope.row)">查看</el-link>
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
import { selectEmpower } from '@/api/httpList'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem('userInfo')).id
    if (sessionStorage.getItem('searchInfo') && sessionStorage.getItem('searchTitle') === '模块') {
      selectEmpower({
        token: localStorage.getItem('token'),
        queryKey: sessionStorage.getItem('searchInfo'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.moduleList
      })
    } else {
      selectEmpower({
        token: localStorage.getItem('token'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.moduleList
      })
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({
        name: 'empowerDetails',
        query: {
          id: row.id
        }
      })
    },
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
