<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    // 区分关闭和刷新，关闭退出登录
    window.onload = function () {
      if (!window.sessionStorage['tempFlag']) {
        // window.addEventListener('beforeunload', e => {
          window.localStorage['href'] = 'personal'
        // })
      } else {
        window.sessionStorage.removeItem('tempFlag')
      }
    }
    window.onunload = function () {
      window.sessionStorage['tempFlag'] = true
    }
    window.onbeforeunload = function () {
      window.sessionStorage['tempFlag'] = true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  height: auto;
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
}
iframe {
  position: absolute;
  top: -63px;
  left: -26px;
}
</style>
