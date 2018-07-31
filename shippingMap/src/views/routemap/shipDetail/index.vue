<template>
  <!-- v-if= 'dialogTableVisible' shiImo='shiImo' beforeClose = 'beforeClose' left="20px" top="94px" width='504px' -->
    <map-dialog v-if="dataShow" class="detail" :visible.sync='dialogTableVisible'  :shipImo='shipImo' :beforeClose='beforeClose' left="20px" :top="topHeight" width='504px'>
      <template slot="title">
        <div class="detail_title">
          <el-row :gutter="20">
            <el-col :span="11" class="detail_title-text"><div class="">{{tableInfo.shipName}}</div></el-col>
            <el-col :span="12" class="detail_title-icon">
              <span class="mr-l-15" :title="$t('detail.messageIcon')">
                <svg-icon class="font16" icon-class="tianqi" />
                {{$t('publics.weathers')}}

              </span>
              <span class="mr-l-20" :title="$t('detail.weatherIcon')">
                <svg-icon class="font16" icon-class="guanzhu" />
                {{$t('publics.favorites')}}
              </span>
            </el-col>
          </el-row>
        </div>
      </template>
      <div class="detail">
        <el-row :gutter="20" style="margin-top:4px">
          <el-col :span="11" class="mr-l-20  font12" style="color:#C8C8C8"><span class="">{{tableInfo.IMO}}</span><span class="font16">·</span><span>{{tableInfo.shipType}}</span></el-col>
        </el-row>
        <div class="detail-content">
        <el-row >
          <el-col class="line-option" v-for="item in Object.keys(list.group) " :key="item.imo" :span="12">
            <div class="grid-content bg-purple">
              <el-col :span="9" class="name">
               {{$t('detail.group.' + item )}}:
              </el-col>
              <el-col :span="13" class="table-rignt">
              <span v-if='item =="displayCountryCn"'>
                {{isI18n ? tableInfo['displayCountryCn'] : tableInfo['displayCountryEn']}}
                <span class="flag-icon" :class="tableInfo.country">
                </span>
              </span>
              <span v-if='item !=="displayCountryCn"'>
                 {{isI18n ? tableInfo[item] : arrEn.findIndex(i => i == item ) > -1 ? tableInfo[item + 'En'] : tableInfo[item]}}
              </span>
              </el-col>
            </div>
          </el-col>
        </el-row>
         <el-row >
          <el-col  class="line-option" v-for="item in Object.keys(list.group1) "  :key="item.imo" :span="12">
            <div class="grid-content bg-purple">
              <el-col :span="9"  class="name">
               {{$t('detail.group1.' + item )}}:
              </el-col>
              <el-col :span="13" class="table-rignt">
                <span v-if="item == 'SDWT'">
                  {{tableInfo[item]}}Mt
                </span>
                <span v-else>
                   {{tableInfo[item]}}
                </span>
              </el-col>
            </div>
          </el-col>
        </el-row>
         <el-row >
          <el-col  class="line-option"  v-for="item in Object.keys(list.group2) "  :key="item.imo" :span="12">
            <div class="grid-content bg-purple">
              <el-col :span="9"  class="name">
               {{$t('detail.group2.' + item )}}:
              </el-col>
              <el-col :span="13" class="table-rignt">
                <span v-if='item =="loadCn"'>
                {{isI18n ? tableInfo['loadCn'] : tableInfo['loadEn']}}
                </span>
              <span v-if='item !=="loadCn"'>
                <span v-if='item =="shipSpeed"'>
                  {{isI18n ? tableInfo[item]+'节' :tableInfo[item]+'Knots' }}
                </span>
                 <span v-else-if='item =="shipWaterline"'>
                   {{tableInfo[item]}}m
                </span>
                 <span v-else-if='item =="shipFullWaterline"'>
                   {{tableInfo[item]}}m
                </span>
                 <span v-else>
                   {{isI18n ? tableInfo[item] : arrEn.findIndex(i => i == item ) > -1 ? tableInfo[item + 'En'] : tableInfo[item]}}
                </span>

              </span>

              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <el-col class="lh32" :span="24">
            <div class="grid-content bg-purple">
              <el-col :span="5"  class="name">
               {{$t('detail.timeRange')}}:
              </el-col>
              <el-col :span="19">
              <div class="time">
              <span class="d1-time-cpm d1-time-cpm1">
                <el-date-picker v-model="startTime" prefix-icon="fs-calendar"  class="timeP1" size="small" type="datetime"
                  placeholder="选择日期" >

                </el-date-picker>
              </span>
            </div>
            <em class="sr-lineb">-</em>
            <div class="time">
              <span class="d1-time-cpm d1-time-cpm1">
                <el-date-picker  v-model="endTime" prefix-icon="fs-calendar"  class="timeP1" size="small" type="datetime"
                  placeholder="选择日期" >

                </el-date-picker>
              </span>

            </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        </div>
      </div>

<template slot="footer">
  <div class="footButton">
    <el-button type="warning" size="small" v-show='btnshow' v-text="$t('detail.voyageHistory')" @click="trajectoryQuery()">租船拼船</el-button>
    <el-button type="info" size="small" v-show='!btnshow' v-text="$t('detail.clearvoyageHistory')" @click="cleartrajectoryQuery()">租船拼船</el-button>
    <el-button type="warning" size="small"  v-text="$t('detail.portCalling')"  @click="portInquiry()">租船拼船</el-button>
    <el-button type="warning" size="small"  v-text="$t('detail.vesselFile')"  @click="vessfileshow()">租船拼船</el-button>
    <el-button type="warning" size="small"  v-text="$t('detail.routeSpeed')" >租船拼船</el-button>
    <el-button type="warning" size="small" v-show='isShipPlate == 1' v-text="$t('detail.vesselDetails')" >租船拼船</el-button>
  </div>
  <div class="footTips">
    <span v-text="$t('detail.tipText')">提示：本平台使用谷歌地图，为了使您获得最佳的查询航速航线体验，建议使用谷歌浏览器</span>
  </div>
</template>
</map-dialog>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    vessel,
    shipLine
  } from '@/api/routemap'
  import {
    isI18n
  } from '@/lang/index'
  import _ from 'lodash'
  // import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import mapDialog from '@/views/routemap/dragDialog/mapDialog'
  import tableKey from '@/lang/zh/shipDetail'
  import '@/styles/flag-icon.css'
  import Map from '@/views/routemap/map'
  import store from '@/store'
  export default {
    components: {
      mapDialog
    },
    name: 'dragDialog-demo',
    // directives: {
    //   elDragDialog
    // },
    props: {
      // shipImo: null,
      dialogTableVisible: {
        type: Boolean
      },
      beforeClose: {
        type: Function
      },
      portInquirys: {
        type: Function
      },
      vesselfile: {
        type: Function
      },
      isSetCenter: {
        type: Boolean
      }
    },
    computed: {
      ...mapGetters([
        'shipImo'
      ])
    },
    data() {
      return {
        list: {
          group: tableKey.group,
          group1: tableKey.group1,
          group2: tableKey.group2
        },
        tableInfo: {},
        arrEn: ['destination', 'shipCondition', 'displayCountryCn', 'loadCn', 'nowSeaArea', 'shipCondition', 'shipInitial', 'nowSeaArea'],
        isI18n,
        portTableVisible: '',
        startTime: new Date(new Date() - 7 * 24 * 3600 * 1000),
        endTime: new Date(new Date()),
        btnshow: true,
        isShipPlate: 0,
        dataShow: false,
        topHeight: '',
        detailLAT: '',
        detailLNG: ''
        // shiImo:'',
        // dialogTableVisible:true
      }
    },
    watch: {
      $route(to, from) {
        this.initTop()
        this.dataShow = false
      },
      shipImo(n, o) {
        this.shipvessel()
      }
    },
    methods: {
      shipvessel() {
        // console.log(this.$route.params.imo)
        // this.shiImo = this.$route.params.imo
        if (!_.isEmpty(this.shipImo)) {
          var obj = {
            imo: this.shipImo
          }
          vessel(obj).then(response => {
            if (response || response.data) {
              this.dataShow = true
              const data = response.data.features[0].properties
              if (this.isSetCenter) {
                const L = window.L
                Map.mapView.setZoom(8)
                Map.mapView.setView(L.latLng(data.lat, data.lng))
                Map.addCurrentMarker(data.lat, data.lng, data.rotation)
              }
              this.detailLAT = response.data.features[0].properties.lat
              this.detailLNG = response.data.features[0].properties.lng
              this.tableInfo = response.data.features[0].properties.shipMessage
              this.isShipPlate = response.data.features[0].properties.isShipPlate
              // const end = (this.endTime).getTime()
            }
          })
        } else {
          return false
        }
      },
      portInquiry() {
        this.portInquirys()
        const reachPort = {
          imo: this.tableInfo.IMO,
          startTime: this.startTime,
          endTime: this.endTime,
          lat: this.detailLAT,
          lng: this.detailLNG,
          mmsi: this.tableInfo.MMSI
        }
        store.dispatch('shipInfos', reachPort)
      },
      vessfileshow() {
        const reachPort = {
          imo: this.tableInfo.IMO,
          startTime: this.startTime,
          endTime: this.endTime,
          lat: this.detailLAT,
          lng: this.detailLNG,
          mmsi: this.tableInfo.MMSI
        }
        store.dispatch('shipInfos', reachPort)
        this.vesselfile()
      },
      trajectoryQuery(imo) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var start = new Date(this.startTime).getTime()
        var end = new Date(this.endTime).getTime()
        if (start < end) {
          Map.historyMarkerBlean = true
          const obj = {
            'startTime': start,
            'endTime': end,
            'imo': this.tableInfo.MMSI
          }
          shipLine(obj).then(response => {
            if (!_.isEmpty(response.data.point)) {
              loading.close()
              Map.addShipline(response.data.point)
              this.btnshow = false
            } else {
              loading.close()
              alert('暂无数据')
            }
          })
        } else {
          this.$alert('<span style="text-align: center; display: block; font-weight: bold;">开始时间不能小于结束时间</span>', '信息', {
            dangerouslyUseHTMLString: true,
            showClose: false
          })
        }
      },
      cleartrajectoryQuery() {
        this.btnshow = true
        Map.historyMarkerBlean = false
        Map.initShip = true
        Map.removeShipHistoryMarker()
        Map.removeShipHistoryLine()
        Map.initial()
      },
      initTop() {
        if (this.$route.name === 'ship') {
          this.topHeight = '150px'
        } else {
          this.topHeight = '104px'
        }
      }
    },
    mounted() {
      this.initTop()
      this.shipvessel()
    }
  }
</script>
<style>
 .map_dialog {
    position: absolute;
    /* top: 62px;
    right: 12px; */
}
.detail_title{
  padding-top: 10px;
}
.detail_title .detail_title-text {
  margin-left: 20px;
  /* color: #008CD2; */
  font-size: 16px;
  font-weight: 600;
}
.detail_title .detail_title-icon {
  font-size: 12px;
}
.detail-content{
  margin:18px 0 0 20px;
  font-size: 12px;
}
  .el-dialog__body {
    padding: 0px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }
  .time {
    display: inline-block;
  }
  .time_range {
    display: inline-block;
  }
  .timeP1 {
    width: 176px !important;
    height: 30px;
  }
  .timeP1 input {
    background-color: rgba(33, 33, 33, 0.1);
    color: rgb(229, 229, 229);
    padding-right: 30px;
    border: 1px solid rgb(92, 92, 92);
    font-size: 12px;
  }
  .timeP1 .el-input--suffix .el-input__inner {
    padding-right: 5px;
}
  .timeFrame .timeD {
    width: 90px;
    display: inline-block;
    text-align: right;
  }

  .footTips span {
    font-size: 12px;
    color: #595a5e;
    padding-bottom: 10px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .detail .el-row {
    color: #fff;
  }
  .el-row:nth-child(3) {
    border-bottom: none;
  }
  .el-row:nth-child(4) {
    border-bottom: none;
  }
  .el-row .name {
    color: #C8C8C8;
    text-align: left;
    padding-right: 10px;
  }
  .table-rignt{
    color: #fff;
    padding-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bascicon{
   font-size: 20px;
  }
  .footer{
    color: #fff
  }
  .detail .line-option{
    height: 24px;
    line-height: 24px;
  }
</style>
