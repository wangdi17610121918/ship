<template>
	<section>
		<!--头部-->
		<div class="header">
		<div class="top-wrap">
			<div class="inner clearfix">
				<div class="top-l">
						<span class="wel-txt" v-if="userName==''">您好,欢迎来到买原油电商网！</span>
						<span v-if="userName!=''">{{userName}} <a href="javascript:;" @click="signOut">退出</a></span>
						<span v-else class="t-lr-txt"><a class="t-log" href="javascript:;" @click="getLoad()">登录</a>|<a class="t-reg" href="javascript:;" @click="getReat()">注册</a></span>
				</div>
				<div class="top-r">
					<ul class="tr-list clearfix">
						<li><a class="user-txt" href="javascript:;" @click="notice()"><i class="c-ico ico-gg1"></i>公告</a></li>
						<li><a class="user-txt" href="javascript:;" @click="getPersonal()">会员中心</a></li>
						<li><a class="ph-txt" href=""><i class="c-ico ico-phone"></i>手机买原油网
                          <span class="index-tc1 clearfix">
						    <span><i class="ios"></i><em>IOS</em></span>
						    <span><i class="andriod"></i><em>Android</em></span>
						    <p class="ico-sj1"></p>
					      </span></a></li> 
						<li><span class="kf-txt"><i class="c-ico ico-tel"></i>客服电话：+86 10 59568888</span></li>
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
					<li class="nav-item"><a href="javascript:;" @click="getActiveIndex()">首页</a></li>
					<li class="nav-item"><a href="javascript:;" @click="getSeo()">经营优化</a></li>
					<li class="nav-item"><a href="javascript:;" @click="getActive()">原油大厅</a></li>
					<!-- <li class="nav-item"><a href="javascript:;" @click="getActiveHall()">成品油商城</a></li> -->
					<li class="nav-item"><a href="javascript:;" @click='getConn()'>企业专区</a></li>
					<li class="nav-item act"><a href="/page/#/">贸易物流</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getConn()'>金融服务</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getFutures()'>期货保值</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getBk()'>石油百科</a></li>
					<li class="nav-item"><a href="javascript:;" @click='getInfo()'>信息资讯</a></li> 
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
						<h3>关于我们</h3>
						<a href="javascript:;" @click='getConn()'>关于买原油</a>
						<a href="javascript:;">联系我们</a>
						<a href="javascript:;" @click="zhaopin">人才招聘</a>
					</li>
					<li>
						<h3>帮助中心</h3>
						<a href="javascript:;" @click="getHelp('账号问题')">账号问题</a>
						<a href="javascript:;" @click="getHelp('原油交易流程')">原油交易流程</a>
						<a href="javascript:;" @click="getHelp('订单执行')">订单执行</a>
						<a href="javascript:;" @click="getHelp('租船交易流程')">租船交易流程</a>
						<a href="javascript:;" @click="getHelp('炼厂采购优化')">炼厂采购优化</a>
					</li>
					<li>        
						<h3>注册与服务协议</h3>
						<a href="javascript:;" @click="getStatement('入驻协议')">企业入驻协议</a>
						<a href="javascript:;" @click="getStatement('注册协议')">个人注册协议</a>
						<a href="javascript:;" @click="getStatement('权限说明')">用户权限说明</a>
						<a href="javascript:;" @click="getStatement('原油交易规则')">原油交易规则</a>
	                    <a href="javascript:;" @click="getStatement('租船交易规则')">租船交易规则</a>
					</li>
					<li>
						<h3>法律声明</h3>
						<a href="javascript:;" @click="getStatement('法律（免责）声明')">法律（免责）声明</a>
						<a href="javascript:;" @click="getStatement('风险告知书')">风险告知书</a>
						<a href="javascript:;" @click="getStatement('防范和制止违禁信息声明')">防范和制止违禁信息声明</a>
	                    <a href="javascript:;" @click="getStatement('知识产权声明')">知识产权声明</a>
					</li>
				</ul>
				<!--<div class="ft-link">
					<a href="">法律声明</a><em>|</em><a href="">服务条款</a><em>|</em><a href="">联系我们</a><em>|</em><a href="">帮助答疑</a>
				</div>-->
				<p>©中国中化股份有限公司 版权所有 京ICP备13009914号-6</p>
			</div>
		</div>
		<div class="right-bottom-imgage" style="position:absolute;">
		    <a href="javascript:;" class="closeBtn" title="隐藏" style="text-decoration: none; position: absolute; left: 78px; top: 0;color: #666; font-size: 12px">隐藏</a>
		    <a href="javascript:;" style="float: left;" @click="getPrize()">
		        <img src="../assets/images/drift.png" alt="" style="width:110px">
		    </a>
		    <!--HTML结构 兼容IE8及以上浏览器 移动端需加meta标签 -->
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
			getGlobal(){
//				window.open(configURL.index+'/index_en.htm',"_blank");
				function getCookie(name) {
				    var strCookie = document.cookie.replace(/[ ]/g,"");
				    var arr = strCookie.split(';');
				    for (var i = 0; i < arr.length; i++) {
				       var t = arr[i].split("=");
				        if(t[0] == name) {
				            return t[1];
				        }
				    };
				    return null;
				}
				if(getCookie('_l_') == 'zh'){
					document.cookie='_l_'+ "=en"
				}
				this.$router.go(0)
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
//			this.urlSrc = configURL.index + '/images/drift.png'
//			this.urlSrc = `${configURL.index}/images/drift.png`
			$('.nav li').on('click',function(){
				$(this).addClass('act').siblings().removeClass('act');
			})
			
			$(function () {
			    var $image = $('.right-bottom-imgage');
			    var $closeBtn = $('.closeBtn');
			    //鼠标悬浮的hover状态
			    $closeBtn.hover(function(){
			        $closeBtn.css("color","#fe350b");
			    },function(){
			        $closeBtn.css("color","#666");
			    });
			    //关闭按钮功能
//			    $closeBtn.css({textDecoration: 'none', position: 'absolute', top:0, left: 110, color: '#666', fontSize: 12});
			    $closeBtn.on('click', function () {
			        $image.hide();
			    });
			    var $imgTop = ($(window).height() - $image.height());//竖向滚动条滚动距离 + (视口高度 - 图片自身高度) = 图片垂直偏移量
			    var $imgLeft = ($(window).width() - $image.width());//横向滚动条滚动距离 + (视口宽度 - 图片自身宽度) = 图片水平偏移量
			    $image.css({position:'fixed', top: $imgTop, left: $imgLeft, zIndex: 999999});
			    /*$(window).on('scroll', function () {
			        var $imgTop = ($(window).height() - $image.height());//竖向滚动条滚动距离 + (视口高度 - 图片自身高度) = 图片垂直偏移量
			        var $imgLeft = ($(window).width() - $image.width());//横向滚动条滚动距离 + (视口宽度 - 图片自身宽度) = 图片水平偏移量
			        $image.css({position:'fixed', top: $imgTop, left: $imgLeft, zIndex: 999999});
			    })*/
			
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
