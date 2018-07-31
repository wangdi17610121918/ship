<template>
  <el-menu class="navbar" mode="horizontal">

    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <div :class="$t('publics.icon')">
    </div>
    <div class="map-nav-link">
      <ul>
        <li v-for='(item, index) in navList' :key="index" :class=" (path == item.path || routerPath ==  item.path) ? 'navCurrent' : '' " @click="goRoute(index, item.router)">
          {{$t(`indexRoute.routeList[${index}].text`)}}
        </li>
        <!-- <router-link id="roter" to="/" tag="li">地图</router-link>
        <router-link id="shipHall" to="/shipHall" tag="li">船盘大厅</router-link>
        <router-link id="mapInformation" to="/mapInformation" tag="li">资讯</router-link>
        <router-link to="/" tag="li">运费保值</router-link>
        <router-link id="Cooperative" to="/Cooperative" tag="li">合作伙伴</router-link>
        <router-link id="" to="/" tag="li">用户中心</router-link> -->
      </ul>
    </div>
   <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <div class="right-menu">
      <div class="ui-nav-buttom">
        <el-button type="info">{{$t('publics.chartering')}}</el-button>
        <el-button type="warning">{{$t('publics.plate')}}</el-button>
      </div>

      <!-- <map-buttom width='80px' height='30px' >租船拼船</map-buttom>
      <map-buttom width='80px' height='30px' :highlight="isHign">船盘发布</map-buttom> -->
      <setting class="setting"></setting>

      <error-log class="errLog-container right-menu-item"></error-log>
      <el-tooltip effect="light" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <lang-select  class="international right-menu-item"></lang-select>

      <!-- <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> -->
      <div @click="logout" style="display:inline-block;color: #fff;padding: 0 20px;vertical-align: top;">{{$t('navbar.logOut')}}</div>
      <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Setting from '@/components/Setting'
import navList from '@/lang/zh/indexRoute'
import {
  isI18n
} from '@/lang/index'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    Setting
  },
  props: {
    routerPath: {
      type: String
    }
  },
  data() {
    return {
      isI18n,
      navList: navList.routeList,
      path: this.$route.path,
      routeName: '',
      isHign: true
    }
  },
  watch: {
    isI18n: function(newValue, oldValue) {
    },
    $route(to, from) {
      this.path = to.path
    }
  },
  computed: {
    ...mapGetters([
      // 'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    goRoute(index, route) {
      if (route !== 'null') {
        this.$router.push({ name: route })
        this.routeName = route
      }
    }
    // getRoute() {
    //
    // }

  },
  mounted() {
    this.routeName = this.$route.name
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu--horizontal {
    border-right: none;
    border-bottom: solid 1px #181818;
}
.map-nav-link ul li{
  float: left;
  list-style: none;
  margin: 0 10px 0 10px;
  min-width: 80px;
  text-align: center;
  cursor: pointer;
}
.navbar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: rgba(24, 24, 24, 0.9);
  color: #fff;
  position: absolute;
z-index: 3;
  .sr-logo{
      float: left;
      color: #fff;
      font-size: 18px;
      text-indent: 135px;
      background:url('../../../../static/images/s_logo.png') -25px center no-repeat;
      background-size:190px auto;
      width: 104px;
      height: 50px;
      margin-right: 20px;
  }
  .sr-logoEn{
      float: left;
      color: #fff;
      font-size: 18px;
      text-indent: 135px;
      background:url('../../../../static/images/s_logo_en.png') -25px center no-repeat;
      background-size:190px auto;
      width: 140px;
      height: 50px;
      margin-right: 20px;
  }

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      line-height: 78px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .ui-nav-buttom,.setting{
      float: left;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
