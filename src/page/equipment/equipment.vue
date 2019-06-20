<template>
  <div class="bg">
    <div class="disflex">
      <div class="title flex">设备列表</div>
      <el-date-picker
        v-model="timeSlot"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <button class="btn" style="margin-left:10px;" @click="record">生成使用记录</button>
    </div>
    <el-button size="mini" type="success" plain @click="infoAll">显示全部</el-button>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="equipmentName"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="id"
        label="设备ID">
      </el-table-column>
      <el-table-column
        prop="status"
        label="设备状况">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">租出</span>
          <span v-else-if="scope.row.status == 1">可用</span>
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
import { selectEquipment } from '@/api/httpList'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 5, // 每页的数据
      timeSlot: ''// 时间段
    }
  },
  inject: ['reload'],
  mounted () {
    let id = JSON.parse(localStorage.getItem('userInfo')).id
    if (sessionStorage.getItem('searchInfo') && sessionStorage.getItem('searchTitle') === '设备') {
      selectEquipment({
        token: localStorage.getItem('token'),
        queryKey: sessionStorage.getItem('searchInfo'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.equipmentList
      })
    } else {
      selectEquipment({
        token: localStorage.getItem('token'),
        customerId: id
      }).then(res => {
        this.tableData = res.data.equipmentList
      })
    }
  },
  methods: {
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    },
    infoAll () { // 显示全部(删除话缓存)
      sessionStorage.removeItem('searchInfo')
      sessionStorage.removeItem('searchTitle')
      this.reload()
    },
    record () {
      // console.log(this.timeSlot)
      // console.log(this.formatDate(this.timeSlot[0]))
      // console.log(this.formatDate(this.timeSlot[1]))
      this.$router.push({
        name: 'equipmentDetails'
      })
    },
    formatDate (date) {
      if (typeof date === 'string') {
        return this.formatDate2(date)
      }
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    formatDate2 (date) {
      var y = date.substring(0, 4)
      var m = date.substring(5, 7)
      var d = date.substring(8, 10)
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
