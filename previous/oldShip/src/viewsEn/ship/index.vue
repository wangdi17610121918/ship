<template>
	<section>
		<div class="banner">
			<div class="banner-menu">
				<div class="banner-menu-bg"></div>
				<ul class="banner-menu-list clearfix">
					<li><a href="javascript:;" @click="getBoot()"><i class="shipping-ico ico-pinch-boat"></i><p>CHARTERING</p></a></li>
					<li><a href="javascript:;" @click="getBoot1()"><i class="shipping-ico ico-charter"></i><p>POST VESSEL</p></a></li>
					<!--<li><router-link to="/introduction" ><i class="shipping-ico ico-voyage-planning"></i><p>VOYAGE INTELLIGENCE</p></router-link></li>-->
					<li><a href="javascript:;" @click="getMap"><i class="shipping-ico ico-voyage-planning"></i><p>VOYAGE INTELLIGENCE</p></a></li>
					<li><a href="javascript:;" @click="hzhref()"><i class="shipping-ico ico-cargo-tracking"></i><p>FFA</p></a></li>
				</ul>
			</div>
		</div>
		<div class="content">
			<!--船盘滚动-->
			<div class="inner cont-box1 table_header">
				<a href="javascript:;" class="scroll_more" @click="moreList()">More</a>
				<div class="scrollNeer">
					<a href="javascript:;" class="aBlock">
						<table class="ry-addTab">
							<tbody  class="scroll-news-blo clearfix">
								<tr>
									<td width="10%">Vessel Name</td>
									<td width="10%">Vessel Type</td>
									<td width="10%">Position</td>
									<td width="10%">Open</td>
									<td width="10%">ETA Fujairah</td>
									<td width="10%">ETA Cabinda</td>
									<td width="15%">Ship Owner</td>
									<td width="15%">Poster</td>
									<td width="10%">Post Date</td>
								</tr>
							</tbody>
						</table>
					</a>
				</div>
				
			</div>
			<div class="inner cont-box1 scroll-news-list2">
				<div id="scroll" class="shipScroll">
					<div class="scrollNeer shipRolling" id="rolling">
						<a href="javascript:;" class="aBlock" v-for="(item,index) in dataInfo" @click="getBootInfo(item.uuid)" :class="index == dataInfo.length ?'red':''">
							<table class="ry-addTab">
								<tbody  class="scroll-news-blo clearfix">
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
						<a href="javascript:;" class="aBlock" v-for="(item,index) in dataInfo" @click="getBootInfo(item.uuid)">
							<table class="ry-addTab">
								<tbody  class="scroll-news-blo clearfix">
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
				<a href="javascript:;" class="scroll_more" @click="goodsMoreList()">More</a>
				<div class="scrollNeer">
					<a href="javascript:;" class="aBlock">
						<table class="ry-addTab">
							<tbody  class="scroll-news-blo clearfix">
								<tr>
									<td width="15%">Quantity</td>
									<td width="15%">Laycan</td>
									<td width="20%">Load Area</td>
									<td width="20%">Discharge Area</td>
									<td width="15%">Post Date</td>
									<td width="15%">Status</td>
								</tr>
							</tbody>
						</table>
					</a>
				</div>
			</div>
			<div class="inner cont-box1 scroll-news-list2" v-show="isShow">
				<div id="goodScroll" class="goodsScroll">
					<div class="scrollNeer goodsRolling" id="goodRolling">
						<a href="javascript:;" class="aBlock" v-for="item in goodsData" @click="getGoodInfo(item.uuid)">
							<table class="ry-addTab">
								<tbody  class="scroll-news-blo clearfix">
									<tr>
										<td width="15%" :title="item.quantity">{{item.quantity | truncate(15)}}</td>
										<td width="15%">{{item.laycan}}</td>
										<td width="20%" :title="item.load">{{item.load | truncate(18)}}</td>
										<td width="20%" :title="item.unload">{{item.unload | truncate(18)}}</td>
										<td width="15%">{{item.createDate}}</td>
										<td width="15%">{{item.status}}</td>
									</tr>
								</tbody>
							</table>
						</a>
						<a href="javascript:;" class="aBlock"  v-for="item in goodsData" @click="getGoodInfo(item.uuid)">
							<table class="ry-addTab">
								<tbody  class="scroll-news-blo clearfix">
									<tr>
										<td width="15%" :title="item.quantity">{{item.quantity | truncate(15)}}</td>
										<td width="15%">{{item.laycan}}</td>
										<td width="20%" :title="item.load">{{item.load | truncate(18)}}</td>
										<td width="20%" :title="item.unload">{{item.unload | truncate(18)}}</td>
										<td width="15%">{{item.createDate}}</td>
										<td width="15%">{{item.status}}</td>
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
					<span class="common-tooln-tit">COMMON EQUIPEMENTS</span>
					<ul class="common-tooln-line clearfix">
						<li></li><li class="tooln-line"></li>
					</ul>
				</div>
				<div class="common-tooln-bto">
					<ul class="common-tooln-list clearfix">
						<!-- <li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitBasic()"><i class="shipping-ico ico-basic-tariffs"></i><span>FLAT RATE</span></a>
							</p>
						</li> -->
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="getCost()"><i class="shipping-ico ico-basic-ygyj"></i><span>ESTIMATE FREIGHT</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitConversion()"><i class="shipping-ico ico-unit-conversion"></i><span>CONVERTER</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitTide()"><i class="shipping-ico ico-port-terminal"></i><span>TIDES</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="gitInfo()"><i class="shipping-ico ico-ship-information"></i><span>VESSEL DATA</span></a>
							</p>
						</li>
						<li class="common-tooln-li2">
							<p>
								<a href="javascript:;" @click="getBk()"><i class="shipping-ico ico-port-charges"></i><span>ENCYCLOPEDIA</span></a>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<!--最新成交点数-->
			<div class="inner cont-box1 cont-box4 clearfix">
				<div class="turnover-points">
					<p class="turnover-points-tit">WS Rate</p>
					<div>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="turnover-points-table" id='_table'>
							<tr class="title_width">
								<th scope="col">Region</th>     <!--region-->
								<th scope="col">Vessel Type</th>      <!--type-->
								<th scope="col">WS</th>    <!--price-->
								<th scope="col">Estimated Freight/BBL</th>    <!--singleFare-->
								<th scope="col">Reference Route</th>       <!--refRoute-->
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
						<span class="common-tooln-tit ship-information-tit">Market Report</span>
						<ul class="common-tooln-line ship-information-list clearfix">
							<li></li><li class="tooln-line"></li>
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
				<div class="ship-news-pic tab_first"><p class="news-pic-blo1"></p></div>
				<div class="ship-news-cont">
					<div class="ship-news-title tab1">
						<div class="item active" data-class="news-pic-blo1">Freight Market</div>
						<div class="item" data-class="news-pic-blo2">Voyage Schedule</div>
							<div class="more"  @click="newMore('油轮市场','YLSC_EN')">More</div>
							<div class="more"  @click="newMore('船期报告','HYXW_EN')" style="display:none">More</div>
					</div>
					<ul class="ship-news-list">
						<li class="clearfix" v-for="(item,index) in dataMarkets" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)" v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
					</ul>
					<ul class="ship-news-list"style="display:none">
						<li class="clearfix" v-for="(item,index) in dataOcean" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
					</ul>
				</div>
			</div>
			<div class="ship-news clearfix" style="margin-top: 16px;">
				<div class="ship-news-pic tab_second"><p class="news-pic-blo3"></p></div>
				<div class="ship-news-cont">
					<div class="ship-news-title tab2">
						<div class="item active" data-class="news-pic-blo3">Fixtures</div>
						<!-- <div class="item" data-class="news-pic-blo4">Meteorological Information</div> -->
						<div class="more"  @click="newMore('Fixtures','HXYJ_EN')">More</div>
						<!--<div class="more" @click="newMore('气象信息','QXXX_EN')" style="display:none">More</div> -->
					</div>
					<ul class="ship-news-list">
						<li class="clearfix" v-for="(item,index) in routeWarning" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
					</ul>
					<ul class="ship-news-list" style="display:none">
						<li class="clearfix" v-for="(item,index) in meteorologicalInfo" v-if="index<6"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
					</ul>
				</div>
			</div>
          </div>
         
		</div>

			<!-- <div class="inner cont-box1">
				<div class="ship-news clearfix">
					<div class="ship-news-pic"><p class="news-pic-blo1"></p></div>
					<div class="ship-news-cont">
						<ul class="ship-news-list">
							<li class="clearfix" v-for="(item,index) in dataMarkets" v-if="index<4"><a href="javascript:;" @click="getActive(item.uuid)" v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
						</ul>
						<a href="javascript:;" @click="newMore('油轮市场','YLSC_EN')" class="but-more">More</a>
					</div>
				</div>
				<div class="ship-news clearfix">
					<div class="ship-news-pic"><p class="news-pic-blo2"></p></div>
					<div class="ship-news-cont">
						<ul class="ship-news-list">
							<li class="clearfix" v-for="(item,index) in dataOcean" v-if="index<4"><a href="javascript:;" @click="getActive(item.uuid)"  v-html="item.title"></a><span>{{item.release_date | timestampFormat('YYYY-MM-DD')}}</span></li>
						</ul>
						<a href="javascript:;" class="but-more"  @click="newMore('船期报告','HYXW_EN')">More</a>
					</div>
				</div>
			</div> -->
			<!--合作伙伴-->
			<div class="inner cont-box1 cont-box2">
			<div class="partner">
                <div class="partner-tit">Partner</div>
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
	import { topInfo ,dayInfo ,oceanInfo,daysInfo,userLoad,goodData} from '../../api/ship';
	import '../../../static/cssEn/f_chuanwu_en.css'
	export default {
		data() {
			return {
				isShow:false,
				dataInfo:[],  // 头部滚动数据
				dataDay:[],   // 日报数据
				dataOcean:[],    // 海运新闻
				dataMarkets:[],    // 邮轮市场
				dataDays:[],//日报
				goodsData:[],//货盘滚动数据
				routeWarning:[],//航行预警
				meteorologicalInfo:[]//气象信息
			}
		},
		methods: {
			getMap(){
	    		window.open(configURL.shipUrl+"/page/#/routemap","_blank");
			},
			getIsShow(){
				userLoad().then((res)=>{
					if(res.status==0){
						var userData = res.datas;
						if(userData){
			    			if(userData.roles != null){
			    				for(var i=0; i<userData.roles.length; i++){
			    					var role = userData.roles[i];
					    			if(role == 'ship_owner' || role == 'ship_broker' ||role == 'ship_trader'){
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
				window.open(configURL.infoUrl+'/page/#/list?name='+name,"_blank")
			},
			getCost:function(){//预估运费
				var userData = JSON.parse(window.localStorage.getItem('user'))
	    		if(userData){
	    			var flag = false;
	    			if(userData.roles != null){
	    				for(var i=0; i<userData.roles.length; i++){
	    					var role = userData.roles[i];
			    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'trade_oper' || role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
			    			   || role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader'|| role == 'charterer' ){
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
	    		}  
			},
			getActive:function(id){
				window.open(configURL.infoUrl+"/page/#/active?uuid="+id,"_blank");
			},
			getBootInfo:function(name){
				 window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/bootInfo?uuid=" + name})
			},
			getGoodInfo:function(name){
				window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/goodInfo?uuid=" + name})
			},
			newMore:function(strName,code){   // 资讯  更多详情
				window.localStorage.setItem('channelCode',code);
				
				window.open(configURL.infoUrl+"/page/#/list?channelName="+strName,"_blank");
				 
			},
			getBk:function(){
				this.$router.push({"path":"/olibk"})
//				window.open(configURL.infoUrl+"/page/#/encyclopedia","_blank");
			}, 
			topInfoFn:function(){  // 船盘顶部 数据
				topInfo().then((res) => {
					
					this.dataInfo=res.datas;
					var This = this;
					if(this.dataInfo.length<5) return false;
					
					setTimeout(function(){
						This.handleRoll();
					},1000)
					
				});
			},
			goodDataFn:function(){//货盘滚动数据
				goodData({}).then(res =>{
					
					this.goodsData = res.datas
					var This = this;
					if(this.goodsData.length<5) return false;
					
					setTimeout(function(){
						This.goodsHandleRoll();
					},1000)
				})
			},
			dataDayFn:function(){   //  折线表格数据
				dayInfo({}).then((res)=>{
					res.datas.forEach(o=>{
						if(o.region == '西非'){
							o.region = 'West Africa'
						}else if(o.region == '中东'){
							o.region = 'Middle East'
						}
					})
					this.dataDay=res.datas;
				})
			},
			dataDaysFn:function(){
				userLoad().then((res)=>{
					if(res.status==0){
						var userData = res.datas;
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
			    				this.dataDays = []
			    			}else{
			    				var parm={
			    					channelMDesc:'YYYW',
								    "channelCode": "ZXCJDS_EN",
								    "pageNum": 1,
								    "pageSize": 5
								}//  日报
								daysInfo(parm).then((res)=>{
										this.dataDays=res.datas.infoList;
								})
			    			}
			    		}	
					}
				})	
			},
			oceanInfoFn:function(){    //海运新闻 数据
				var para={"channelCode":" HYXW_EN",channelMDesc:'YYYW'};
				oceanInfo(para).then((res)=>{
					this.dataOcean=res.datas.infoList;
				})
			},
			marketsInfo:function(){    // 油轮市场 数据
				var para={"channelCode":"YLSC_EN",channelMDesc:'YYYW'};
				
				oceanInfo(para).then((res)=>{
					this.dataMarkets=res.datas.infoList;
				});
			},
			routeWarnings:function(){    //航运预警
				var para={"channelCode":" HXYJ_EN",channelMDesc:'YYYW'};
				oceanInfo(para).then((res)=>{
					this.routeWarning=res.datas.infoList;
				})
			},
			meteorologicalInfos:function(){    //气象信息
				var para={"channelCode":"QXXX_EN",channelMDesc:'YYYW'};
				
				oceanInfo(para).then((res)=>{
					this.meteorologicalInfo=res.datas.infoList;
				});
			},
			handleRoll:function(){
	    		var iTime=null;
	    		var $box = $('#rolling');
				var iHeight=Math.ceil(($box.innerHeight())/2);
//				$box.html( $box.html()+ $box.html());
	
				 iTime=setInterval(intime,35);
				function intime(){
					if($box.css('top')=='-'+iHeight+'px'){
						$box.css({'top':'0px'})
					}
					$box.css({'top':'+=-1px'});			
				}
				
				$('#scroll').hover(function(){
					clearInterval(iTime);
				},function(){
					clearInterval(iTime);
					iTime=setInterval(intime,30)
				})	
	    	},
	    	goodsHandleRoll:function(){
	    		var iTime1=null;
	    		var $box1 = $('.goodsRolling');
				var iHeight1=Math.ceil(($box1.innerHeight())/2);
//				$box.html( $box.html()+ $box.html());
				 iTime1=setInterval(intime,35);
				function intime(){
					if($box1.css('top')=='-'+iHeight1+'px'){
						$box1.css({'top':'0px'})
					}
					$box1.css({'top':'+=-1px'});			
				}
				
				$('.goodsScroll').hover(function(){
					clearInterval(iTime1);
				},function(){
					clearInterval(iTime1);
					iTime1=setInterval(intime,30)
				})	
	    	},
	    	hzhref(){
	    		this.$router.push({'path': '/comingSoon'});
	    		/* var userData = JSON.parse(window.localStorage.getItem('user'));
	    		if(userData){
	    			var flag = false;
					var str ="";
		    			if(userData.roles != null){
		    				for(var i=0; i<userData.roles.length; i++){
		    					var role = userData.roles[i];
				    			if(role == 'trade_executor'|| role == 'sales_trader'|| role == 'buy_trader'|| role == 'charterer'){
				    				str = str+"1";
								flag = true;
				    			}  else if(role == 'ship_executor'|| role == 'ship_trader'){
				    				str = str+"2";
								flag = true;
				    			} else if( role == 'ship_owner' || role == 'ship_broker'){
				    				str = str+"3";
								flag = true;
				    			} else if(role == 'depa_port' || role == 'arriv_port'){
				    				str = str+"4";
								flag = true;
				    			}
				    		}
		    			}
	    			if (!flag){
	    				this.$router.push({'path': '/403'});
	    			}
					if (str.indexOf('1') >= 0){
						window.location.href="/pallet/agreementList.htm";
					} else if (str.indexOf('2') >= 0){
						window.location.href="/shipPactNew/shipPactListNew.htm";
					} else if (str.indexOf('3') >= 0){
						window.location.href="/shipPactNew/shipPactListNewOwner.htm";
					} else if (str.indexOf('4') >= 0){
						window.location.href="/shipPactNew/shipPactListAgency.htm";
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
	    			
	    		}else{
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		} */
	    		
	    			
	    	},
	    	getBoot(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
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
	    				window.location.href=configURL.shipUrl+'/page/#/bootPage?palletType=1';
	    			}
	    		}else{
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		}
	    	},
	    	getBoot1(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
	    		if(userData){
	    			var flag = false;
	    			if(userData.roles != null){
	    				for(var i=0; i<userData.roles.length; i++){
	    					var role = userData.roles[i];
			    			if( role == 'ship_owner' ||  role == 'ship_broker' ||   role == 'ship_trader'){
			    				flag = true
			    			}
			    		}
	    			}
	    			if(!flag){
	    				this.$router.push({'path': '/403'});
	    			}else{
	    				window.location.href=configURL.shipUrl+'/shipPlate/shipAgentEditShipPlate.htm';
	    			}	
	    		}else{
	    			
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		}
	    	},
	    	gitBasic(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
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
	    		}
	    	},
	    	gitConversion(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
	    		if(userData){
		    		window.location.href=configURL.shipUrl+'/page/#/conversion';
	    		}else{
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		}
	    	},
	    	gitTide(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
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
	    		}
	    	},
	    	gitInfo(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
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
	    		}
	    	},
	    	moreList(){
	    		var userData = JSON.parse(window.localStorage.getItem('user'))
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
						this.$router.push({"path":"/bootList"})
		    			//window.location.href=configURL.shipUrl+'/page/#/bootList';
		    		}
	    		}else{
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		}
//	    		this.$router.push({path:'/bootList'})
	    	},
	    	goodsMoreList(){
//	    		window.location.href=configURL.shipUrl+'/page/#/goodList';
				this.$router.push({path:'goodList'})
	    	}
		},
		created(){
			this.topInfoFn();   //滚动数据
		},
//		beforeRouteLeave (to, from, next) {
//			 window.clearInterval(this.iTime) //清楚定时器
//			 next()
//		},
		mounted(){
			this.getIsShow()
			this.goodDataFn() //货盘滚动数据
			this.dataDayFn();    // 日报数据
			this.dataDaysFn(); 	//日报数据
			this.oceanInfoFn();   // 资讯数据
			this.marketsInfo();    //油轮市场
			this.routeWarnings();//航行预警
			this.meteorologicalInfos()//气象信息
			var iHeight=$(window).height()-$('.header').innerHeight();
			$('.banner').css({'height':$(window).height()-$('.header').innerHeight()});   
			$('.banner').css('background','#009af0 url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_barner.jpg?x-oss-process=image/resize,m_mfit,h_'+iHeight+',w_'+$(window).width()+'/quality,q_60) center bottom no-repeat');
			//$('.content').css('background','url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_content.jpg?x-oss-process=image/resize,m_mfit,w_'+$(window).width()+'/quality,q_60) center center no-repeat fixed #009af0');
			$('.tab1 .item').each(function(i,el){

				$(el).click(function(){
					var className = $(this).data('class');
					$('.tab_first').children().attr({'class':className});


					
					$(this).addClass('active');
					$(this).parent().find('.item').not($(this)).removeClass('active');
					$(this).parent().parent().find('ul').eq(i).css('display','block');
					$(this).parent().parent().find('ul').not($(this).parent().parent().find('ul').eq(i)).css('display',"none")
					// $(this).parent().parent().parent().find('.ship-news-pic p')
					$(this).parent().find('.more').eq(i).css('display','block')
					$(this).parent().find('.more').not($(this).parent().find('.more').eq(i)).css('display',"none")
				})
						
				
			})
			$('.tab2 .item').each(function(i,el){
				

				$(el).click(function(){
					var className = $(this).data('class');
					$('.tab_second').children().attr({'class':className});
					$(this).addClass('active');
					$(this).parent().find('.item').not($(this)).removeClass('active');
					$(this).parent().parent().find('ul').eq(i).css('display','block');
					$(this).parent().parent().find('ul').not($(this).parent().parent().find('ul').eq(i)).css('display',"none")
					
					$(this).parent().find('.more').eq(i).css('display','block')
					$(this).parent().find('.more').not($(this).parent().find('.more').eq(i)).css('display',"none")
				})
						
				
			})
		}
	}


</script>
<style>
	/*.banner{ height:600px !important;}*/
	.aBlock{ display: block;overflow: hidden;}
	.aBlock table{ width:100%;}
	.aBlock td{ color: #fff;height:26px;}
	.scroll-news-list{position:relative; height:150px; }
	#scroll{ position:relative; top:0px;width:100%; height:150px;}
	#goodScroll{ position:relative; top:0px;width:100%; height:150px;}
	.scrollNeer{ position:relative;top:0px;}
	.turnover-points-list li{line-height: 38px;height:38px;}
	.ship-information .ry-indexlhh li{line-height: 40px;height:38px;}
	.scroll-news-list2{height:150px; overflow: hidden;}
	.ry-addTab td{ text-align: center;}
	.table_header{margin-bottom:0 !important;font-weight: bolder; position: relative;}
	/*.boot-btn{position: absolute; z-index: 1111; left: 0; top: 0;width: 67px;
	    height: 23px;
	    line-height: 23px;
	    background-color: #6ca6fa;
	    color: #fff;
	    text-align: center;
	    display: block;}*/
	.title_width{height: 32px !important;}
	#_table{height: 32px !important;}
	.font_color{color:#fff !important;}
	.scroll_more{ position: absolute; right:10px; top:5px; color:#fff; font-size: 14px;}
	/* .ship-news-list li{line-height: 40px !important;} */
	.content{padding: 34px 0;}
	.cont-partner{ margin-bottom: 0 !important;}
	.red{color:red;}
	/* .news-pic1-blo1{    
		width: 179px;
    height: 203px;
	margin-top: 24px;
	background:url('../../../static/images/tab1-1.png')
	}
	.news-pic1-blo2{
		    width: 179px;
    height: 203px;
    margin-top: 24px;
		background:url('../../../static/images/tab1-2.png')
		} */

		/* 船盘详情 */
.title{font-size: 32px;color: #2A2A2A;text-align: center;padding: 20px 0;}
.container{}
.container .sub_title{font-size: 20px;color: #2A2A2A;padding: 15px 0;}
.container .row{font-size: 16px;}
.container .row .name{display: inline-block;width: 10%;height: 30px;color: #363636;}
.container .row .text{display: inline-block;width: 16%;height: 25px;color: #676767;}
.container .row .text2{width: 28%;}
.container .row .text:before{content: ".";visibility: hidden;}
.container .row a{color: #459EFC;padding: 0 10px;}
.container .row a:hover{text-decoration: underline;}
.container .btn_group{text-align: center;padding: 20px 0;}
.container .btn_group .item{display: inline-block;font-size: 20px;color: #56A7FC;width: 178px;height: 48px;line-height: 48px;text-align: center;border: 1px solid #56A7FC;border-radius: 5px;cursor: pointer;}
.container .btn_group .item1{background-color: #56A7FC;color: #FFFFFF;}
.container .btn_group .item1:hover{box-shadow: 0 3px 4px 1px rgba(149, 149, 152, 0.17);}
.container .btn_group .item:hover{box-shadow: 0 3px 4px 1px rgba(166, 166, 169, 0.17);}
.container .btn_group .item+.item{margin-left:100px;}
.people_info{border-bottom: 1px solid #E6E6E6;margin-bottom: 20px;}
.common-tooln-list li {width: 20%;float: left;text-align: center;}
</style>
