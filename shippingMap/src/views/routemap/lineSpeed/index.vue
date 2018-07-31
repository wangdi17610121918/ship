<template>
    <map-dialog  v-if="dataShow" :visible.sync='dataShow'  :beforeClose = 'beforeClose' width='1100px' :top="crollTop" left='300px'>
      <template slot="title">
        <div class="line-speed-title">
          <div class="title-left">
            <span>
                <svg-icon class="font16 mr-l-10"  icon-class="hangxianhangsu-01" />
            </span>
            <!-- v-text="$t('portInquiry.title')" -->
            <span class="mr-l-15 font14" v-text="$t('lineSpeed.title')">
              航速航线
            </span>
            <span class="ship-check-list font12" >{{$t('lineSpeed.shipType')}}：
                <el-radio-group v-model="radio2">
                  <el-radio :label="1">{{$t('lineSpeed.vlcc')}}</el-radio>
                  <el-radio :label="2">{{$t('lineSpeed.suezmax')}}</el-radio>
                  <el-radio :label="3">{{$t('lineSpeed.aframax')}}</el-radio>
                </el-radio-group>
            </span>
            <div class="line-speed-title-item mr-l-40">
                <span >{{$t('lineSpeed.distance')}}:</span>
                <span style="color:#ffa900">0.00</span>
                <span>{{$t('lineSpeed.mile')}}</span>
            </div>
            <div class="line-speed-title-item">
              <span>{{$t('lineSpeed.days')}}:</span>
              <span>0</span>
              <span>{{$t('lineSpeed.day')}}</span>
            </div>
            <div class="line-speed-title-item">
              <span>{{$t('lineSpeed.speed')}}:</span>
              <span><input type="number" min="0" v-model="inputValue" @change="model" class="numberInput"/></span>
              <span>{{$t('lineSpeed.section')}}</span>
            </div>
            <div class="item-buttom-history">
              历史航速<span></span>节
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <!-- v-text="$t('detail.voyageHistory')" -->
        <div class="line_speed_footer">
          <div class="footButton">
            <div class="foot-button_item_color" v-text="$t('lineSpeed.calculation')" @click='calculation' >计算</div>
            <div class="foot-button-item" v-text="$t('lineSpeed.empty')" @click="clearEmpty">清空</div>
            <div class="foot-button-item" v-text="$t('lineSpeed.moveUp')" @click="moveUp"></div>
            <div class="foot-button-item" v-text="$t('lineSpeed.moveDown')" @click="moveDwon"></div>
            <div class="foot-button-item" v-text="$t('lineSpeed.insertRow')" @click="addTableRow">增加行</div>
            <div class="foot-button-item" v-text="$t('lineSpeed.deleteRow')" @click="delTableRow">删除行</div>
          </div>
          <div class="footTips">
            <div class="tip_quo_l">
              <span style="color:#ffa900">*</span><span v-text="$t('lineSpeed.message')"></span>
            </div>
            <div class="tip_quo_r">
              <span >{{$t('lineSpeed.table.timeZone')}}:</span><span></span>
            </div>
          </div>
        </div>
      </template>
    <div class="table_class">
      <el-table
        ref="singleTable"
        :data="tableData"
        maxHeight="230"
        border class="lineSpeedTable"
        :highlight-current-row="flag"
        @row-click="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          v-bind:label="$t('lineSpeed.table.No')"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          v-bind:label="$t('lineSpeed.table.port')"
          width="200"
            align="center">
            <template slot-scope="props">
              <map-autocomplete
              v-model="props.row.input"
              class="inline-input"
              :fetch-suggestions="rankingsSearch"
              :trigger-on-focus="false"
              @select="clickFullZ(props)"
                  >
                  <template slot-scope="{ item }" >
                    <div class="lineSpeed_padding" @click="selectItem = item">
                      <div >{{ item.portNameEn}}</div>
                      <!-- <span class="addr">IMO</span> -->
                    </div>
                  </template>
              </map-autocomplete>
         </template>
        </el-table-column>
        <el-table-column
          prop="timeZone"
          v-bind:label="$t('lineSpeed.table.timeZone')"
          width="100"
            align="center">
        </el-table-column>
        <el-table-column
          prop="distance"
          v-bind:label="$t('lineSpeed.table.distance')"
          width="100"
            align="center">
        </el-table-column>
        <el-table-column
          prop="Speed"
          v-bind:label="$t('lineSpeed.table.Speed')"
          width="100"
            align="center">
        </el-table-column>
        <el-table-column
          prop="sailingDays"
          v-bind:label="$t('lineSpeed.table.sailingDays')"
          width="100"
            align="center">
        </el-table-column>
        <!-- rop="residenceTime" -->
        <el-table-column
          v-bind:label="$t('lineSpeed.table.residenceTime')"
          width="180"
          align="center">
          <template slot-scope="props">
            <span v-if="props.row.id == 1">{{props.row.residenceTime}}</span>
            <el-input v-else size="small" class="tab-residence-input" autosize v-model="props.row.residenceTime" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
        prop="PortTimeIsExpected"
        v-bind:label="$t('lineSpeed.table.PortTimeIsExpected')"
          width="180"
            align="center">
        </el-table-column>
        <!-- prop="PortTimeIsExpected" -->
        <el-table-column

        v-bind:label="$t('lineSpeed.table.EstimatedTime')"
          width="180"
          align="center">
          <template slot-scope="props">
            <el-date-picker v-if="props.row.id == 1" v-model="timeP1" prefix-icon="fs-calendar"  class="timeP1" size="small" type="datetime"
              placeholder="选择日期" >

            </el-date-picker>
            <span v-else>{{props.row.EstimatedTime}}</span>
          </template>
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
    </div>

      <!-- <template slot="footer">

      </template>   -->
  </map-dialog >
</template>

<script>
  import {
    port,
    plan
  } from '@/api/routemap'
  import {
    mapGetters
  } from 'vuex'
  import _ from 'lodash'
  // import store from '@/store'
  import mapDialog from '@/views/routemap/dragDialog/mapDialog'
  import Map from '@/views/routemap/map'
  // import tableKey from '@/lang/zh/shipDetail'
  import '@/styles/flag-icon.css'
  import { upData, downData, parseTime } from '@/utils/index'
  export default {
    components: {
      mapDialog
    },
    name: 'lineSpeeddragDialog',

    props: {
      dialogTableVisible: {
        type: Boolean
      },
      beforeClose: {
        type: Function
      }
    },
    data() {
      return {
        crollTop: '',
        dataShow: true,
        flag: true,
        currentIndex: null,
        inputValue: 13,
        cuurentId: null,
        state1: {},
        timeP1: new Date(),
        selectItem: '',
        portList: [],
        tableData: [
          {
            id: 1,
            input: '',
            timeZone: '',
            distance: '',
            Speed: 13,
            sailingDays: '',
            residenceTime: '',
            PortTimeIsExpected: '',
            EstimatedTime: new Date()
          },
          {
            id: 2,
            input: '',
            timeZone: '',
            distance: '',
            Speed: 13,
            sailingDays: '',
            residenceTime: '',
            PortTimeIsExpected: '',
            EstimatedTime: ''
          },
          {
            id: 3,
            input: '',
            timeZone: '',
            distance: '',
            Speed: 13,
            sailingDays: '',
            residenceTime: '',
            PortTimeIsExpected: '',
            EstimatedTime: ''
          },
          {
            id: 4,
            input: '',
            timeZone: '',
            distance: '',
            Speed: 13,
            sailingDays: '',
            residenceTime: '',
            PortTimeIsExpected: '',
            EstimatedTime: ''
          },
          {
            id: 5,
            input: '',
            timeZone: '',
            distance: '',
            Speed: 13,
            sailingDays: '',
            residenceTime: '',
            PortTimeIsExpected: '',
            EstimatedTime: ''
          }
        ],
        radio2: 1,
        currentRow: null,
        tablerow: {},
        sizeType: ['VLCC', 'Suezmax', 'Aframax']
      }
    },
    // watch: {
    //   inputValue:function(newValue, oldValue) {
    //     this.model()
    //   }
    // },
    computed: {
      ...mapGetters([
        'shipInfos'
      ])
    },
    methods: {
      portInit() {
        port().then(response => {
          if (response && !_.isEmpty(response.data)) {
            this.portList = response.data.datas
          }
        })
      },
      rankingsSearch(queryString, cb) {
        const restaurants = this.portList
        const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.portNameEn.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        }
      },
      clickFullZ(item) {
        setTimeout(() => {
          item.row.input = this.selectItem.portNameEn
          item.row.timeZone = this.selectItem.timeZone
        }, 100)
      },
      addTableRow() {
        const length = this.tableData.length + 1
        const addrow = {
          id: length,
          input: '',
          timeZone: '',
          distance: '',
          Speed: '',
          sailingDays: '',
          residenceTime: '',
          PortTimeIsExpected: '',
          EstimatedTime: ''
        }
        this.tableData.push(addrow)
      },
      delTableRow() {
        const length = this.tableData.length
        if (length > 2) {
          this.tableData.pop()
        } else {
          this.$alert('<span style="text-align: center; display: block; font-weight: bold;">至少保留两个港口</span>', '信息', {
            dangerouslyUseHTMLString: true,
            showClose: false
          })
        }
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row)
      },
      handleCurrentChange(row, event, column) {
        console.log(row, event, column)
        if (!row) return false
        this.currentIndex = this.tableData.findIndex(v => v.id === row.id)
        this.tablerow = row
        if (this.currentIndex > 0) {
          this.currentRow = row
          this.flag = true
        } else {
          this.flag = false
        }
      },
      clearEmpty() {
        this.tableData.map(item => {
          Object.keys(item).map(item1 => {
            item[item1] = ' '
          })
        })
        Map.removeShipHistoryLine()
        Map.removeLineSpeedMarkers()
        Map.historyMarkerBlean = false
        Map.initShip = true
        Map.LazyLoadShip()
      },
      moveUp() {
        if (this.currentIndex) {
          this.setCurrent()
          setTimeout(() => {
            if (this.currentIndex < this.tableData.length) {
              if (this.currentIndex > 1) {
                upData(this.tableData, this.currentIndex)
                this.currentIndex--
                this.setCurrent(this.tableData[this.currentIndex])
              } else {
                this.currentIndex = 1
                this.setCurrent(this.tableData[this.currentIndex])
              }
            }
          })
        }
      },
      moveDwon() {
        if (this.currentIndex) {
          this.setCurrent()
          setTimeout(() => {
            if (this.currentIndex < this.tableData.length - 1) {
              if (this.currentIndex >= 1) {
                downData(this.tableData, this.currentIndex)
                this.currentIndex++
                this.setCurrent(this.tableData[this.currentIndex])
              }
            } else {
              this.currentIndex = this.tableData.length - 1
              this.setCurrent(this.tableData[this.currentIndex])
            }
          })
        }
      },
      model() {
        this.tableData.map(item => {
          if (item.distance !== '') {
            item.sailingDays = parseFloat(item.distance / (item.Speed * 24)).toFixed(2)
            item.Speed = this.inputValue
          } else {
            item.Speed = this.inputValue
          }
        })
      },
      calculation() {
        const ports = []
        this.tableData.map((item, index) => {
          if (item.input !== '') {
            // console.log(item, index,'3333333')
            if (index === 0) {
              console.log(item)
              ports.push({
                'fromPort': item.input,
                'toPort': this.tableData[index + 1].input,
                'startTime': (this.timeP1).getTime(),
                'stayTime': item.residenceTime,
                'speed': item.Speed
              })
            } else if (index > 0) {
              if (item.input !== '' && this.tableData[index + 1].input !== '') {
                ports.push({
                  'fromPort': item.input,
                  'toPort': this.tableData[index + 1].input,
                  'startTime': '',
                  'stayTime': item.residenceTime,
                  'speed': item.Speed
                })
              }
            }
          }
        })
        const obj = {
          fromPortStartTime: parseTime((this.timeP1).getTime()),
          route: ports,
          sizeType: this.sizeType[this.radio2],
          speed: this.inputValue,
          timeZone: this.tableData[0].timeZone
        }
        plan(obj).then(response => {
          if (response && !_.isEmpty(response.data.datas.data.data)) {
            const portMarker = response.data.datas.html
            const portMarkers = response.data.datas.data.data
            Map.initShip = false
            Map.removeCirleMarker()
            Map.removeShipHistoryLine()
            Map.removeLineSpeedMarkers()
            let arr = []
            portMarkers.map((item, index) => {
              this.tableData[index + 1].timeZone = item.toNameZone
              this.tableData[index + 1].distance = item.distance
              this.tableData[index + 1].Speed = item.speed
              this.tableData[index + 1].sailingDays = parseFloat(item.consumingTime).toFixed(2)
              this.tableData[index + 1].residenceTime = item.stayTime
              this.tableData[index + 1].PortTimeIsExpected = item.dateEndStr
              this.tableData[index + 1].EstimatedTime = item.dateStartStr
              arr = [
                ...arr,
                ...item.waypoint
              ]
            })
            Map.ShipHistoryline(arr)

            Map.lineSpeedMarkers([arr[0], arr[arr.length - 1]], false)
            Map.lineSpeedMarkers(portMarker, true)
          } else {
            this.$alert('<span style="text-align: center; display: block; font-weight: bold;">暂无计算数据</span>', '信息', {
              dangerouslyUseHTMLString: true,
              showClose: false
            })
          }
        })
      }
    },
    mounted() {
      this.portInit()
      this.crollTop = window.innerHeight * 0.5 + 'px'
    }
  }
</script>
<style scope>
 .map_dialog {
    position: absolute;
    /* top: 390px;
    right: 140px; */
}
.line-speed-title {
  height: 42px;
  line-height: 42px;
}
.line-speed-title .title-left{
  color: #fff;
}
  /* .bascicon{
   font-size: 20px;
  } */
  .line-speed-title-item{
    display: inline-block;
    color: #FFFFFF;
    font-size: 12px;
    margin-right: 20px;
  }
  .item-buttom-history {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    width: 114px;
    background: #FFF;
    color: #000;
    text-align: center;
    border-radius: 2px;
    font-size: 12px;
  }
 /* .line-speed-title .title-right{
   color: #fff;
  position: absolute;
  right: 50px;
  top: -5px;
}
.title-right ul li{
  margin-left: 5px;
  list-style-type:none;
  font-size: 12px;
  float: left;
} */
.numberInput {
  width: 50px;
/* opacity: 0.3; */
background: #181818;
border: 1px solid #5c5c5c;
color: #fff;
text-align: center;
}
.checklist{
  display: inline-block;
}
.ship-check-list{
  margin-left: 20px;
  font-size: 12px;
}
.ship-check-list .el-checkbox__inner{
  background: #181818;
  border: 1px solid #5c5c5c;
}
.ship-check-list .el-checkbox__label{
  padding-left: 5px;
  font-size: 12px;
}
.ship-check-list .el-checkbox+.el-checkbox{
  margin-left: 15px
}
.ship-check-list .el-checkbox{
  color: #FFF;
}
.lineSpeedTable .el-input--medium .el-input__inner {
    margin: 0px;
    width: 179px;
    height: 36px;
    line-height: 44px;
    background-color: transparent;
    border:none;
    color: #fff;
}
.table_class .el-table--border, .el-table--group {
    border: 1px solid #5c5c5c;
}
.table_class .el-table__body-wrapper::-webkit-scrollbar{
  width: 7px;
  height: 7px;
  background-color: #d3d3d0;
}
.table_class .el-table__body-wrapper::-webkit-scrollbar-thumb{
  background-color: #3794EF;
}
.table_class .el-table--border::after,.table_class .el-table--group::after, .table_class .el-table::before {
    background-color: #5c5c5c;
}
.table_class .el-table--border::after, .table_class .el-table--group::after, .table_class .el-table::before {
    content: '';
    position: absolute;
    background-color: #5c5c5c;
    z-index: 1;
}
.line_speed_footer .foot-button_item_color{
  float: left;
  background: #3b99fc;
  border-radius: 2px;
  padding: 0px 10px;
  font-size: 13px;
  margin-right: 15px;
  cursor: pointer;
  color: #fff;
}
.line_speed_footer .footButton .foot-button-item{
  float: left;
  border-radius: 2px;
  padding: 0px 10px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;
}
.line_speed_footer .footButton {
  height: 30px;
  line-height: 30px;
}
.line_speed_footer .footTips{
  color: #fff;
  margin-top: 10px;
  padding-bottom: 20px;
  font-size: 12px;
}
.line_speed_footer .footTips .tip_quo_l{
  float: left;
}
.line_speed_footer .footTips .tip_quo_r{
  float: right;
  margin-right: 30px;
}
.el-table__fixed-right::before, .el-table__fixed::before {
    opacity: 0;
}
.lineSpeed_padding{
  margin: 0 -20px;
  padding: 0 20px;
}
.table_class .el-table--enable-row-transition .el-table__body td {
    background: #181818;
    color: #fff;
    border-color: #5c5c5c;
    height: 30px;
    line-height: 30px;
    padding: 0;
    font-size: 12px;
}
.table_class .el-table--border th, .el-table__fixed-right-patch {
    background: #181818;
    border-color: #5c5c5c;
    color: #fff;
}
/* .table_class .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #5c5c5c;
} */
.table_class .el-table__row--striped>td,.el-table__body tr.hover-row>td{background-color:rgba(33,0,255,.5) !important;}
.table_class .el-table__body tr.current-row>td{background-color:rgba(33,0,255,.5) !important}
.table_class .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
}
.table_class .el-input__inner {
    background-color: transparent;
    border: none;
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.table_class .el-input--prefix .el-input__inner {
    padding-left: 0px;
}
/* .lineSpeedTable .tab-residence-input .el-input--medium .el-input__inner{

} */
</style>
