<template>
  <div class="bg">
    <div class="title">会员详情</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item>会员详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      border
      style="width: 100%;text-align: center">
      <el-table-column
        prop="date"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="会员归属"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="address"
        label="年龄">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
