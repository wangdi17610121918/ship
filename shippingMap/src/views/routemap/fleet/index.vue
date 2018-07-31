<template>
  <div class="fleet">
    <tips width='504px'
          left="20px"
          top="103px"
          :minimize='minimize'
          :minimize-pramas='minimizePramas'
          :before-minimize="handleClose"
          :before-close="handleClose"
          :visible.sync='isShow'>
      <template slot="tipsContent">
        <div class="out-fleet-list" v-show="fleets.length > 0">
          <ul class="fleet-list">
            <li class="ship-information" :class="imo == item.imo?'current-li':''" v-for="(item, index) in fleets" :key="index" @click="searchShip(item.imo)">
              <div class="ship-name">{{item.shipName}}</div>
              <div class="ship-imo">{{item.imo}}</div>
              <el-button size="mini" @click="unfollowShip(item.imo, item.mmsi)">{{unfollowBtn}}</el-button> 
            </li>
          </ul>
        </div>
        <div class="no-fleet" v-show="fleets.length < 1">
          {{noFleet}}           
        </div>
        <!-- <div class="reminder">
          提示：为了使您获得最佳的查询航速航线体验，建议使用谷歌浏览器
        </div> -->
      </template>
    </tips>
  </div>
</template>
<script>
  import tips from '../ui/tips/index'
  import fleet from '@/lang/zh/fleet'
  import Map from '../map.js'
  import i18n from '@/lang'
  import { queryFleets, unfollowFleet } from '@/api/routemap'
  export default {
    name: 'fleet',
    components: {
      tips
    },
    data() {
      return {
        unfollowBtn: fleet.unfollowBtn,
        imo: '',
        noFleet: fleet.noFleet,
        fleets: [],
        minimizePramas: {
          title: i18n.t('tabNav.tabList[4].text'),
          routeName: 'fleet',
          zoomAction: () => {
            this.$router.push({
              name: 'fleet'
            })
          }
        },
        minimize: true,
        isShow: true
      }
    },
    mounted() {
      this.initializeData()
    },
    methods: {
      // 初始化我的船队
      initializeData(key) {
        // 请求我的船队
        queryFleets().then(response => {
          if (response || response.data) {
            this.fleets = response.data.datas
          }
        })
      },
      // 关闭、最小化
      handleClose(done) {
        this.$router.push({
          name: 'ship'
        })
        done()
      },
      // 取消关注
      unfollowShip(imo, mmsi) {
        var obj = {
          imo: imo,
          mmsi: mmsi
        }
        // 请求取消关注
        unfollowFleet(obj).then(response => {
          if (response || response.data) {
            this.initializeData()
          }
        })
      },
      searchShip(imo) {
        this.imo = imo
        Map.shipDetail(imo)
      }
    }
  }
</script>
<style>
.fleet ul,
.fleet li{ 
  padding: 0;
  margin: 0;
  list-style: none;
}
.fleet .out-fleet-list {
  width: 464px;
  padding-right: 40px;
  overflow: hidden;
}
.fleet .fleet-list {
  max-height: 200px;
  overflow-y: scroll;
}
/*滚动条样式*/
.fleet .fleet-list::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.fleet .fleet-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.fleet .fleet-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
/*滚动条样式*/
.fleet .ship-information {
  display: flex;
  padding: 5px 50px 5px 10px;
  line-height: 24px;
  margin-bottom: 10px;
  justify-content: space-between;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}
.fleet .ship-information.current-li {
  background-color: #378ddc;
}
.fleet .no-fleet{
  color: #fff;
  text-align: center;
  padding: 30px 0px;
}
.fleet .ship-information:nth-last-child(1){
  margin-bottom: 0;
}
.fleet .ship-information .ship-name {
  width: 150px;
}
.fleet .ship-information .ship-imo {
  width: 150px;
}
.fleet .ship-information .el-button--mini {
  padding: 0;
  width: 74px;
  height: 24px;
  line-height: 24px;
  background: rgba(255,255,255,0.20);
  border-radius: 2px;
  font-size: 12px;
  border: none;
  color: #fff;
}
.fleet .reminder {
  font-family: MicrosoftYaHei;
  color: #C8C8C8;
  line-height: 14px;
  font-size: 10px;
  color: #C8C8C8;
  letter-spacing: 0;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>

