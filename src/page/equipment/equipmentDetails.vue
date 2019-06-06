<template>
  <div class="bg">
    <div class="disflex">
      <div class="title flex">设备使用记录</div>
      <button class="btn" @click="exportExcel">导出成EXCEL</button>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/equipment' }">设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>设备使用记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      id="out-table"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="设备ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="最近使用日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="模式">
      </el-table-column>
      <el-table-column
        prop="address"
        label="使用时长">
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  methods: {
    current_change (currentPage) { // 初始页
      this.currentPage = currentPage
    },
    exportExcel () { // EXCEL表个导出(#out-table):table表个ID
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'huanti.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
     }
  }
}
</script>

<style lang="scss" scoped>

</style>
