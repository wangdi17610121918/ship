<template>
  <div class="pirates">
    <tips width='330px'
          height='194px'
          right="46px"
          bottom="111px"
          :before-close="handleClose"
          :visible.sync='isShow'>
      <template slot="tipsContent">
        <div class="time_select">
          <span>{{$t(`piratesDrills.wordList.time`)}}：</span>
          <el-select class="select-month"
                     v-model="valueDate">
            <el-option v-for="(item, index) in selectTimeSlot" :key="item.lable" :label="$t(`piratesDrills.selectTimeSlot[${index}].value`)" :value="$t(`piratesDrills.selectTimeSlot[${index}].lable`)">
            </el-option>
          </el-select>
        </div>
        <div class="input-select">
          <el-checkbox-group v-model="checkedList">
            <el-checkbox v-for="(item, index) in checkList" :key="item.label" :label="item.lable">
              <svg-icon class="setting"  :icon-class="item.lable" />
              <!-- {{item.checkName}} -->
              {{$t(`piratesDrills.pirateCheckList[${index}].checkName`)}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search-box">
        <span @click="initializeData(1)">{{$t(`piratesDrills.wordList.query`)}}</span>
        </div>
      </template>
    </tips>
  </div>
</template>
<script>
import piratesDrills from '@/lang/zh/piratesDrills'
import tips from '../ui/tips/index'
import Map from '../map.js'
import {
  navigationWarning
} from '@/api/routemap'
export default {
  name: 'piratesDrills',
  components: {
    tips
  },
  data() {
    return {
      isShow: false,
      valueDate: '1',
      checkList: piratesDrills.pirateCheckList,
      selectTimeSlot: piratesDrills.selectTimeSlot,
      checkedList: ['suspicious vessel', 'attack intention', 'boarded', 'fired', 'stolen', 'hijacked', 'military exercise']
    }
  },
  mounted() {
    this.showSearchPirates()
  },
  methods: {
    // 关闭回调函数
    handleClose(done) {
      // this.$confirm(this.wordList.confirmClosing)
      //   .then(_ => {
      // this.$router.push({
      //   name: this.$router.name,
      //   query: { flag: this.isShow }
      // })
      this.$router.push({
        name: 'ship'
      })
      done()
      // })
      // .catch(_ => {})
    },
    showSearchPirates() {
      this.isShow = !this.$route.query.flag
    },
    initializeData(key) {
      const obj = {
        time: this.valueDate,
        type: this.checkedList
      }
      // 请求海盗军演的数据
      navigationWarning(obj).then(response => {
        if (response || response.data) {
          Map.piratesDrills(response.data.datas, key)
        }
      })
    }
  }
}
</script>
<style>
.pirates {
  position: relative;
}
.time_select {
  font-size: 12px;
  color: #fff;
}
.select-month .el-input--medium .el-input__inner {
  line-height: 26px;
  width: 180px;
  margin: 0;
  height: 26px;
  font-size: 12px;
  background-color: rgba(33, 33, 33, 0.2);
  color: #fff;
  border-radius: 2px;
}
.select-month .el-input__suffix {
  right: 0;
}
.input-select {
  padding-top: 10px;
}
.input-select .setting{
  display: inline-block;
  vertical-align: bottom;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 3px;
  color: #C54141;
}
.input-select .el-checkbox {
  margin: 0 0 9px;
  min-width: 145px;
  font-size: 12px;
  height: 18px;
}
.input-select .el-checkbox__label {
  font-size: 12px;
  color: #fff;
  line-height: 20px;
}
.input-select .el-checkbox__label{
padding-left: 8px;
}
.input-select .el-checkbox__input.is-checked +.el-checkbox__label {
  color: #fff;
}
.input-select i {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-indent: -999999px;
}
.input-select .el-checkbox__input.is-checked .el-checkbox__inner,
.input-select .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #FFA900;
  border-color: #FFA900;
}
.search-box {
  text-align: left;
  margin-top: 6px;
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
.pirates-drills {
  background-color: rgba(33, 33, 33, 0.7);
  color: #fff;
  border: none;
}
.pirates-drills::before{
  display: none;
}
</style>
