<template>
  <div class="bg">
    <div class="title">关于NT</div>
    <img src="../../assets/img.png" alt="">
    <div class="title">反馈类型</div>
    <div class="select-wrapper">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="title">反馈与帮助</div>
    <div class="textarea-wrapper">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 5}"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
    </div>
    <button class="btn customer-btn" @click="submit">提交</button>
  </div>
</template>

<script>
import { customer } from '@/api/httpList'
export default {
  data () {
    return {
      textarea: '',
      options: [{
          value: '0',
          label: '设备'
        }, {
          value: '1',
          label: '培训'
        }],
      value: ''
    }
  },
  inject: ['reload'],
  methods: {
    submit () {
      let userId = JSON.parse(localStorage.getItem('userInfo')).id
      let userName = JSON.parse(localStorage.getItem('userInfo')).customerName
      this.$confirm('请确认是否要提交反馈信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        customer({
          token: localStorage.getItem('token'),
          customerId: userId,
          customerName: userName,
          type: this.value,
          content: this.textarea,
          status: 0
        }).then(res => {
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea-wrapper /deep/ .el-textarea__inner {
  height: 170px !important;
  resize:none;
  font-size: 16px;
}
.customer-btn {
  margin-top: 20px;
  float: right;
}
.select-wrapper {
  text-align: left;
}
.select-wrapper /deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: #A1C922;
}
.select-wrapper /deep/ .el-select .el-input__inner:focus {
  border-color: #A1C922;
}
.el-select-dropdown__item.selected {
  color: #A1C922;
}
</style>
