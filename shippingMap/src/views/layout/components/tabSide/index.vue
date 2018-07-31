<template>
  <div class="side-warp-view"
       :style="{width, height, top, right}">
    <ul>
      <li v-for="(item, index) in tabList" :class=" item.path === path ? 'sideCurrent' : '' " :key="index" @click="switching(index,item.route)">
        <div class="side-img-box">
          <svg-icon class="icon-svg"  :icon-class="item.iconName" />
        </div>
        <div class="side-word-box">
        {{$t(`tabSide.tabList[${index}].name`)}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import tabSide from '@/lang/zh/tabSide'
export default {
  name: 'side',
  props: {
    width: String,
    height: String,
    top: String,
    right: String
  },
  watch: {
    $route(to, from) {
      this.path = to.path
    }
  },
  data() {
    return {
      closed: true,
      path: this.$route.path,
      tabList: tabSide.tabList
    }
  },
  mounted() {
  },
  methods: {
    switching(index, route) {
      console.log('111111111', index, route)
      this.num = index
      this.$router.push({ name: route, params: { flag: 'true' }})
    }
  }
}
</script>
<style>
.side-warp-view ul,
.side-warp-view li{
  padding: 0;
  margin: 0;
  list-style: none;
}
.side-warp-view {
  position: fixed;
  z-index: 1;
  width: 36px;
  bottom: 111px;
  right: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  color: #fff;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  letter-spacing: 0;
  text-align: center;
  line-height: 14px;
}
.side-warp-view .side-img-box {
  width: 20px;
  height: 20px;
  margin: 4px auto;
}
.side-warp-view  .side-img-box .icon-svg {
  width: 20px;
  height: 20px;
}
.side-warp-view ul li{
  background: #212121;
  padding: 6px 6px 7px;
  cursor: pointer;
  border-bottom: 1px solid rgba(153,153,153,.1);
}
.side-warp-view .sideCurrent {
  background: rgba(33,33,33,0.80);
}
</style>
