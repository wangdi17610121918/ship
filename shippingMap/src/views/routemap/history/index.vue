<template>
  <div class="history">
    <tips width='504px'
          height='284px'
          left="20px"
          top="103px"
          :minimize='minimize'
          :minimize-pramas='minimizePramas'
          :before-minimize="handleClose"
          :before-close="handleClose"
          :visible.sync='isShow'>
      <template slot="tipsContent">
        <div class="out-history-list">
          <ul class="history-search-list">
            <li class="select">
              <div class="block">
                <span class="demonstration">发货港：</span>
                <el-select v-model="fromPort" filterable placeholder="请选择">
                  <el-option
                    v-for="item in deliveryPort"
                    :key="item.portNameEn"
                    :label="item.portNameEn"
                    :value="item.portNameEn">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="select">
              <div class="block">
                <span class="demonstration">收货港：</span>
                <el-select v-model="toPort" placeholder="请选择">
                  <el-option
                    v-for="item in arrivePort"
                    :key="item.value"
                    :label="item.portName"
                    :value="item.portNameEn">
                  </el-option>
                  <!-- portName
                  portNameEn -->
                </el-select>
              </div>
            </li>
            <li>
              <div class="block">
                <span class="demonstration">船型：</span>
                <el-checkbox-group v-model="sizeType">
                  <el-checkbox label="VLCC"></el-checkbox>
                  <el-checkbox label="Suezmax"></el-checkbox>
                  <el-checkbox label="Aframax"></el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li class="input">
              <div class="block">
                <span class="demonstration">DWT：</span>
                <span>
                  <el-input v-model="dwtMaxValue" placeholder="请输入内容"></el-input>
                  -
                  <el-input v-model="dwtMinValue" placeholder="请输入内容"></el-input>
                  mt
                </span>
              </div>
            </li>
            <li class="radio">
              <div class="block">
                <span class="demonstration">DWT：</span>
                <span>
                  <el-radio v-model="timeType" label="1">到港时间</el-radio>
                  <el-radio v-model="timeType" label="2">离港时间</el-radio>
                </span>
              </div>
            </li>
            <li class="time">
              <div class="block">
                <span class="demonstration">时间范围：</span>
                <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm"
                  placeholder="选择日期">
                </el-date-picker>
                -
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </li>
            <li>
              <div class="search-box">
                <span>查询</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="reminder">
          提示：为了使您获得最佳的查询航速航线体验，建议使用谷歌浏览器
        </div> -->
      </template>
    </tips>
    <map-dialog  v-if="dataShow" :visible.sync='dataShow'  :beforeClose = 'beforeClose' width='934px' height="242px" top="400px" left='300px'>
      <template slot="title">
        <div class="history-line-record">
          <div class="record-title">
            <svg-icon class="setting" icon-class="sousuo" />
            <span class="record">历史纪录</span>
            <span class="record-word">共</span>
            <span class="record-num">2</span>
            <span class="record-word">记录</span>
          </div>
          <div class="record-title btn-box">
            <span>导出数据</span>
          </div>
        </div>
      </template>
      <div class="history-record-content table_class">
        <!-- 
            :index='indexMethod' -->
        <el-table
          :data="tableData"
          style="width: 100%"
          height="250">
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            label="船名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="IMO"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="船舶类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="最大吃水"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="离港吃水(发货港)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="到港吃水(到达港)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="始发港"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="始发地区"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="ATD"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="途径港"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="目的港"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="ATA"
            width="100">
          </el-table-column>
        </el-table>
      </div>
    </map-dialog >
  </div>
</template>
<script>
  import tips from '../ui/tips/index'
  import mapDialog from '@/views/routemap/dragDialog/mapDialog'
  import i18n from '@/lang'
  // import history from '@/lang/zh/history'
  // import Map from '../map.js'
  import { historyport, ports, chinaPorts } from '@/api/routemap'
  export default {
    name: 'fleet',
    components: {
      tips,
      mapDialog
    },
    data() {
      return {
        fromPort: '',
        toPort: '',
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        sizeType: ['VLCC', 'Suezmax', 'Aframax'],
        timeType: '1',
        dwtMaxValue: '',
        dwtMinValue: '',
        startTime: '',
        endTime: '',
        minimizePramas: {
          title: i18n.t('tabNav.tabList[4].text'),
          routeName: 'history',
          zoomAction: () => {
            console.log('aaaa')
            this.$router.push({
              name: 'history'
            })
          }
        },
        deliveryPort: [],
        arrivePort: [],
        minimize: true,
        dataShow: true,
        isShow: true
      }
    },
    mounted() {
      this.getPorts()
    },
    methods: {
      getHistoryLine() {
        const searchData = {
          'fromPort': this.fromPort,
          'toPort': this.toPort,
          'sizeType': this.sizeType,
          'timeType': this.timeType,
          'dwtMaxValue': this.dwtMaxValue,
          'dwtMinValue': this.dwtMinValue,
          'startTime': this.startTime,
          'endTime': this.endTime
        }
        historyport(searchData).then(response => {
          if (response || response.data) {
            console.log(response)
          }
        })
      },
      beforeClose(done) {
      },
      getPorts(done) {
        ports({ keyword: '' }).then(response => {
          if (response || response.data) {
            this.deliveryPort = response.data.datas
          }
        })
        chinaPorts().then(response => {
          if (response || response.data) {
            this.arrivePort = response.data.datas
          }
        })
      },
      indexMethod(index) {
        return index
      },
      handleClose(done) {
        this.$router.push({
          name: 'ship'
        })
        done()
      }
    }
  }
</script>
<style>
.history ul,
.history li{ 
  padding: 0;
  margin: 0;
  list-style: none;
}
.history .history-search-list li {
  margin-bottom: 9px;
}
.history .el-date-editor.el-input, 
.history .el-date-editor.el-input__inner,
.history .el-select {
  width: 140px;
  height: 26px;
  line-height: 26px;
}
.history .select .el-select {
  width: 215px;
}
.history .input .el-input {
  width: 100px;
}
.history .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
  padding: 0 10px;
  background: #0000;
  border: 1px solid #DADADA;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
}
.history .el-checkbox-group {
  display: inline-block;
}
.history .el-radio__label,
.history .el-checkbox__label {
  font-family: ArialMT;
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.history .el-checkbox__input.is-checked + .el-checkbox__label,
.history .el-radio__input.is-checked + .el-radio__label {
  color: #fff; 
}
.history .el-checkbox__input.is-checked .el-checkbox__inner,
.history .el-radio__input.is-checked .el-radio__inner{
  background-color: #FFA900;
  border-color: #FFA900;
}
.history .time .el-input--medium .el-input__inner {
  padding: 0 5px 0 25px;
}
.history .time .el-input__suffix-inner{
  display: none;
}
.history .el-input--medium .el-input__icon {
  line-height: 26px;
}
.history .el-input__prefix {
  left: 0;
}
.history .history-search-list li .block {
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 26px;
}
.history .history-search-list li .demonstration {
  display: inline-block;
  min-width: 70px;
  margin-right: 9px;
}
.history .history-search-list li .search-box {
  text-align: left;
  margin-top: 24px;
}
.search-box span{
  display: block;
  cursor: pointer;
  width: 70px;
  line-height: 26px;
  background-color: #FFA900;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 2px 2px 2px 2px;
}
.history-line-record {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #fff;
  line-height: 28px;
  font-size: 14px;
  padding-left: 16px;
}
.history-line-record .setting{
  color: #FFCC00;
}
.history-line-record .record{
  margin-right: 20px;
}
.history-line-record .record-word, 
.history-line-record .record-num {
  font-size: 12px;
}
.history-line-record .record-num {
  margin: 0 1px;
  color: #FFCC00;
}
.history-line-record .btn-box span {
  display: block;
  cursor: pointer;
  padding: 0 9px;
  color: #333;
  margin-right: 83px;
  background-color: #FFCC00;
  border-radius: 2px;
}
.history-record-content{
  padding: 9px 12px;
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
/* .el-table__fixed-right::before, .el-table__fixed::before {
    opacity: 0;
} */
.table_class .el-table th {

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
.table_class .el-table__row--striped>td,
.table_class .el-table__body tr.hover-row>td{
  background-color:rgba(33,0,255,.5) !important;
}
.table_class .el-date-editor.el-input, 
.table_class .el-date-editor.el-input__inner {
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
</style>

