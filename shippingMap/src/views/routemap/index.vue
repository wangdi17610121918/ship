<template>
  <div>
      <!-- <tab-nav></tab-nav> -->

        <!-- <map-dialog v-map-drag-dialog ></map-dialog> -->
        <!-- <port-inquiry  v-if ="portTableVisible" :beforeClose='portcloseDliago' v-bind:dialogTableVisible = 'portTableVisible'></port-inquiry> -->
        <!-- <vessel-file v-if ="vesselFileVisible"  :beforeClose='filleVlessClose' v-bind:dialogTableVisible = 'vesselFileVisible'></vessel-file> -->
        <lineSpeed v-if ="lineSpeedVisible"></lineSpeed>
        <ship-search></ship-search>
  </div>
</template>
<script>
// import 'normalize.css/normalize.css
import {
  mapGetters
} from 'vuex'
import clipboard from '@/utils/clipboard'
import Map from '@/views/routemap/map'
// import config from '@/config'
// import shipDetail from './shipDetail'
// import portInquiry from './portInquiry'
import vesselFile from './vesselFile'
import lineSpeed from './lineSpeed'
import shipSearch from './shipsSearch'
// import store from '@/store'
// import mapDialog from './dragDialog/mapDialog'
export default {
  components: {
    vesselFile,
    lineSpeed,
    shipSearch
    // tabNav
  },
  name: 'icons',
  data() {
    return {
      iconsMap: [],
      mapHeight: window.innerHeight,
      Map: Map.mapView,
      shipDetailImo: '',
      dialogTableVisible: false,
      vesselFileVisible: false,
      lineSpeedVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      // 'sidebar',
      'allbackNew',
      'shipImo',
      'isSetCenter'
    ])
    // getSidebar() {
    //   return {
    //     opened: this.sidebar.opened,
    //     Map: this.Map
    //   }
    // }
    // getShipImo() {
    //   return {
    //     imo: this.shipImo
    //   }
    // }
  },
  // watch: {
  //   // getSidebar: (payload) => {
  //   //   payload.Map.invalidateSize()
  //   // }
  //   shipImo: function(newValue, oldValue) {
  //     alert('sss')
  //     this.dialogTableVisible = false
  //     // if (newValue && newValue !== oldValue) {
  //     //   setTimeout(() => {
  //     //     this.dialogTableVisible = true
  //     //   })
  //     // }
  //     setTimeout(() => {
  //       this.dialogTableVisible = true
  //     }, 100)
  //   }
  // },
  mounted() {
    // console.log(this.shipImo, 'ssssssssssssssssssssssssssss')
    // const L = window.L

  },
  destroyed() {
    // Map.mapView.removeLayer(this.ciLayer)
    // Map.mapView.removeEventListener()
    // Map.removeMarker(this.ciLayer, this.markers)
    // this.markers.map(marker => {
    //   this.ciLayer.removeMarker(marker)
    // })
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
    // shipDetailDliago(imo) {
    //   this.dialogTableVisible = false
    //   this.shipDetailImo = imo
    //   setTimeout(() => {
    //     this.dialogTableVisible = true
    //   }, 0)
    // },

    // portcloseDliago() {
    //   this.portTableVisible = false
    // },
    // portInquiryshow() {
    //   this.portTableVisible = true
    // },
    // filleVlessShow() {
    //   this.vesselFileVisible = true
    // },
    // filleVlessClose() {
    //   this.vesselFileVisible = false
    // }
  }
}
</script>

<style rel="stylesheet/css" lang="css">
  #map {
    height: 100%;
    overflow: hidden;
  }
  .bindTooltipHtml{
    line-height: 10px;
  }
  .zhezhao{
    position: absolute;
  }
  .pointText{
    position: absolute;
    left: 20px;
    top: 20px;
    text-align: center;
    width: 110px;
    background: rgba(55, 69, 112, 0.64);
    border-radius: 3px;
    color: #fff;
  }

</style>
