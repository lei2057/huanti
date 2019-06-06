<template>
  <div class="bg">
    <div class="title">模块详情</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/empower' }">已授权模块列表</el-breadcrumb-item>
      <el-breadcrumb-item>模块详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="listData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="模块名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="模块类别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">基础</span>
          <span v-else-if="scope.row.status == 1">特色</span>
          <span v-else-if="scope.row.status == 2">维密</span>
          <span v-else>大众</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="moduleIntroduced"
        label="模块介绍">
      </el-table-column>
      <el-table-column
        prop="fitPeople"
        label="模块所属人群">
      </el-table-column>
    </el-table>
    <div class="title">训练阶段</div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="stageSort"
        label="阶段编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageName"
        label="阶段名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageCourseNumber"
        label="课程数">
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
import { selectEmpowerDetails } from '@/api/httpList'
export default {
  data () {
    return {
      listData: [], // 子账号信息
      tableData: [], // 模块列表
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    let id = this.$route.query.id
    selectEmpowerDetails({
      token: localStorage.getItem('token'),
      moduleId: id
    }).then(res => {
      this.tableData = res.data.stageList
      this.listData.push(res.data.moduleInfo)
    })
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({
        name: 'empowerStage',
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
