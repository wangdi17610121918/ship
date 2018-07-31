<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <div style="position: relative">

        <!-- {{$t('route.ship')}} -->
        <!-- <div id="map-main" :style="{height: mapHeight + 'px',width: 100 + '%',position: 'absolute', top: 0, left: 0, zIndex:1}" ref="mapBox">

        </div> -->
        <div style="position: relative;z-index: 1;">
           <router-view :key="key"></router-view>
        </div>

      </div>

    </transition>
  </section>
</template>

<script>
// import olMap from '@/views/routemap/map'
// import 'ol/ol.css';

export default {
  name: 'AppMain',
  data() {
    return {

    }
  },
  computed: {

    key() {
      return this.$route.fullPath
    }
  },
  mounted() {

  }
}
</script>
