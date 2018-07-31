<template>
  <tab-ui>
    <div class="search-port">
        <map-autocomplete
            v-model="state1"
            class="inline-input"
            :placeholder="$t('publics.searchText')"
            :fetch-suggestions="rankingsSearch"
            @select="clickFullZ"
            >
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
            <template slot-scope="{ item }" >
              <div v-if="item.type != 0">
                <div class="name">{{ item.imo }}</div>
                <span class="addr">IMO</span>
              </div>
              <div v-else>
                <div class="name">暂无搜索历史记录</div>
                <!-- <span class="addr">IMO</span> -->
              </div>
            </template>
        </map-autocomplete>
    </div>
  </tab-ui>

</template>

<script>
import _ from 'lodash'
import tabUi from '@/views/routemap/ui/tab'
// import { generateTitle } from '@/utils/i18n'
import {
  searchHistory, // 排名搜索
  fuzzySearch, // 模糊搜索
  findShip // 排名注入
} from '@/api/routemap'
import store from '@/store'
export default {
  components: {
    tabUi
  },
  name: 'SidebarItem',
  data() {
    return {
      state1: ``,
      fuzzyArr: []
    }
  },
  // props: {
  // routes: {
  //       type: Array
  //     },
  //     isNest: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  // watch: {
  //   $route: {
  //     handler: function(val, oldVal){
  //       console.log(val, '222')
  //     },
  //     // 深度观察监听
  //     deep: true
  //   }
  // },
  methods: {
    rankingsSearch(queryString, cb) {
      if (this.state1 === '') {
        searchHistory().then(response => {
          console.log(_.isEmpty(response.data))
          if (response && !_.isEmpty(response.data)) {
            this.fuzzyArr = response.data
            cb(this.fuzzyArr)
          } else {
            cb([{ type: 0 }])
          }
        })
      } else {
        const obj = {
          keyword: this.state1
        }
        fuzzySearch(obj).then(response => {
          if (response && !_.isEmpty(response.data.datas)) {
            this.fuzzyArr = response.data.datas
            cb(this.fuzzyArr)
          }
        })
      }
    },
    clickFullZ(item) {
      this.state1 = item.imo
      this.state1 = ''
      store.dispatch('setSearchImo', item.imo)
      // this.$router.push({name:'shipsSearch', params:{imo:this.state1}})
      var obj = {
        imo: item.imo,
        matchkey: item.matchkey
      }
      findShip(obj).then(response => {
      })
    },
    topSearch() {
      searchHistory().then(response => {
        if (response && !_.isEmpty(response.data.datas)) {
          this.fuzzyArr = response.data.datas
        }
      })
    }
  }
}
</script>
<style>
.search-port .el-input--medium .el-input__inner {
    margin:8px 10px;
    width: 484px;
    height: 30px;
    line-height: 30px;
    background-color: transparent;
    border: 1px solid #4f4f4f;
    font-size: 12px;
}
.search-port .el-input__suffix {
    right: 15px;
    -webkit-transition: all .3s;
    transition: all .3s;
}
.search-port svg {
    width: 20px;
    height: 20px;
    color: #fff;
    position: absolute;
    top: 22px;
    right: 7px;
}
.name {
  float: left;
}
.addr {
  float: right;
}
.search-port .el-autocomplete-suggestion__wrap{
  background: #878787;
  border: none;
}
.search-port .el-autocomplete-suggestion li{
  color: #000;
}
.search-port .el-autocomplete-suggestion li.highlighted, .el-autocomplete-suggestion li:hover {
    background-color: #0d57c5;
    color: #fff;
}
.search-port .el-popper[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #878787;
}
.search-port .el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #878787;
}
</style>
