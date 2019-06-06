<template>
  <div class="bg">
    <div class="title">子账号详情</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/account' }">子账号</el-breadcrumb-item>
      <el-breadcrumb-item>子账号详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="listData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="status"
        label="子账号状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">可查看模块</div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="typeId"
        label="模块ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="模块名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="所属类别">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="subAccountStatus"
        label="权限状态">
        <template slot-scope="scope">
          <span v-if="scope.row.subAccountStatus == 0">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleUpdate(scope.$index, scope.row, 0)">启用</el-link>
          <el-link type="info" :underline="false" @click="handleUpdate(scope.$index, scope.row, 1)">禁用</el-link>
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
import { selectAccountDetails, accountDetailsUpdate } from '@/api/httpList'
export default {
  data () {
    return {
      listData: [], // 子账号信息
      tableData: [], // 模块列表
      currentPage: 1, // 初始页
      pagesize: 5, // 每页的数据
      accountId: ''// 子账号id
    }
  },
  inject: ['reload'],
  mounted () {
    let id = this.$route.query.id
    this.accountId = this.$route.query.id
    selectAccountDetails({
      token: localStorage.getItem('token'),
      subAccountId: id,
      status: 0
    }).then(res => {
      this.tableData = res.data.moduleList
      this.listData.push(res.data.subAccountInfo)
    })
  },
  methods: {
    handleUpdate (index, row, key) { // 状态启用禁用
      if (parseInt(row.subAccountStatus) === key) {
        this.$message({
          type: 'info',
          message: '状态改变无效!'
        })
      } else {
        accountDetailsUpdate({
          subAccountId: this.accountId,
          moduleId: row.id,
          subAccountStatus: key
        }).then(res => {
          this.$message({
            type: 'success',
            message: '状态改变成功!'
          })
          this.reload()
        })
      }
    },
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
