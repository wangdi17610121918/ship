<template lang="html">
  <div class="">
    <div class="tab-nav-content">
      <div class="tab-nav-title">
        <ul>
          <li v-for="(item, index) in tabList" :key='index'
            :class=" item.path === path ? 'navCurrent' : '' "
            @click="Switching(item)"
            >
            <a>
              <svg-icon class="setting font18" :icon-class="icon[index]"/>
              {{$t(`tabNav.tabList[${index}].text`)}}
            </a>
          </li>
        </ul>
      </div>
      <!-- <div class="tab-nav-plan">
          <ship-search v-show="num == 0"></ship-search>
      </div> -->
    </div>
  </div>

</template>

<script>
import tabNav from '@/lang/zh/tabNav'
// import shipSearch from '@/views/routemap/shipsSearch'
export default {
  // components: {
  //   shipSearch
  // },
  data() {
    return {
      tabList: tabNav.tabList,
      path: this.$route.path,
      icon: ['chuanbosousuo', 'wodechuandui', 'gangkouchaxun-01', 'hangxianhangsu-01', 'lishihangxian-01']
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path
    }
  },
  methods: {
    Switching(item) {
      if (item.router === 'ship') {
        this.$router.push({
          name: 'ship'
        })
      } else {
        this.$router.push({ name: item.router })
      }
    }
  },
  mounted() {}
}
</script>

<style lang="css">
.tab-nav-content ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
/* .tab-nav-content .bascicon{
  font-size: 18px;
} */
.tab-nav-content {
  position: relative;
  width: 504px;
  /* height: 200px; */
  background: linear-gradient(-1deg, #0C0C0C 1%, #4E4E4E 100%);
  top: 60px;
  left: 20px;
  z-index: 2
}
.tab-nav-title {
  width: 100%;
    height: 44px;
    line-height: 44px;
    /* background: red; */
    /* padding-top: 1px; */
}
.tab-nav-title ul li{
    color: #fff;
    list-style: none;
    float: left;
    padding: 0 11px 0 10px;
    font-size:14px;
    border-right: 1px solid rgba(0,0,0,0.40);
}
.tab-nav-title ul li:last-child{
  border: none;
}
/* .tab-nav-title ul li.navCurrent {
  border-right: 1px solid #FFA900;
} */
.tab-nav-title ul li .setting{
  width: 16px;
  height: 16px;
  margin-right: 3px;
}
</style>
