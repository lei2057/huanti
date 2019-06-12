<template>
  <div style="width:100%;height:100%;position: absolute;">
    <naver></naver>
    <div class="login-wrapper">
      <div class="wechat-login" v-if="isShow">
        <div class="login-title">
          <h1>微信登录</h1>
          <p @click="login">手机号登录</p>
        </div>
        <div class="login-code">
          <img src="" alt="">
        </div>
      </div>
      <div class="phone-login" v-if="!isShow">
        <div class="login-title">
          <h1>手机号登录</h1>
          <p @click="login">微信登录</p>
        </div>
        <div class="login-input">
          <div class="login-phone">
            <input type="text" placeholder="请输入手机号" v-model="phone">
            <p v-if="!timeNone" class="code" @click="getCode">获取验证码</p>
            <p v-else class="btn-code"><i style="margin-right:3px;">{{time}}s</i>可获取验证码</p>
          </div>
          <div class="login-code">
            <input type="text" placeholder="请输入验证码" v-model="code">
          </div>
          <button class="login-btn" @click="loginSubmit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Naver from '../components/naver'
import { sendCode, login } from '@/api/httpList'
export default {
  data () {
    return {
      isShow: false, // 登录方式切换
      timeNone: false, // 验证码倒计时显示
      time: 60, // 倒计时初始化
      phone: '', // 电话号
      code: '' // 输入的验证码
    }
  },
  methods: {
    login () { // 登录方式切换
      this.isShow = !this.isShow
    },
    getCode () { // 获取验证码
      let phoneReg = /^1[3456789]\d{9}$/
      if (!phoneReg.test(this.phone)) {
        this.$message.error('请输入正确的手机号！')
      } else {
        sendCode({
          customerPhone: this.phone
        }).then(res => {
          console.log(res)
          this.$message({
            message: '验证码发送成功！',
            type: 'success'
          })
          sessionStorage.setItem('code', res.data.random)
          this.timeNone = true
          this.timer()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    timer () { // 验证码倒计时
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      } else {
        this.timeNone = false
        this.time = 60
      }
    },
    loginSubmit () {
      var _this = this
      let codeIn = sessionStorage.getItem('code')
      if (!this.phone) {
        this.$message.error('请输入手机号！')
      } else if (this.code !== codeIn) {
        this.$message.error('验证码错误！')
      } else {
        login({
          customerPhone: this.phone,
          random: codeIn
        }).then(res => {
          console.log(res)
          if (res.msg === '验证码错误') {
            this.$message.error('验证码错误,请重新发送验证码!')
          } else if (res.msg === '该用户不存在') {
            this.$message.error('该用户不存在')
          } else {
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
            localStorage.setItem('token', res.data.token)// 用户token值
            localStorage.setItem('userInfo', JSON.stringify(res.data.customerInfo[0]))
            localStorage.setItem('href', 'personal')// 导航高亮个人中心
            setTimeout(() => {
              _this.$router.push({path: '/personal'})
            }, 2000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  components: {
    Naver
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93%;
  .login-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 5px 0;
    h1 {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      flex: 1;
      text-align: left;
    }
    p {
      color: #A1C922;
      cursor: pointer;
    }
  }
  .wechat-login {
    width: 250px;
    height: 350px;
    background: #000;
    box-shadow: 6px 6px 12px 0px rgba(153,153,153,0.5);
    padding: 0 40px;
    .login-code {
      width: 210px;
      height: 210px;
      padding: 20px;
      background: #fff;
      margin: auto;
    }
  }
  .phone-login {
    width: 250px;
    height: 350px;
    background: #fff;
    box-shadow: 6px 6px 12px 0px rgba(153,153,153,0.5);
    padding: 0 40px;
    .login-title {
      margin: 40px 0 5px 0;
      h1 {
        color: #000;
      }
    }
    .login-input {
      input {
        border: 0;
        width: 98%;
        outline: none;
        padding: 0 5px;
      }
      .login-phone {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ddd;
        padding: 10px 5px 10px 0;
        margin-bottom: 25px;
        margin-top: 35px;
        input {
          flex: 1;
        }
        .code {
          color: #A1C922;
          cursor: pointer;
        }
      }
      .login-code {
        border: 1px solid #ddd;
        padding: 10px 5px 10px 0;
        margin-bottom: 25px;
      }
      .login-btn {
        background: #A1C922;
        color: #fff;
        width: 100%;
        height: 35px;
        line-height: 35px;
        border: 0;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>
