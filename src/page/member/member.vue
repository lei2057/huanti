<template>
  <div class="bg">
    <div class="title">会员列表</div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%;text-align: center">
      <el-table-column
        prop="memberName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="subAccountId"
        label="教练手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="会员手机号">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="trainingObjectives"
        label="训练目标">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 0">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
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
import { selectMember } from '@/api/httpList'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    selectMember({
      token: localStorage.getItem('token'),
      customerId: JSON.parse(localStorage.getItem('userInfo')).id
    }).then(res => {
      this.tableData = res.data.memberList
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
