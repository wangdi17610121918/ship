<template>
    <map-dialog v-if="dataShow" class="port-inquiry-content" :visible.sync='dialogPortVisible' :beforeClose = 'beforeClose' width='1100px' top="100px" left='300px'>
      <template slot="title">
        <div class="port-inquiry-title">
          <span class="mr-l-15">
              <svg-icon class="font16" style="color:#ffa900" icon-class="sousuo" />
          </span>
          <span class="mr-l-10"  v-text="$t('portInquiry.title')">
            港口查询
          </span>
          <span class="mr-l-15 font12">
            {{$t('portInquiry.title_left')}}<span style="color:#ffa900">1</span>{{$t('portInquiry.title_right')}}
          </span>
        </div>
      </template>
      <el-table
        :data="tableData"
        @row-click="posiyionlat"
        border
        maxHeight="230"
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          v-bind:label="$t('portInquiry.No')"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="counrtyCn"
          v-bind:label="$t('portInquiry.counrtyCn')"
          width="120"
            align="center">
        </el-table-column>
        <el-table-column
          prop="counrtyEn"
          v-bind:label="$t('portInquiry.counrtyEn')"
          width="120"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="portNameCn"
          v-bind:label="$t('portInquiry.portNameCn')"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ata"
          v-bind:label="$t('portInquiry.ata')"
          width="160"
          align="center"
          show-overflow-tooltip
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="atd"
          v-bind:label="$t('portInquiry.atd')"
          width="160"
          align="center"
          :formatter="dateFormat"
          show-overflow-tooltip
          >
        </el-table-column>
        <!-- :formatter="dateFormat" -->
        <el-table-column
        prop="draughtIn"
        v-bind:label="$t('portInquiry.draughtIn')"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
        prop="draughtOut"
        v-bind:label="$t('portInquiry.draughtOut')"
          width="100"
            align="center">
        </el-table-column>
        <el-table-column
        prop="workTimePort"
        v-bind:label="$t('portInquiry.workTimePort')"
          width="130"
          align="center"
          :formatter="hourFormat">
        </el-table-column>
        <el-table-column
        prop="workTimeDoc"
        v-bind:label="$t('portInquiry.workTimeDoc')"
          width="130"
          align="center"
          :formatter="hourFormat">
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <template slot="footer">

      </template>   -->
  </map-dialog>
</template>

<script>
  import {
    reachPortSearch
  } from '@/api/routemap'
  import {
    mapGetters
  } from 'vuex'
  // import store from '@/store'
  import moment from 'moment'
  import mapDialog from '@/views/routemap/dragDialog/mapDialog'
  import Map from '@/views/routemap/map'
  // import moment from '@/lib/leaflet/moment'
  // import tableKey from '@/lang/zh/shipDetail'
  // import { parseTime } from '@/utils/index'
  import '@/styles/flag-icon.css'
  export default {
    components: {
      mapDialog
    },
    name: 'portInquirydragDialog',

    props: {
      dialogPortVisible: {
        type: Boolean
      },
      beforeClose: {
        type: Function
      }
    },
    data() {
      return {
        tableData: [],
        dataShow: false
      }
    },
    watch: {
      dialogPortVisible: function(newValue, oldValue) {
        this.dataShow = false
        this.inits()
      }
    },
    computed: {
      ...mapGetters([
        'shipInfos'
      ])
    },
    methods: {
      dateFormat: function(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss')
      },
      hourFormat: function(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(Number(date)).format('H')
      },
      inits() {
        const str = this.shipInfos.startTime.getTime()
        const end = this.shipInfos.endTime.getTime()
        const obj = {
          startTime: str,
          endTime: end,
          imo: this.shipInfos.imo,
          pageIndex: 0,
          pageSize: -1
        }
        console.log(obj.startTime)
        reachPortSearch(obj).then(response => {
          // console.log(response.data.datas)
          this.dataShow = true
          this.tableData = response.data.datas
        })
      },
      posiyionlat(row, event, column) {
        // Map.removeCurrentMarker()
        const L = window.L
        Map.mapView.setView(L.latLng(row.lat, row.lon))
        // Map.mapView.removeCurrentMarker()
        // Map.addCurrentMarker(row.lat, row.lng, item.heading)
      }
    },
    mounted() {
      // if(this.dialogPortVisible){
      //     this.inits()
      // }
      // console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
    }
  }
</script>
<style>
 .map_dialog {
    position: absolute;
    /* top: 390px;
    right: 140px; */
}
  /* .bascicon{
   font-size: 20px;
  } */
.port-inquiry-title{
  height: 44px;
  line-height: 44px;
  color: #fff;
}
.port-inquiry-content .el-table th.is-leaf {
    border-bottom: 1px solid #5c5c5c;
    background: rgba(33, 33, 33, .8);
    border-color: rgb(36, 36, 36);
    color: #fff;
}
.port-inquiry-content .el-table--group, .el-table--border {
    border: 1px solid rgb(36, 36, 36);
}
.port-inquiry-content .el-table__fixed::before, .el-table__fixed-right::before {
     background-color: rgba(33, 33, 33, .8);
}
.port-inquiry-content .el-table__row--striped>td,.el-table__body tr.hover-row>td{background-color:rgba(33,0,255,.5) !important;}
.port-inquiry-content .el-table__body tr.current-row>td{background-color:rgba(33,0,255,.5) !important}
.port-inquiry-content .el-table td{
  border-bottom: 1px solid #5c5c5c;
  background: rgba(33, 33, 33, .8);
  border-color: rgb(36, 36, 36);
  color: #fff;
}
.port-inquiry-content .el-table__empty-block {
    background: #181818;
    color: #fff;
}
.port-inquiry-content .el-table__body-wrapper::-webkit-scrollbar{
  width: 8px;
  height: 8px;
  background-color:rgba(78, 78, 78, .56);
}
.port-inquiry-content .el-table__body-wrapper::-webkit-scrollbar-thumb{
  width: 100px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
