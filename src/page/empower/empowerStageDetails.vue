<template>
  <div class="bg">
    <div class="title">课程详情</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/empower' }">已授权模块列表</el-breadcrumb-item>
      <el-breadcrumb-item>模块详情</el-breadcrumb-item>
      <el-breadcrumb-item>已授权模块课程列表</el-breadcrumb-item>
      <el-breadcrumb-item>课程详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="courseInfo"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageId"
        label="阶段ID"
        width="180">
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
    </el-table>
    <div class="title">课程流程列表</div>
    <el-table
      :data="actionStageList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="流程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stageName"
        label="流程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="trainingMode"
        label="训练模式">
      </el-table-column>
      <el-table-column
        prop="strength"
        label="强度">
      </el-table-column>
      <el-table-column
        prop="doingWork"
        label="做功(秒)">
      </el-table-column>
      <el-table-column
        prop="recovery"
        label="恢复(秒)">
      </el-table-column>
      <el-table-column
        prop="actionNumber"
        label="动作数">
      </el-table-column>
      <el-table-column
        prop="estimatedTime"
        label="预计时长(分)">
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        @current-change="current_change"
        :page-size="pagesize"
        :total="actionStageList.length">
      </el-pagination>
    </div>
    <div class="title">课程动作</div>
    <el-table
      :data="courseStageActionList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="动作编号">
      </el-table-column>
      <el-table-column
        prop="actionId"
        label="动作ID">
      </el-table-column>
      <el-table-column
        prop="actionStageId"
        label="所属流程">
      </el-table-column>
      <el-table-column
        prop="actionName"
        label="动作名称">
      </el-table-column>
      <el-table-column
        prop="trainEquipment"
        label="训练器械">
      </el-table-column>
      <el-table-column
        prop="trainMode"
        label="训练模式">
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="训练个数">
      </el-table-column>
      <el-table-column
        prop="trainTime"
        label="训练时间(秒)">
      </el-table-column>
      <el-table-column
        prop="restTime"
        label="休息时间(秒)">
      </el-table-column>
      <el-table-column
        prop="trainForm"
        label="训练形式">
      </el-table-column>
      <el-table-column
        prop="trainGroupNumber"
        label="训练组数">
      </el-table-column>
      <el-table-column
        prop="estimatedTotalTime"
        label="预计总时间">
      </el-table-column>
      <el-table-column
        prop="note"
        label="动作注意事项">
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        @current-change="current_change"
        :page-size="pagesize"
        :total="courseStageActionList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectEmpowerStageDetails } from '@/api/httpList'
export default {
  data () {
    return {
      courseInfo: [], // 课程信息
      actionStageList: [], // 课程流程
      courseStageActionList: [], // 课程动作
      currentPage: 1, // 初始页
      pagesize: 5 // 每页的数据
    }
  },
  mounted () {
    let id = this.$route.query.id
    selectEmpowerStageDetails({
      token: localStorage.getItem('token'),
      courseId: id
    }).then(res => {
      this.courseInfo.push(res.data.courseInfo)
      this.actionStageList = res.data.actionStageList
      this.courseStageActionList = res.data.courseStageActionList
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
