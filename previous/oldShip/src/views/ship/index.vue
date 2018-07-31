<template>
	<section>
		<div class="banner">
			<div class="banner-menu">
				<div class="banner-menu-bg"></div>
				<ul class="banner-menu-list clearfix">
					<li><a href="javascript:;" @click="getBoot()"><i class="shipping-ico ico-pinch-boat"></i><p>租船拼船</p></a></li>
					<li><a href="javascript:;" @click="getBoot1()"><i class="shipping-ico ico-charter"></i><p>船盘发布</p></a></li>
					<!--<li><router-link to="/introduction"><i class="shipping-ico ico-voyage-planning"></i><p>航线航速</p></router-link></li>-->
					<li><a href="javascript:;" @click="getMap"><i class="shipping-ico ico-voyage-planning"></i><p>航线航速</p></a></li>
					<li><a href="javascript:;" @click="hzhref()"><i class="shipping-ico ico-cargo-tracking"></i><p>运费保值</p></a></li>
				</ul>
			</div>
		</div>
		<div class="content">
			<!--船盘滚动-->
			<div class="inner cont-box1 table_header">
				<a href="javascript:;" class="scroll_more" @click="moreList()">更多</a>
				<div class="scrollNeer">
					<a href="javascript:;" class="aBlock">
						<table class="ry-addTab">
							<tbody class="scroll-news-blo clearfix">
								<tr>
									<td width="10%">船名<br />Vessel Name</td>
									<td width="10%">船型<br />TYPE</td>
									<td width="10%">船位<br />POSITION</td>
									<td width="10%">OPEN</td>
									<td width="10%">ETA Fujairah</td>
									<td width="10%">ETA Cabinda</td>
									<td width="15%">船东<br />REGISTERED OWNER</td>
									<td width="15%">船盘发布人<br />Poster</td>
									<td width="10%">发布日期<br />Post Date</td>
								</tr>
							</tbody>
						</table>
					</a>
				</div>
				<!--<a href="javascript:;" class="boot-btn">更多详情</a>-->
			</div>
			<div class="inner cont-box1 scroll-news-list2">
				<div id="scroll" class="shipScroll">
					<div class="scrollNeer shipRolling" id="rolling">
						<a href="javascript:;" class="aBlock" v-for="(item,index) in dataInfo" @click="getBootInfo(item.uuid)" :class="index == dataInfo.length ?'red':''">
							<table class="ry-addTab">
								<tbody class="scroll-news-blo clearfix">
									<tr>
										<td width="10%">{{item.name}}</td>
										<td width="10%">{{item.type}}</td>
										<td width="10%">{{item.position | truncate(11)}}</td>
										<td width="10%">{{item.open}}</td>
										<td width="10%">{{item.eta }}</td>
										<td width="10%">{{item.etaCabinda }}</td>
										<td width="15%" :title="item.shipOwner">{{item.shipOwner | truncate(15)}}</td>
										<td width="15%" :title="item.epMemberName">{{item.epMemberName | truncate(15)}}</td>
										<td width="10%">{{item.publishTime}}</td>
									</tr>
								</tbody>
							</table>
						</a>
						<a href="javascript:;" class="aBlock" v-for="(item,index) in dataInfo" @click="getBootInfo(item.uuid)" v-show="dataInfo.length>5">
							<table class="ry-addTab">
								<tbody class="scroll-news-blo clearfix">
									<tr>
										<td width="10%">{{item.name}}</td>
										<td width="10%">{{item.type}}</td>
										<td width="10%">{{item.position | truncate(11)}}</td>
										<td width="10%">{{item.open}}</td>
										<td width="10%">{{item.eta }}</td>
										<td width="10%">{{item.etaCabinda }}</td>
										<td width="15%" :title="item.shipOwner">{{item.shipOwner | truncate(15)}}</td>
										<td width="15%" :title="item.epMemberName">{{item.epMemberName | truncate(15)}}</td>
										<td width="10%">{{item.publishTime}}</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
				</div>
			</div>
			<!--货船滚动-->
			<div class="inner cont-box1 table_header" v-show="isShow">
				<a href="javascript:;" class="scroll_more" @click="goodsMoreList()">更多</a>
				<div class="scrollNeer">
					<a href="javascript:;" class="aBlock">
						<table class="ry-addTab">
							<tbody class="scroll-news-blo clearfix">
								<tr>
									<td width="15%">数量<br />QUANTITY</td>
									<td width="20%">装期<br />LAYCAN</td>
									<td width="20%">装港/装货区域<br />LOADING</td>
									<td width="20%">卸港/卸货区域<br />DISCHARGING</td>
									<td width="15%">发布日期<br />Post Date</td>
									<td width="10%">状态<br />STATUS</td>
								</tr>
							</tbody>
						</table>
					</a>
				</div>
				<!--<a href="javascript:;" class="boot-btn">更多详情</a>-->
			</div>
			<div class="inner cont-box1 scroll-news-list2" v-show="isShow">
				<div id="goodScroll" class="goodsScroll">
					<div class="scrollNeer goodsRolling" id="goodRolling">
						<a href="javascript:;" class="aBlock" v-for="item in goodsData" @click="getGoodInfo(item.uuid)">
							<table class="ry-addTab">
								<tbody class="scroll-news-blo clearfix">
									<tr>
										<td width="15%" :title="item.quantity">{{item.quantity | truncate(15)}}</td>
										<td width="20%">{{item.laycan}}</td>
										<td width="20%" :title="item.load">{{item.load | truncate(18)}}</td>
										<td width="20%" :title="item.unload">{{item.unload | truncate(18)}}</td>
										<td width="15%">{{item.createDate}}</td>
										<td width="10%">{{item.status}}</td>
									</tr>
								</tbody>
							</table>
						</a>
						<a href="javascript:;" class="aBlock" v-for="item in goodsData" @click="getGoodInfo(item.uuid)" v-show="goodsData.length>5">
							<table class="ry-addTab">
								<tbody class="scroll-news-blo clearfix">
									<tr>
										<td width="15%" :title="item.quantity">{{item.quantity | truncate(15)}}</td>
										<td width="20%">{{item.laycan}}</td>
										<td width="20%" :title="item.load">{{item.load | truncate(18)}}</td>
										<td width="20%" :title="item.unload">{{item.unload | truncate(18)}}</td>
										<td width="15%">{{item.createDate}}</td>
										<td width="10%">{{item.status}}</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
				</div>
			</div>
			<!--常用工具-->
			<div class="inner cont-box1">
				<div class="common-tooln-top">
					<span class="common-tooln-tit">常用工具</span>
					<ul class="common-tooln-line clearfix">
						<li></li>
						<li class="tooln-line"></li>
					</ul>
				</div>
				<div class="common-tooln-bto">
					<ul class="common-tooln-list clearfix">
						<!--<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitBasic()"><i class="shipping-ico ico-basic-tariffs"></i><span>基础运价</span></a>
							</p>
						</li>-->
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="getCost()"><i class="shipping-ico ico-basic-ygyj"></i><span>预估运费</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitConversion()"><i class="shipping-ico ico-unit-conversion"></i><span>单位换算</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitTide()"><i class="shipping-ico ico-port-terminal"></i><span>潮汐查询</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitInfo()"><i class="shipping-ico ico-ship-information"></i><span>船舶资料</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="getBk()"><i class="shipping-ico ico-port-charges"></i><span>油运百科</span></a>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<!--最新成交点数-->
			<div class="inner cont-box1 cont-box4 clearfix">
				<div class="turnover-points">
					<p class="turnover-points-tit">最新成交点数</p>
					<div>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="turnover-points-table" id='_table'>
							<tr class="title_width">
								<th scope="col">地区</th>
								<!--region-->
								<th scope="col">船型</th>
								<!--type-->
								<th scope="col">WS点</th>
								<!--price-->
								<th scope="col">预估单桶运费</th>
								<!--singleFare-->
								<th scope="col">参考航线</th>
								<!--refRoute-->
							</tr>
							<tr v-for="item in dataDay">
								<td>{{item.region}}</td>
								<td>{{item.type}}</td>
								<td>{{item.price}}</td>
								<td>{{item.singleFare}}</td>
								<td class="rise font_color" :title="item.refRoute">{{item.refRoute | truncate(12)}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="turnover-line"></div>
				<div class="ship-information">
					<div class="common-tooln-top">
						<span class="common-tooln-tit ship-information-tit">日报</span>
						<ul class="common-tooln-line ship-information-list clearfix">
							<li></li>
							<li class="tooln-line"></li>
						</ul>
					</div>
					<ul class="turnover-points-list ry-indexlhh">
						<li class="clearfix" v-for="(item,index) in dataDays" @click="getActive(item.uuid)">
							<a href="javascript:;">{{item.title}}</a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span>
						</li>
					</ul>
				</div>
			</div>
			<!--最新状态新闻-->
			<div class="inner wlcont-news clearfix">
				<div class="cont-neleft" style="padding: 0 30px;height: 490px;">
					<div class="ship-news clearfix">
						<div>
							<div class="tab1 ship-news-title">
								<div class="item active" a-data="dataMarkets">油轮市场</div>
								<div class="item" a-data="dataOcean">船期报告</div>
								<div class="more"  @click="newMore('油轮市场','YLSC')">更多</div>
								<div class="more"  @click="newMore('船期报告','HYXW')" style="display:none">更多</div>
								
							</div>
							<div class="ship-news-cont dataMarkets">
								<ul class="ship-news-list">
									<li class="clearfix" v-for="(item,index) in dataMarkets" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)" v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
								</ul>
							</div>
							<div class="ship-news-cont dataOcean"  style="display:none">
								<ul class="ship-news-list">
									<li class="clearfix" v-for="(item,index) in dataOcean" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
								</ul>
							</div>
							
						</div>
						<div style="margin-top: 16px;">
							<div class="tab2 ship-news-title">
								<div class="item active" a-data="routeWarning">租约信息</div>
								<!--<div class="item" a-data="meteorologicalInfo">气象信息</div>-->
								<div class="more"  @click="newMore('租约信息','HQYJ')">更多</div>
								<!--<div class="more"  @click="newMore('气象信息','QXXX')" style="display:none">更多</div>-->
							</div>
							<div class="ship-news-cont routeWarning">
								<ul class="ship-news-list">
									<li class="clearfix" v-for="(item,index) in routeWarning" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
								</ul>
							</div>
								<div class="ship-news-cont meteorologicalInfo" style="display:none">
								<ul class="ship-news-list">
									<li class="clearfix" v-for="(item,index) in meteorologicalInfo" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- 大咖秀 -->
				<div class="cont-neright">
					<div class="zx-infol-ssbj zx-inf-hyfx clearfix">
						<h1>行业分析专栏<span><a href="javascript:;" title="更多" @click="cloumnMore()">○○○</a></span></h1>
						<!--<ul class="right-ssbj">
		                 <li class="zx-inf-fxzl clearfix"  v-for="(item,index) in columnList" v-if="index<4">
		                   <span>
			                   <img :src="item.columnCover" alt=""  v-if="item.columnCover != ''">
			                   <img src="/static/images/zx_img.jpg" alt=""  v-if="item.columnCover == ''">
		                   </span>
		                   <p>
		                     <a href="javascript:;" @click="cloumnDetail(item.id)">{{item.columnTitle}}</a>
		                     <em>{{item.authorName}}</em>
		                   </p>
		                   <a href="javascript:;" @click="subscription(item)" class="zx-inf-tis" style="color: #e0e0e0"><i class="zx-icon inf-tij"></i>{{item.subStatus==1?'已订阅':'订阅专栏'}}</a>
		                 </li>
		               </ul>-->
						<ul class="right-ssbj">
							<li class="zx-inf-fxzl clearfix" v-for="(item,index) in columnList" v-if="index<4">
								<span><img :src="item.columnCover" alt=""></span>
								<p>
									<a href="javascript:;" @click="cloumnDetail(item.id)">{{item.columnTitle}}</a>
									<em>{{item.authorName}}</em>
								</p>
								<a href="javascript:;" class="zx-inf-tis" v-model="item.subStatus" @click="subscription(item)"><i :class="item.subStatus==1?'zx-icon inf-tijh':'zx-icon inf-tij'"></i></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--合作伙伴-->
			<div class="inner cont-box1 cont-box2">
				<div class="partner">
                <div class="partner-tit">合作伙伴</div>
				<ul class="partner-blo clearfix">
					<li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo1.jpg" alt=""/></a></li>
					<li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo2.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo3.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo4.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo5.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo6.jpg" alt=""/></a></li>
					<li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo7.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo8.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo9.jpg" alt=""/></a></li>
                    <li class="partner-logo"><a href="javascript:;"><img src="../../assets/images/cw_logo10.jpg" alt=""/></a></li>
				</ul>				
				</div>
			</div>
			<!--政府机构-->
			<!--<div class="inner cont-box3">
						<p class="inner cont-box3-btn"><a href="">政府机构</a><a href="">集团企业</a><a href="">相关企业</a></p>
					</div>-->
		</div>
	</section>
</template>

<script>
	import {
		topInfo,
		dayInfo,
		oceanInfo,
		daysInfo,
		userLoad,
		goodData,
		columnList,
		dingYue,
		userLoadInfo
	} from '../../api/ship';
	import '../../../static/css/f_chuanwu.css'
	export default {
		data() {
			return {
				isShow: false,
				dataInfo: [], // 头部滚动数据
				dataDay: [], // 日报数据
				dataOcean: [], // 海运新闻
				dataMarkets: [], // 邮轮市场
				dataDays: [], //日报
				goodsData: [], //货盘滚动数据
				columnList: [], //大咖秀
				routeWarning:[],//航线预警
				meteorologicalInfo:[]//气象信息
			}
		},
		methods: {
			//			subscription(item){//订阅专栏
			//				userLoad().then((res)=>{
			//					if(res.status==0){
			//						var param={
			//						columnId:item.id
			//						}
			//						if(item.subStatus==0){
			//							item.subStatus=1
			//							item.subscribeCount++
			//							dingYue(param).then(res=>{
			//								if (res.status==0){
			//									columnListFn();
			//								}
			//							})
			//						}	
			//					}else{
			//						window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			//					}
			//				})
			//				
			//			},
			subscription(item) { //订阅专栏
				userLoad().then((res) => {
					if (res.status == 0) {
						var param = {
							columnId: item.id
						}
						if (item.subStatus == 0) {
							item.subStatus = 1
							/* dingYue(param).then(res=>{
								
							}) */
							$.ajax({
								type: 'POST',
								url: configURL.infoUrl + "/subscribe/subscribeColumn.json",
								data: JSON.stringify(param),
								dataType: "json",
								contentType: "application/json",
								async: false,
								xhrFields: {
									withCredentials: true
								},
								success: function(res) {}
							});
						} else if (item.subStatus == 1) {
							item.subStatus = 0
							/* 	cancle(param).then(res=>{
								
								}) */
							$.ajax({
								type: 'POST',
								url: configURL.infoUrl + "/subscribe/removeSubscribe.json",
								data: JSON.stringify(param),
								dataType: "json",
								contentType: "application/json",
								async: false,
								xhrFields: {
									withCredentials: true
								},
								success: function(res) {}
							});
						}
					} else {
						//						window.location.href=configURL.sys+"/login.htm";
						window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/';
					}
				})
			},
			getMap() {
				window.open(configURL.shipUrl + "/page/#/routemap", "_blank");
				//				this.$router.push({path:'/routemap'})
			},
			getIsShow() {
				userLoad().then((res) => {
					if (res.status == 0) {
						var userData = res.datas;
						if (userData) {
							if (userData.roles != null) {
								for (var i = 0; i < userData.roles.length; i++) {
									var role = userData.roles[i];
									if (role == 'ship_owner' || role == 'ship_broker' || role == 'ship_trader') {
										this.isShow = true;
									}
								}
							}
						}
					}
				})
			},
			getList(name) {
				//参数本地存储
				var name = encodeURIComponent(name);
				window.open(configURL.infoUrl + '/page/#/list?name=' + name, "_blank")
			},
			getCost: function() { //预估运费
				/* var userData = JSON.parse(window.localStorage.getItem('user'))
			    		if(userData){
			    			var flag = false;
			    			if(userData.roles != null){
			    				for(var i=0; i<userData.roles.length; i++){
			    					var role = userData.roles[i];
					    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper' || role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
					    			   || role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader' || role == 'charterer' ){
					    				flag = true
					    			}
					    		}
			    			}
			    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
			    				this.$router.push({'path': '/403'});
			    			}else{
			    				window.location.href=configURL.shipUrl+'/page/#/shipCost';
			    			}
			    		}else{
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			    		}  */
				window.location.href = configURL.shipUrl + '/page/#/shipCost';
			},
			getActive: function(id) {
				window.open(configURL.infoUrl + "/page/#/active?uuid=" + id, "_blank");
			},
			cloumnDetail: function(id) {
				window.open(configURL.infoUrl + "/page/#/zlDetails?id=" + id, "_blank");
			},
			cloumnMore: function() {
				window.open(configURL.infoUrl + "/page/#/columnList", "_blank");
			},
			getBootInfo: function(name) {
				window.localStorage.setItem('uuidd', name);
				this.$router.push({
					"path": "/bootInfo?uuid=" + name
				})
			},
			getGoodInfo: function(name) {
				window.localStorage.setItem('uuidd', name);
				this.$router.push({
					"path": "/goodInfo?uuid=" + name
				})
			},
			newMore: function(strName, code) { // 资讯  更多详情
				var strName = encodeURIComponent(strName);
				var code = encodeURIComponent(code);
				window.open(configURL.infoUrl + "/page/#/list?channelName=" + strName + '&channelCode=' + code, "_blank");
			},
			getBk: function() {
				this.$router.push({
					"path": "/olibk"
				})
				//				window.open(configURL.infoUrl+"/page/#/encyclopedia","_blank");
			},
			topInfoFn: function() { // 船盘顶部 数据
				topInfo().then((res) => {
					this.dataInfo = res.datas;
					var This = this;
					if (this.dataInfo.length < 5) return false;
					setTimeout(function() {
						This.handleRoll();
					}, 1000)
				});
			},
			goodDataFn: function() { //货盘滚动数据
				goodData({}).then(res => {
					this.goodsData = res.datas
					var This = this;
					if (this.goodsData.length < 5) return false;
					setTimeout(function() {
						This.goodsHandleRoll();
					}, 1000)
				})
			},
			dataDayFn: function() { //  折线表格数据
				dayInfo({}).then((res) => {
					this.dataDay = res.datas;
				})
			},
			dataDaysFn: function() {
				userLoad().then((res) => {
					if (res.status == 0) {
						var userData = res.datas;
						if (userData) {
							var flag = false;
							if (userData.roles != null) {
								for (var i = 0; i < userData.roles.length; i++) {
									var role = userData.roles[i];
									if (role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'admin' || role == 'trade_oper' || role == 'ship_broker' || role == 'trade_executor' || role == 'ship_executor' || role == 'ship_trader' ||
										role == 'depa_port' || role == 'arriv_port' || role == 'sales_trader' || role == 'buy_trader' || role == 'charterer') {
										flag = true
									}
								}
							}
							if ((userData.epMemberId == userData.memberId && !flag) || userData.epMemberId == null) {
								this.dataDays = []
							} else {
								var parm = {
									'channelMDesc': 'ZX',
									"channelCode": "ZXCJDS",
									"pageNum": 1,
									"pageSize": 5
								} //  日报
								daysInfo(parm).then((res) => {
									this.dataDays = res.datas.infoList;
								})
							}
						}
					}
				})
			},
			oceanInfoFn: function() { //海运新闻 数据
				var para = {
					"channelCode": "HYXW",
					'channelMDesc': 'ZX'
				};
				oceanInfo(para).then((res) => {
					this.dataOcean = res.datas.infoList;
				})
			},
			marketsInfo: function() { // 油轮市场 数据
				var para = {
					"channelCode": "YLSC",
					channelMDesc: 'ZX'
				};
				oceanInfo(para).then((res) => {
					this.dataMarkets = res.datas.infoList;
				});
			},
			routeWarnings: function() { // 航线预警
				var para = {
					"channelCode": "HQYJ",
					channelMDesc: 'ZX'
				};
				oceanInfo(para).then((res) => {
					console.log(res.datas)
					 this.routeWarning = res.datas.infoList;
				});
			},
			meteorologicalInfos: function() { //气象信息
				var para = {
					"channelCode": "QXXX",
					channelMDesc: 'ZX'
				};
				oceanInfo(para).then((res) => {
					this.meteorologicalInfo = res.datas.infoList;
				});
			},
			columnListFn: function() { // 大咖秀 数据
				//userLoad().then((res)=>{
				var That = this;
				$.ajax({
					type: 'POST', // 获取头信息，type=HEAD即可
					url: configURL.infoUrl + "/column/columnList.json",
					data: JSON.stringify({}),
					dataType: "json",
					contentType: "application/json",
					async: false,
					xhrFields: {
						withCredentials: true
					},
					success: function(res) {
						That.columnList = res.datas;
					}
				});
				/* var para={};
				columnList(para).then((res)=>{
					this.columnList=res.datas;
				}); */
				//});
			},
			handleRoll: function() {
				var iTime = null;
				var $box = $('#rolling');
				var iHeight = Math.ceil(($box.innerHeight()) / 2);
				//				$box.html( $box.html()+ $box.html());
				iTime = setInterval(intime, 35);
				function intime() {
					if ($box.css('top') == '-' + iHeight + 'px') {
						$box.css({
							'top': '0px'
						})
					}
					$box.css({
						'top': '+=-1px'
					});
				}
				$('#scroll').hover(function() {
					clearInterval(iTime);
				}, function() {
					clearInterval(iTime);
					iTime = setInterval(intime, 30)
				})
			},
			goodsHandleRoll: function() {
				var iTime1 = null;
				var $box1 = $('.goodsRolling');
				var iHeight1 = Math.ceil(($box1.innerHeight()) / 2);
				//				$box.html( $box.html()+ $box.html());
				iTime1 = setInterval(intime, 35);
				function intime() {
					if ($box1.css('top') == '-' + iHeight1 + 'px') {
						$box1.css({
							'top': '0px'
						})
					}
					$box1.css({
						'top': '+=-1px'
					});
				}
				$('.goodsScroll').hover(function() {
					clearInterval(iTime1);
				}, function() {
					clearInterval(iTime1);
					iTime1 = setInterval(intime, 30)
				})
			},
			hzhref() {
				this.$router.push({'path': '/comingSoon'});
				/**var userData = JSON.parse(window.localStorage.getItem('user'));
				if (userData) {
					var flag = false;
					var str = "";
					if (userData.roles != null) {
						for (var i = 0; i < userData.roles.length; i++) {
							var role = userData.roles[i];
							if (role == 'trade_executor' || role == 'sales_trader' || role == 'buy_trader' || role == 'charterer') {
								str = str + "1";
								flag = true;
							} else if (role == 'ship_executor' || role == 'ship_trader') {
								str = str + "2";
								flag = true;
							} else if (role == 'ship_owner' || role == 'ship_broker') {
								str = str + "3";
								flag = true;
							} else if (role == 'depa_port' || role == 'arriv_port') {
								str = str + "4";
								flag = true;
							}
						}
					}
					if (!flag) {
						this.$router.push({
							'path': '/403'
						});
					}
					if (str.indexOf('1') >= 0) {
						window.location.href = "/pallet/agreementList.htm";
					} else if (str.indexOf('2') >= 0) {
						window.location.href = "/shipPactNew/shipPactListNew.htm";
					} else if (str.indexOf('3') >= 0) {
						window.location.href = "/shipPactNew/shipPactListNewOwner.htm";
					} else if (str.indexOf('4') >= 0) {
						window.location.href = "/shipPactNew/shipPactListAgency.htm";
					}
					//	    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
					//	    				this.$router.push({'path': '/403'});
					//	    			}else{
					//	    				var zhi = 0 ;
					//			    		var zhi2 = 0;
					//			    		for(var i=0; i<userData.roles.length; i++){
					//			    			if(userData.roles[i] == 'trade_executor'){
					//			    				zhi=1;
					//			    			}else if(userData.roles[i] == 'ship_executor' || userData.roles[i] == 'ship_trader'){
					//			    				zhi2=1;
					//			    			}
					//			    		}
					//			    		if(zhi){ // 协议
					//			    			window.location.href="/pallet/agreementList.htm";
					//			    		}else if(zhi2){   //
					//			    			window.location.href="/shipPact/shipPactList.htm";
					//			    		}else{
					//			    			window.location.href="/pallet/agreementList.htm";
					//			    		}	
					//	    			}
				} else {
					window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/';
				}**/
			},
			getBoot() {
				var userData = JSON.parse(window.localStorage.getItem('user'))
				if (userData) {
					var flag = false;
					if (userData.roles != null) {
						for (var i = 0; i < userData.roles.length; i++) {
							var role = userData.roles[i];
							if (role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper' || role == 'ship_broker' || role == 'trade_executor' || role == 'ship_executor' || role == 'ship_trader' ||
								role == 'depa_port' || role == 'arriv_port' || role == 'sales_trader' || role == 'buy_trader' || role == 'charterer') {
								flag = true
							}
						}
					}
					if ((userData.epMemberId == userData.memberId && !flag) || userData.epMemberId == null) {
						this.$router.push({
							'path': '/403'
						});
					} else {
						window.location.href = configURL.shipUrl + '/page/#/bootPage?palletType=1';
					}
				} else {
					window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/';
				}
			},
			getBoot1() {
				var userData = JSON.parse(window.localStorage.getItem('user'))
				if (userData) {
					var flag = false;
					if (userData.roles != null) {
						for (var i = 0; i < userData.roles.length; i++) {
							var role = userData.roles[i];
							if (role == 'ship_owner' || role == 'ship_broker' || role == 'ship_trader') {
								flag = true
							}
						}
					}
					if (!flag) {
						this.$router.push({
							'path': '/403'
						});
					} else {
						window.location.href = configURL.shipUrl + '/shipPlate/shipAgentEditShipPlate.htm';
					}
				} else {
					window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/';
				}
			},
			gitBasic() {
				/* var userData = JSON.parse(window.localStorage.getItem('user'))
			    		if(userData){
			    			var flag = false;
			    			if(userData.roles != null){
			    				for(var i=0; i<userData.roles.length; i++){
			    					var role = userData.roles[i];
					    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper'|| role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
					    			|| role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader'|| role == 'charterer'){
					    				flag = true
					    			}
					    		}
			    			}
			    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
			    				this.$router.push({'path': '/403'});
			    			}else{
			    				window.location.href=configURL.shipUrl+'/page/#/basic';
			    			}
			    		}else{
			    			
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			    		} */
				window.location.href = configURL.shipUrl + '/page/#/basic';
			},
			gitConversion() {
				/* var userData = JSON.parse(window.localStorage.getItem('user'))
			    		if(userData){
				    		window.location.href=configURL.shipUrl+'/page/#/conversion';
			    		}else{
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			    		} */
				window.location.href = configURL.shipUrl + '/page/#/conversion';
			},
			gitTide() {
				/* var userData = JSON.parse(window.localStorage.getItem('user'))
			    		if(userData){
			    			var flag = false;
			    			if(userData.roles != null){
			    				for(var i=0; i<userData.roles.length; i++){
			    					var role = userData.roles[i];
					    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper'|| role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
					    			|| role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader'|| role == 'charterer'){
					    				flag = true
					    			}
					    		}
			    			}
			    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
				    			this.$router.push({'path': '/403'});
				    		}else{
				    			window.location.href=configURL.shipUrl+'/page/#/tide';
				    		}
			    		}else{
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			    		} */
				window.location.href = configURL.shipUrl + '/page/#/tide';
			},
			gitInfo() {
				/* var userData = JSON.parse(window.localStorage.getItem('user'))
			    		if(userData){
			    			var flag = false;
			    			if(userData.roles != null){
			    				for(var i=0; i<userData.roles.length; i++){
			    					var role = userData.roles[i];
					    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper'|| role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
					    			|| role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader'|| role == 'charterer'){
					    				flag = true
					    			}
					    		}
			    			}
			    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
				    			this.$router.push({'path': '/403'});
				    		}else{
				    			window.location.href=configURL.shipUrl+'/page/#/info';
				    		}
			    		}else{
			    			
			    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			    		} */
				window.location.href = configURL.shipUrl + '/page/#/info';
			},
			moreList() {
				var userData = JSON.parse(window.localStorage.getItem('user'))
				if (userData) {
					var flag = false;
					if (userData.roles != null) {
						for (var i = 0; i < userData.roles.length; i++) {
							var role = userData.roles[i];
							if (role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper' || role == 'ship_broker' || role == 'trade_executor' || role == 'ship_executor' || role == 'ship_trader' ||
								role == 'depa_port' || role == 'arriv_port' || role == 'sales_trader' || role == 'buy_trader' || role == 'charterer') {
								flag = true
							}
						}
					}
					if ((userData.epMemberId == userData.memberId && !flag) || userData.epMemberId == null) {
						this.$router.push({
							'path': '/403'
						});
					} else {
							this.$router.push({"path":"/bootList"})
						//window.location.href = configURL.shipUrl + '/page/#/bootList';
					}
				} else {
					window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/';
				}
				//	    		this.$router.push({path:'/bootList'})
			},
			goodsMoreList() {
				//	    		window.location.href=configURL.shipUrl+'/page/#/goodList';
				this.$router.push({
					path: 'goodList'
				})
			}
		},
		created() {
			this.topInfoFn(); //滚动数据
		},
		//		beforeRouteLeave (to, from, next) {
		//			 window.clearInterval(this.iTime) //清楚定时器
		//			 next()
		//		},
		mounted() {
			this.getIsShow()
			this.goodDataFn() //货盘滚动数据
			this.dataDayFn(); // 日报数据
			this.dataDaysFn(); //日报数据
			this.oceanInfoFn(); // 资讯数据
			this.marketsInfo(); //油轮市场
			this.routeWarnings();//航行预警
			this.meteorologicalInfos()//气象信息
			this.columnListFn(); //大咖秀
			var iHeight = $(window).height() - $('.header').innerHeight();
			$('.banner').css({
				'height': $(window).height() - $('.header').innerHeight()
			});
			$('.banner').css('background', '#009af0 url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_barner.jpg?x-oss-process=image/resize,m_mfit,h_' + iHeight + ',w_' + $(window).width() + '/quality,q_60) center bottom no-repeat');
			//$('.content').css('background', 'url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_content.jpg?x-oss-process=image/resize,m_mfit,w_' + $(window).width() + '/quality,q_60) center center no-repeat fixed #009af0');
			//tab切换
			$('.tab1 .item').each(function(i,el){
				$(el).click(function(){
					
					$(this).addClass('active')
					$(this).parent().find('.item').not($(this)).removeClass('active')


					$(this).parent().find('.more').eq(i).css('display','block')
					$(this).parent().find('.more').not($(this).parent().find('.more').eq(i)).css('display',"none")
					//console.log($(this).attr('a-data'))
					$(this).parent().parent().find('.ship-news-cont').eq(i).css('display','block')
					$(this).parent().parent().find('.ship-news-cont').not($(this).parent().parent().find('.ship-news-cont').eq(i)).css('display',"none")
				})
			})
			$('.tab2 .item').each(function(i,el){
				$(el).click(function(){
					console.log(this)
					$(this).addClass('active')
					$(this).parent().find('.item').not($(this)).removeClass('active')
					//console.log($(this).attr('a-data'))
					//更多
					$(this).parent().find('.more').eq(i).css('display','block')
					$(this).parent().find('.more').not($(this).parent().find('.more').eq(i)).css('display',"none")
					//div
					$(this).parent().parent().find('.ship-news-cont').eq(i).css('display','block')
					$(this).parent().parent().find('.ship-news-cont').not($(this).parent().parent().find('.ship-news-cont').eq(i)).css('display',"none")
				})
			})
		}
	}
</script>
<style>
	/*.banner{ height:600px !important;}*/
	.aBlock {
		display: block;
		overflow: hidden;
	}
	.aBlock table {
		width: 100%;
	}
	.aBlock td {
		color: #fff;
		height: 26px;
	}
	.scroll-news-list {
		position: relative;
		height: 150px;
	}
	#scroll {
		position: relative;
		top: 0px;
		width: 100%;
		height: 150px;
	}
	#goodScroll {
		position: relative;
		top: 0px;
		width: 100%;
		height: 150px;
	}
	.scrollNeer {
		position: relative;
		top: 0px;
	}
	.turnover-points-list li {
		line-height: 38px;
		height: 38px;
	}
	.ship-information .ry-indexlhh li {
		line-height: 40px;
		height: 38px;
	}
	.scroll-news-list2 {
		height: 150px;
		overflow: hidden;
	}
	.ry-addTab td {
		text-align: center;
	}
	.table_header {
		margin-bottom: 0 !important;
		font-weight: bolder;
		position: relative;
	}
	/*.boot-btn{position: absolute; z-index: 1111; left: 0; top: 0;width: 67px;
			    height: 23px;
			    line-height: 23px;
			    background-color: #6ca6fa;
			    color: #fff;
			    text-align: center;
			    display: block;}*/
	.title_width {
		height: 32px !important;
	}
	#_table {
		height: 32px !important;
	}
	.font_color {
		color: #fff !important;
	}
	.scroll_more {
		position: absolute;
		right: 10px;
		top: 5px;
		color: #fff;
		font-size: 14px;
	}
	/* .ship-news-list li {
			line-height: 40px !important;
		} */
	.content {
		padding: 34px 0;
	}
	.cont-partner {
		margin-bottom: 0 !important;
	}
	.red {
		color: red;
	}
	.ship-news-title {
		border-bottom: 1px solid rgba(62, 101, 155, 0.50);
	}
	.ship-news-title .item {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: inline-block;
		font-size: 14px;
		color: #FFFFFF;
		cursor: pointer;
	}
	.ship-news-title .active {
		border-bottom: 2px solid #66A6FE;
	}
	.ship-news-title .more {
		float: right;
		line-height: 40px;
		font-size: 14px;
		color: #FFFFFF;
		cursor: pointer;
	}
	.ship-news-cont1 {
		padding-left: 2%
	}
	.common-tooln-list li {
    	width: 20%;	
    	float: left;
    	text-align: center;
	}
</style>
