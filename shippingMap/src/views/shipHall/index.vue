<template>
  <div class="ship-hall" :style="{height: mapHeight + 'px'}">
    <div class="ship-hall-content">
      <ul class="ship-hall-search">
        <li class="search-item">
          <div class="search-title">
            船型
          </div>
          <el-select v-model="shipType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li class="search-item">
          <div class="search-title">
            状态
          </div>
          <el-select v-model="shipStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li class="search-item">
          <div class="search-title">
            OPEN
          </div>
          <div class="block">
            <el-date-picker
              v-model="OPENStart"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
              v-model="OPENEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li class="search-item">
          <div class="search-title">
            ETA Fujairal
          </div>
          <div class="block">
            <el-date-picker
              v-model="FujairalStart"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
              v-model="FujairalEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li class="search-item">
          <div class="search-title">
            ETA Cabinda
          </div>
          <div class="block">
            <el-date-picker
              v-model="CabindaStart"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
              v-model="CabindaEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li class="search-item btn-item">
          <el-input v-model="queryContent" placeholder="请输入内容"></el-input>
          <el-button size="mini" type="warning">查询</el-button>  
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: { },
    name: 'shipHall',
    data() {
      return {
        OPENStart: '',
        OPENEnd: '',
        queryContent: '',
        options: '',
        FujairalStart: '',
        FujairalEnd: '',
        CabindaStart: '',
        CabindaEnd: '',
        shipType: '',
        shipStatus: '',
        mapHeight: window.innerHeight - 50
      }
    },
    methods: {

    }
  }
</script>

<style>
.ship-hall ul,
.ship-hall li{ 
  padding: 0;
  margin: 0;
  list-style: none;
}
.ship-hall {
  background-color: rgba(170,218,255,.2);
  padding: 26px 116px 0 118px;
}
.ship-hall .ship-hall-content {
  width: 100%;
  height: 100%;
  background: url('../../../static/images/mapBackground.png') no-repeat top;
}
.ship-hall .ship-hall-content .ship-hall-search {
  display: flex;
  justify-content: space-around;
  width: 1180px;
  margin: auto;
}
.ship-hall-search .el-date-editor.el-input, 
.ship-hall-search .el-date-editor.el-input__inner,
.ship-hall-search .el-select {
  width: 100px;
  height: 28px;
  line-height: 28px;
}
.ship-hall-search .el-input--medium .el-input__inner {
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  background: #FFFFFF;
  border: 1px solid #DADADA;
  border-radius: 2px;
  color: #333;
  font-size: 12px;
}
.ship-hall-search .block .el-input__prefix,
.ship-hall-search .block .el-input__suffix {
  display: none;
}
.search-item .block {
  color: #5C5C5C;
}
.search-item .search-title {
  line-height: 20px;
  margin-bottom: 8px;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
}
.ship-hall-search .btn-item {
  display: flex;
  padding-top: 28px;
}
.btn-item .el-button--mini {
  background: #FFCC00;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  width: 56px;
  height: 28px;
  line-height: 28px;
  padding: 0;
  border: none;
}
</style>

