<template>
  <div style="border-bottom: 1px solid #dddddd;">
    <div class="nav-wrapper">
      <div class="logo"><img src="../assets/logo.png" width="100%" height="100%"></div>
      <el-header >
        <el-menu :default-active="activeIndex"
                router
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                text-color="#000"
                active-text-color="#A1C922">
          <el-menu-item index="personal" >个人中心</el-menu-item>
          <el-menu-item index="member">会员列表</el-menu-item>
          <el-menu-item index="equipment">设备列表</el-menu-item>
          <el-menu-item index="programme">方案列表</el-menu-item>
          <el-menu-item index="account">子账号</el-menu-item>
          <el-menu-item index="empower">已授权模块</el-menu-item>
          <el-menu-item index="customer">客服中心</el-menu-item>
        </el-menu>
      </el-header>
      <div class="input-wrapper">
        <el-dropdown trigger="click"  @command="handleCommand">
          <span class="el-dropdown-link" >
            {{searchValue}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>类别</el-dropdown-item>
            <el-dropdown-item v-for="item in options" :key="item.id" :command="item.value">{{item.value}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <input type="text" placeholder="搜索你喜欢的" v-model="sousuo">
        <div class="sous" @click="query">
          <img src="../assets/sou.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      sousuo: '',
      options: [{
        value: '设备',
        id: '设备'
      }, {
        value: '模块',
        id: '模块'
      }, {
        value: '方案',
        id: '方案'
      }, {
        value: '子账号',
        id: '子账号'
      }],
      searchValue: '类别'
    }
  },
  inject: ['reload'],
  mounted () {
    setTimeout(() => {
      this.activeIndex = localStorage.getItem('href')// 导航颜色高亮
    }, 100)
    this.activeIndex = localStorage.getItem('href')// 导航颜色高亮
  },
  methods: {
    handleSelect (key, keyPath) { // element默认导航方法
      localStorage.setItem('href', key)
    },
    handleCommand (command) { // 获取下拉列表的值
      this.searchValue = command
    },
    query () { // 搜索查询
      if (!localStorage.token) {
        this.$message.error('请登陆后查询！')
      } else if (this.searchValue === '设备') {
        this.$router.push({path: '/equipment'})
        localStorage.setItem('href', 'equipment')
        sessionStorage.setItem('searchInfo', this.sousuo)
        sessionStorage.setItem('searchTitle', this.searchValue)
        this.reload()
      } else if (this.searchValue === '模块') {
        this.$router.push({path: '/empower'})
        localStorage.setItem('href', 'empower')
        sessionStorage.setItem('searchInfo', this.sousuo)
        sessionStorage.setItem('searchTitle', this.searchValue)
        this.reload()
      } else if (this.searchValue === '方案') {
        this.$router.push({path: '/programme'})
        localStorage.setItem('href', 'programme')
        sessionStorage.setItem('searchInfo', this.sousuo)
        sessionStorage.setItem('searchTitle', this.searchValue)
        this.reload()
      } else if (this.searchValue === '子账号') {
        this.$router.push({path: '/account'})
        localStorage.setItem('href', 'account')
        sessionStorage.setItem('searchInfo', this.sousuo)
        sessionStorage.setItem('searchTitle', this.searchValue)
        this.reload()
      } else {
        this.$message({
          type: 'info',
          message: '请选择类别和搜索的内容!'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 60px;
    height: 60px;
  }
  .input-wrapper {
    padding: 5px 10px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      border: 0;
      margin: 0 5px;
      padding: 0 5px;
      outline: none;
    }
    .sous {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
.el-menu-item {
  font-size: 16px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #999;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
