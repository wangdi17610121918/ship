<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <div style="position: relative">

        <!-- {{$t('route.ship')}} -->
        <div id="map-main" :style="{height: mapHeight + 'px',width: 100 + '%',position: 'absolute', top: 0, left: 0, zIndex:1}" ref="mapBox">

        </div>
        <div style="position: absolute;z-index: 1;">
           <router-view :key="key"></router-view>
        </div>
        <tab-nav></tab-nav>
        <!-- v-if ="dialogTableVisible"
        :shiImo = 'shipImo'
        :isSetCenter = 'isSetCenter'
        :beforeClose='closeDliago'
        :portInquirys ='portInquiryshow'
        :vesselfile ='filleVlessShow'
        v-bind:dialogTableVisible = 'dialogTableVisible' -->
        <ship-detail  v-if="dialogTableVisible"
        :dialogTableVisible='dialogTableVisible'
        :isSetCenter = 'isSetCenter'
        :shipImo = "shipImo"
        :portInquirys ='portInquiryshow'
        :beforeClose='closeDliago'
        :vesselfile ='filleVlessShow'
        ></ship-detail>
        <port-inquiry  :dialogPortVisible = 'portTableVisible' :beforeClose="portcloseDliago"></port-inquiry>
        <vessel-file   :beforeClose='filleVlessClose' :dialogFilleVisible='vesselFileVisible' :back="backDetailShow" ></vessel-file>
        <side-nav></side-nav>
        <min-nav></min-nav>
      </div>

    </transition>
  </section>
</template>

<script>
// import _ from 'lodash'
import olMap from '@/views/routemap/map'
// import 'ol/ol.css';
import '../../../../static/lib/leaflet/Control.MiniMap.css'
import store from '@/store'
import tabNav from './tabNaver'
import ShipDetail from '@/views/routemap/shipDetail/index'
import portInquiry from '@/views/routemap/portInquiry/index'
import sideNav from './tabSide'
import minNav from './tabMin'
import vesselFile from '@/views/routemap/vesselFile/index'
import {
  mapGetters
} from 'vuex'
export default {
  components: {
    tabNav,
    ShipDetail,
    sideNav,
    portInquiry,
    minNav,
    vesselFile
  },
  name: 'AppMain',
  data() {
    return {
      mapHeight: window.innerHeight - 50,
      dialogTableVisible: false,
      portTableVisible: false,
      vesselFileVisible: false
    }
  },
  watch: {
    shipImo: function(newValue, oldValue) {
      // this.dialogTableVisible = false
      setTimeout(() => {
        this.dialogTableVisible = true
        // console.log(this.dialogTableVisible)
      }, 100)
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    ...mapGetters([
      'permission_routers',
      // 'sidebar',
      'allbackNew',
      'shipImo',
      'isSetCenter'
    ])
  },
  methods: {
    closeDliago() {
      olMap.removeCurrentMarker()
      this.dialogTableVisible = false
      store.dispatch('setImo', null)
      olMap.LazyLoadShip()
    },
    portInquiryshow() {
      this.portTableVisible = true
    },
    portcloseDliago() {
      this.portTableVisible = false
    },
    filleVlessShow() {
      // alert('222')
      this.vesselFileVisible = true
      this.dialogTableVisible = false
    },
    filleVlessClose() {
      this.vesselFileVisible = false
    },
    backDetailShow() {
      this.vesselFileVisible = false
      this.dialogTableVisible = true
    }
  },
  mounted() {
    /**
     * 初始化时设置map容器的高度，因为受css100%异常影响，
     * mpa容器默认取不到高度，
     * 因此需要js获取当前窗口的高度，并减去容器的上偏移
     * @return {Number}
     */
    const mapInnerHeight = () => {
      return window.innerHeight - this.$refs.mapBox.offsetTop
    }
    this.mapHeight = mapInnerHeight()

    window.onresize = () => {
      this.mapHeight = mapInnerHeight()
    }
    olMap.initMap('map-main')
    this.$store.dispatch('getBackNew').then((data) => {
      if (!this.allbackNew) return
      // console.log(this.allbackNew,'2222')
      olMap.shipPlateN = this.allbackNew.shipsN
      olMap.shipPlateY = this.allbackNew.shipsY
      olMap.portLists = this.allbackNew.ports
      if (this.allbackNew.ports !== null) {
        olMap.initPort()
      }
      olMap.initial()
    }).catch(() => {
      // this.loading = false
    })
  }
}
</script>
<style >
.Full-laden{
  fill:rgb(41, 249, 47);stroke:rgb(41, 249, 47);stroke-width:2;
}
.Full-ladenN{
fill:transparent;stroke:rgb(41, 249, 47);stroke-width:2;
}
.Null-laden{
  fill:rgb(255, 238, 53);stroke:rgb(255, 238, 53);stroke-width:2;
}
.Null-ladenN{
  fill:transparent;stroke:rgb(255, 238, 53);stroke-width:2;
}
.Full-laden:hover,.Full-ladenN:hover,.Null-laden:hover,.Null-ladenN:hover path{
  stroke: #ff5c00;
}
</style>
