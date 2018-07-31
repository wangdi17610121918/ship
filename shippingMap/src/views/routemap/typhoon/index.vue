<template>
  <div class="typhoon-wrap">
    <tips width='294px'
          height='194px'
          right="46px"
          bottom="111px"
          :before-close="handleClose"
          :visible.sync='isShow'>
      <template slot="tipsContent">
        <div class="typhoon-radio">
          <el-radio v-model="radio" label="1" @change="typhoonChange">当前活跃</el-radio>
          <el-radio v-model="radio" label="2" @change="typhoonChange">选择时间(两个月内)</el-radio>
        </div>
        <div class="typhoon-time-select" v-show="timeModule">
            <el-date-picker prefix-icon="fs-calendar" v-model="typhoonTime1" class="time-select"
                            size="mini" type="date" placeholder="选择日期"
                            :picker-options="pickerOptions0">
            </el-date-picker>
          <em>-</em>
            <el-date-picker prefix-icon="fs-calendar" v-model="typhoonTime2" class="time-select"
                            size="mini" type="date" placeholder="选择日期"
                            :picker-options="pickerOptionsTyphoon">
            </el-date-picker>
        </div>
        <div class="typhoon-demo">
          <ul>
            <li>
              <div class="typhoon-circle bg-green"></div>
              <div class="typhoon-list">热带低压</div>
            </li>
            <li>
              <div class="typhoon-circle bg-blue"></div>
              <div class="typhoon-list">热带风暴</div>
            </li>
            <li>
              <div class="typhoon-circle bg-yellow"></div>
              <div class="typhoon-list">强热带风暴</div>
            </li>
            <li>
              <div class="typhoon-circle bg-orange"></div>
              <div class="typhoon-list">台风</div>
            </li>
            <li>
              <div class="typhoon-circle bg-pink"></div>
              <div class="typhoon-list">强台风</div>
            </li>
            <li>
              <div class="typhoon-circle bg-red"></div>
              <div class="typhoon-list">超强台风</div>
            </li>
          </ul>
        </div>
      </template>
      <template slot="tipsfooter">
        <div class="typhoon-search">
          <a href="javascript:;">查询</a>
        </div>
      </template>
    </tips>
  </div>
</template>
<script>
import tips from '../ui/tips/index'

export default {
  components: {
    tips
  },
  name: 'typhoon',
  data() {
    return {
      isShow: false,
      radio: '1',
      timeModule: false,
      typhoonTime1: new Date(new Date() - (24 * 60) * 60 * 60 * 1000),
      typhoonTime2: new Date(),
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsTyphoon: {
        disabledDate: (time) => {
          if (this.typhoonTime1) {
            const currentTime = this.typhoonTime1
            const threeMonths = currentTime.setMonth(currentTime.getMonth() + 2)
            currentTime.setMonth(currentTime.getMonth() - 2)
            return time.getTime() < this.typhoonTime1 || time.getTime() > threeMonths
          }
        }
      }
    }
  },
  mounted() {
    this.showSearchPirates()
  },
  methods: {
    // 关闭回调函数
    handleClose(done) {
      this.$router.push({
        name: 'ship'
      })
      done()
    },
    showSearchPirates() {
      this.isShow = !this.$route.query.flag
    },
    typhoonChange() {
      console.log(this.radio, typeof this.radio)
      this.radio === '2' ? this.timeModule = true : this.timeModule = false
    }
  }
}
</script>
<style>
.typhoon-wrap{
  position: fixed;
  width: 294px;
  height: 194px;
  bottom: 111px;
  right: 46px;
  background-color: rgba(33, 33, 33, 0.7);
}
.typhoon-radio{
  width: 100%;
  height: 40px;
  white-space: nowrap;
}
.typhoon-radio label{
  line-height: 40px;

}
.el-radio__input.is-checked + .el-radio__label{
  color: #ffd000;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #ffd000;
  background: #ffd000;
}
.el-radio__label{
  font-size: 12px;
}
.el-radio__inner{
  width: 10px;
  height: 10px;
}
.typhoon-time-select{
  width: 100%;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 120px;
  font-size: 10px;
}
.el-input__inner{
  background-color: rgba(33, 33, 33, 0.11);
  border-radius: 2px;
  border: 1px solid #dcdfe6;
}
.typhoon-demo{
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
.typhoon-demo ul{
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.typhoon-demo ul li{
  float: left;
  width: 83px;
  height: 25px;
  line-height: 25px;
}
.typhoon-circle{
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  border-radius: 50%;
  margin-top: 7px;
}
.typhoon-list{
  float: left;
  font-size: 12px;
  color: #fff;
  line-height: 25px;
  margin-left: 5px;
}
.typhoon-search{
  width: 100%;
  height: 40px;
}
.typhoon-search a{
  text-align: center;
  line-height: 25px;
  border-radius: 2px;
  display: inline-block;
  width: 70px;
  height: 25px;
  background-color: #FFA900;
  color: #fff;
  font-size: 14px;
}
.bg-green{
  background-color: #34F533;
}
.bg-blue{
  background-color: #1D64FF;
}
.bg-yellow{
  background-color: #FDF100;
}
.bg-orange{
  background-color: #FC7116;
}
.bg-pink{
  background-color: #FF51F9;
}
.bg-red{
  background-color: #FF1616;
}
</style>
