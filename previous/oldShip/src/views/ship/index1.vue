<template>
	<section>
		
	</section>
</template>

<script>
	import { topInfo ,dayInfo ,oceanInfo,daysInfo,userLoad,goodData,columnList,dingYue,userLoadInfo} from '../../api/ship';
	export default {
		data() {
			return {
				isShow:false,
				dataInfo:[],  // 头部滚动数据
				dataDay:[],   // 日报数据
				dataOcean:[],    // 海运新闻
				dataMarkets:[],    // 邮轮市场
				dataDays:[],  //日报
				goodsData:[],  //货盘滚动数据
				columnList:[]  //大咖秀
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
			subscription(item){//订阅专栏
				userLoad().then((res)=>{
					if(res.status==0){
						 var param={
						columnId:item.id
						}
						if(item.subStatus==0){
							item.subStatus=1
							/* dingYue(param).then(res=>{
							
							}) */
							
							 $.ajax({
							      type: 'POST', 
							      url: configURL.infoUrl+"/subscribe/subscribeColumn.json",
							      data: JSON.stringify(param),
							      dataType: "json",
							      contentType: "application/json",
							      async: false,
							      xhrFields: {
							        withCredentials: true
							      },
							      success: function (res) {
							      }
							    });
							
							
						}else if(item.subStatus==1){
							item.subStatus=0
						/* 	cancle(param).then(res=>{
							
							}) */
							 $.ajax({
							      type: 'POST', 
							      url: configURL.infoUrl+"/subscribe/removeSubscribe.json",
							      data: JSON.stringify(param),
							      dataType: "json",
							      contentType: "application/json",
							      async: false,
							      xhrFields: {
							        withCredentials: true
							      },
							      success: function (res) {
							      }
							    });
						} 
					   
					}else{
//						window.location.href=configURL.sys+"/login.htm";
						window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
					}
				})
				
			},
			getMap(){
	    		window.open(configURL.shipUrl+"/page/#/routemap","_blank");
//				this.$router.push({path:'/routemap'})
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
				window.location.href=configURL.shipUrl+'/page/#/shipCost';
			},
			getActive:function(id){
				window.open(configURL.infoUrl+"/page/#/active?uuid="+id,"_blank");
			},
			cloumnDetail:function(id){
				window.open(configURL.infoUrl+"/page/#/zlDetails?id="+id,"_blank");
			},
			cloumnMore:function(){
				window.open(configURL.infoUrl+"/page/#/columnList","_blank");
			},
			getBootInfo:function(name){
				 window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/bootInfo?uuid" + name})
			},
			getGoodInfo:function(name){
				window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/goodInfo?uuid" + name})
			},
			newMore:function(strName,code){   // 资讯  更多详情
				var strName =encodeURIComponent(strName);
				var code = encodeURIComponent(code);
				window.open(configURL.infoUrl+"/page/#/list?channelName="+strName+'&channelCode='+code,"_blank");
				 
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
					    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner' || role == 'ADMIN' || role == 'admin'|| role == 'trade_oper'|| role == 'ship_broker' || role == 'trade_executor'|| role == 'ship_executor'|| role == 'ship_trader'
					    			  || role == 'depa_port' || role == 'arriv_port'|| role == 'sales_trader'|| role == 'buy_trader' || role == 'charterer'){
					    				flag = true
					    			}
					    		}
			    			}
			    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
			    				this.dataDays = []
			    			}else{
			    				var parm={
			    					'channelMDesc':'ZX',
								    "channelCode": "ZXCJDS",
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
				var para={"channelCode":"HYXW",'channelMDesc':'ZX'};
				oceanInfo(para).then((res)=>{
					this.dataOcean=res.datas.infoList;
				})
			},
			marketsInfo:function(){    // 油轮市场 数据
				var para={"channelCode":"YLSC",channelMDesc:'ZX'};
				
				oceanInfo(para).then((res)=>{
					this.dataMarkets=res.datas.infoList;
				});
			},
			columnListFn:function(){    // 大咖秀 数据
				
				//userLoad().then((res)=>{
					
					var That = this;
				    $.ajax({
				      type: 'POST', // 获取头信息，type=HEAD即可
				      url: configURL.infoUrl+"/column/columnList.json",
				      data: JSON.stringify({}),
				      dataType: "json",
				      contentType: "application/json",
				      async: false,
				      xhrFields: {
				        withCredentials: true
				      },
				      success: function (res) {
				        That.columnList = res.datas;
				      }
				    });
					/* var para={};
					columnList(para).then((res)=>{
						this.columnList=res.datas;
					}); */
				//});
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
	    		var userData = JSON.parse(window.localStorage.getItem('user'));
	    		if(userData){
	    			var flag = false;
					var str ="";
		    			if(userData.roles != null){
		    				for(var i=0; i<userData.roles.length; i++){
		    					var role = userData.roles[i];
				    			if(role == 'trade_executor'|| role == 'sales_trader'|| role == 'buy_trader' || role == 'charterer'){
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
	    		}
	    		
	    			
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
	    		window.location.href=configURL.shipUrl+'/page/#/basic';
	    	},
	    	gitConversion(){
	    		/* var userData = JSON.parse(window.localStorage.getItem('user'))
	    		if(userData){
		    		window.location.href=configURL.shipUrl+'/page/#/conversion';
	    		}else{
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
	    		} */
	    		window.location.href=configURL.shipUrl+'/page/#/conversion';
	    	},
	    	gitTide(){
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
	    		window.location.href=configURL.shipUrl+'/page/#/tide';
	    	},
	    	gitInfo(){
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
	    		window.location.href=configURL.shipUrl+'/page/#/info';
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
		    			window.location.href=configURL.shipUrl+'/page/#/bootList';
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
			this.columnListFn();    //大咖秀
			var iHeight=$(window).height()-$('.header').innerHeight();
			$('.banner').css({'height':$(window).height()-$('.header').innerHeight()});   
			$('.banner').css('background','#009af0 url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_barner.jpg?x-oss-process=image/resize,m_mfit,h_'+iHeight+',w_'+$(window).width()+'/quality,q_60) center bottom no-repeat');
			$('.content').css('background','url(http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/info/ship_content.jpg?x-oss-process=image/resize,m_mfit,w_'+$(window).width()+'/quality,q_60) center center no-repeat fixed #009af0');
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
	.ship-news-list li{line-height: 40px !important;}
	.content{padding: 34px 0;}
	.cont-partner{ margin-bottom: 0 !important;}
	.red{color:red;}
</style>
