<template>
  <div style="width:100%;height:100%;position: absolute;">
    <naver></naver>
    <div class="login-wrapper">
      <div class="phone-login">
        <div class="login-title">
          <h1>手机号绑定</h1>
        </div>
        <div class="login-input">
          <div class="login-phone">
            <input type="text" placeholder="请输入手机号" v-model="phone">
          </div>
          <button class="login-btn" @click="getPhone">确定</button>
          <button class="login-btn" @click="back" style="margin-top: 10px;">返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Naver from '../components/naver'
import { wxLoginPhone } from '@/api/httpList'
export default {
  data () {
    return {
      phone: '' // 电话号
    }
  },
  methods: {
    back () {
      sessionStorage.removeItem('openid')
      this.$router.push({path: '/login'})
    },
    getPhone () { // 获取验证码
      let phoneReg = /^1[3456789]\d{9}$/
      if (!phoneReg.test(this.phone)) {
        this.$message.error('请输入正确的手机号！')
      } else {
        wxLoginPhone({
          openid: sessionStorage.getItem('openid'),
          customerPhone: this.phone
        }).then(res => {
          if (res.msg === '绑定手机号失败') {
            this.$message.error('系统异常！')
          } else if (res.msg === '该手机号没有权限登录，请联系管理员') {
            this.$message.error('用户账号没有权限登录，请联系管理员！')
          } else if (res.msg === '该手机号已被使用过') {
            this.$message.error('该手机号已绑定过微信！')
          } else if (res.msg === '该用户状态无效，请联系管理员') {
            this.$message.error('该账户已被禁用，请联系管理员！')
          } else {
            this.$message({
              message: '手机号绑定成功！',
              type: 'success'
            })
            localStorage.setItem('userInfo', JSON.stringify(res.data.customerInfo[0]))
            localStorage.setItem('token', res.data.token)
            window.location.href = 'http://ntmove.com/static/gym/index.html#/personal'
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
  .phone-login {
    width: 250px;
    height: 270px;
    background: #fff;
    box-shadow: 6px 6px 12px 0px rgba(153,153,153,0.5);
    padding: 0 40px;
    .login-title {
      margin: 40px 0 5px 0;
      h1 {
        color: #000;
        font-size: 22px;
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
