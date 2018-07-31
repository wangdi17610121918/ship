<template>
  <div class="menu-wrapper">
    <search-ship></search-ship>
    <main>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-myfleet" />
        <span v-text="$t('publics.myfleet')">我的船队</span>
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-portSearch"  />
        <span v-text="$t('publics.portSearch')">港口查询</span>
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-historicalRote"  />
        <span v-text="$t('publics.historicalRote')">历史航线</span>
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-shineCalc"  />
        <span v-text="$t('publics.shineCalc')">航速航线计算</span>
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-typhoon"  />
        <span v-text="$t('publics.typhoon')">台风</span>
        <svg-icon class="rightArrow" icon-class="s-bottomArrow"  />
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px;"  icon-class="s-weather"  />
        <span v-text="$t('publics.weather')">气象海况</span>
        <svg-icon class="rightArrow" icon-class="s-bottomArrow"  />
      </div>
      <div class="silderitem">
        <svg-icon style="font-size:20px"  icon-class="s-piracy"  />
        <span :class="$t('publics.font')" v-text="$t('publics.piracy')">海盗军演</span>
        <svg-icon class="rightArrow" icon-class="s-bottomArrow"  />
      </div>
    </main>
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">

        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">

          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import SearchShip from './searchShip'

export default {
  name: 'SidebarItem',
  components: { SearchShip },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>
<style>
.silderitem{
  width: 230px;
  height: 44px;
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
  line-height: 44px;
  background:#28282f;
  padding-left: 15px;
  margin-bottom: 10px;
  position: relative;
}
.rightArrow{
  font-size: 20px;
  margin-left: 70px;
  position: absolute;
  top: 12px;
  right: 5px
}
</style>
