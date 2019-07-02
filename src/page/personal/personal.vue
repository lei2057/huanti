<template>
  <div class="bg">
    <div class="title disflex">
      <div class="flex">个人中心</div>
      <div class="btn" @click="updateShow" v-text="update?'返回':'修改'">修改</div>
      <div class="btn" style="margin-left: 10px;" @click="exit">退出登录</div>
    </div>
    <div class="personal-wrapper">
      <div class="personal-list">
        <ul>
          <li>
            <p class="list-title">客户名称：</p>
            <p class="list-text">{{userInfo.customerName}}</p>
          </li>
          <li>
            <p class="list-title">客户ID：</p>
            <p class="list-text">{{userInfo.id}}</p>
          </li>
          <li>
            <p class="list-title">客户状态：</p>
            <p class="list-text" v-if="userInfo.status == 0">已启用</p>
            <p class="list-text" v-else>已禁用</p>
          </li>
          <li>
            <p class="list-title">登录密码：</p>
            <p class="list-text" v-if="!isShow">{{passwordHide}}</p>
            <p class="list-text" v-if="isShow">{{userInfo.customerPassword}}</p>
          </li>
          <li style="justify-content: normal;">
            <div style="margin-top: -5px;margin-right: 10px;">显示密码</div>
            <el-switch
              v-model="value"
              active-color="#A1C922"
              inactive-color="#000"
              active-value="true"
              inactive-value="false"
              @change="password">
            </el-switch>
          </li>
        </ul>
      </div>
      <div class="personal-list" v-if="!update">
        <ul>
          <li>
            <p class="list-title">公司：</p>
            <p class="list-text">{{userInfo.company}}</p>
          </li>
          <li>
            <p class="list-title">地址：</p>
            <p class="list-text">{{userInfo.address}}</p>
          </li>
          <li>
            <p class="list-title">邮箱：</p>
            <p class="list-text">{{userInfo.email}}</p>
          </li>
          <li>
            <p class="list-title">手机号：</p>
            <p class="list-text">{{userInfo.customerPhone}}</p>
          </li>
        </ul>
      </div>
      <div class="personal-list" v-if="update">
        <ul>
          <li>
            <p class="list-title">公司：</p>
            <input type="text" class="list-text" placeholder="请输入新的公司名" v-model="company">
          </li>
          <li>
            <p class="list-title">地址：</p>
            <input type="text" class="list-text" placeholder="请输入新的地址" v-model="address">
          </li>
          <li>
            <p class="list-title">邮箱：</p>
            <input type="text" class="list-text" placeholder="请输入新的邮箱" v-model="email">
          </li>
          <li>
            <p class="list-title">手机号：</p>
            <input type="text" class="list-text" placeholder="请输入新的手机号" v-model="phone">
          </li>
        </ul>
      </div>
    </div>
    <div class="btn personal-btn" v-if="update" @click="updateSubmit">确定</div>
  </div>
</template>

<script>
import { userUpdate } from '@/api/httpList'
export default {
  data () {
    return {
      value: true, // 按钮切换
      isShow: false, // 密码显示
      update: false, // 修改信息
      passwordHide: '', // 密码加密
      userInfo: [], // 用户信息
      company: '',
      address: '',
      email: '',
      phone: ''
    }
  },
  inject: ['reload'],
  mounted () {
    setTimeout(() => {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // 密码加密
      let len = this.userInfo.customerPassword.length
      let xx = this.userInfo.customerPassword.substring(0, len - 4)
      this.passwordHide = this.userInfo.customerPassword.replace(xx, '****')
    }, 0)
  },
  methods: {
    password () { // 开关按钮显示完整密码
      this.isShow = !this.isShow
    },
    updateShow () {
      this.update = !this.update
    },
    updateSubmit () {
      let phoneReg = /^1[3456789]\d{9}$/
      // eslint-disable-next-line no-useless-escape
      let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!phoneReg.test(this.phone)) {
        this.$message.error('请输入正确的手机号！')
      } else if (!emailReg.test(this.email)) {
        this.$message.error('请输入正确的邮箱地址！')
      } else if (!this.company || !this.address) {
        this.$message.error('请完整修改信息！')
      } else {
        this.$confirm('确定要修改个人信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          userUpdate({
            company: this.company,
            address: this.address,
            email: this.email,
            customerPhone: this.phone,
            customerId: this.userInfo.id
          }).then(res => {
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            this.reload()
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改！'
          })
        })
      }
    },
    exit () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功！'
        })
        localStorage.clear()
        window.location.href = 'https://ntmove.com/static/gym/index.html#/login'
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.update-btn {
  float: right;
}
.personal-wrapper {
  display: flex;
  width: 70%;
  margin: 80px auto 0;
  .personal-list {
    float:left;
    width: 50%;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      height: 30px;
      line-height: 30px;
      .list-title {
        text-align: left;
        width: 80px;
        margin-right: 50px;
      }
      .list-text {
        flex: 1;
        text-align: left;
      }
      input {
        padding: 0 5px;
      }
    }
  }
}
.personal-btn {
  margin: 80px auto 0;
}
</style>
