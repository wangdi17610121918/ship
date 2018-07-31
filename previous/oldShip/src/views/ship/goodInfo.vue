<template>
	<section>
		<div class="wlcp-banner"></div> 
		<div class="inner">
	       <div class="tran-title">租船需求信息</div>
	       <ul class="tran-line tra-cp"><li></li><li class="tran-line1"></li></ul>
	        <div class="ship-info clearfix">
	            <div class="c-tabdiv1 c-cpxx">
	                <table>                                                                                                  
	                    <tr>
	                    	<th>数量：<em>{{infos.quantity}}</em></th>
	                    	<th>装港/装货区域：<em>{{infos.load}}</em></th>
	                    	<th>卸港/卸货区域：<em>{{infos.unload}}</em></th>
	                    </tr>
	                    <tr class="c-tabcos1">
	                    	<td>装期：<em>{{infos.laycan}}</em></td>
	                    	<td>状态：<em>{{infos.status}}</em></td>
	                    	<td><em></em></td>
	                    </tr>
	                </table>
	              </div>
	        </div>
	        <ul class="wl-cp-com clearfix">
	          <li>
	            <div class="wl-cpcl"><i class="shipping-ico ico-cpcf"></i></div>
	            <div class="wl-cpcr">需求发布人<span>{{infos.epMemberName}}</span></div>
	          </li>
	          <li>
	            <div class="wl-cpcl"><i class="shipping-ico ico-cpcs"></i></div>
	            <div class="wl-cpcr">需求发布时间<span>{{infos.createDate}}</span></div>
	          </li>
	        </ul>
		</div>
	</section>
</template>

<script>
	import { goodsInfo } from '../../api/ship';
	export default{
		data(){
			return{
				infos:{},
				str:''
			}
		},
		methods:{
			infosFn:function(){
//				var str = this.$route.query.id;
				var para = {"uuid":this.str};
				goodsInfo(para).then(res => {
					this.infos = res.datas	
				})
			},
			content(){
				if(this.$own.getHref('uuid')){	
					this.str=decodeURIComponent(this.$own.getHref('uuid'));
				}else{
					this.str=window.localStorage.getItem('uuidd');
				}
			}
		},
		mounted(){
			this.infosFn()
		},
		created(){
			this.content();
		}
	}
</script>

<style scoped>
	.tran-title{
		color: #222 !important;
	}
	.c-cpxx td { width: calc(100% /3) !important;}
</style>