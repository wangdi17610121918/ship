<template>
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
              <div>
                <div class="name">{{ item.imo }}</div>
                <span class="addr">IMO</span>
              </div>
            </template>
        </map-autocomplete>
    </div>
</template>

<script>
import _ from 'lodash'
// import { generateTitle } from '@/utils/i18n'
import {
  searchHistory, // 排名搜索
  fuzzySearch, // 模糊搜索
  findShip // 排名注入
} from '@/api/routemap'
import store from '@/store'
export default {
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
  methods: {
    rankingsSearch(queryString, cb) {
      if (this.state1 === '') {
        searchHistory().then(response => {
          if (response && !_.isEmpty(response.data)) {
            this.fuzzyArr = response.data
            cb(this.fuzzyArr)
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
      store.dispatch('setSearchImo', item.imo)
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
.el-input--medium .el-input__inner {
     margin: 10px;
    width: 228px;
    height: 44px;
    line-height: 44px;
    background-color: transparent;
    border: 1px solid #4f4f4f;
}
.el-input__suffix {
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
.el-autocomplete-suggestion__wrap{
  background: #878787;
  border: none;
}
.el-autocomplete-suggestion li{
  color: #000;
}
.el-autocomplete-suggestion li.highlighted, .el-autocomplete-suggestion li:hover {
    background-color: #0d57c5;
    color: #fff;
}
.el-popper[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #878787;
}
.el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #878787;
}
</style>
