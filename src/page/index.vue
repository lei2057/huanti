<template>
  <div class="wrapper">
    <naver></naver>
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import Naver from '../components/naver'
import Footers from '../components/footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Naver,
    Footers
  }
}
</script>

<style lang="scss" scoped>

</style>
