<template>
  <transition>
    <router-view></router-view>
  </transition>
</template>


<script type="text/javascript">
export default {
  name: 'app'
}
</script>


<style lang="scss">
  // @import "~assets/scss/animate.scss";
  html {
    height: 100%;
  }
  body {
    max-width: 7.5rem;
    height: 100%;
    margin: 0 auto;
  }
</style>
