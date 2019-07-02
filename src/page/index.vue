<template>
  <div class="wrapper">
    <naver></naver>
    <router-view></router-view>
  </div>
</template>

<script>
import Naver from '../components/naver'
export default {
  data () {
    return {

    }
  },
  components: {
    Naver
  }
}
</script>

<style lang="scss" scoped>

</style>
