<template>
  <div class="bg">
    <div class="title">方案列表</div>
    <el-button size="mini" type="success" plain @click="infoAll">显示全部</el-button>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="planName"
        label="方案名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="方案ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="方案状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">已启用</span>
          <span v-else>未启用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="包含模块">
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
import { selectProgramme } from '@/api/httpList'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    if (sessionStorage.getItem('searchInfo') && sessionStorage.getItem('searchTitle') === '方案') {
      selectProgramme({
        token: localStorage.getItem('token'),
        queryKey: sessionStorage.getItem('searchInfo'),
        status: 0
      }).then(res => {
        this.tableData = res.data.planList
      })
    } else {
      selectProgramme({
        token: localStorage.getItem('token'),
        status: 0
      }).then(res => {
        this.tableData = res.data.planList
      })
    }
  },
  methods: {
    handleEdit (index, row) {
       this.$router.push({
        name: 'programmeDetails',
        query: {
          id: row.moduleIds
        }
      })
    },
    infoAll () { // 显示全部(删除话缓存)
      sessionStorage.removeItem('searchInfo')
      sessionStorage.removeItem('searchTitle')
      this.reload()
    },
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
