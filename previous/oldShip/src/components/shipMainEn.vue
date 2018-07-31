<template>
	<section>
		<!--头部-->
		<div class="header">
		<div class="top-wrap">
			<div class="inner clearfix">
				<div class="top-l">
						<span class="wel-txt" v-if="userName==''">Hi！Welcome to mycrudeoil！</span>
						<span v-if="userName!=''">{{userName}} <a href="javascript:;" @click="signOut">Sign out</a></span>
						<span v-else class="t-lr-txt"><a class="t-log" href="javascript:;" @click="getLoad()">Sign in</a>|<a class="t-reg" href="javascript:;" @click="getReat()">Register</a></span>
				</div>
				<div class="top-r">
					<ul class="tr-list clearfix">
						<!--<li><a class="user-txt" href="javascript:;" @click="notice()"><i class="c-ico ico-gg1"></i>Notice</a></li>-->
						<li><a class="user-txt" href="javascript:;" @click="getPersonal()">Member Center</a></li>
						<li><a class="ph-txt" href=""><i class="c-ico ico-phone"></i>APP 
                          <span class="index-tc1 clearfix">
						    <span><i class="ios"></i><em>IOS</em></span>
						    <span><i class="andriod"></i><em>Android</em></span>
						    <p class="ico-sj1"></p>
					      </span></a></li> 
						<li><span class="kf-txt"><i class="c-ico ico-tel"></i>+86 10 59568888</span></li>
						<!--<li><a class="glb-link" href="javascript:;" @click='getGlobal()'><i class="c-ico ico-glb"></i>global</a></li>-->
					</ul>					
				</div>
			</div>
		</div>
		<div class="head-con clearfix">
			<div class="inner">
				<div class="head-l">
					<a href="javascript:;" @click="getActiveIndex()" class="logo"></a>
				</div>
				<div class="head-search clearfix">
					<div class="h-srh-select">
						<a href="" class="srh-select-cur">采购需求<i class="c-ico ico-arw01"></i>
                          <ul class="cgxq-hov">
                            <li>采购需求</li>
                            <li>采购需求</li>
                            <li>采购需求</li>
                            <li>采购需求</li>
                          </ul>
                        </a>
						<ul class="srh-select-ul">
							<li>商品1</li>
							<li>商品2</li>
						</ul>
					</div><div class="h-srh-con"><input class="h-srh-inp" type="text" placeholder="请输入要搜索的关键字" /><button class="h-srh-btn">搜索</button></div>
				</div>
			</div>
		</div>
		<div class="nav-wrap">
			<div class="inner">
				<ul class="nav clearfix nav_click">
					<li class="nav-item"><a href="javascript:;" @click="getActiveIndex()">Home</a></li>
					<li class="nav-item"><a href="javascript:;" @click="getSeo()">Smart Factory</a></li>
					<li class="nav-item"><a href="javascript:;" @click="getActive()">Trading</a></li>
					<!--<li class="nav-item"><a href="javascript:;" @click="getActiveHall()">Petroleum Products</a></li>-->
					<li class="nav-item"><a href="javascript:;" @click='getConn()'>Enterprise Zone</a></li>
					<li class="nav-item act"><a href="/page/#/">Shipping</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getConn()'>Financing</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getFutures()'>Futures</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getBk()'>Encyclopedia</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getInfo()'>News&Reports</a></li> 
				</ul>
			</div>
		</div>
	</div>
		
		<!--中间内容部分-->
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		
		
		<!--底部-->
		<div class="footer">
			<div class="inner">
				<ul class="ft-list clearfix">
					<li>
						<h3><a href="javascript:;">About us</a></h3>
					</li>
					<li>
						<h3><a href="javascript:;" @click="getHelp">Help</a></h3>
					</li>
					<li>        
						<h3><a href="javascript:;" @click="getStatement">Registration Agreements</a></h3>
					</li>
					<li>
						<h3><a href="javascript:;" @click="getStatement">Legal Statement</a></h3>
					</li>
				</ul>
				<p>Copyright © Sinochem Corporation All Right Reserved ICP Beijing 13009914号-6</p>
			</div>
		</div>
		
	</section>
</template>

<script>
	import {userLoad} from '../api/ship';
	export default {
		data() {
			return {
				userName:'',
				
			}
		},
		methods: {
			getFutures(){
				window.open(configURL.index+'/futures/index.htm?order=7',"_self");
			},
			getHelp(para){
//				window.localStorage.setItem('helpPara',para);
				var param = encodeURIComponent(para);
				window.open(configURL.infoUrl+"/page/#/helpCenter?id=" + param,"_blank");
			},
			getStatement(param){
//				window.localStorage.setItem('statementPara',param);
				var name = encodeURIComponent(param);
				window.open(configURL.infoUrl+"/page/#/ptStatement?id=" + name,"_blank");
			},
			zhaopin(){
				window.open(configURL.index+'/recruit.htm',"_self");
			},
			getPrize(){
//				http://www8.1chemic.com/collection/rc_prize.htm
				window.open(configURL.member+'/tradeHall/rc_prize.htm',"_blank");
			},
			notice(){
				window.open(configURL.infoUrl+"/page/#/notice","_self");
			},
			getSeo(){
				window.open(configURL.member+'/sso/aso/redirectTgs.htm?Sys=GROMS',"_blank");
			},
			getActive(){
				window.open(configURL.shopHall+'/crudeoillobby/crudeoilsupmlist.htm',"_self");//原油大厅
			},
			getActiveHall(){
				window.open(configURL.shopHall+'/trademall/prolist.htm',"_self");//成品油商城
			},
			getPersonal(){
				window.open(configURL.member+'/center/my.htm',"_self");
			},
			getBk(){
				window.open(configURL.infoUrl+"/page/#/encyclopedia","_self");
			},
			getActiveIndex(){
				window.open(configURL.index,"_self");
			},
			getConn(){
				this.$router.push({'path': '/comingSoon'});
			},
			getInfo(){
				window.open(configURL.infoUrl+'/page/#/',"_self");
			},
			getLoad(){   // 登入
				window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/';
			},
			getReat(){   // 注册
				window.open(configURL.sys+'/register.htm',"_blank");
			},
			signOut(){
				this.userName='';
				window.localStorage.removeItem('user');
				window.location.href=this.removeHref('loging');
				window.location.href=configURL.sys+"/logout.htm";
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
			}
		},
		mounted(){

//			this.urlSrc = `${configURL.index}/images/drift.png`
			$('.nav li').on('click',function(){
				$(this).addClass('act').siblings().removeClass('act');
			})
		},
		created(){
			
			// 判断是否已经登入了
			var userData=JSON.parse(window.localStorage.getItem('user'));
			if(userData){
				this.userName=userData.userName;
			}
			
			// 是否要登入
			window.localStorage.removeItem('user');
			userLoad().then((res)=>{
				if(res.status==0){
					this.userName=res.datas.name;
					var userObj = {'userName':this.userName,'roles':res.datas.roles,'memberId':res.datas.memberId,'epMemberId':res.datas.epMemberId};
					var userStr=JSON.stringify(userObj);
					window.localStorage.setItem('user', userStr);
				}
			})
			
		}
	}

</script>

<style lang="css" scoped>
	
</style>