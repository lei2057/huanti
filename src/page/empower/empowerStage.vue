<template>
  <div class="bg">
    <div class="title">已授权模块课程列表</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/empower' }">已授权模块列表</el-breadcrumb-item>
      <el-breadcrumb-item>模块详情</el-breadcrumb-item>
      <el-breadcrumb-item>已授权模块课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="课程ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageName"
        label="所属阶段名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageId"
        label="阶段ID">
      </el-table-column>
      <el-table-column
        prop="difficultyLevel"
        label="难度评级">
      </el-table-column>
      <el-table-column
        prop="duration"
        label="课程时间(分)">
      </el-table-column>
      <el-table-column
        prop="courseNumber"
        label="课程流程数">
      </el-table-column>
      <el-table-column
        prop="courseActionNumber"
        label="课程动作数">
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
import { selectEmpowerStage } from '@/api/httpList'
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
    selectEmpowerStage({
      token: localStorage.getItem('token'),
      stageId: id
    }).then(res => {
      this.tableData = res.data.courseList
    })
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({
        name: 'empowerStageDetails',
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
