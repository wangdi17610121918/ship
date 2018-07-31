<template>
  <div class="app-wrapper" data-ss-class="classObj">

    <div class="main-container">
      <map-navbar :routerPath="paths"></map-navbar>
      <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
      <!-- <map-sidebar class="sidebar-container"></map-sidebar> -->
      <!-- <tags-view></tags-view> -->
      <map-main></map-main>
    </div>
  </div>
</template>

<script>
import { MapNavbar, core, AppMain, MapMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    MapNavbar,
    AppMain,
    MapMain,
    core
  },
  mixins: [ResizeMixin],
  data() {
    return {
      paths: ''
    }
  },
  watch: {
    $route(to, from) {
      this.paths = to.matched[0].redirect
    }
  },
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    device() {
      return this.$store.state.app.device
    }
    // classObj() {
    //   return {
    //     // hideSidebar: !this.sidebar.opened,
    //     withoutAnimation: this.sidebar.withoutAnimation,
    //     mobile: this.device === 'mobile'
    //   }
    // }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  },
  mounted() {
    this.paths = this.$route.matched[0].redirect
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  #app .main-container {
    min-height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    margin-left: 0;
    position: relative;
}
#app .sidebar-container {
    position: absolute;
    border-top: 1px solid #4f4f4f;
}
// #app .sidebar-container {
//     -webkit-transition: width 0.28s;
//     transition: width 0.28s;
//     width: 250px !important;
//     height: 100%;
//     font-size: 0px;
//     left: 0;
//     overflow: hidden;
// }
</style>
