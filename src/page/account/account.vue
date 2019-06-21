<template>
  <div class="bg">
    <div class="disflex">
      <div class="title flex">子账号</div>
      <button class="btn" @click="dialogVisible = true">添加</button>
    </div>
    <!-- <el-button size="mini" type="success" plain @click="infoAll">显示全部</el-button> -->
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
          <span v-if="scope.row.status == 0">已启用</span>
          <span v-else>未启用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-link type="success" :underline="false" @click="handleEdit(scope.$index, scope.row)">查看</el-link>
          <el-link type="primary" :underline="false" @click="handleUpdate(scope.$index, scope.row, 0)">启用</el-link>
          <el-link type="info" :underline="false" @click="handleUpdate(scope.$index, scope.row, 1)">禁用</el-link>
          <el-link type="danger" :underline="false" @click="handleDel(scope.$index, scope.row)">删除</el-link>
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
    <!-- 弹窗 -->
    <el-dialog title="添加子账号" :visible.sync="dialogVisible" width="420px">
      <el-form :model="form">
        <el-input v-model="form.name" placeholder="姓名"></el-input>
        <!-- <el-input v-model="form.number" placeholder="ID"></el-input> -->
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addNumber">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectAccount, addAccount, accountUpdate, accountDel } from '@/api/httpList'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
          name: '',
          number: '',
          phone: ''
        },
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  // inject: ['reload'],
  mounted () {
    let id = JSON.parse(localStorage.getItem('userInfo')).id
    if (sessionStorage.getItem('searchInfo') && sessionStorage.getItem('searchTitle') === '子账号') {
      selectAccount({
        token: localStorage.getItem('token'),
        queryKey: sessionStorage.getItem('searchInfo'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.subAccountList
      })
    } else {
      selectAccount({
        token: localStorage.getItem('token'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.subAccountList
      })
    }
  },
  methods: {
    handleEdit (index, row) { // 查看详情
      this.$router.push({
        name: 'accountDetails',
        query: {
          id: row.id
        }
      })
    },
    handleUpdate (index, row, key) { // 状态启用禁用
      if (parseInt(row.status) === key) {
        this.$message({
          type: 'info',
          message: '状态改变无效!'
        })
      } else {
        accountUpdate({
          subAccountId: row.id,
          status: key
        }).then(res => {
          this.$message({
            type: 'success',
            message: '状态改变成功!'
          })
          this.reload()
        })
      }
    },
    handleDel (index, row) { // 删除
      this.$confirm('确定要删除次账号么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        accountDel({
          subAccountId: row.id
        }).then(res => {
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addNumber () { // 添加子账号
      let id = JSON.parse(localStorage.getItem('userInfo')).id
      let phoneReg = /^1[3-578]\d{9}$/
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error('请输入正确的手机号！')
      } else if (!this.form.name) {
        this.$message.error('请完整修改信息！')
      } else {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        addAccount({
          token: localStorage.getItem('token'),
          name: this.form.name,
          phone: this.form.phone,
          customerId: id,
          status: 0
        }).then(res => {
          if (res.msg === '该手机号已经被使用，暂不能注册') {
            this.$message.error('该手机号已经被使用，暂不能注册')
          } else {
            this.reload()
          }
        })
      }
    },
    // infoAll () { // 显示全部(删除话缓存)
    //   sessionStorage.removeItem('searchInfo')
    //   sessionStorage.removeItem('searchTitle')
    //   this.reload()
    // },
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dialog__wrapper /deep/ .el-dialog {
  margin: 0 !important;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 20px 30px 0 30px;
}
.el-dialog__wrapper /deep/ .el-dialog__title {
  font-weight: 700
}
.el-dialog__wrapper /deep/ .el-input__inner {
  margin-bottom: 20px;
}
</style>
