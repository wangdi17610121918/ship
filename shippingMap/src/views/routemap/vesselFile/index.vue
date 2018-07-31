<template>
    <map-dialog v-if="filleShow" class="fille-Vless-content"  :visible.sync='dialogFilleVisible' :beforeClose = 'beforeClose' left="20px" top="150px" width='504px'>
      <template slot="title">
        <div class="file-vless-title">
          <el-row :gutter="20">
            <el-col :span="11" class="detail_title-text">
              <span>
                <a href="javascript:;" @click="backDetail()">
                  <svg-icon class="font14"  style="transform: rotate(90deg);" icon-class="xiangxiajiantou" />
                </a>
              </span>
              <span class="mr-l-10">
                  <svg-icon class="font18" style="color:#ffa900" icon-class="chuanbodangan" />
              </span>
              <span class="mr-l-5" >
                {{$t('vlessfile.dalogName')}}
              </span>
            </el-col>
            <el-col :span="12" class="detail_title-icon">
              <span class="mr-l-15 " :title="$t('detail.messageIcon')">
                <svg-icon class="font16" icon-class="tianqi" />
                {{$t('publics.weathers')}}
              </span>
              <span class="mr-l-20" :title="$t('detail.weatherIcon')">
                <svg-icon class="font16" icon-class="guanzhu" />
                {{$t('publics.favorites')}}
              </span>
            </el-col>
          </el-row>
        </div>
      </template>
      <!-- v-for="classficationin Object.keys(tableGroup)" -->
      <div class="filecontent" v-if="tableDatas">
        <div class="fileitem" v-for="item in Object.keys(tableGroup)" :key='item'>
          <div class="main">
            <div class="file_title">
              {{$t('vlessfile.group.'+ item +'.title')}}
            </div>
            <div class="file_content" >
              <el-row>
                <el-col class="file_line" :span="12" v-for="options in Object.keys(tableGroup[item].context)" :key="options.title"  >
                  <div class="grid-content bg-purple" >
                    <el-col class="file_name" :span="10" >
                      {{$t('vlessfile.group.'+ item +'.context.' + options )}}:
                    </el-col>
                    <el-col :span="13" class="file_text" :title="item !== 'pis' ?tableDatas[item][options] :tableDatas[item][0][options]" >
                      {{item !== 'pis' ?tableDatas[item][options] :tableDatas[item][0][options]}}
                    </el-col>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="fileitem special">
          <div class="main mar-l-20">
            <div class="file_title">
                {{$t('vlessfile.classfications')}}
            </div>
            <div class="filecontent">
              <el-row>
                <el-col class="file_line font12" :span="24" v-for="lines in classfications" :key="lines.content" :title="lines.content">{{lines.content}}</el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="fileitem specialpsc">
          <div class="file_title mr-l-20">
              {{$t('vlessfile.pscs.title')}}
          </div>
          <div class="main" v-for="list1 in pscsD" :key=''>
            <div class="file_content">
              <el-row>
                <el-col class="file_line" :span="12" v-for="item in Object.keys(pscs)" :key="item.title" v-if= " item !== 'title' ">
                  <div class="grid-content bg-purple" >
                    <el-col class="file_name" :span="12" >
                      {{$t('vlessfile.pscs.' + item )}}:
                    </el-col>
                    <el-col :span="11" class="file_text" title="2222" >
                        {{list1[item]}}
                    </el-col>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <!-- <template slot="footer">
v-text="$t('portInquiry.title')"
      </template>   -->
  </map-dialog>
</template>

<script>
  import {
    lsRecord
  } from '@/api/routemap'
  import {
    mapGetters
  } from 'vuex'
  // import store from '@/store'
  import mapDialog from '@/views/routemap/dragDialog/mapDialog'
  // import Map from '@/views/routemap/map'
  import tableInfo from '@/lang/zh/vlessfile'
  // import tableKey from '@/lang/zh/shipDetail'
  import '@/styles/flag-icon.css'
  export default {
    components: {
      mapDialog
    },
    name: 'vlessFile',

    props: {
      dialogFilleVisible: {
        type: Boolean
      },
      beforeClose: {
        type: Function
      },
      back: {
        type: Function
      }
    },
    data() {
      return {
        tableData: {},
        tableGroup: tableInfo.group,
        pscs: tableInfo.pscs,
        tableDatas: null,
        classfications: [],
        pscsD: [],
        // dialogTableVisible: false,
        filleShow: false
      }
    },
    computed: {
      ...mapGetters([
        'shipInfos'
      ])
    },
    watch: {
      dialogFilleVisible: function(newValue, oldValue) {
        console.log(newValue, this.filleShow)
        this.init()
      }
    },
    methods: {
      init() {
        const obj = {
          imo: this.shipInfos.imo,
          mmsi: this.shipInfos.mmsi
        }
        lsRecord(obj).then(response => {
          if (response.data.datas) {
            this.filleShow = true
            // this.dialogTableVisible = true
            this.tableDatas = response.data.datas
            this.classfications = response.data.datas.classfications
            this.pscsD = response.data.datas.pscs
            console.log(this.tableGroup, this.filleShow, 'vlessFile')
          }
        })
      },
      backDetail() {
        this.back()
      }
    },
    mounted() {
    }
  }
</script>
<style>
 .map_dialog {
    position: absolute;
    /* top: 390px;
    right: 140px; */
}
.fille-Vless-content .file-vless-title{
  color: #FFF;
  margin-left: 10px;
  margin-top: 14px;
}
.fille-Vless-content .detail_title-icon{
  font-size: 12px;
}
.fille-Vless-content .detail_title-text{
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
  .fileitem{
  color: #fff;
  margin-top:  12px;
  margin-bottom: 10px;
  /* border-bottom: 1px solid #383838; */
  }
  .fileitem:last-child{
    border-bottom: none;
  }
  .fileitem .main{
    margin-left: 20px;
    margin-right: 20px;
  }
  .fileitem .file_title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
.fileitem .file_content .file_name{
    text-align: left;
    font-size: 12px;
    color: #c8c8c8
  }
.fileitem .file_content .file_text{
  font-size: 12px;
  color: #fff;
  margin-left:5px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.fileitem .file_content .file_line{
  height: 30px;
  line-height: 30px;
}
.filecontent{
  max-height: 300px;
  overflow-y: auto;
}
.special .filecontent{
    margin-left: 40px;
}
.special .el-col{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}
.specialpsc .file_content{
  border-bottom:1px solid #383838
}
.specialpsc .file_content:last-child(){
  border-bottom:none
}
.fille-Vless-content .filecontent::-webkit-scrollbar
{
    width: 6px;
    height: 6px;
    background-color: rgba(255,255,255,0.13);
    border-radius: 6px;
}
.fille-Vless-content .filecontent::-webkit-scrollbar-thumb{
  background-color: rgba(255,255,255,1);
  border-radius: 6px;

}

</style>
