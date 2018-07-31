<template>
    <div>
        <div class="sr-layout">
            <div class="sr-header">
                <div class="sr-logo" style="width: 600px;" @click="getActiveIndex()">Voyage Route & Speed Intelligence</div>
                <ul class="sr-nav sr-layout-right">
                    <li class="sr-nav-item">
                        <a href="javascript:;" class="sr-navblink" >
                            <em>{{userName}}</em>
                        </a>
                    </li>
                    <li class="sr-nav-item">
                        <a href="javascript:;" class="sr-navblink"  @click="signOut()">
                            <em>Sign out</em>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sr-side">
                <a class="side-btn open">
                    <i class="fs fs-side-retra"></i>
                </a>
                <div class="sr-side-scroll">
                    <div class="sr-search">
                        <input class="sear_input" type="text" placeholder="Vessel Name/IMO" value=""
                               @input="fuzzySearch"
                               @focus="fuzzySearch"
                               v-model.trim='full_search'>
                        <a href="javascript:;" class="ship-search-a">
                            <i class="fs fs-search"></i>
                        </a>
                    </div>
                    <div class="fullz-z" v-show="ulFlag">
                        <ul class="ul-list-data">
                            <li v-for="fuzzyMsg in fuzzyMsgs" @click="pitchOn(fuzzyMsg.imo)">
                                <span :title="fuzzyMsg.matchkey">{{fuzzyMsg.matchkey}}</span>
                                <span class="right-context">{{fuzzyMsg.matchname}}</span>
                                <input type="hidden" :value="fuzzyMsg.imo">
                            </li>
                        </ul>
                    </div>            
                    <div class="gk-search">
                        <a class="fs_search_model" href="javascript:;" @click="reqList">
                            <i class="fs fs-port"></i>Port Search</a>
                    </div>
                     <div class="gk-search mar-top-10">
                        <a class='historical' href="javascript:;" @click="coming">
                            <i class="fs fs-historical-route"></i>Historical Route</a>
                    </div>
                    <div class="gk-search mar-top-10">
                        <a class="hx_calc" href="javascript:;">
                            <i class="fs fs-speed-calcu" style=""></i>Voyage Route&Speed Calculation</i>
                            <!--<i class="icon_down fs fs-chevron-down"></i>-->
                        </a>
                    </div>
                    <div class="ul_hx">
                        <ul class="sr-nav-tree">
                            <li class="sr-nav-li"> Port1
                                <input type="text">
                            </li>
                            <li class="sr-nav-li">  Port2
                                <input type="text">
                            </li>
                            <li class="sr-nav-li">  Port3
                                <input type="text">
                                <a class="add" href="javascript:;" @click="coming">+</a>
                            </li>
                            <li class="sr-nav-li">
                                <span class="hangsu" >Speed</span>
                                <input type="text">
                            </li>
                        </ul>
                        <div class="calc">
                            <a href="javascript:;">Calculation</a>
                        </div>
                    </div>
                    <div class="gk-search mar-top-10">
                        <a href="javascript:;" @click="coming">
                            <i class="fs fs-weather-infor"></i>Weather Service Beta</a>
                    </div>
                </div>
            </div>
            <div class="sr-body">
                <!-- 放大缩小图层 -->
                <div class="sr-zooming">
                    <a href="javascript:;" class="enlarge">+</a>
                    <div class="scroll1-height1">
                        <span class="dieblock"></span>
                    </div>
                    <a href="javascript:;" class="reduce">-</a>
                </div>
                <!--视图切换-->
                <!-- <ul class="sr-viewgraph clearfix">
                  <li><a href="javascript:;""javascript:;">海图</a></li>
                  <li class="act"><a href="javascript:;""javascript:;">卫星图</a></li>
                </ul> -->
                <div id="map"></div>
                <!--弹出图层1-->
                <div class="sr-dialog sr-d1" style="display:none">
                    <h2 class="sr-d-title">
                        <span>{{shipMessage.shipName}}</span>
                        <a href="javascript:;" class="sr-close close-1 close-1-1">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <dl class="sr-d1-con">
                        <dt class="d1-link">
                            <a href="javascript:;" class="tryQuery" style="display: inline-block">Voyage History</a>
                            <a href="javascript:;" class="abolish" style="display: none">Cancel</a>
                            <a href="javascript:;" class="harborSearch" @click="harborSearch">Port Calling</a>
                            <a href="javascript:;" class="coming">Message</a>
                            <a href="javascript:;" class="coming">Route&Speed</a>
                        </dt>
                        <dd class="d1-info">
                            <ul class="clearfix" >
                                <li>
                                    <em class="sr-d1-label">Vessel Type：</em>
                                    <span class="d1-txt">{{shipMessage.shipType}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Status：</em>
                                    <span class="d1-txt">{{shipMessage.shipConditionEn}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">IMO：</em>
                                    <span class="d1-txt get-imo">{{shipMessage.IMO}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">MMSI：</em>
                                    <span class="d1-txt get-mmsi">{{shipMessage.MMSI}}</span>
                                </li>
                            </ul>
                        </dd>
                        <dd class="d1-info">
                            <ul class="clearfix">
                                <li>
                                    <em class="sr-d1-label">Built：</em>
                                    <span class="d1-txt">{{shipMessage.Built}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Cubic：</em>
                                    <span class="d1-txt">{{shipMessage.Cubic}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">SDWT：</em>
                                    <span class="d1-txt">{{shipMessage.SDWT}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">LOA：</em>
                                    <span class="d1-txt">{{shipMessage.LOA}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Beam：</em>
                                    <span class="d1-txt">{{shipMessage.Beam}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Hull Type：</em>
                                    <span class="d1-txt">{{shipMessage.HullType}}</span>
                                </li>
                            </ul>
                        </dd>
                        <dd class="d1-info">
                            <ul class="clearfix" style="padding-bottom: 30px">
                                <li>
                                    <em class="sr-d1-label">Latest Update：</em>
                                    <span class="d1-txt">{{shipMessage.newTime}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Speed：</em>
                                    <span class="d1-txt">{{shipMessage.shipSpeed}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Draft：</em>
                                    <span class="d1-txt">{{shipMessage.shipWaterline}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Max Draft：</em>
                                    <span class="d1-txt">{{shipMessage.shipFullWaterline}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Destination：</em>
                                    <span class="d1-txt">{{shipMessage.destination}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">ETA：</em>
                                    <span class="d1-txt">{{shipMessage.ETA}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Departure Port：</em>
                                    <span class="d1-txt">{{shipMessage.shipInitial}}</span>
                                </li>
                                <li>
                                    <em class="sr-d1-label">Current Zone：</em>
                                    <span class="d1-txt">{{shipMessage.nowSeaAreaEn}}</span>
                                </li>
                                <li class="lastli">
                                    <em class="sr-d1-label">Time Range：</em>
                                    <span class="d1-time-cpm d1-time-cpm1">
										<el-date-picker
                                                v-model="time1"
                                                class="timeP1"
                                                size="mini"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="Pick a day"
                                                :picker-options="pickerOptions0">
					                     </el-date-picker>
									</span>
                                    <p class="sr-lineb">—</p>
                                    <span class="d1-time-cpm d1-time-cpm2">
										<el-date-picker
                                                v-model="time2"
                                                class="timeP1"
                                                size="mini"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="Pick a day"
                                                :picker-options="pickerOptions1">
					                    </el-date-picker>
									</span>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <!--弹出图层2  添加船舶-->
                <div class="sr-dialog sr-d2" style="display:none">
                    <h2 class="sr-d-title">
                        <span>添加船舶提醒</span>
                        <a href="javascript:;" class="sr-close">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <div class="sr-form">
                        <div class="sr-row">
                            <span class="sr-label">IMO</span>
                            <input type="text" class="sr-inp">
                        </div>
                        <div class="sr-row">
                            <span class="sr-label">提醒邮箱</span>
                            <input type="text" class="sr-inp" placeholder="huaxianzi_888@163.com">
                        </div>
                        <div class="sr-row">
                            <span class="sr-label">提醒间隔</span>
                            <select class="sr-sel">
                                <option></option>
                            </select>
                        </div>
                        <div class="sr-row">
                            <span class="sr-label"></span>
                            <button class="sr-btn">添加</button>
                        </div>
                    </div>
                </div>
                <!--弹出图层3-->
                <div class="sr-dialog sr-d3" id="sr1" style="display:none">
                    <h2 class="sr-d-title">
                        <span>Port Search</span>
                        <a href="javascript:;" class="sr-close haven-close">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <div class="sr-form">
                        <div class="d3-mod1">
                            <div class="sr-row">
                                <span class="sr-label">Port：</span>
                                <select class="select_d3" v-model="loadPort1">
                                    <option value="" selected="selected">Port</option>
                                    <option v-for="item in loadPortArr" :value="item.portNameEn">{{item.portNameEn}}</option>
                                </select>
                            </div>
                            <div class="sr-row">
                                <span class="sr-label">End Time：</span>

                                <!-- <p class="haha"> -->

                                <el-date-picker
                                        v-model="time0"
                                        class="timeP"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="Pick a day">
                                </el-date-picker>
                                <!-- </p >   -->
                            </div>
                            <div class="sr-row">
                                <span class="sr-label">Vessel Type:：</span><!---->
                                <select class="select_d3" v-model="loadPort2">
                                    <option value="" selected="selected">Vessel Type</option>
                                    <option v-for="item1 in loadPortArr1" :value="item1">{{item1}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="d3-mod2">
                            <div class="sr-row">
                                <span class="sr-label">DWT：</span>
                                <div class="sr-chk-group  load-wrap" data-value="1">
                                    <label>
                                        <a class="a-flag sr-chk checked" href="javascript:;" uid="1">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        All</label>
                                    <label>
                                        <a class="sr-chk " href="javascript:;" uid="2">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        Ballast</label>
                                    <label>
                                        <a class="sr-chk" href="javascript:;" uid="3">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        Laden</label>
                                </div>
                            </div>
                            <div class="sr-row">
                                <span class="sr-label">Status：</span>
                                <div class="sr-chk-group voyage-wrap" data-value="1">
                                    <label>
                                        <a class="a-flag sr-chk checked" href="javascript:;" uid="1">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        All</label>
                                    <label>
                                        <a class="sr-chk" href="javascript:;" uid="2">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        Static</label>
                                    <label>
                                        <a class="sr-chk" href="javascript:;" uid="3">
                                            <i class="fs fs-checkbox"></i>
                                        </a>
                                        Underway</label>
                                </div>
                            </div>
                        </div>
                        <div class="sr-row1">
                            <span class="sr-label"></span>
                            <button class="sr-btn add-btn search-btn" @click='addbtn'>Search</button>
                            <button class="sr-btn empty-btn clear-btn" @click="clearBtn">Clear</button>
                        </div>
                    </div>
                </div>
                <!--弹出图层4-->
                <div class="sr-dialog sr-d4 port-record" style="display:none">
                    <h2 class="sr-d-title">
                        <span>Port Calling（{{total}}）</span>
                        <a href="javascript:;" class="sr-close">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <div class="sr-table-wrap">
                        <table class="sr-table">
                            <thead>
                                <tr>
                                    <th>Vessel Name</th>
                                    <th>Vessel Type</th>
                                    <th>Draft</th>
                                    <th>Departure Port</th>
                                    <th>ETA</th>
                                    <th>Destination</th>
                                    <th>Speed</th>
                                    <th>Latest Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="reachLog in reachLogs">
                                    <td>{{reachLog.shipName}}</td>
                                    <td>{{reachLog.shipTypeCn}}</td>
                                    <td>{{reachLog.draught}}</td>
                                    <td>{{reachLog.startCn}}</td>
                                    <td>{{reachLog.eta}}</td>
                                    <td>{{reachLog.destCn}}</td>
                                    <td>{{reachLog.sog}}</td>
                                    <td>{{reachLog.lasttime | timestampFormat}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="page-wrap">
                            <el-pagination
                                    class="page-style"
                                    @current-change='pageFn'
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total=total>
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <!--弹出图层5-->
                <div class="sr-dialog sr-d5" style="display:none">
                    <h2 class="sr-d-title">
                        <span class="sr-label">绕开航行：</span>
                        <div class="sr-chk-group">
                            <label>
                                <a class="sr-chk" href="javascript:;">
                                    <i class="fs fs-checkbox"></i>
                                </a>
                                苏伊士</label>
                            <label>
                                <a class="sr-chk checked" href="javascript:;">
                                    <i class="fs fs-checkbox"></i>
                                </a>
                                巴拿马</label>
                            <label>
                                <a class="sr-chk" href="javascript:;">
                                    <i class="fs fs-checkbox"></i>
                                </a>
                                KLEL</label>
                        </div>
                        <a href="javascript:;" class="sr-close">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <div class="sr-table-wrap">
                        <table class="sr-table">
                            <tr>
                                <th>序号</th>
                                <th>港口</th>
                                <th>距离 (nm)</th>
                                <th>航速 (km/s)</th>
                                <th>经验航速 (km/s)</th>
                                <th>港口停留时间 (h)</th>
                                <th>预计离港时间</th>
                                <th>预计到港时间</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nanjing</td>
                                <td>112</td>
                                <td>12</td>
                                <td>12</td>
                                <td>
                                    <select class="sr-sel">
                                        <option>12</option>
                                    </select>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nanjing</td>
                                <td>112</td>
                                <td>12</td>
                                <td>12</td>
                                <td>
                                    <select class="sr-sel">
                                        <option>12</option>
                                    </select>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nanjing</td>
                                <td>112</td>
                                <td>12</td>
                                <td>12</td>
                                <td>
                                    <select class="sr-sel">
                                        <option>12</option>
                                    </select>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                                <td>
									<span class="d1-time">
										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
										<a href="javascript:;" class="fs fs-calendar"></a>
									</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="d5-tag">
                        <span class="d5-txt">标准航行：1757.0km</span>
                        <span class="d5-txt">用时：26.5天</span>
                        <span class="d5-txt">经验航行：
							<em class="orange">1023.20km</em>
						</span>
                        <span class="d5-txt">用时：
							<em class="orange">24天</em>
						</span>
                        <span class="d5-txt">
							<em class="orange">* 以上计算结果仅供参考</em>
						</span>
                    </div>
                </div>
                <!--弹出层6-->
                <div class="sr-dialog sr-d4 reach-popout" style="display:none; top: 50%;">
                    <h2 class="sr-d-title">
                        <span>Port Calling（{{total1}}）</span>
                        <a href="javascript:;" class="sr-close reach-close">
                            <i class="fs fs-close"></i>
                        </a>
                    </h2>
                    <div class="sr-table-wrap">
                        <table class="sr-table">
                            <thead>
                            <tr>
                                <th>Port（CN）</th>
                                <th>Port（EN）</th>
                                <th>Country</th>
                                <th>ATA</th>
                                <th>ATD</th>
                                <th>Arriving Draft</th>
                                <th>Departure Draft</th>
                                <th>Port Operation Time</th>
                                <th>Terminal Operation Time</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="list in reachLogs1">
                                    <td>{{list.portNameCn}}</td>
                                    <td>{{list.portNameEn}}</td>
                                    <td>{{list.counrtyCn}}</td>
                                    <td>{{list.ata | timestampFormat}}</td>
                                    <td>{{list.atd | timestampFormat}}</td>
                                    <td>{{list.draughtIn}}</td>
                                    <td>{{list.draughtOut}}</td>
                                    <td>{{list.workTimePort | timestampFormat}}</td>
                                    <td>{{list.workTimeDoc | timestampFormat}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="page-wrap">
                            <el-pagination
                                    class="page-style"
                                    @current-change='pageFn1'
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total=total1>
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="_1111111111">{{reachLogs1}}</div>
    </div>
</template>

<script>
    import axios from 'axios';
	import {userLoad} from '../api/ship';
    export default {

        data() {
            return {
                userName:'',
                timeRange: [],
                loadPortArr: [],
                loadPortArr1: ['VLCC', 'Suezmax', 'Aframax'],
                loadPort1: '',         //港口
                loadPort2: '',         //船型
                time0: '',             //截止日期
                ulFlag: false,
                shipMessage: {},
                full_search:'',
                fuzzyMsgs: [],
                time1: new Date(new Date()- (24 * 7 ) * 60 * 60 * 1000),
                time2: new Date(),
                reachLogs: [],          //靠港记录
                total: 0,
                total1: 0,
                pageNum: 1,
                pageSize: 5,
                pageNum1: 1,
                reachLogs1: [],         //靠港记录
                url: configURL.shipUrl,
                pickerOptions0: {

                    disabledDate: (time) => {

                        let curDate = (new Date()).getTime();

                        let seven = 7 * 24 * 3600 * 1000;

                        let months = curDate - seven;

                        return time.getTime() > Date.now() /*|| time.getTime() > months;*/
                    }

                },
                pickerOptions1: {

                    disabledDate: (time) => {

                        return time.getTime() < this.value1 || time.getTime() > Date.now();

                    }
                },
            }
        },

        components: {},

        methods: {
        	getActiveIndex(){
				window.open(configURL.index,"_self");
        	},
			getIn(){
				userLoad().then((res)=>{
						var userData = res.datas;
						if(userData){
			    			this.userName=res.datas.name
			    		}else{
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/routemap';
			    		}	
			    		
				})	
			},
            signOut(){

                this.userName='';

                window.localStorage.removeItem('user');

                window.location.href=this.removeHref('loging');

                window.location.href=configURL.sys+"/logout.htm";

//				window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/'

            },

            removeHref(str){

                var url = window.location.href;

                var index = window.location.href.indexOf('?');

                if(index==-1) return url;

                var newUrl= window.location.href.substring(0,index);

                url=window.location.href.substring(index+1);

                var urlArr=url.split('&');

                for(var i=0; i<urlArr.length; i++){

                    if(urlArr[i].indexOf(str)!=-1){

                        urlArr.splice(i,1);

                    }

                }

                var newQuery='';

                if(urlArr.length==0){

                    newQuery += '';

                }else if(urlArr.length==1){

                    newQuery='?'+urlArr.join("");

                }else{

                    newQuery='?'+urlArr.join("&");

                }

                return newUrl+newQuery;

            },

            //模糊搜索
            fuzzySearch(){

                var that = this;

                if(this.full_search != ''){

                    var obj = {keyword: this.full_search};

                    $.ajax({
                        type: "POST",
                        url: that.url+"/sysShip/findSysShipByKeyword.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType:"application/json",
                        success: function(data) {

                            that.fuzzyMsgs = data.datas;

                        },
                        error:function(error) {

                            console.log(error)

                        }

                    });

                }else {
                    return
                }

                this.full_search != '' ? this.ulFlag = true : this.ulFlag = false;

            },

            //搜索框赋值
            pitchOn (msg){

                this.full_search = msg;

                this.ulFlag = false;

            },

            //港口查询
            reqList (){

                var that = this;

                $('.sr-d3').css({'display': 'block', 'left': '32.5%', 'top': '10%'});

                $.ajax({
                    type: "GET",
                    url: this.url+"/api/ports.json",
                    success: function(data) {

                        console.log(data);

                        that.loadPortArr = data.datas;

                    },
                    error:function(error) {

                        console.log(error)

                    }

                })

            },

            //搜索港口
            addbtn () {

                var that = this;

                if(this.loadPort1 != '' && this.time0 != '' && this.time0 != null && $('.load-wrap').attr('data-value') != '' && $('.voyage-wrap').attr('data-value') != ''){

                    var dataObj = {
                        "portName": this.loadPort1,
                        "type": this.loadPort2,
                        "endTime": new Date(this.time0).getTime(),
                        "deadWeight": $('.load-wrap').attr('data-value'),
                        "naviStatus" : $('.voyage-wrap').attr('data-value'),
                        "pageSize": that.pageSize,
                        "pageIndex": that.pageNum,
                    };

                    /*var dataObj ={
                        "portName":"宁波",
                        "naviStatus" :2,
                        "deadWeight":1,
                        "endTime": 1513960377000,
                        "type":"vlcc",
                        "pageSize": that.pageSize,
                        "pageIndex": that.pageNum,
                    };*/
                    console.log(dataObj, '搜索港口请求数据');
                    $.ajax({
                        type: "POST",
                        url: that.url+"/api/appjson/location.json",
                        data: JSON.stringify(dataObj),
                        dataType: "json",
                        contentType:"application/json",
                        success: function(data) {

                            console.log(data , '搜索港口返回数据');

                            if( data.total > 0 ){

                                that.reachLogs = data.datas.data;

                                that.total = data.total;

                                $('.port-record').css({'display': 'block', 'left': '12.5%', 'bottom': '170px'});

                            }else{

                                that.$alert('<strong style="margin-left: 160px">暂无数据</strong>', 'Message', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });

                            }

                        },
                        error:function(error) {

                            console.log(error)

                        }

                    });

                }else {

                    this.$alert('<strong style="margin-left: 160px">输入不能为空</strong>', 'Message', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });

                }

            },

            //搜索港口分页
            pageFn (page) {

                var that = this;

                var obj = {
                    imo: $('.get-imo').text(),
                    startTime: new Date(this.time1).getTime(),
                    endTime: new Date(this.time2).getTime(),
                    "pageSize": this.pageSize,
                    "pageIndex": page,
                };
                $.ajax({
                    type: "POST",
                    url: this.url+"/api/appjson/location.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType:"application/json",
                    success: function(data) {

                        that.total = data.total;

                    },
                    error:function(error) {

                        console.log(error)

                    }

                })
            },

            //清空按钮
            clearBtn (){

                this.loadPort1 = '';

                this.loadPort2 = '';

                this.time0 = '';

                $('.load-wrap .sr-chk').removeClass('checked');

                $('.voyage-wrap .sr-chk').removeClass('checked');

                $('.a-flag').addClass('checked');

                $('.load-wrap').attr('data-value', '1');

                $('.voyage-wrap').attr('data-value', '1');

            },

            //靠港查询
            harborSearch () {

                var that = this;

                if(that.time1 != '' && that.time2 != ''){

                    //向后台传递的数据
                    var obj = {
                        imo: $('.get-imo').text(),
                        startTime: new Date(this.time1).getTime(),
                        endTime: new Date(this.time2).getTime(),
                        "pageSize": that.pageSize,
                        "pageIndex": that.pageNum1,
                    };

                    /*var obj = {
                        "imo": 9315367,
                        "startTime": "1489142976000",
                        "endTime": "1521616176000",
                        "pageSize": that.pageSize,
                        "pageIndex": that.pageNum1,
                    };*/

                    $.ajax({
                        type: "POST",
                        url: this.url+"/api/appjson/history.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType:"application/json",
                        success: function(data) {

                            if(data.datas.length != 0){

                                console.log(data);
                                that.reachLogs1 = data.datas;

                                that.total1 = data.total;

                                $('.reach-popout').show();

                            }else{

                                that.$alert('<strong style="margin-left: 160px">暂无当前日期数据</strong>', 'Message', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });

                            }

                        },
                        error:function(error) {

                            console.log(error)

                        }

                    });

                }else {

                    that.$alert('<strong style="margin-left: 160px">请输入日期</strong>', 'Message', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });

                }
            },

            //靠港查询分页
            pageFn1 (page){

                var that = this;

                var obj = {
                    imo: $('.get-imo').text(),
                    startTime: new Date(this.time1).getTime(),
                    endTime: new Date(this.time2).getTime(),
                    "pageSize": this.pageSize,
                    "pageIndex": page,
                };

                $.ajax({
                    type: "POST",
                    url: this.url+"/api/appjson/history.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType:"application/json",
                    success: function(data) {

                        console.log(data, 'qwer');

                        that.reachLogs1 = data.datas;

                        that.total1 = data.total;

                    },
                    error:function(error) {

                        console.log(error)

                    }

                })

            },

            search_input (e) {

                $(e.target).val('');

            },

            full_input () {

                $('.fullz-z ul').html('');

                if(this.full_search == ''){

                    $('.fullz-z').css('display',"none");

                }else{

                    var html='<li><span class="full_l">11111111</span> <span class="full_r">船名</span></li><li><span class="full_l">11111111</span> <span class="full_r">船名</span></li>'

                    $('.fullz-z ul').append(html);

                    $('.fullz-z').css('display',"block");

                }

            },

            //Comming Soon
            coming () {

                this.$alert('<strong style="margin-left: 160px">Comming Soon</strong>', 'Message', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });

            },

        },

        mounted() {

            var _this = this;

            var map,
                /*infowindow,*/
                shipMarker, //搜索船只点
                startMarker,
                endMarker;

            var markers = [];

            var isShipMarker = [];

            var allShipMarker = [];

            //地图入口
            initMap();
            function initMap() {

                $('#map').css('position', 'none');

                //地图初始化
                initializeMapFun();
                function initializeMapFun () {

                    //控制台输出Google Maps API版本
                    console.log('Google Maps API version: ' + google.maps.version);

                    //地图初始化
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 31, lng: 129},
                        zoom: 3,
                        maxZoom: 12,
                        minZoom: 2,
                        /*backgroundColor: '#1A2A5B',*/
                        mapTypeId: 'hybrid',
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },
                        zoomControl: false,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP
                        },
                        scaleControl: true,
                        streetViewControl: false,
                        fullscreenControl: false,
                    });

                    //载入船只数据
                    var script = document.createElement('script');

                    script.setAttribute('src',  _this.url+'/api/geojson/allback.json?callbackparam=shipMsg_callback');

                    document.getElementsByTagName('head')[0].appendChild(script);

                    //处理JSONP请求由服务器调用该函数
                    window.shipMsg_callback = function (data) {

                        map.data.addGeoJson(data);

                    };

                };

                //船只数据样式初始化
                initStyle();
                function initStyle() {

                    map.data.setStyle({
                        fillColor: '#565656',
                        strokeWeight: 1,
                        icon: '../../static/images/green.png',
                        /*label: 'Aaaaaaaaaa'*/
                    });

                }

                //监听地图缩放事件
                //var mapDataFlag = true;
                //map.addListener('zoom_changed', zoom_changed);

                //鼠标移入
                map.data.addListener('mouseover', function (event) {

                    if (map.getZoom() >= 9) {

                        //if (mapDataFlag) {

                            //mapDataFlag = false;

                            event.feature.setProperty('strokeColor', 'red');

                            event.feature.setProperty('strokeWeight', 2);

                            var lat = event.feature.getProperty('lat');

                            var lng = event.feature.getProperty('lng');

                            var shipMessage = event.feature.getProperty('shipMessage');
/*

                            var html = `<div id="showMSg">
                                            <div>${shipMessage.IMO}</div>
                                            <div>2222</div>
						                </div>`;
                            infowindow = new google.maps.InfoWindow({
                                content: html,
                                position: {lat, lng},
                            });

                            infowindow.close();

                            infowindow.open(map);

                            setTimeout(() => {

                                mapDataFlag = true;

                            }, 300);
*/

                        //}

                    }

                });

                //鼠标离开
                map.data.addListener('mouseout', function (event) {

                    if (map.getZoom() >= 9) {

                        event.feature.setProperty('strokeColor', '#000000');

                        event.feature.setProperty('strokeWeight', 1);

                        //infowindow.close();

                    }

                });

                //船只数据添加点击事件
               /* map.data.addListener('click', function (event) {

                    if (map.getZoom() >= 9) {

                        let shipMessage = event.feature.getProperty('shipMessage');

                        //var latLngData = event.latLng.lat().toFixed(6)+','+event.latLng.lng().toFixed(6);
                        _this.shipMessage = shipMessage;

                        $('.sr-d1').css({
                            'display': 'block',
                            'left': '60%',
                            'top': '8%'
                        });
                        //map.setZoom(3);
                        //map.setCenter({lat: 15, lng: 0});
                        //map.panTo({lat:20 , lng: -121});
                    }
                });*/

                //轨迹查询
                $('.tryQuery').on('click', function () {

                    if($('.get-imo').text() != '' && _this.time1!= '' && _this.time1!= null && _this.time2!= '' && _this.time2!= null){

                        if(_this.time1 > _this.time2){

                            _this.$alert('<strong style="margin-left: 110px">结束日期不能小于起始日期</strong>', 'Message', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });

                        }else{

                            map.setZoom(4);
                            /*map.data.setStyle({
                                fillColor: '#565656',
                                strokeWeight: 10,
                            });*/

                            //轨迹起点箭头样式
                            var symbolOne = {
                                path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                                strokeWeight: 1,
                                strokeColor: '#00ff1c',
                                fillColor: '#00ff1f',
                                fillOpacity: 1,
                                scale: 1.2,
                            };

                            //轨迹终点箭头样式
                            var symbolEnd = {
                                path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                                strokeColor: '#ff0005',
                                strokeWeight: 2,
                                fillColor: '#ff2800',
                                fillOpacity: 1,
                                scale: 1.2,
                            };

                            // 斜线
                            var symbolEnd1 = {
                                path: 'M0-0L19-28z',
                                strokeColor: '#00de1a',
                                strokeWeight: 2,
                                fillColor: '#F00',
                                fillOpacity: 0.3,
                                scale: 0.6,
                                rotation:0,
                            };

                            //轨迹箭头样式
                            var symbolArrows = {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                                strokeWeight: 3,
                                strokeColor: '#F00',
                                fillColor: '#eaedec',
                                fillOpacity: 1,
                                scale: 1,
                            };

                            //红圆
                            var symbolCircle = {
                                path: google.maps.SymbolPath.CIRCLE,
                                strokeWeight: 3,
                                strokeColor: '#F00',
                                fillColor: '#ddd',
                                fillOpacity: 1,
                                scale: 4,
                            };

                            //黄圆
                            var symbolCircleYellow = {
                                path: google.maps.SymbolPath.CIRCLE,
                                strokeWeight: 3,
                                strokeColor: '#F5FF44',
                                fillColor: '#FFF',
                                fillOpacity: 1,
                                scale: 4,
                            };

                            //向后台传递的数据
                            var obj = {
                                imo: $('.get-mmsi').text(),
                                startTime:  _this.time1,
                                endTime: _this.time2,
                            };

                            //绘制轨迹请求
                            $.ajax({
                                url: _this.url+'/api/geojson/waypoint.json',
                                type: 'post',
                                data: JSON.stringify(obj),
                                dataType: "json",
                                contentType:"application/json",
                                success: function (data) {

                                    if(data.length != 0){

                                        $('.abolish').show();

                                        $('.tryQuery').hide();

                                        var locus = data;

                                        //绘制轨迹
                                        var line = new google.maps.Polyline({
                                            map: map,
                                            strokeColor: '#FF0000',
                                            strokeWeight: 2,
                                            path: locus,
                                            icons: [
                                                {
                                                    icon: symbolArrows,
                                                    offset: '20px',
                                                    repeat: '200px',
                                                },
                                            ],

                                        });

                                        allShipMarker.push(line);

                                        //绘制起点
                                        startMarker = new google.maps.Marker({
                                            position: {lat: locus[0].lat, lng: locus[0].lng},
                                            map: map,
                                            icon: symbolOne,
                                            /*label: '起',*/
                                        });

                                        allShipMarker.push(startMarker);

                                        //绘制终点
                                        endMarker = new google.maps.Marker({
                                            position: {lat: locus[locus.length-1].lat, lng: locus[locus.length-1].lng},
                                            map: map,
                                            icon: symbolEnd,
                                            /*label: '终',*/
                                        });

                                        allShipMarker.push(endMarker);


                                        //此处必须用let声明 否则使用闭包
                                        for(let i = 0; i < locus.length; i++) {

                                            let latLng = new google.maps.LatLng(locus[i].lat, locus[i].lng);

                                            let text = locus[i].text;

                                            let marker46;
                                            //绘制路线点
                                            let marker =new google.maps.Marker({
                                                position: latLng,
                                                map: map,
                                                icon: symbolCircle,
                                            });

                                            allShipMarker.push(marker);


                                            /* //绘制时间轴
                                             marker46 = new google.maps.Marker({
                                                 position:latLng,
                                                 label: {
                                                     text,
                                                     color: '#00ff51',
                                                 },
                                                 map: map,
                                                 icon: {
                                                     path: 'M0-0L19-28z',
                                                     fillColor: '#00ff51',
                                                     strokeColor: '#00ff48',
                                                     labelOrigin: new google.maps.Point(75, -35),
                                                     strokeOpacity: 0.8,
                                                     strokeWeight: 2,
                                                     anchor: new google.maps.Point(0, 0),
                                                     scale: 1,
                                                 }

                                             });
     */

                                            marker.addListener('mouseover', function () {

                                                marker.setIcon(symbolCircleYellow);

                                            });

                                            marker.addListener('mouseout', function () {

                                                marker.setIcon(symbolCircle);

                                            });

                                            shipMarker.setMap(null);

                                        }

                                        map.setCenter({lat: locus[0].lat, lng: locus[0].lng});

                                    }else {

                                        _this.$alert('<strong style="margin-left: 160px">暂无数据</strong>', 'Message', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });

                                    }

                                },

                            });

                        }

                    }else {

                        _this.$alert('<strong style="margin-left: 160px">请输入日期</strong>', 'Message', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });

                    }

                });

                //取消绘制
                $('.abolish').on('click', function () {

                    $('.tryQuery').show();

                    $('.abolish').hide();

                    /*line.setMap(null);

                    marker.setMap(null);

                    //marker46.setMap(null);

                    shipMarker.setMap(null);

                    startMarker.setMap(null);

                    endMarker.setMap(null);*/

                    for (var i = 0; i < allShipMarker.length; i++) {

                        allShipMarker[i].setMap(null);

                    }

                    map.setZoom(3);

                    map.setCenter({lat: 31, lng: 129});

                });

                //关闭弹窗
                $('.close-1').on('click', function () {

                    map.setZoom(3);

                    map.setCenter({lat: 31, lng: 129});

                    $('.tryQuery').show();

                    $('.abolish').hide();

                    for (var i = 0; i < allShipMarker.length; i++) {

                        allShipMarker[i].setMap(null);

                    }

                    /*line.setMap(null);

                    marker.setMap(null);

                    //marker46.setMap(null);

                    shipMarker.setMap(null);

                    startMarker.setMap(null);

                    endMarker.setMap(null);*/

                });

                //点击模糊搜索列表搜索船只
                $('.fullz-z').on('click', 'li', function () {

                    var obj = {imo: $(this).find('input').val()};

                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/geojson/vessel.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {

                            if (data.features.length != 0) {
                                //console.log(data.features[0].properties.shipMessage)
                                //console.log(data.features[0].properties);
                                console.log(data, '123123');

                                var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;

                                var image = {
                                    rotation,
                                    scale,
                                    fillOpacity,
                                    path,
                                    fillColor,
                                    strokeColor: '#FF0000',
                                    strokeWeight: 2,
                                };

                                map.setZoom(9);

                                map.setCenter({lat, lng});

                                shipMarker = new google.maps.Marker({
                                    position: {lat, lng},
                                    map: map,
                                    icon: image,
                                });
                                isShipMarker.push(shipMarker);
                                /*

                                map.data.setStyle({
                                    fillColor: '#565656',
                                    strokeWeight: 2,
                                    strokeColor: '#FF0000',
                                    icon: image,
                                });
    */
                                _this.shipMessage = shipMessage;

                                $('.sr-d1').show();

                            } else {

                                _this.$alert('<strong style="margin-left: 160px">没有此船</strong>', 'Message', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });

                            }

                        },

                        error: function (error) {

                            console.log(error)

                        }

                    });



                });

                //关闭弹窗
                $('.close-1').on('click', function () {

                    shipMarker.setMap(null);

                    map.setZoom(3);

                    map.setCenter({lat: 31, lng: 129});

                });

                //船名IMO搜索框
                $('.ship-search-a').on('click', function () {

                    if($('.close-1').is(':hidden')){
                        if($('.sear_input').val() != ''){

                            try{
                                startMarker.setMap(null);
                            }catch(err){
                                console.log(err)
                            }

                            var obj = {imo: $('.sear_input').val()};

                            $.ajax({
                                type: "POST",
                                url: _this.url+"/api/geojson/vessel.json",
                                data: JSON.stringify(obj),
                                dataType: "json",
                                contentType:"application/json",
                                success: function(data) {
                                    if(data.features.length != 0){
                                        //console.log(data.features[0].properties.shipMessage)
                                        //console.log(data.features[0].properties);
                                        console.log(data, '123123');

                                        var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;

                                        var image = {rotation, scale, fillOpacity, path, fillColor, strokeColor: '#FF0000', strokeWeight: 2,};

                                        map.setZoom(9);

                                        map.setCenter({lat, lng});

                                        shipMarker =new google.maps.Marker({
                                            position: {lat, lng},
                                            map: map,
                                            icon: image,
                                        });
                                        /*

                                                                    map.data.setStyle({
                                                                        fillColor: '#565656',
                                                                        strokeWeight: 2,
                                                                        strokeColor: '#FF0000',
                                                                        icon: image,
                                                                    });
                                        */
                                        _this.shipMessage = shipMessage;

                                        $('.sr-d1').show();

                                    }else {

                                        _this.$alert('<strong style="margin-left: 160px">没有此船</strong>', 'Message', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });

                                    }

                                },

                                error:function(error) {

                                    console.log(error)

                                }

                            });


                        }else{

                            _this.$alert('<strong style="margin-left: 130px">Vessel Name/IMO输入不能为空</strong>', 'Message', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });

                        }
                    }else {

                        return;

                    }


                });

                //搜索港口显示船只
                $('.search-btn').on('click', function () {

                    if(_this.loadPort1 != '' && _this.time0 != '' && $('.load-wrap').attr('data-value') != '' && $('.voyage-wrap').attr('data-value') != ''){

                        var dataObj = {
                            "portName": _this.loadPort1,
                            "type": _this.loadPort2,
                            "endTime": new Date(_this.time0).getTime(),
                            "deadWeight": $('.load-wrap').attr('data-value'),
                            "naviStatus" : $('.voyage-wrap').attr('data-value'),
                            "pageSize": -1,
                            "pageIndex": -1,
                        };

                        $.ajax({
                            type: "POST",
                            url: _this.url+"/api/appjson/location.json",
                            data: JSON.stringify(dataObj),
                            dataType: "json",
                            contentType:"application/json",
                            success: function(data) {

                                if(data.total > 0){

                                    var haven = data.datas.html;

                                    var shipFlag = data.datas.data;

                                    //港口样式
                                    var havenCircle = {
                                        path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                                        strokeColor: '#f1ed2b',
                                        strokeWeight: 2,
                                        fillColor: '#fffb00',
                                        fillOpacity: 1,
                                        scale: 0.8,
                                        labelOrigin: new google.maps.Point(0, -35),
                                        /*label: {
                                            text: '港口',
                                            color: '#00ff51',
                                        },*/
                                    };

                                    //港口标记
                                    var havenMarker = new google.maps.Marker({
                                        position: {lat: haven.lat, lng: haven.lon},
                                        map: map,
                                        icon: havenCircle,
                                    });

                                    markers.push(havenMarker);

                                    for (let i = 0; i < shipFlag.length; i++) {
                                        //船样式
                                        var shipStyle = {
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#ff0005',
                                            strokeWeight: 2,
                                            fillColor: '#00d70b',
                                            fillOpacity: 1,
                                            scale: 1.2,
                                            rotation: shipFlag[i].heading,
                                        };

                                        //绘制船
                                        var havenShipMarker = new google.maps.Marker({
                                            position: {lat: shipFlag[i].lat, lng: shipFlag[i].lon},
                                            map: map,
                                            icon: shipStyle,
                                        });

                                        markers.push(havenShipMarker);

                                    };

                                    map.setCenter({lat: haven.lat, lng: haven.lon});

                                    map.setZoom(5);

                                }

                            },
                            error:function(error) {

                                console.log(error)

                            }

                        });

                    }

                });

                //搜索港口关闭窗口
                $('.haven-close').on('click', function () {

                    if(markers.length != 0){

                        for (var i = 0; i < markers.length; i++) {

                            markers[i].setMap(null);

                        }

                        map.setZoom(3);

                        map.setCenter({lat: 31, lng: 129});

                    }

                    $(this).parent().parent().hide();

                });

                //模糊搜索列表显示隐藏
                $('.sear_input').on('input', function () {

                    if($('.sear_input').val() == ''){

                        $('.ul-list-data').hide();

                    }else{

                        $('.ul-list-data').show();

                    }

                });

                //滚动条放大地图
                $('.enlarge').click(function (){

                    var c = parseInt(map.getZoom());

                    if(c<10){

                        ++c;

                        var c1= (1-parseInt(c - 2)/10);

                        var heights = (parseInt($('.scroll1-height1').css('height'))-18)*c1;

                        map.setZoom(c);

                        $('.dieblock').css({'top':''+heights+'px'});

                    }else{

                        c=10;

                        map.setZoom(c);

                        $('.dieblock').css({'top':'0px'});

                    }

                });

                //滚动条缩小地图
                $('.reduce').click(function (){

                    var c = parseInt(map.getZoom());
                    //最小层级是2
                    if(c-2>0){

                        --c;

                        var c1= (1-parseInt(c - 2 )/10);

                        var heights = (parseInt($('.scroll1-height1').css('height'))-18)*c1;

                        map.setZoom(c);

                        $('.dieblock').css({'top':''+heights+'px'});

                    }else{

                        c=0;

                        var height = (parseInt($('.scroll1-height1').css('height'))-18);

                        map.setZoom(c);

                        $('.dieblock').css({'top':''+height+'px'});

                    }

                });

                //拖动缩放滚动条
                draw();
                function draw(){

                    var oDiv = document.querySelector('.dieblock');

                    var Parent = document.querySelector('.scroll1-height1');

                    oDiv.onmousedown=function(ev){

                        var oEvent = ev || event;

                        var disY = oEvent.clientY - oDiv.offsetTop;

                        document.onmousemove=function(ev){

                            var oEvent = ev || event;

                            var y = oEvent.clientY - disY;

                            if(y < 0){

                                y = 0;

                            }else if(y > Parent.offsetHeight - oDiv.offsetHeight +18){

                                y = Parent.offsetHeight - oDiv.offsetHeight + 18;

                            }

                            oDiv.style.top = y + 'px';

                            var rato = y / (Parent.offsetHeight - oDiv.offsetHeight);
                            console.log(rato);
                            var c= parseInt(rato*10);
                            console.log(10-c);
                            map.setZoom(10 - c +2 );

                        };

                        document.onmouseup = function(){

                            document.onmousemove = document.onmouseup = null;

                        };

                        //解决FF问题
                        return false;

                    }

                };

                //缩放滚动条
                ZoomNumber();
                function ZoomNumber(){

                    var c= (1-parseInt((map.getZoom()) - 2 )/10);

                    var heights = (parseInt($('.scroll1-height1').css('height'))-18)*c;

                    $('.dieblock').css({'top':''+heights+'px'});

                };

                //监听地图缩放等级变化修改缩放滚动条位置
                map.addListener('zoom_changed', function (){

                    console.log(map.getZoom());

                    var c = (1 - parseInt((map.getZoom()) - 2)/10);

                    var heights;

                    if(c == 1){

                        heights = (parseInt($('.scroll1-height1').css('height'))-18);

                    }else{

                        heights = ((parseInt($('.scroll1-height1').height())) * c);

                    }


                    $('.dieblock').css({'top':''+heights+'px'});

                    if (map.getZoom() >= 9) {

                        //缩放到指定层级时修改船只样式呈现为三角形
                        map.data.setStyle(setStyle);

                    } else {

                        initStyle();

                    }

                });

                //关闭详情弹窗
                $('.close-1-1').click(function () {

                    if(isShipMarker.length != 0){

                        for (var i = 0; i < isShipMarker.length; i++) {

                            isShipMarker[i].setMap(null)

                        }
                    }

                });

            }

/*--------------------------------------initMap end--------------------------------------------------------------------*/

            //拖拽函数
            function drag(el) {

                var mouseAndEle= {x: 0, y: 0, ex: 0, ey: 0};

                el.onmousedown = function (event){

                    mouseAndEle.x = event.clientX;

                    mouseAndEle.y = event.clientY;

                    mouseAndEle.ex = el.offsetLeft + document.documentElement.scrollLeft;

                    mouseAndEle.ey = el.offsetTop + document.documentElement.scrollTop;

                    /*mouseAndEle.ey = el.offsetTop;
                    mouseAndEle.ex = el.offsetLeft;*/
                    document.onmousemove = function (event){

                        var newMouseAndEle= {newX: 0, newY: 0,};

                        newMouseAndEle.newX = event.clientX;

                        newMouseAndEle.newY = event.clientY;

                        var x = mouseAndEle.ex + (newMouseAndEle.newX - mouseAndEle.x);

                        var y = mouseAndEle.ey + (newMouseAndEle.newY - mouseAndEle.y);

                        //console.log(el.offsetLeft);
                        //el.style.transform = `translate(${x}px, ${y}px)`;

                        el.style.left = x + 'px';

                        el.style.top = y + 'px';
                    };

                    document.onmouseup = function (){

                        document.onmousemove = document.onmouseup = null;

                    }

                }

            }

            //弹窗拖拽
            var drags =  document.querySelectorAll('.sr-dialog');
            for(var i = 0;i<drags.length;i++){
                drag(drags[i]);
            }

            //航线计算下拉列表展示
            $('.hx_calc').click(function () {

                $('.ul_hx').slideToggle(500);

                if ($(".icon_down").hasClass('flag')) {

                    $(".icon_down").css('transform', 'rotate(0deg)');

                    $(".icon_down").removeClass('flag')

                } else {

                    $(".icon_down").css('transform', 'rotate(180deg)');

                    $(".icon_down").addClass('flag')

                }

            });

            //侧边栏
            $('.side-btn').click(function () {

                if ($(this).hasClass('open')) {

                    $(".side-btn i").css('transform', 'rotate(180deg)');

                    $(this).css('z-index', '999');

                    $(this).removeClass('open');

                    $(".sr-side-scroll").animate({

                        width: "0"

                    }, 500);

                    $(".sr-side").animate({

                        width: "0"

                    }, 500);

                    $(this).animate({

                        left: 0

                    }, 500);

                    $('.sr-body').animate({

                        'margin-left': "-260px"

                    }, 500);

                    $('.fullz-z ul li').css('display', 'none');

                } else {

                    $(".side-btn i").css('transform', 'rotate(0deg)');

                    $(this).addClass('open');

                    $(".sr-side-scroll").animate({

                        width: "260px"

                    }, 500);

                    $(".sr-side").animate({

                        width: "260px"

                    }, 500);

                    $(this).animate({

                        left: '260px'

                    }, 500);

                    $('.sr-body').animate({

                        'margin-left': "0px"

                    }, 500);

                    $('.fullz-z ul li').css('display', 'none');
                }
            });

            //载重状态单选框
            $('.load-wrap .sr-chk').on('click', function () {

                $(this).addClass('checked');

                $('.load-wrap').attr('data-value', $(this).attr('uid'));

                $('.load-wrap .sr-chk').not(this).removeClass('checked');

            });

            //航行状态单选框
            $('.voyage-wrap .sr-chk').on('click', function () {

                $(this).addClass('checked');

                $('.voyage-wrap').attr('data-value', $(this).attr('uid'));

                $('.voyage-wrap .sr-chk').not(this).removeClass('checked');

            });
            
            //弹窗关闭
            $('.sr-close').click(function () {

                $(this).parent().parent().hide();

            });

            //关闭弹窗
            $('.reach-close').click(function () {
                $('.reach-popout').hide();
            });

            //Comming Soon
            $('.coming').on('click', function () {

                _this.$alert('<strong style="margin-left: 160px">Comming Soon</strong>', 'Message', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });
    
            });

            //计算Comming Soon
            $('.calc').click(function () {

                _this.$alert('<strong style="margin-left: 160px">Comming Soon</strong>', 'Message', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });

            });

/*
            //监听地图缩放事件
            function zoom_changed() {

                console.log(map.getZoom());

                if (map.getZoom() >= 9) {

                    //缩放到指定层级时修改船只样式呈现为三角形
                    map.data.setStyle(setStyle);

                } else {

                    initStyle();

                }
            }
*/
            //船只数据样式动态修改 该函数在zoom_changed()中调用
            function setStyle(feature) {

                var rotation = feature.getProperty('rotation');

                var strokeWeight = feature.getProperty('strokeWeight');

                var strokeColor = feature.getProperty('strokeColor');

                var scale = feature.getProperty('scale');

                var fillOpacity = feature.getProperty('fillOpacity');

                var fillColor = feature.getProperty('fillColor');

                var path = feature.getProperty('path');

                var image = {path, fillColor, rotation, scale, strokeColor, strokeWeight, fillOpacity,};

                return {icon: image, /*label:'AAAAAAAAAA'*/}

            }

        },

        created(){
			this.getIn();
            var userData=JSON.parse(window.localStorage.getItem('user'));

            if(userData){

                this.userName=userData.userName;

            }

        }

    }

</script>

<style scoped>

    @import url('../../static/cssEn/rotemap.css');

    #map {
        width: 100%;
        height: 100%;
    }
    .sr-d-title{
        height: 50px;
    }
    /*缩放滚动条*/
    /* 放大条 */
    .scroll-height-1{
        height: 452px;
        position: relative;
    }
    .scroll1-height1{
        height: 452px;
        position: relative;
    }
    .select_d3 {
        width: 160px;
        height: 30px;
        background: rgba(24, 24, 24, 0.6);
        border: 1px solid #5c5c5c;
        color: #fff;
        border-radius: 5px;
    }

    .sr-row .el-input__inner {
        width: 250px;
        height: 36px;
        background: rgba(24, 24, 24, 0.6);
        border: 1px solid #5c5c5c;
        color: rgba(24, 24, 24, 0.6);
        border-radius: 2px;
    }

    .sr-row input {
        background: rgba(24, 24, 24, 0.6);
    }
    .fullz-z{
        width: 240px;
        background: rgba(40, 40, 47, 0.6);
        margin-left:10px;
        position: absolute;
        top: 55px;
        left: 0px;
    }
    .fullz-z ul{
        max-height: 200px;
        font-size: 16px;
        overflow: auto;
        background-color: rgb(135, 135, 135);
    }
    .fullz-z ul li {
        height: 30px;
        line-height: 30px;
    }
    .fullz-z ul li span{
        white-space: nowrap;
        box-sizing: border-box;
        width: 47%;
        display: inline-block;
    }
    .fullz-z ul li:hover{
        background-color: blue;
        color: #f0f0f0;
    }
    .right-context{
        text-align: right;
    }
    .full_l{
        color: #fff;margin-left: 10px;
    }

    .full_r{
        float: right;color: yellowgreen;
        margin-right: 10px;
    }
    .d1-time-cpm{
        display: inline-block;
        width: 150px;
    }
    .timeP{
        width: 160px !important;
        height: 30px;
        background-color: #000;
    }
    .timeP1{
        width: 130px !important;
        height: 30px;
        background-color: #000;
    }
    .page-wrap{
        width: 100%;
        text-align: right;
    }
    .page-wrapper{
        width: 100%;
        text-align: right;
    }
    .page-style{
        margin-top: 10px;
    }
    .sr-table-wrap{
        background-color: #383838;
    }
/*弹出层初始位置*/
    .sr-d1 {
        width: 25%;
        min-width: 520px;
        min-height: 480px;
        right: 5px;
        top: 15%;
    }
    .el-message-box{
        background-color: #000 !important;
    }

    .el-month-table td.current{
        position:relative;
        top:inherit !important;
        left:inherit !important;
        width:auto !important;
        height:auto !important;
        border:none !important;
        box-shadow:none !important;
        border-radius:inherit !important;
    }
    .hangsu{
        display: inline-block;
        margin-left:-5px;
    }
    
</style>
